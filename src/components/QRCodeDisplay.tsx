import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Download, QrCode, Smartphone, Copy, Check } from 'lucide-react';

interface QRCodeDisplayProps {
  url?: string;
  title: string;
  subtitle?: string;
  size?: number;
  showDownload?: boolean;
  showCopy?: boolean;
  className?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  url,
  title,
  subtitle,
  size = 200,
  showDownload = true,
  showCopy = true,
  className = '',
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const effectiveUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://ekibastuz-chronicle.kz');

  useEffect(() => {
    QRCode.toDataURL(effectiveUrl, {
      width: size * 2, // high DPI
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    })
      .then((data) => setQrDataUrl(data))
      .catch((err) => console.error('Failed to generate QR Code', err));
  }, [effectiveUrl, size]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `ekibastuz-qr-${title.toLowerCase().replace(/\s+/g, '-')}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(effectiveUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center flex flex-col items-center shadow-xl ${className}`}>
      {/* Title */}
      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
        <QrCode className="w-4 h-4" />
        <span>{title}</span>
      </div>

      {subtitle && (
        <p className="text-xs text-slate-400 mb-3 max-w-xs">
          {subtitle}
        </p>
      )}

      {/* QR Code Container with white border */}
      <div className="p-3 bg-white rounded-2xl shadow-lg border-2 border-amber-500/40 transition-transform hover:scale-105 duration-300">
        {qrDataUrl ? (
          <img
            src={qrDataUrl}
            alt={title}
            width={size}
            height={size}
            className="rounded-lg"
          />
        ) : (
          <div
            style={{ width: size, height: size }}
            className="flex items-center justify-center bg-slate-100 rounded-lg text-slate-400 text-xs"
          >
            QR жүктелуде...
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
        {showDownload && (
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-xl transition-all shadow"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Жүктеп алу (PNG)</span>
          </button>
        )}

        {showCopy && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Көшірілді!' : 'Сілтемені көшіру'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
