'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import './documentation.css';

export default function Documentation() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Track scroll position for active section highlighting
    const handleScroll = () => {
      const sections = document.querySelectorAll('.doc-section');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  const sections = [
    { id: 'getting-started', title: '🚀 Getting Started' },
    { id: 'core-functions', title: '🔧 Core Functions' },
    { id: 'robot-examples', title: '🤖 Robot Examples' },
    { id: 'advanced', title: '💡 Advanced Topics' },
  ];

  return (
    <>
      <Navigation />
      <div className="documentation-page">
        <div className="doc-sidebar">
          <div className="sidebar-header">
            <h3>Documentation</h3>
            <input
              type="text"
              placeholder="Search docs..."
              className="doc-search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <nav className="doc-nav">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`doc-nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section.id);
                }}
              >
                {section.title}
              </a>
            ))}
          </nav>
        </div>

        <div className="doc-content">
          <div className="doc-header">
            <h1>RoboSpace API Documentation</h1>
            <p>Complete guide for controlling robots in MuJoCo simulation</p>
          </div>

          <section id="getting-started" className="doc-section">
            <h2>🚀 Getting Started</h2>
            <div className="doc-card">
              <h3>Quick Start</h3>
              <pre className="code-block">
{`import numpy as np
import math

# Get basic information
n = get_num_actuators()
print(f"Robot has {n} actuators")

# Set control values
control = [0.5] * n
set_control(control)

# Get current state
pos = get_qpos()
vel = get_qvel()
print(f"Position: {pos[:3]}")
print(f"Velocity: {vel[:3]}")`}
              </pre>
            </div>

            <div className="doc-card">
              <h3>Available Functions</h3>
              <ul className="function-list">
                <li><code>get_num_actuators()</code> - Get number of actuators</li>
                <li><code>get_actuator_names()</code> - Get actuator names</li>
                <li><code>get_actuator_ranges()</code> - Get control limits</li>
                <li><code>set_control(ctrl)</code> - Set control values</li>
                <li><code>get_control()</code> - Get current control</li>
                <li><code>get_qpos()</code> - Get joint positions</li>
                <li><code>get_qvel()</code> - Get joint velocities</li>
                <li><code>get_time()</code> - Get simulation time</li>
                <li><code>reset()</code> - Reset simulation</li>
                <li><code>step()</code> - Step simulation forward</li>
              </ul>
            </div>
          </section>

          <section id="core-functions" className="doc-section">
            <h2>🔧 Core Functions</h2>
            
            <div className="doc-card">
              <h3>get_num_actuators()</h3>
              <div className="function-signature">get_num_actuators() → int</div>
              <p>Returns the total number of actuators in the current robot model.</p>
              <pre className="code-block">
{`n_actuators = get_num_actuators()
print(f"Number of actuators: {n_actuators}")

# Create control array with correct size
control = [0.0] * n_actuators`}
              </pre>
            </div>

            <div className="doc-card">
              <h3>set_control(ctrl)</h3>
              <div className="function-signature">set_control(ctrl: list[float]) → None</div>
              <p>Sets control values for all actuators. Input can be a list or numpy array.</p>
              <pre className="code-block">
{`# Set all actuators to neutral
control = [0.0] * get_num_actuators()
set_control(control)

# Sine wave control
import math
t = get_time()
control = [0.5 * math.sin(t + i*0.5) for i in range(get_num_actuators())]
set_control(control)`}
              </pre>
            </div>

            <div className="doc-card">
              <h3>get_qpos() & get_qvel()</h3>
              <div className="function-signature">
                get_qpos() → numpy.array<br/>
                get_qvel() → numpy.array
              </div>
              <p>Get joint positions and velocities respectively.</p>
              <pre className="code-block">
{`# PD Controller example
import numpy as np

def pd_controller(target, kp=10.0, kd=1.0):
    qpos = get_qpos()
    qvel = get_qvel()
    n = get_num_actuators()
    
    # Calculate errors
    pos_error = np.array(target) - qpos[:n]
    vel_error = -qvel[:n]
    
    # PD control law
    control = kp * pos_error + kd * vel_error
    set_control(control.tolist())
    
    return np.linalg.norm(pos_error)`}
              </pre>
            </div>
          </section>

          <section id="robot-examples" className="doc-section">
            <h2>🤖 Robot-Specific Examples</h2>

            <div className="doc-card">
              <h3><span className="robot-badge">SPOT</span> Quadruped Robot</h3>
              <h4>Standing Position</h4>
              <pre className="code-block">
{`# Spot robot standing position
# Hip: 0°, Thigh: -45°, Calf: 90° for each leg
import math

standing_angles = [
    # Front Left
    0.0, -math.pi/4, math.pi/2,
    # Front Right  
    0.0, -math.pi/4, math.pi/2,
    # Rear Left
    0.0, -math.pi/4, math.pi/2,
    # Rear Right
    0.0, -math.pi/4, math.pi/2
]

set_control(standing_angles)`}
              </pre>

              <h4>Trotting Gait</h4>
              <pre className="code-block">
{`# Diagonal pairs move together (FL+RR, FR+RL)
import math

t = get_time()
freq = 2.0  # Hz
phase = math.sin(2 * math.pi * freq * t)

trot_control = []
for leg in range(4):
    if leg in [0, 3]:  # FL and RR
        hip = 0.2 * phase
        thigh = -math.pi/4 + 0.3 * phase
        calf = math.pi/2 - 0.2 * phase
    else:  # FR and RL
        hip = -0.2 * phase
        thigh = -math.pi/4 - 0.3 * phase
        calf = math.pi/2 + 0.2 * phase
    
    trot_control.extend([hip, thigh, calf])

set_control(trot_control)`}
              </pre>
            </div>

            <div className="doc-card">
              <h3><span className="robot-badge">H1</span> Humanoid Robot</h3>
              <h4>Walking Pattern</h4>
              <pre className="code-block">
{`# Unitree H1 walking cycle
import math

t = get_time()
n = get_num_actuators()

# Walking parameters
step_freq = 1.0  # Hz
step_height = 0.1
step_length = 0.2

# Generate walking pattern
control = []
for i in range(n):
    name = get_actuator_names()[i]
    
    if 'left_hip_pitch' in name:
        val = step_length * math.sin(2 * math.pi * step_freq * t)
    elif 'right_hip_pitch' in name:
        val = -step_length * math.sin(2 * math.pi * step_freq * t)
    elif 'left_knee' in name:
        val = step_height * max(0, math.sin(2 * math.pi * step_freq * t))
    elif 'right_knee' in name:
        val = step_height * max(0, -math.sin(2 * math.pi * step_freq * t))
    else:
        val = 0.0
    
    control.append(val)

set_control(control)`}
              </pre>
            </div>

            <div className="doc-card">
              <h3><span className="robot-badge">UR5</span> Robot Arm</h3>
              <h4>Pick and Place Motion</h4>
              <pre className="code-block">
{`# UR5 pick and place motion
import math

def move_to_position(target_joints, duration=2.0):
    """Smooth motion to target position"""
    start_joints = get_control()
    start_time = get_time()
    
    while get_time() - start_time < duration:
        t = (get_time() - start_time) / duration
        # Smooth interpolation (ease-in-out)
        s = t * t * (3.0 - 2.0 * t)
        
        current = []
        for i in range(6):
            current.append(
                start_joints[i] + s * (target_joints[i] - start_joints[i])
            )
        
        set_control(current)
        step()
    
    set_control(target_joints)

# Define positions
home = [0, -math.pi/2, 0, -math.pi/2, 0, 0]
pick = [math.pi/4, -math.pi/3, math.pi/3, -math.pi/2, math.pi/2, 0]
place = [-math.pi/4, -math.pi/3, math.pi/3, -math.pi/2, math.pi/2, 0]

# Execute sequence
move_to_position(home)
move_to_position(pick)
move_to_position(place)
move_to_position(home)`}
              </pre>
            </div>
          </section>

          <section id="advanced" className="doc-section">
            <h2>💡 Advanced Topics</h2>

            <div className="doc-card">
              <h3>Balance Recovery</h3>
              <pre className="code-block">
{`def balance_controller():
    """Active balancing for quadruped robots"""
    qpos = get_qpos()
    qvel = get_qvel()
    
    # Estimate body tilt
    if len(qpos) > 6:
        roll = qpos[3]
        pitch = qpos[4]
        
        # Compensate with leg positions
        control = []
        for leg in range(4):
            # Adjust hip based on tilt
            hip_adj = -0.5 * roll if leg in [0, 2] else 0.5 * roll
            # Adjust thigh for pitch
            thigh_adj = -0.3 * pitch
            
            control.append(hip_adj)
            control.append(-math.pi/4 + thigh_adj)
            control.append(math.pi/2)
        
        set_control(control)
        return abs(roll) + abs(pitch)
    
    return 0`}
              </pre>
            </div>

            <div className="doc-card">
              <h3>Tips & Best Practices</h3>
              <ul className="tips-list">
                <li><strong>Always check actuator limits:</strong> Use get_actuator_ranges() to ensure safe control values</li>
                <li><strong>Smooth trajectories:</strong> Use interpolation for smooth motions instead of sudden jumps</li>
                <li><strong>Monitor state:</strong> Regular check qpos/qvel to detect falls or unstable states</li>
                <li><strong>Use PD control:</strong> For precise position tracking, implement PD or PID controllers</li>
                <li><strong>Test incrementally:</strong> Start with small movements and gradually increase amplitude</li>
                <li><strong>Save working positions:</strong> Store known-good configurations for recovery</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}