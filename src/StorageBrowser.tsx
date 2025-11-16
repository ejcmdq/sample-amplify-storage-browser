import { Amplify } from 'aws-amplify';
import {
  createAmplifyAuthAdapter,
  createStorageBrowser,
} from '@aws-amplify/ui-react-storage/browser';
import config from '../amplify_outputs.json';

// IMPORTANT: Amplify.configure must run before createAmplifyAuthAdapter
Amplify.configure(config);

export const { StorageBrowser } = createStorageBrowser({
  config: createAmplifyAuthAdapter(),
});

