import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/signin',
    
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthPage = nextUrl.pathname.startsWith('/signin') ;

      // If the user is authenticated and trying to access login or signup, redirect them to home page
      if (isLoggedIn && isAuthPage) {
        
        return Response.redirect(new URL('/', nextUrl)); // Or use '/home' or another page
      }

      // If the user is not authenticated, they are allowed to visit any page (including /login, /signup)
      return true;
  },
    
  },
  providers: [],
} satisfies NextAuthConfig;