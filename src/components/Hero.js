'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const { user, setShowSignupModal } = useAuth();
  const router = useRouter();

  const handleGetStarted = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      setShowSignupModal(true);
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Simulate and train robots in your browser
          </h1>
          <p className="hero-subtitle">
            Upload your robot. Pick an environment. Click train.
            <br />
            No setup, no GPUs, no Docker.
          </p>
          <div className="hero-actions">
            <button
              className="btn btn-primary btn-lg"
              onClick={handleGetStarted}
            >
              Start Simulation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}