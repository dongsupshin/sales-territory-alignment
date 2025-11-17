// app/layout.tsx
import 'leaflet/dist/leaflet.css';
import './globals.css';

import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'OSM with Next.js',
  description: 'Simple OpenStreetMap example in Next.js',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
