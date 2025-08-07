export default function Features() {
    const features = [
      {
        icon: '🎮',
        title: 'Add your own robot',
        description: 'Customize simulation or training by adding your own XML/3D files'
      },
      {
        icon: '📊',
        title: 'Dataset Playback',
        description: 'Load and replay motion datasets including walk, run, and squat animations'
      },
      {
        icon: '📷',
        title: 'Dynamic Camera',
        description: 'Automatic camera following with adjustable distance and height'
      },
      {
        icon: '🤖',
        title: 'Multiple Robots',
        description: 'Support for various robot models including humanoids and quadrupeds'
      },
      {
        icon: '🔬',
        title: 'Physics Simulation',
        description: 'Powered by MuJoCo physics engine for accurate dynamics'
      },
      {
        icon: '🚀',
        title: 'Web-based',
        description: 'No installation required - runs entirely in your browser'
      }
    ];
  
    return (
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2>Everything you need to train robots</h2>
            <p>Powerful features that make robot simulation accessible to everyone</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }