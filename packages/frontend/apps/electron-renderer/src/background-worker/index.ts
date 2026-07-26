import '@affine/core/bootstrap/electron';

import { apis } from '@affine/electron-api';
import { broadcastChannelStorages } from '@affine/nbstore/broadcast-channel';
import { bindNativeDBApis, sqliteStorages } from '@affine/nbstore/sqlite';
import {
  bindNativeDBV1Apis,
  sqliteV1Storages,
} from '@affine/nbstore/sqlite/v1';
import { supabaseStorages } from '@affine/nbstore/supabase';
import {
  StoreManagerConsumer,
  type WorkerManagerOps,
} from '@affine/nbstore/worker/consumer';
import { OpConsumer } from '@toeverything/infra/op';

// oxlint-disable-next-line no-non-null-assertion
bindNativeDBApis(apis!.nbstore);
// oxlint-disable-next-line no-non-null-assertion
bindNativeDBV1Apis(apis!.db);

const storeManager = new StoreManagerConsumer([
  ...sqliteStorages,
  ...sqliteV1Storages,
  ...broadcastChannelStorages,
  ...supabaseStorages,
]);

window.addEventListener('message', ev => {
  if (ev.data.type === 'electron:worker-connect') {
    const port = ev.ports[0];

    const consumer = new OpConsumer<WorkerManagerOps>(port);
    storeManager.bindConsumer(consumer);
  }
});
