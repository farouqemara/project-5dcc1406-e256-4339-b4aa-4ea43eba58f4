import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Building2, User, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

const Register: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') as UserRole | null;
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole | null>(initialRole);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!role) {
      toast.error('Please select a role');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      await register(email, password, name, role);
      toast.success('Account created successfully!');
      navigate(role === 'supplier' ? '/supplier' : '/contractor');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

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

          <h1 className="text-2xl font-bold text-foreground mb-2">Create your account</h1>
          <p className="text-muted-foreground mb-8">
            {t('auth.hasAccount')}{' '}
            <Link to="/login" className="text-accent hover:underline">
              {t('auth.signIn')}
            </Link>
          </p>

          {/* Role Selection */}
          {!role && (
            <div className="mb-8">
              <Label className="text-sm font-medium mb-3 block">{t('auth.selectRole')}</Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('supplier')}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border hover:border-accent bg-card transition-all hover:shadow-medium"
                >
                  <div className="h-12 w-12 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <span className="font-medium">{t('auth.supplier')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('contractor')}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border hover:border-accent bg-card transition-all hover:shadow-medium"
                >
                  <div className="h-12 w-12 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                    <User className="h-6 w-6" />
                  </div>
                  <span className="font-medium">{t('auth.contractor')}</span>
                </button>
              </div>
            </div>
          )}

          {role && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 mb-4 p-3 bg-accent/10 rounded-lg">
                {role === 'supplier' ? (
                  <Building2 className="h-5 w-5 text-accent" />
                ) : (
                  <User className="h-5 w-5 text-accent" />
                )}
                <span className="text-sm font-medium capitalize">{t(`auth.${role}`)}</span>
                <button
                  type="button"
                  onClick={() => setRole(null)}
                  className="ml-auto text-sm text-accent hover:underline"
                >
                  Change
                </button>
              </div>

              <div>
                <Label htmlFor="name">
                  {role === 'supplier' ? 'Business Name' : 'Full Name'}
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={role === 'supplier' ? 'Your Company Name' : 'John Doe'}
                  required
                  className="mt-1.5"
                />
              </div>

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
                <Label htmlFor="password">{t('auth.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-1.5"
                />
              </div>

              <Button type="submit" variant="accent" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    {t('auth.signUp')}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-8">
        <div className="max-w-lg text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Join the Leading Construction Marketplace
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Connect with thousands of verified suppliers and contractors. Streamline your procurement process today.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-accent mb-1">2,500+</div>
              <div className="text-sm text-primary-foreground/60">Suppliers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent mb-1">10,000+</div>
              <div className="text-sm text-primary-foreground/60">Contractors</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent mb-1">50,000+</div>
              <div className="text-sm text-primary-foreground/60">Transactions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
