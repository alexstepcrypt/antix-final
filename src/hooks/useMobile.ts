import { useState, useRef, useCallback, useEffect } from 'react';

function debounce<T extends (...args: any) => void> (callback: T, ms: number) {
   const timer = useRef<any>(null);

   return useCallback((...args: any[]) => {
      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(() => callback(...args), ms);
   }, [callback, ms]);
}

export const useMobile = (breakpoint: number) => {
   const [width, setWidth] = useState(innerWidth);

   const _debounce = debounce(() => setWidth(innerWidth), 150);

   useEffect(() => {
      window.addEventListener('resize', _debounce);

      return () => { window.removeEventListener('resize', _debounce) }
   }, []);

   return width <= breakpoint;
}