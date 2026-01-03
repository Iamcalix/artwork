import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import GallerySection from './GallerySection';
import ServicesSection from './ServicesSection';
import CommissionsSection from './CommissionsSection';
import AboutSection from './AboutSection';
import TestimonialsSection from './TestimonialsSection';
import CTASection from './CTASection';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import { supabase } from '@/lib/supabase';

type Section = 'home' | 'gallery' | 'commissions' | 'about' | 'admin';

interface AdminUser {
  id: string;
  email: string;
  name: string;
}

const AppLayout: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loginError, setLoginError] = useState('');
  const [isVerifying, setIsVerifying] = useState(true);

  const galleryRef = useRef<HTMLDivElement>(null);
  const commissionsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // Verify session on mount
  useEffect(() => {
    const verifySession = async () => {
      const sessionToken = localStorage.getItem('adminSessionToken');
      if (!sessionToken) {
        setIsVerifying(false);
        return;
      }

      try {
        // DEMO LOGIN BYPASS
        if (sessionToken === 'demo-token') {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 500));

          setIsAdminLoggedIn(true);
          setAdminUser({
            id: 'demo-admin-id',
            email: 'admin@demo.com',
            name: 'Demo Admin'
          });
          setIsVerifying(false);
          return;
        }

        const { data, error } = await supabase.functions.invoke('admin-auth', {
          body: { action: 'verify', sessionToken },
        });

        if (data?.valid && data?.user) {
          setIsAdminLoggedIn(true);
          setAdminUser(data.user);
        } else {
          localStorage.removeItem('adminSessionToken');
        }
      } catch (err) {
        localStorage.removeItem('adminSessionToken');
      } finally {
        setIsVerifying(false);
      }
    };

    verifySession();
  }, []);

  const handleNavigate = (section: string) => {
    if (section === 'admin') {
      if (isAdminLoggedIn) {
        setCurrentSection('admin');
      } else {
        setShowAdminLogin(true);
      }
      return;
    }

    setCurrentSection(section as Section);

    setTimeout(() => {
      if (section === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (section === 'gallery' && galleryRef.current) {
        galleryRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (section === 'commissions' && commissionsRef.current) {
        commissionsRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (section === 'about' && aboutRef.current) {
        aboutRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleAdminLogin = (user: AdminUser, sessionToken: string) => {
    setIsAdminLoggedIn(true);
    setAdminUser(user);
    localStorage.setItem('adminSessionToken', sessionToken);
    setShowAdminLogin(false);
    setCurrentSection('admin');
    setLoginError('');
  };

  const handleAdminLogout = async () => {
    const sessionToken = localStorage.getItem('adminSessionToken');
    if (sessionToken) {
      // DEMO LOGOUT BYPASS
      if (sessionToken === 'demo-token') {
        // Just clear local state, no backend call needed
      } else {
        try {
          await supabase.functions.invoke('admin-auth', {
            body: { action: 'logout', sessionToken },
          });
        } catch (err) {
          // Ignore logout errors
        }
      }
    }

    setIsAdminLoggedIn(false);
    setAdminUser(null);
    localStorage.removeItem('adminSessionToken');
    setCurrentSection('home');
  };

  // Show loading while verifying session
  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-serif text-2xl font-bold">DP</span>
          </div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Show admin dashboard if logged in and on admin section
  if (currentSection === 'admin' && isAdminLoggedIn) {
    return (
      <AdminDashboard
        onLogout={handleAdminLogout}
        onBack={() => setCurrentSection('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={handleNavigate} currentSection={currentSection} />

      <main>
        <HeroSection onExploreGallery={() => handleNavigate('gallery')} />
        <ServicesSection />
        <div ref={galleryRef}>
          <GallerySection />
        </div>
        <div ref={commissionsRef}>
          <CommissionsSection />
        </div>
        <div ref={aboutRef}>
          <AboutSection />
        </div>
        <TestimonialsSection />
        <CTASection />
      </main>

      <Footer onNavigate={handleNavigate} />
      <WhatsAppButton variant="floating" />

      {showAdminLogin && (
        <AdminLogin
          onLogin={handleAdminLogin}
          onClose={() => {
            setShowAdminLogin(false);
            setLoginError('');
          }}
          error={loginError}
        />
      )}
    </div>
  );
};

export default AppLayout;
