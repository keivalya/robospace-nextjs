export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="video-section">
          <h3>See RoboSpace in Action</h3>
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/U5NBmzT-j5c?si=dzDvLm92awY-b-bR"
              title="RoboSpace Product Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
        
        <div className="section-header">
          <h2>Built by roboticists, for roboticists</h2>
          <p>
            We&apos;ve spent years fighting with ROS dependencies, waiting for real robot resets,
            and explaining why our experiments aren&apos;t reproducible. There had to be a better way.
          </p>
        </div>
        
        <div className="about-grid">
          <div className="about-card">
            <h3>The problem we&apos;re solving</h3>
            <p>
              Every robotics researcher knows the pain: 3 days to set up a simulation environment,
              another week to get reinforcement learning working, and good luck sharing your setup
              with anyone else. Meanwhile, web developers deploy entire applications in seconds.
            </p>
            <p>We asked ourselves: why can&apos;t robot training be that simple?</p>
          </div>
          
          <div className="about-card">
            <h3>Our approach</h3>
            <p>
              RoboSpace brings modern developer experience to robotics. Upload your robot model
              like you&apos;d deploy to Vercel. Configure training like you&apos;d set up a GitHub Action.
              Share results like you&apos;d share a CodePen.
            </p>
            <p>No CUDA installation. No ROS melodic vs noetic debates. Just robotics.</p>
          </div>
        </div>
        
        <div className="stats">
          <div className="stat">
            <div className="stat-number">200+</div>
            <div className="stat-label">Active users</div>
          </div>
          <div className="stat">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Simulations run</div>
          </div>
          <div className="stat">
            <div className="stat-number">$0</div>
            <div className="stat-label">To get started</div>
          </div>
        </div>
      </div>
    </section>
  );
}