import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import About from '@/components/About';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import SignupModal from '@/components/SignupModal';
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <Script
        id="clarity-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "sh6qul0g41");
          `
        }}
      />
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