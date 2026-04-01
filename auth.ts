import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import db from "@/lib/db"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null

        const user = await db.user.findUnique({
          where: { username: credentials.username as string }
        })

        if (!user) return null

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordCorrect) return null

        return { id: user.id, name: user.name, email: user.username }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return false; // ดีดไปหน้า Login
      }
      return true;
    },
  },
})