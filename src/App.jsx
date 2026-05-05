import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Link, Type, Share2, Sparkles } from 'lucide-react';
import './App.css';

function App() {
  const [text, setText] = useState('https://github.com/beomkak');
  const [size, setSize] = useState(256);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fgColor, setFgColor] = useState('#0f172a');
  const qrRef = useRef();

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `qr-code-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <div className="glass-card">
        <header>
          <div className="logo">
            <Sparkles className="icon-sparkle" />
            <h1>GenQR</h1>
          </div>
          <p className="subtitle">Premium QR Code Generator</p>
        </header>

        <main className="main-content">
          <div className="input-section">
            <div className="input-group">
              <label>
                <Link size={16} /> <span>URL or Text</span>
              </label>
              <textarea 
                value={text} 
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter link or text here..."
              />
            </div>

            <div className="settings-grid">
              <div className="setting-item">
                <label>Foreground</label>
                <input 
                  type="color" 
                  value={fgColor} 
                  onChange={(e) => setFgColor(e.target.value)} 
                />
              </div>
              <div className="setting-item">
                <label>Background</label>
                <input 
                  type="color" 
                  value={bgColor} 
                  onChange={(e) => setBgColor(e.target.value)} 
                />
              </div>
            </div>
          </div>

          <div className="preview-section">
            <div className="qr-wrapper" ref={qrRef}>
              <QRCodeCanvas 
                value={text} 
                size={size}
                bgColor={bgColor}
                fgColor={fgColor}
                level="H"
                includeMargin={true}
              />
            </div>
            
            <button className="download-btn" onClick={downloadQRCode}>
              <Download size={18} />
              Download PNG
            </button>
          </div>
        </main>

        <footer>
          <p>© 2026 GenQR • Crafted with Antigravity</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
