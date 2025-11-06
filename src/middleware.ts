// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login',
  },
});

export const config = {
  matcher: [
    '/dashboard', 
    '/chat',
    '/calendar',
    '/generate',
    '/preferences',
    '/search',
    '/shopping-list',]
};
