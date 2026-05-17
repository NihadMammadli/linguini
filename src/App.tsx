import { Outlet } from 'react-router-dom';
import { ProfileProvider } from '@/hooks/useProfile';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { UsernameGate } from '@/components/UsernameGate';
import { ScrollManager } from '@/components/ScrollManager';

export function App() {
  return (
    <ProfileProvider>
      <ScrollManager />
      <Navbar />
      <div className="app-main">
        <Outlet />
      </div>
      <Footer />
      <UsernameGate />
    </ProfileProvider>
  );
}
