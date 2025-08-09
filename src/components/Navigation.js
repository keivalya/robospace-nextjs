'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Inside your Navigation component, add:


export default function Navigation() {
  const { user, logout, setShowLoginModal, setShowSignupModal } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    router.push('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  return (
    <nav className="nav">
      <div className="container">
        <Link href="/" className="nav-brand" onClick={closeMenu}>
          RoboSpace
        </Link>
        
        {/* Hamburger Button - Only visible on mobile */}
        <button 
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        {/* Navigation Menu - Add class based on menu state */}
        <div className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
          {user ? (
            <>
              <Link href="/dashboard" onClick={closeMenu}>Dashboard</Link>
              <Link href="/#features" onClick={closeMenu}>Features</Link>
              <Link href="/documentation" onClick={closeMenu}>Documentation</Link>
              <Link href="/#about" onClick={closeMenu}>About</Link>
              <Link href="/#pricing" onClick={closeMenu}>Pricing</Link>
              <span className="nav-user">{user.displayName || user.email}</span>
              <button className="btn btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/#features" onClick={closeMenu}>Features</Link>
              <Link href="/#about" onClick={closeMenu}>About</Link>
              <Link href="/#pricing" onClick={closeMenu}>Pricing</Link>
              <button 
                className="btn-text" 
                onClick={() => {
                  setShowLoginModal(true);
                  closeMenu();
                }}
              >
                Login
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  setShowSignupModal(true);
                  closeMenu();
                }}
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}