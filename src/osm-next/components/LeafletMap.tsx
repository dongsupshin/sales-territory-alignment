'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 마커 아이콘 설정 (Next 환경에서 기본 아이콘이 안 뜨는 문제 방지)
const defaultIcon = L.icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

const center: LatLngExpression = [37.5665, 126.9780]; // 서울 시청 근처

// GeoJSON 데이터 타입 (간단하게 any로 둬도 OK)
type GeoJsonData = any;

export default function LeafletMap() {
  const [geoData, setGeoData] = useState<GeoJsonData | null>(null);

  // 컴포넌트 마운트 시 GeoJSON 로드
  useEffect(() => {
    fetch('/data/sido_geojson.geojson')
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => {
        console.error('GeoJSON 로드 오류:', err);
      });
  }, []);

  // 시도 경계 스타일
  const polygonStyle = {
    color: '#3388ff', // 테두리 색
    weight: 2,
    fillColor: '#3388ff',
    fillOpacity: 0.1,
  };

  // 각 피처에 마우스 이벤트나 팝업 붙이고 싶을 때
  const onEachFeature = (feature: any, layer: L.Layer) => {
    const props = feature.properties || {};
    const name =
      props.CTP_KOR_NM || props.name || props.NAME_KO || '이름 없음'; // 속성명은 실제 ctp_rvn 속성 보고 맞추면 됨

    if (layer instanceof L.Path) {
      layer.bindPopup(`<b>${name}</b>`);
    }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={center}
        zoom={7}
        style={{ height: '500px', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* 서울 위치 마커 (원하면 유지/삭제 */}
        <Marker position={center}>
          <Popup>
            여기가 <b>서울</b> 입니다!
          </Popup>
        </Marker>

        {/* GeoJSON이 로드되면 시도 경계 표시 */}
        {geoData && (
          <GeoJSON
            data={geoData}
            style={() => polygonStyle}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>
    </div>
  );
}
