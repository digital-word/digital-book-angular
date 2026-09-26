import { environmentCommon } from './environment.common';
import { Environment } from './environment.model';

export const environment: Environment = {
  ...environmentCommon,
  apiUrl: 'https://us-central1-digital-book-fbaa0.cloudfunctions.net/api',
  env: 'staging',
  apiKey: 'AIzaSyB1a2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q',
  authDomain: 'my-project.firebaseapp.com',
  projectId: 'my-project-12345',
  storageBucket: 'my-project.appspot.com',
  messagingSenderId: '123456789012',
  appId: '1:123456789012:web:abc123def456',
};
