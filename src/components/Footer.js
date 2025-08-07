import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h4>Product</h4>
            <Link href="/#features">Features</Link>
            <Link href="/dashboard">Demo</Link>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <Link href="/#about">About</Link>
            <a href="mailto:team@robospace.app">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 RoboSpace. All rights reserved.</p>
          <p>Built with ❤️ for roboticists</p>
        </div>
      </div>
    </footer>
  );
}