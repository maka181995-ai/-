import React, { useState } from 'react';
import { Landmark } from '../types/chronicle';
import { QRCodeDisplay } from './QRCodeDisplay';
import { X, QrCode, Smartphone, Printer, ExternalLink, Share2 } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  landmarks: Landmark[];
  initialLandmarkId?: string;
  lang: 'kk' | 'ru' | 'en';
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  landmarks,
  initialLandmarkId,
  lang,
}) => {
  const [selectedTarget, setSelectedTarget] = useState<string>(initialLandmarkId || 'main');

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ekibastuz-chronicle.kz';
  const baseUrl = currentUrl.split('#')[0];

  const targetLandmark = landmarks.find((l) => l.id === selectedTarget);
  const targetUrl = selectedTarget === 'main'
    ? baseUrl
    : `${baseUrl}#landmark-${selectedTarget}`;

  const title = selectedTarget === 'main'
    ? (lang === 'kk' ? 'Екібастұздың цифрлық шежіресі' : 'Цифровая летопись Экибастуза')
    : targetLandmark
    ? `${targetLandmark.number}. ${lang === 'ru' ? targetLandmark.titleRu : targetLandmark.titleKk}`
    : 'QR Code';

  const subtitle = selectedTarget === 'main'
    ? (lang === 'kk' ? 'Смартфоннан шежірені ашу үшін сканерлеңіз' : 'Отсканируйте камерой смартфона для перехода')
    : (lang === 'kk' ? 'Осы нысанның толық тарихын тікелей телефоннан оқыңыз' : 'Прямой доступ к экспозиции объекта');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-3xl p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-white font-extrabold text-lg">
            <QrCode className="w-5 h-5 text-amber-500" />
            <span>{lang === 'kk' ? 'QR код және мобильді гид' : 'QR-код и мобильный гид'}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-amber-500 text-slate-300 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selection Dropdown */}
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
            {lang === 'kk' ? 'QR код бағытын таңдаңыз:' : 'Выберите объект для генерации QR:'}
          </label>
          <select
            value={selectedTarget}
            onChange={(e) => setSelectedTarget(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
          >
            <option value="main">
              ⭐ {lang === 'kk' ? 'Басты портал (Барлық 10 нысан)' : 'Главный портал (Все 10 объектов)'}
            </option>
            {landmarks.map((l) => (
              <option key={l.id} value={l.id}>
                № {l.number}: {lang === 'ru' ? l.titleRu : l.titleKk}
              </option>
            ))}
          </select>
        </div>

        {/* The QR Code View */}
        <QRCodeDisplay
          url={targetUrl}
          title={title}
          subtitle={subtitle}
          size={190}
        />

        {/* Instruction Footer */}
        <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 flex items-start gap-3 text-xs text-slate-400">
          <Smartphone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-200">
              {lang === 'kk' ? 'Қалай қолдануға болады?' : 'Как использовать?'}
            </span>
            <p className="mt-0.5 leading-relaxed">
              {lang === 'kk'
                ? 'Телефоныңыздың камерасын немесе кез келген QR-сканер қосымшасын бағыттаңыз. Мұражай мен қалалық гид сіздің экраныңызда лезде ашылады.'
                : 'Наведите камеру смартфона на QR-код для мгновенного доступа к материалам и аудиогиду.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
