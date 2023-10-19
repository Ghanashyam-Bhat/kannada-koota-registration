import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

function QRScanner() {
  const [result, setResult] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  }

  const handleError = (error) => {
    console.error(error);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
  <h1>QR Code Scanner</h1>
  <div style={{ width: '200px',height:'200px' }}>
    <QrReader
      delay={300}
      onError={handleError}
      onScan={handleScan}
      style={{width:'100%'}}
    />
  </div>

  {result && <p>Scanned QR Code: {result}</p>}
</div>

  );
}

export default QRScanner;
