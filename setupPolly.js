import path from 'path';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import { Polly } from '@pollyjs/core';
import FSPersister from '@pollyjs/persister-fs';
import { MODES } from '@pollyjs/utils';
import { setupPolly } from 'setup-polly-jest';

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

export const startPolly = () =>
  setupPolly({
    mode: MODES.REPLAY,
    recordIfMissing: process.env.POLLY_RECORD || false,
    adapters: ['node-http'],
    persister: 'fs',
    persisterOptions: {
      fs: {
        recordingsDir: path.resolve(__dirname, './recordings'),
      },
    },
  });