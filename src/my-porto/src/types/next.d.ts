// types/next-auth.d.ts یا در global.d.ts
import type { JWT as DefaultJWT } from "next-auth/jwt";
import type { UserType } from "@/types/auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: UserType & {
      accessToken: string;
    };
  }

  interface User extends UserType {
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string;
    user?: UserType;
  }
}
