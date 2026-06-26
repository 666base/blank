import '@blank/core/bootstrap/browser';

import { blankCloudStorages } from '@blank/nbstore/blank-cloud';
import { broadcastChannelStorages } from '@blank/nbstore/broadcast-channel';
import { cloudStorages } from '@blank/nbstore/cloud';
import { idbStorages } from '@blank/nbstore/idb';
import { idbV1Storages } from '@blank/nbstore/idb/v1';
import {
  StoreManagerConsumer,
  type WorkerManagerOps,
} from '@blank/nbstore/worker/consumer';
import { type MessageCommunicapable, OpConsumer } from '@toeverything/infra/op';

const consumer = new StoreManagerConsumer([
  ...idbStorages,
  ...idbV1Storages,
  ...broadcastChannelStorages,
  ...cloudStorages,
  ...blankCloudStorages,
]);

if ('onconnect' in globalThis) {
  (globalThis as any).onconnect = (event: MessageEvent) => {
    const port = event.ports[0];
    consumer.bindConsumer(new OpConsumer<WorkerManagerOps>(port));
  };
} else {
  consumer.bindConsumer(
    new OpConsumer<WorkerManagerOps>(globalThis as MessageCommunicapable)
  );
}
