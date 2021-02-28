import { injectable } from 'inversify';


@injectable()
export class MessageManager {
  addErrorMessage (message: string) {
    console.error(message);
  }

  addWarningMessage (message: string) {
    console.warn(message);
  }

  addMessage (message: string) {
    console.debug(message);
  }
}