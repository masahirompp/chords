/// <reference path="../express/express.d.ts" />

declare module Express {
  export interface Request {
    flash?: (messageType: string, message ? : any) => string;
  }
}
