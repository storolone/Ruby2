'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { cmsConfigured, readMedia, type Media } from './client';
const MediaContext = createContext<Media[]>([]);
export const useMedia = () => useContext(MediaContext);
export function MediaProvider({children}: {children: React.ReactNode}) {
  const [media, setMedia] = useState<Media[]>([]);
  useEffect(() => {
    if (!cmsConfigured) return;
    const controller = new AbortController();
    let pending = false;
    const refresh = async () => {
      if (pending || document.hidden) return;
      pending = true;
      try { const rows = await readMedia(controller.signal); if (!controller.signal.aborted) setMedia(rows); }
      catch { /* Keep the last successful gallery during a connection failure. */ }
      finally { pending = false; }
    };
    void refresh();
    const timer = window.setInterval(refresh, 30000);
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', refresh);
    return () => { controller.abort(); clearInterval(timer); window.removeEventListener('focus', refresh); document.removeEventListener('visibilitychange', refresh); };
  }, []);
  return <MediaContext.Provider value={media}>{children}</MediaContext.Provider>;
}
