import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

// https://github.com/remix-run/react-router/issues/12363
import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;
