// app/page.tsx
import Map from '../components/Map'

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <h1>Next.js + OpenStreetMap 예제</h1>
      <p>아래는 Leaflet와 OpenStreetMap을 이용한 간단한 웹 지도입니다.</p>
      <Map />
    </main>
  );
}
