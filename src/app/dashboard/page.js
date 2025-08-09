'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/');
    } else {
      // Load the simulation after a short delay
      setTimeout(() => setLoading(false), 2000);
    }
  }, [user, router]);

  const toggleFullscreen = () => {
    const container = document.getElementById('demoContainer');
    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  if (!user) return null;

  return (
    <>
      <Navigation />
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="container">
            <h3>Robot Simulation Workspace</h3>
            <div className="dashboard-controls">
              <div className="gpu-toggle">
                <span>GPU</span>
                <div className="toggle" title="Upgrade to Plus plan for GPU acceleration">
                  <div className="toggle-slider"></div>
                </div>
              </div>
              <div className="status">
                <span className="status-dot"></span>
                <span>Active Session</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="demo-container" id="demoContainer">
          <div className="demo-controls">
            {/* <button 
              className="btn btn-outline" 
              onClick={toggleFullscreen}
            >
              🔍 {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </button> */}
          </div>
          
          {loading && (
            <div className="demo-loading">
              <div className="spinner"></div>
              <p>Loading simulation...</p>
              <p style={{ fontSize: '0.875rem', marginTop: '1rem' }}>
                If this takes too long, try refreshing the page.
              </p>
            </div>
          )}
          
          <iframe
            className="demo-iframe"
            src="https://demo.robospace.app"
            allow="fullscreen; accelerometer; gyroscope"
            style={{ display: loading ? 'none' : 'block' }}
          />
        </div>
      </div>
    </>
  );
}