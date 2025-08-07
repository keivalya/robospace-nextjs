import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import About from '@/components/About';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import SignupModal from '@/components/SignupModal';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Features />
        <About />
        <Pricing />
      </main>
      <Footer />
      <LoginModal />
      <SignupModal />
    </>
  );
}