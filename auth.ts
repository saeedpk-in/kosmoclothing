import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          await connectToDatabase();
          const User = (await import("./models/User")).default;
          const { email, password } = parsedCredentials.data;
          const user = await User.findOne({ email });
          if (!user) return null;
          if (user.emailVerified === false) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // JWT callback: Add custom properties to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    
    // Session callback: Add custom properties to the session object
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
      }
      return session;
    },
    
  },
  session: {
    strategy: "jwt", // Use JWT-based sessions
  },
  secret: process.env.AUTH_SECRET,
});