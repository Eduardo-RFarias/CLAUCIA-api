import 'express';

declare global {
  namespace Express {
    interface User {
      coren: string;
    }
  }
}
