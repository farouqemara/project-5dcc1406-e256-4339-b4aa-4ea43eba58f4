import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const categories = [
    { href: '/categories/building-materials', label: t('category.building') },
    { href: '/categories/electrical', label: t('category.electrical') },
    { href: '/categories/plumbing', label: t('category.plumbing') },
    { href: '/categories/finishing', label: t('category.finishing') },
    { href: '/categories/equipment', label: t('category.equipment') },
  ];

  const quickLinks = [
    { href: '/about', label: t('nav.about') },
    { href: '/suppliers', label: t('nav.suppliers') },
    { href: '/equipment', label: t('nav.equipment') },
    { href: '/contact', label: t('common.contact') },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-warning">
                <Building2 className="h-6 w-6 text-accent-foreground" />
              </div>
              <span>BuildConnect</span>
            </Link>
            <p className="text-sm text-primary-foreground/70">
              The leading marketplace connecting construction suppliers and contractors. Streamline your procurement process today.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10 hover:bg-accent transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">{t('nav.categories')}</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.href}>
                  <Link
                    to={category.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">{t('common.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>123 Construction Ave, Business District, City 12345</span>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>+1 (234) 567-890</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@buildconnect.com"
                  className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>info@buildconnect.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {currentYear} BuildConnect. {t('footer.rights')}.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link to="/terms" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
