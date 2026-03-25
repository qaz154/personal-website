'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mail, Lock, User, Globe } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Demo authentication - in production, use NextAuth signIn
      if (formData.email === 'admin@example.com' && formData.password === 'demo123') {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Store demo session
        localStorage.setItem('demo_session', JSON.stringify({
          user: { name: 'Admin User', email: formData.email, role: 'admin' },
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        }));

        router.push('/dashboard');
        return;
      }

      if (formData.email === 'user@example.com' && formData.password === 'demo123') {
        await new Promise(resolve => setTimeout(resolve, 1000));

        localStorage.setItem('demo_session', JSON.stringify({
          user: { name: 'Demo User', email: formData.email, role: 'user' },
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        }));

        router.push('/dashboard');
        return;
      }

      setError('Invalid email or password. Try admin@example.com / demo123');
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    setError(`OAuth with ${provider} would be implemented in production. For demo, use email login.`);
  };

  const demoCredentials = [
    { email: 'admin@example.com', password: 'demo123', role: 'Admin' },
    { email: 'user@example.com', password: 'demo123', role: 'User' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Button variant="ghost" className="mb-6" >
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <Card className="shadow-2xl border-primary/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to access the dashboard and manage your content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Demo credentials */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-sm">Demo Credentials</h3>
              <div className="space-y-2">
                {demoCredentials.map((cred) => (
                  <div key={cred.email} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium">{cred.email}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {cred.role}
                      </Badge>
                    </div>
                    <span className="text-muted-foreground">{cred.password}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* OAuth buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => handleOAuthLogin('GitHub')}
                disabled={isLoading}
                className="gap-2"
              >
                <User className="h-4 w-4" />
                GitHub
              </Button>
              <Button
                variant="outline"
                onClick={() => handleOAuthLogin('Google')}
                disabled={isLoading}
                className="gap-2"
              >
                <Globe className="h-4 w-4" />
                Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>Signing in...</>
                ) : (
                  <>
                    <User className="h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link
                href="/register"
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Note about demo */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            This is a demo authentication system. In production, this would use
            NextAuth.js with OAuth providers and secure password hashing.
          </p>
        </div>
      </div>
    </div>
  );
}