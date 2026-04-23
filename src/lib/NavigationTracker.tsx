import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
//import { useAuth } from './AuthContext';
//import { base44 } from '@/api/base44Client';
import { pagesConfig } from '../pages.config';

interface PagesConfig {
  Pages: Record<string, any>; // Adjust `any` to the actual page type if known
  mainPage?: string;
}

export default function NavigationTracker(): null {
  const location = useLocation();
 // const { isAuthenticated } = useAuth();
  const { Pages, mainPage } = pagesConfig as PagesConfig;
  const mainPageKey = mainPage ?? Object.keys(Pages)[0];

  useEffect(() => {
    const pathname = location.pathname;
    let pageName: string | null = null;

    if (pathname === '/' || pathname === '') {
      pageName = mainPageKey;
    } else {
      const pathSegment = pathname.replace(/^\//, '').split('/')[0];

      const pageKeys = Object.keys(Pages);
      const matchedKey = pageKeys.find(
        key => key.toLowerCase() === pathSegment.toLowerCase()
      );

      pageName = matchedKey || null;
    }

    
  }, [location,  Pages, mainPageKey]);

  return null;
}