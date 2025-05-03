'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

const ThemeProviderConainer =({ children }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch

  return <ThemeProvider attribute="data-theme">{children}</ThemeProvider>;
}

export default ThemeProviderConainer
