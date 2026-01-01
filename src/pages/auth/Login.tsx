import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast.success('Welcome back!');
      // Navigate based on user role - handled in auth context
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      switch (user.role) {
        case 'supplier':
          navigate('/supplier');
          break;
        case 'contractor':
          navigate('/contractor');
          break;
        case 'admin':
          navigate('/admin');
          break;
        case 'moderator':
          navigate('/moderator');
          break;
        default:
          navigate('/');
      }
    } catch (error: any) {
      toast.error(error.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { email: 'supplier@demo.com', role: 'Supplier' },
    { email: 'contractor@demo.com', role: 'Contractor' },
    { email: 'admin@demo.com', role: 'Admin' },
    { email: 'moderator@demo.com', role: 'Moderator' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl text-foreground mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-warning">
              <Building2 className="h-6 w-6 text-accent-foreground" />
            </div>
            <span>BuildConnect</span>
          </Link>

          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">
            {t('auth.noAccount')}{' '}
            <Link to="/register" className="text-accent hover:underline">
              {t('auth.signUp')}
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <Link to="/forgot-password" className="text-sm text-accent hover:underline">
                  {t('auth.forgotPassword')}
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" variant="accent" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  {t('auth.signIn')}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium text-foreground mb-3">Demo Accounts (password: any)</p>
            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => setEmail(account.email)}
                  className="text-left px-3 py-2 text-xs rounded-md bg-card hover:bg-accent/10 transition-colors"
                >
                  <span className="font-medium text-foreground">{account.role}</span>
                  <br />
                  <span className="text-muted-foreground">{account.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-8">
        <div className="max-w-lg text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Connect with the Best in Construction
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Access thousands of suppliers, manage your projects, and grow your business with BuildConnect.
          </p>
          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-sm">Verified Suppliers</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-sm">Secure Messaging</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-sm">Easy Quotes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
