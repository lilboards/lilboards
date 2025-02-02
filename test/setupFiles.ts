import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import { TextDecoder, TextEncoder } from 'text-encoding';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
