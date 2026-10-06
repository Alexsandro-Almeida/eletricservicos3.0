'use client';

import dynamic from 'next/dynamic';
import { useSyncExternalStore } from 'react';
import { useReducedMotion } from 'framer-motion';

const ParticlesBackground = dynamic(() => import('./ParticlesBackground'), { ssr: false });
const subscribe = () => () => {};

export default function VisualEffects() {
  const reducedMotion = useReducedMotion();
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  return hydrated && !reducedMotion ? <ParticlesBackground /> : null;
}
