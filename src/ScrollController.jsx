import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollRestoration } from 'react-router-dom';

// This single component handles ALL scroll logic
export default function ScrollController() {
  const { pathname } = useLocation();

  // Reset scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Optional: Advanced scroll restoration for browser navigation
  return <ScrollRestoration getKey={(location) => location.pathname} />;
}