import { injectable } from "inversify";

@injectable()
export class ErrorManager {
  submitError (err: Error) {
      console.log(err)
  } 
}