/*
  This file can be added in the hook folder 
  This file is here because it is used in the ConfigurationSelector component.

*/

import { useState, useEffect } from 'react';

export type ScreenSize = 'mobile' | 'tablet' | 'desktop';

export function useScreenSize(): ScreenSize {
  const getSize = (): ScreenSize => {
    const width = window.innerWidth;
    if (width < 1024) return 'mobile';
    if (width < 1280) return 'tablet';
    return 'desktop';
  };

  const [screenSize, setScreenSize] = useState<ScreenSize>(() =>
    typeof window !== 'undefined' ? getSize() : 'desktop'
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getSize());
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
}
