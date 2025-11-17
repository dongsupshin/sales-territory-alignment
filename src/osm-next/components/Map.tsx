'use client';

import dynamic from 'next/dynamic';

// LeafletMap을 브라우저에서만 동적 로딩 (ssr: false)
const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => <p>지도를 불러오는 중입니다...</p>,
});

export default function Map() {
  return <LeafletMap />;
}
