import 'express';
import 'express-session';

declare global {
  namespace Express {
    interface User {
      coren: string;
    }

    interface Request {
      session: import('express-session').Session &
        Partial<import('express-session').SessionData> & {
          institutionName?: string;
          isAuthenticated?: boolean;
        };
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    institutionName?: string;
    isAuthenticated?: boolean;
  }
}
