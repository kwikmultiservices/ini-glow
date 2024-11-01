import React from 'react';

type MapComponentProps = {
  address: string;
};

const MapComponent: React.FC<MapComponentProps> = ({ address }) => {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <div className="w-full h-[100vh] rounded-lg overflow-hidden shadow-lg">
      
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        allowFullScreen
        src={mapSrc}
        style={{ border: 0 }}
        title="Google Map"
      ></iframe>
    
    </div>
  );
};

export default MapComponent;
