import React, { useState } from 'react';
import { Landmark } from '../types/chronicle';
import { LandmarkIllustration } from './LandmarkIllustration';
import { MapPin, Navigation, Compass, Play, Pause, ChevronRight, Eye, Volume2 } from 'lucide-react';
import { soundscape } from '../utils/audioSynth';

interface InteractiveMapProps {
  landmarks: Landmark[];
  selectedLandmark: Landmark | null;
  onSelectLandmark: (landmark: Landmark) => void;
  lang: 'kk' | 'ru' | 'en';
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  landmarks,
  selectedLandmark,
  onSelectLandmark,
  lang,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredLandmark, setHoveredLandmark] = useState<Landmark | null>(null);
  const [isTourRunning, setIsTourRunning] = useState<boolean>(false);
  const [tourIndex, setTourIndex] = useState<number>(0);

  // Filtered landmarks
  const filtered = activeCategory === 'all'
    ? landmarks
    : landmarks.filter((l) => {
        if (activeCategory === 'industry') return l.category === 'industry' || l.category === 'power';
        if (activeCategory === 'culture') return l.category === 'culture' || l.category === 'personality';
        if (activeCategory === 'heritage') return l.category === 'heritage' || l.category === 'museum' || l.category === 'memorial';
        if (activeCategory === 'nature_transport') return l.category === 'park' || l.category === 'transport';
        return true;
      });

  // Tour mode step
  const handleNextTourStep = () => {
    const nextIdx = (tourIndex + 1) % landmarks.length;
    setTourIndex(nextIdx);
    onSelectLandmark(landmarks[nextIdx]);
    soundscape.playSound(landmarks[nextIdx].soundType);
  };

  const toggleTour = () => {
    if (!isTourRunning) {
      setIsTourRunning(true);
      onSelectLandmark(landmarks[tourIndex]);
      soundscape.playSound(landmarks[tourIndex].soundType);
    } else {
      setIsTourRunning(false);
      soundscape.stopSound();
    }
  };

  const getTitle = (l: Landmark) => {
    if (lang === 'ru') return l.titleRu;
    if (lang === 'en') return l.titleEn;
    return l.titleKk;
  };

  const getSubtitle = (l: Landmark) => {
    if (lang === 'ru') return l.subtitleRu;
    if (lang === 'en') return l.subtitleEn;
    return l.subtitleKk;
  };

  const getCategoryLabel = (l: Landmark) => {
    if (lang === 'ru') return l.categoryLabelRu;
    if (lang === 'en') return l.categoryLabelEn;
    return l.categoryLabelKk;
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-4 md:p-6 shadow-2xl relative overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-semibold text-xs tracking-wider uppercase mb-1">
            <Compass className="w-4 h-4 animate-spin-slow" />
            {lang === 'kk' ? 'Кеңістіктік интерактивті карта' : lang === 'ru' ? 'Пространственная интерактивная карта' : 'Spatial Interactive Map'}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            {lang === 'kk' ? 'Екібастұз тарихи-географиялық картасы' : lang === 'ru' ? 'Историко-географическая карта Экибастуза' : 'Historical & Regional Map of Ekibastuz'}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {lang === 'kk'
              ? 'Қаланың 10 басты тарихи және өндірістік нысандарының орналасуы, арақашықтығы мен өзара байланысы.'
              : lang === 'ru'
              ? 'Расположение, расстояния и взаимосвязь 10 ключевых исторических и промышленных объектов города.'
              : 'Spatial distribution and historical connectivity of all 10 key landmarks across the basin.'}
          </p>
        </div>

        {/* Guided Tour Trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTour}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg ${
              isTourRunning
                ? 'bg-amber-500 text-black hover:bg-amber-400 animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30'
            }`}
          >
            {isTourRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-amber-400" />}
            {lang === 'kk'
              ? isTourRunning ? 'Экскурсияны тоқтату' : '10 нысан бойынша экспресс-тур'
              : lang === 'ru'
              ? isTourRunning ? 'Приостановить тур' : 'Экспресс-тур по 10 объектам'
              : isTourRunning ? 'Pause Tour' : 'Express Guided Tour'}
          </button>
          {isTourRunning && (
            <button
              onClick={handleNextTourStep}
              className="p-2 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-black border border-amber-500/40 transition-colors"
              title="Келесі нысан"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { id: 'all', labelKk: 'Барлық 10 нысан', labelRu: 'Все 10 объектов', labelEn: 'All 10 Sites' },
          { id: 'industry', labelKk: 'Өндіріс пен Энергетика', labelRu: 'Промышленность и Энергия', labelEn: 'Industry & Power' },
          { id: 'culture', labelKk: 'Мәдениет пен Тұлғалар', labelRu: 'Культура и Личности', labelEn: 'Culture & Personalities' },
          { id: 'heritage', labelKk: 'Мұражай, Сәулет, Даңқ', labelRu: 'Музей, Архитектура, Слава', labelEn: 'Museum & Heritage' },
          { id: 'nature_transport', labelKk: 'Саябақ пен Теміржол', labelRu: 'Парк и Магистраль', labelEn: 'Park & Railway' },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setActiveCategory(btn.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeCategory === btn.id
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
            }`}
          >
            {lang === 'ru' ? btn.labelRu : lang === 'en' ? btn.labelEn : btn.labelKk}
          </button>
        ))}
      </div>

      {/* The SVG Map Canvas */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-gradient-to-b from-slate-950 via-slate-900 to-[#0b101b] rounded-xl border border-slate-800 overflow-hidden shadow-inner group">
        <svg
          viewBox="0 0 1000 620"
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5" strokeOpacity="0.25" />
            </pattern>
            <radialGradient id="coalGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="gresGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </radialGradient>
            <filter id="pinShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Coordinate Grid Background */}
          <rect width="1000" height="620" fill="url(#mapGrid)" />

          {/* Steppe Geographic Zones */}
          {/* Salt lakes (historical origin of Ekibastuz) */}
          <path
            d="M 120,400 Q 180,360 250,410 Q 230,470 160,460 Z"
            fill="#0369a1"
            fillOpacity="0.25"
            stroke="#0ea5e9"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text x="140" y="435" fill="#38bdf8" fontSize="11" fontStyle="italic" opacity="0.7">
            Жарықсор / Тұзды көл (1886)
          </text>

          {/* Lake Zhyngyldy & cooling reservoirs north */}
          <ellipse cx="680" cy="120" rx="110" ry="45" fill="#082f49" fillOpacity="0.35" stroke="#0284c7" strokeWidth="1.5" />
          <text x="630" y="125" fill="#38bdf8" fontSize="12" fontStyle="italic" opacity="0.8">
            Шыңғыс су қоймасы
          </text>

          {/* Bogatyr Coal Basin (Vast Open Pit excavation polygon) */}
          <ellipse cx="720" cy="430" rx="140" ry="85" fill="url(#coalGlow)" />
          <path
            d="M 600,420 Q 640,360 760,370 Q 860,400 840,480 Q 770,520 630,480 Z"
            fill="#1c1917"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          {/* Terrace steps inside coal basin */}
          <path d="M 630,420 Q 680,385 750,395 Q 820,415 800,465 Q 740,490 650,465 Z" fill="#292524" opacity="0.6" />
          <path d="M 660,425 Q 700,405 745,410 Q 780,430 765,455 Q 720,470 670,455 Z" fill="#0c0a09" opacity="0.8" />
          <text x="660" y="440" fill="#fbbf24" fontSize="13" fontWeight="bold">
            «БОҒАТЫРЬ» КӨМІР КЕНІШІ
          </text>
          <text x="685" y="458" fill="#cbd5e1" fontSize="10">
            50 млн т/жыл
          </text>

          {/* Historic 1899 Railway Line to Irtysh (North-East trajectory) */}
          <path
            d="M 520,240 Q 650,200 820,130 L 980,60"
            fill="none"
            stroke="#eab308"
            strokeWidth="3.5"
            strokeDasharray="8 6"
          />
          <text x="760" y="115" fill="#facc15" fontSize="11" fontWeight="bold" transform="rotate(-18 760 115)">
            1899 ж. Екібастұз — Воскресенка (116 км)
          </text>

          {/* Modern Railway Corridor West-East */}
          <line x1="50" y1="240" x2="520" y2="240" stroke="#64748b" strokeWidth="2.5" strokeDasharray="5 5" />
          <text x="80" y="230" fill="#94a3b8" fontSize="10">
            Басты теміржол магистралі
          </text>

          {/* GRES Energy Hub northern area */}
          <ellipse cx="500" cy="110" rx="110" ry="60" fill="url(#gresGlow)" />
          <rect x="420" y="85" width="70" height="40" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" rx="3" />
          <text x="430" y="110" fill="#7dd3fc" fontSize="11" fontWeight="bold">
            ГРЭС-1 (4000 МВт)
          </text>

          {/* 419.7m Chimney Graphic on Map */}
          <line x1="560" y1="120" x2="560" y2="40" stroke="#ef4444" strokeWidth="4" />
          <circle cx="560" cy="40" r="4" fill="#ef4444" className="animate-ping" />
          <circle cx="560" cy="40" r="3" fill="#ffffff" />
          <text x="570" y="55" fill="#f87171" fontSize="11" fontWeight="bold">
            ГРЭС-2 мұржасы (419,7 м)
          </text>

          {/* City Urban Center Boundary */}
          <rect x="360" y="240" width="220" height="190" fill="#1e293b" fillOpacity="0.45" stroke="#475569" strokeWidth="1.5" rx="12" />
          <text x="375" y="260" fill="#94a3b8" fontSize="11" fontWeight="bold" letterSpacing="1">
            ЕКІБАСТҰЗ ҚАЛАСЫ (ОРТАЛЫҚ)
          </text>

          {/* Main City Streets */}
          <line x1="380" y1="310" x2="560" y2="310" stroke="#475569" strokeWidth="2" opacity="0.6" />
          <text x="390" y="305" fill="#64748b" fontSize="8">Мәшһүр Жүсіп көшесі</text>
          <line x1="380" y1="360" x2="560" y2="360" stroke="#475569" strokeWidth="2" opacity="0.6" />
          <text x="390" y="355" fill="#64748b" fontSize="8">Мұхтар Әуезов көшесі</text>
          <line x1="470" y1="270" x2="470" y2="410" stroke="#475569" strokeWidth="2" opacity="0.6" />
          <text x="475" y="405" fill="#64748b" fontSize="8">Қонаев даңғылы</text>

          {/* Connecting Heritage Tour Route Lines */}
          <path
            d="M 720,410 L 510,110 L 460,295 L 490,325 L 440,315 L 485,275 L 475,285 L 450,320 L 420,355 L 535,235"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeOpacity="0.5"
          />

          {/* 10 Landmark Interactive Map Pins */}
          {landmarks.map((l) => {
            const isSelected = selectedLandmark?.id === l.id;
            const isHovered = hoveredLandmark?.id === l.id;
            const isVisible = filtered.some((f) => f.id === l.id);

            // Translate percentage to SVG 1000x620
            const cx = (l.coordinates.mapX / 100) * 1000;
            const cy = (l.coordinates.mapY / 100) * 620;

            if (!isVisible) return null;

            return (
              <g
                key={l.id}
                className="cursor-pointer transition-transform duration-300"
                onClick={() => {
                  onSelectLandmark(l);
                  soundscape.playSound(l.soundType);
                }}
                onMouseEnter={() => setHoveredLandmark(l)}
                onMouseLeave={() => setHoveredLandmark(null)}
                filter="url(#pinShadow)"
              >
                {/* Active radar ping */}
                {(isSelected || isHovered) && (
                  <circle cx={cx} cy={cy} r="26" fill="none" stroke="#f59e0b" strokeWidth="2" className="animate-ping" opacity="0.75" />
                )}

                {/* Outer badge circle */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 18 : 14}
                  fill={isSelected ? '#f59e0b' : '#0f172a'}
                  stroke={isSelected ? '#ffffff' : '#f59e0b'}
                  strokeWidth={isSelected ? 3 : 2}
                  className="transition-all duration-200"
                />

                {/* Number inside pin */}
                <text
                  x={cx}
                  y={cy + 5}
                  textAnchor="middle"
                  fill={isSelected ? '#000000' : '#ffffff'}
                  fontSize={isSelected ? '12' : '10'}
                  fontWeight="bold"
                >
                  {l.number}
                </text>

                {/* Floating label on map */}
                <g transform={`translate(${cx}, ${cy - (isSelected ? 24 : 20)})`}>
                  <rect
                    x={-55}
                    y={-18}
                    width={110}
                    height={18}
                    rx={4}
                    fill="#0f172a"
                    fillOpacity="0.9"
                    stroke={isSelected ? '#f59e0b' : '#334155'}
                    strokeWidth="1"
                  />
                  <text
                    x={0}
                    y={-5}
                    textAnchor="middle"
                    fill={isSelected ? '#fbbf24' : '#e2e8f0'}
                    fontSize="9"
                    fontWeight="bold"
                  >
                    {getTitle(l).length > 18 ? `${getTitle(l).slice(0, 16)}…` : getTitle(l)}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Compass Rose in top-right */}
          <g transform="translate(930, 70)">
            <circle cx="0" cy="0" r="28" fill="#0f172a" fillOpacity="0.8" stroke="#334155" strokeWidth="1.5" />
            <polygon points="0,-22 5,-4 0,0 -5,-4" fill="#ef4444" />
            <polygon points="0,22 5,4 0,0 -5,4" fill="#94a3b8" />
            <text x="-4" y="-24" fill="#ef4444" fontSize="10" fontWeight="bold">N</text>
            <text x="-4" y="32" fill="#94a3b8" fontSize="9">S</text>
            <text x="25" y="3" fill="#94a3b8" fontSize="9">E</text>
            <text x="-32" y="3" fill="#94a3b8" fontSize="9">W</text>
          </g>

          {/* Map Scale indicator */}
          <g transform="translate(80, 580)">
            <line x1="0" y1="0" x2="100" y2="0" stroke="#cbd5e1" strokeWidth="3" />
            <line x1="0" y1="-5" x2="0" y2="5" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="50" y1="-3" x2="50" y2="3" stroke="#cbd5e1" strokeWidth="1.5" />
            <line x1="100" y1="-5" x2="100" y2="5" stroke="#cbd5e1" strokeWidth="2" />
            <text x="0" y="-8" fill="#94a3b8" fontSize="9">0</text>
            <text x="42" y="-8" fill="#94a3b8" fontSize="9">10 км</text>
            <text x="90" y="-8" fill="#94a3b8" fontSize="9">20 км</text>
            <text x="120" y="3" fill="#64748b" fontSize="9">Масштаб</text>
          </g>
        </svg>

        {/* Floating Quick Preview Card when marker selected */}
        {selectedLandmark && (
          <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-md bg-slate-900/95 border border-amber-500/40 backdrop-blur-xl rounded-xl p-4 shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-slate-700 bg-slate-800">
                <LandmarkIllustration landmarkId={selectedLandmark.id} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    № {selectedLandmark.number} • {getCategoryLabel(selectedLandmark)}
                  </span>
                  <span className="text-xs text-slate-400">
                    {selectedLandmark.yearEstablished} ж.
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white truncate mt-1">
                  {getTitle(selectedLandmark)}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 mt-0.5">
                  {getSubtitle(selectedLandmark)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => soundscape.playSound(selectedLandmark.soundType)}
                className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{selectedLandmark.soundLabelKk}</span>
              </button>

              <button
                onClick={() => onSelectLandmark(selectedLandmark)}
                className="flex items-center gap-1 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-lg transition-colors shadow"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{lang === 'kk' ? 'Шежірені ашу' : lang === 'ru' ? 'Открыть летопись' : 'View Chronicle'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0"></span>
          <span>1. «Богатырь» кеніші</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-cyan-500 shrink-0"></span>
          <span>2. ГРЭС-1 & ГРЭС-2 (419,7 м)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0"></span>
          <span>3. Қ. Пішенбаев ескерткіші</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0"></span>
          <span>4. «Шахтер» мәдениет сарайы</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-purple-500 shrink-0"></span>
          <span>5. Өлкетану мұражайы</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0"></span>
          <span>6. Қала тарихы & сәулеті</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-orange-500 shrink-0"></span>
          <span>7. «Кеншілер даңқы» аллеясы</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-teal-500 shrink-0"></span>
          <span>8. Бұқар жырау кітапханасы</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-lime-500 shrink-0"></span>
          <span>9. Қалалық саябақ</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-yellow-500 shrink-0"></span>
          <span>10. 1899 ж. тұңғыш теміржол</span>
        </div>
      </div>
    </div>
  );
};
