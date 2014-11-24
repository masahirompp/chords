/// <reference path="../express/express.d.ts" />

declare module Express {
  export interface Request {
    flash(name:string): string;
    flash(name:string, value:string): void;
  }
}
