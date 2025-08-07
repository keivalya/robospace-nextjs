'use client';
import { useAuth } from '@/contexts/AuthContext';

export default function Pricing() {
  const { user, setShowSignupModal } = useAuth();

  const handleSelectPlan = (plan) => {
    if (!user) {
      setShowSignupModal(true);
    } else {
      alert(`Selected ${plan} plan!`);
    }
  };

  const plans = [
    {
      name: 'Basic',
      price: '0',
      description: 'Perfect for getting started with robot simulation',
      features: [
        'Basic robot models',
        'Standard physics engine',
        'Community support'
      ],
      buttonText: 'Get Started Free',
      featured: false
    },
    {
      name: 'Plus',
      price: '19.99',
      description: 'Advanced features for professional development',
      features: [
        'Everything in Basic',
        'Cloud Support',
        'Advanced robot models',
        'Motion datasets',
        'Custom environments'
      ],
      buttonText: 'Get Plus',
      featured: true
    },
    {
      name: 'Student',
      price: '9.99',
      description: 'Ideal for students, researchers, and educators',
      features: [
        'Everything in Plus',
        'Student discount'
      ],
      buttonText: 'Verify student status',
      featured: false
    }
  ];

  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <div className="section-header">
          <h2>Simple, transparent pricing</h2>
          <p>Start free. Scale as you build.</p>
        </div>
        
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`pricing-card ${plan.featured ? 'featured' : ''}`}
            >
              {plan.featured && <span className="badge">Most Popular</span>}
              <h3>{plan.name}</h3>
              <div className="price">
                ${plan.price}<span>/mo</span>
              </div>
              <p>{plan.description}</p>
              <ul className="pricing-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>✓ {feature}</li>
                ))}
              </ul>
              <button 
                className={`btn ${plan.featured ? 'btn-primary' : 'btn-outline'} btn-full`}
                onClick={() => handleSelectPlan(plan.name.toLowerCase())}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}