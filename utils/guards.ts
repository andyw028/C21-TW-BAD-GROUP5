import type { Request, Response, NextFunction } from "express";

declare module "express-session" {
  interface SessionData {
    user?: {
      id: number;
      username: string;
    };
  }
}

export function isLoggedInStatic(req: Request, res: Response, next: NextFunction) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login.html");
  }
}

export function isLoggedInApi(req: Request, res: Response, next: NextFunction) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
}