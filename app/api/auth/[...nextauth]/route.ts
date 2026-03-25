import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth';

// Re-export the NextAuth handler
export const { GET, POST } = NextAuth(authConfig);