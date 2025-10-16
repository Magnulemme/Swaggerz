'use client'

import GridContent from './GridContent';

/**
 * Wrapper per GridContent - rendering diretto senza Suspense
 */
export default function GridContentWrapper() {
  return <GridContent />;
}
