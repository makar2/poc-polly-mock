import axios from 'axios';

import path from 'path';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import { Polly } from '@pollyjs/core';
import FSPersister from '@pollyjs/persister-fs';

// Register the node http adapter so its accessible by all future polly instances

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

describe('Simple Example', function () {

  it('fetches a post', async function () {
    const polly = new Polly('Simple Example 3', {
      adapters: ['node-http'],
      persister: 'fs',
      logLevel: 'error',
      persisterOptions: {
        fs: {
          recordingsDir: path.resolve(__dirname, './recordings'),
        },
      },
    });

    const response = await axios.get(
      'https://csrng.net/csrng/csrng.php'
    );

    expect(response.data[0].status).toBe("success");
    expect(response.data[0].random).toBe(8861455669118254);

    await polly.stop();
  });
});