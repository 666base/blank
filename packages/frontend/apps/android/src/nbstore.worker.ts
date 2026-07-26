import './setup-worker';

import { MessagePortAuthProvider } from '@affine/mobile-shared/auth/channel';
import { installAuthRequestProxy } from '@affine/mobile-shared/auth/request';
import { broadcastChannelStorages } from '@affine/nbstore/broadcast-channel';
import { idbStoragesIndexerOnly } from '@affine/nbstore/idb';
import {
  bindNativeDBApis,
  type NativeDBApis,
  sqliteStorages,
} from '@affine/nbstore/sqlite';
import { supabaseStorages } from '@affine/nbstore/supabase';
import {
  StoreManagerConsumer,
  type WorkerManagerOps,
} from '@affine/nbstore/worker/consumer';
import { type MessageCommunicapable, OpConsumer } from '@toeverything/infra/op';
import { AsyncCall } from 'async-call-rpc';

const authProvider = new MessagePortAuthProvider();
installAuthRequestProxy(authProvider);

globalThis.addEventListener('message', e => {
  if (e.data.type === 'auth-access-token-channel') {
    authProvider.setPort(e.ports[0] as MessagePort);
    return;
  }

  if (e.data.type === 'native-db-api-channel') {
    const port = e.ports[0] as MessagePort;
    const rpc = AsyncCall<NativeDBApis>(
      {},
      {
        channel: {
          on(listener) {
            const f = (e: MessageEvent<any>) => {
              listener(e.data);
            };
            port.addEventListener('message', f);
            return () => {
              port.removeEventListener('message', f);
            };
          },
          send(data) {
            port.postMessage(data);
          },
        },
      }
    );
    bindNativeDBApis(rpc);
    port.start();
  }
});

const consumer = new OpConsumer<WorkerManagerOps>(
  globalThis as MessageCommunicapable
);

const storeManager = new StoreManagerConsumer([
  ...idbStoragesIndexerOnly,
  ...sqliteStorages,
  ...broadcastChannelStorages,
  ...supabaseStorages,
]);

storeManager.bindConsumer(consumer);
