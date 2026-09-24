import { environmentCommon } from './environment.common';
import { Environment } from './environment.model';

export const environment: Environment = {
  ...environmentCommon,
  apiUrl: 'https://us-central1-digital-book-fbaa0.cloudfunctions.net/api',
};
