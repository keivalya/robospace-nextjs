import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'RoboSpace - Robot Simulation Platform',
  description: 'Simulate and train robots in your browser. No setup, no GPUs, no Docker.',
  icons: {
    icon: './robospace.ico',
    shortcut: './robospace.ico',
    apple: './robospace.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/robospace.ico" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}