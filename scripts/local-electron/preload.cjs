const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('__ELECTRON_SHELL__', true);
