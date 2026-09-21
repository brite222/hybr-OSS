import type { NextAuthConfig, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

// Edge-safe config: no providers with Node-only deps (bcrypt, pg) live here.
// Used directly by middleware; extended with the real provider in `auth.ts`.
export const authConfig: NextAuthConfig = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      const t = token as JWT;
      if (user) {
        t.id = user.id!;
        t.role = user.role;
      }
      return t;
    },
    session({ session, token }) {
      const s = session as Session;
      const t = token as JWT;
      s.user.id = t.id;
      s.user.role = t.role;
      return s;
    },
  },
};
