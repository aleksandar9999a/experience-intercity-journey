import { injectable } from "inversify";

@injectable()
export class PixabayConfig {
  auth_key = '17067316-f8f39231352c57d2638955d6e';
  defaultURL = 'https://pixabay.com/api';
  per_page = 5;
}