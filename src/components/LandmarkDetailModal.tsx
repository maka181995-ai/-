import React, { useState, useEffect } from 'react';
import { Landmark } from '../types/chronicle';
import { LandmarkIllustration } from './LandmarkIllustration';
import {
  X,
  Volume2,
  VolumeX,
  Play,
  Square,
  Sparkles,
  BookOpen,
  Settings,
  Archive,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Quote,
  CheckCircle2,
  Calendar,
  Award,
  Mic,
  QrCode,
  Image as ImageIcon,
} from 'lucide-react';
import { soundscape } from '../utils/audioSynth';
import { QRCodeDisplay } from './QRCodeDisplay';

interface LandmarkDetailModalProps {
  landmark: Landmark | null;
  onClose: () => void;
  landmarks: Landmark[];
  onNavigate: (landmark: Landmark) => void;
  lang: 'kk' | 'ru' | 'en';
}

export const LandmarkDetailModal: React.FC<LandmarkDetailModalProps> = ({
  landmark,
  onClose,
  landmarks,
  onNavigate,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'specs' | 'artifacts' | 'location' | 'qrcode'>('history');
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'photo' | 'illustration'>('photo');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Reset states on landmark change
  useEffect(() => {
    setActiveTab('history');
    if (landmark) {
      setIsPlayingSound(soundscape.isPlaying(landmark.soundType));
      setViewMode(landmark.photoUrl ? 'photo' : 'illustration');
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, [landmark]);

  if (!landmark) return null;

  const currentIndex = landmarks.findIndex((l) => l.id === landmark.id);
  const prevLandmark = landmarks[(currentIndex - 1 + landmarks.length) % landmarks.length];
  const nextLandmark = landmarks[(currentIndex + 1) % landmarks.length];

  const handleToggleSound = () => {
    if (isPlayingSound) {
      soundscape.stopSound();
      setIsPlayingSound(false);
    } else {
      soundscape.playSound(landmark.soundType);
      setIsPlayingSound(true);
    }
  };

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Дауыстық синтезатор бұл браузерде қолдау таппайды.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${getTitle()}. ${getSubtitle()}. ${getHistory().join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);

      // Best effort voice match
      if (lang === 'kk') {
        utterance.lang = 'kk-KZ';
      } else if (lang === 'ru') {
        utterance.lang = 'ru-RU';
      } else {
        utterance.lang = 'en-US';
      }

      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const getTitle = () => {
    if (lang === 'ru') return landmark.titleRu;
    if (lang === 'en') return landmark.titleEn;
    return landmark.titleKk;
  };

  const getSubtitle = () => {
    if (lang === 'ru') return landmark.subtitleRu;
    if (lang === 'en') return landmark.subtitleEn;
    return landmark.subtitleKk;
  };

  const getCategoryLabel = () => {
    if (lang === 'ru') return landmark.categoryLabelRu;
    if (lang === 'en') return landmark.categoryLabelEn;
    return landmark.categoryLabelKk;
  };

  const getHistory = () => {
    if (lang === 'ru') return landmark.fullHistoryRu;
    if (lang === 'en') return landmark.fullHistoryEn;
    return landmark.fullHistoryKk;
  };

  const getKeyFacts = () => {
    if (lang === 'ru') return landmark.keyFactsRu;
    if (lang === 'en') return landmark.keyFactsEn;
    return landmark.keyFactsKk;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Top Header Banner with Visual Illustration or Photo */}
        <div className="relative h-64 sm:h-72 shrink-0 overflow-hidden bg-slate-950">
          {viewMode === 'photo' && landmark.photoUrl ? (
            <img
              src={landmark.photoUrl}
              alt={getTitle()}
              className="w-full h-full object-cover transition-opacity duration-300"
              referrerPolicy="no-referrer"
            />
          ) : (
            <LandmarkIllustration landmarkId={landmark.id} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

          {/* Photo / Schematic toggle */}
          {landmark.photoUrl && (
            <div className="absolute top-4 right-16 z-20 flex bg-black/70 backdrop-blur-md rounded-xl p-0.5 border border-slate-700/80 text-[11px] font-bold shadow-lg">
              <button
                onClick={() => setViewMode('photo')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  viewMode === 'photo' ? 'bg-amber-500 text-black shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3 h-3" />
                <span>Фото</span>
              </button>
              <button
                onClick={() => setViewMode('illustration')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  viewMode === 'illustration' ? 'bg-amber-500 text-black shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                Сызба
              </button>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={() => {
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              soundscape.stopSound();
              onClose();
            }}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-amber-500 text-slate-300 hover:text-black border border-slate-700/80 transition-all shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Landmark badges */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-amber-500 text-black font-extrabold flex items-center justify-center text-sm shadow-xl">
              {landmark.number < 10 ? `0${landmark.number}` : landmark.number}
            </span>
            <span className="px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md text-amber-400 font-bold text-xs border border-amber-500/40">
              {getCategoryLabel()}
            </span>
            {landmark.badge && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md text-amber-300 font-extrabold text-[11px] border border-amber-400/50">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                {landmark.badge}
              </span>
            )}
          </div>

          {/* Title & Subtitle within Banner Bottom */}
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{landmark.yearEstablished} жыл</span>
              <span>•</span>
              <MapPin className="w-3.5 h-3.5" />
              <span className="truncate">{lang === 'ru' ? landmark.addressRu : landmark.addressKk}</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
              {getTitle()}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1 drop-shadow">
              {getSubtitle()}
            </p>
          </div>
        </div>

        {/* Audio Atmosphere & Voice Narration Toolbar */}
        <div className="px-6 py-3 bg-slate-950/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          {/* Soundscape generator */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSound}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow ${
                isPlayingSound
                  ? 'bg-amber-500 text-black animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700'
              }`}
            >
              {isPlayingSound ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isPlayingSound ? 'Дыбысты тоқтату' : 'Дыбыстық атмосфера'}</span>
            </button>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              {landmark.soundLabelKk}
            </span>
          </div>

          {/* Text-to-speech reader */}
          <button
            onClick={handleToggleSpeech}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isSpeaking
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>{isSpeaking ? 'Оқуды тоқтату' : 'Дауыстық гид (тыңдау)'}</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/90 px-6 overflow-x-auto scrollbar-none">
          {[
            { id: 'history', labelKk: 'Шежірелік тарихы', labelRu: 'История', labelEn: 'History', icon: BookOpen },
            { id: 'specs', labelKk: 'Сипаттама & Рекордтар', labelRu: 'Характеристики', labelEn: 'Specifications', icon: Settings },
            { id: 'artifacts', labelKk: 'Мұрағат жәдігерлері', labelRu: 'Экспонаты', labelEn: 'Artifacts', icon: Archive },
            { id: 'location', labelKk: 'Карта мен Бағыт', labelRu: 'Локация', labelEn: 'Location', icon: MapPin },
            { id: 'qrcode', labelKk: 'QR-код & Мобильді гид', labelRu: 'QR-код', labelEn: 'QR Code', icon: QrCode },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{lang === 'ru' ? tab.labelRu : lang === 'en' ? tab.labelEn : tab.labelKk}</span>
              </button>
            );
          })}
        </div>


        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-200">
          {/* TAB 1: HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Key Facts Quick Grid */}
              <div className="bg-slate-950/60 rounded-2xl p-4 sm:p-5 border border-slate-800">
                <h4 className="text-xs uppercase tracking-wider text-amber-500 font-bold mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  {lang === 'kk' ? 'Басты тарихи айғақтар' : lang === 'ru' ? 'Ключевые исторические факты' : 'Key Historical Facts'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {getKeyFacts().map((fact, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{fact}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Narrative */}
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-300">
                {getHistory().map((p, idx) => (
                  <p key={idx} className="text-justify font-normal">
                    {p}
                  </p>
                ))}
              </div>

              {/* Quotes if available */}
              {landmark.historicalQuotes && landmark.historicalQuotes.length > 0 && (
                <div className="mt-6 space-y-3">
                  {landmark.historicalQuotes.map((q, idx) => (
                    <div key={idx} className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-xl">
                      <div className="flex items-start gap-2">
                        <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                        <div>
                          <p className="italic text-sm sm:text-base text-amber-100 font-serif">
                            {q.text}
                          </p>
                          <div className="mt-2 text-xs font-bold text-amber-400">
                            {q.author} — <span className="font-normal text-slate-300">{q.role}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SPECS & RECORDS */}
          {activeTab === 'specs' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {landmark.specifications.map((spec, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      spec.highlight
                        ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/5'
                        : 'bg-slate-950/60 border-slate-800'
                    }`}
                  >
                    <div className="text-xs text-slate-400 font-medium">{spec.label}</div>
                    <div className={`text-lg sm:text-xl font-extrabold mt-1 ${spec.highlight ? 'text-amber-400' : 'text-white'}`}>
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Technical description block */}
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-amber-500" />
                  {lang === 'kk' ? 'Инженерлік және тарихи маңызы' : lang === 'ru' ? 'Инженерное и историческое значение' : 'Engineering & Historic Significance'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {lang === 'kk'
                    ? `${landmark.titleKk} — тек Қазақстанның ғана емес, бүкіл Еуразия кеңістігінің индустриялық шежіресіне алтын әріптермен жазылған бірегей нысан. Оның қуаты мен тарихи рөлі ел тәуелсіздігі мен халық игілігінің негізі болып қала береді.`
                    : `${landmark.titleRu} — уникальный объект промышленной летописи Евразии, служащий опорой энергетики и исторической гордостью региона.`}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: ARTIFACTS */}
          {activeTab === 'artifacts' && (
            <div className="space-y-4 animate-in fade-in">
              <p className="text-xs text-slate-400">
                {lang === 'kk'
                  ? 'Екібастұз тарих және өлкетану мұражайы мен кәсіпорын қорларында сақталған бірегей жәдігерлер:'
                  : 'Уникальные артефакты, хранящиеся в фондах музеев и архивах предприятий:'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {landmark.artifacts.map((art) => (
                  <div key={art.id} className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-1">
                        <span>{art.category}</span>
                        <span className="text-slate-400">{art.year}</span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1">{art.name}</h4>
                      <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                        {art.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-amber-300/80 font-medium">
                      ✨ {art.significance}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: LOCATION */}
          {activeTab === 'location' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-slate-400 font-semibold">{lang === 'kk' ? 'Мекенжайы' : 'Адрес'}:</div>
                    <div className="text-sm font-bold text-white mt-1">
                      {lang === 'ru' ? landmark.addressRu : landmark.addressKk}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-semibold">{lang === 'kk' ? 'Географиялық координаттары' : 'Географические координаты'}:</div>
                    <div className="text-sm font-mono text-amber-400 mt-1">
                      {landmark.coordinates.lat}° N, {landmark.coordinates.lng}° E
                    </div>
                  </div>
                </div>
              </div>

              {/* Schematic mini view */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 h-64 bg-slate-950 flex items-center justify-center">
                <LandmarkIllustration landmarkId={landmark.id} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-xl animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="mt-2 text-sm font-extrabold text-white">{getTitle()}</div>
                  <div className="text-xs text-amber-300 font-mono mt-0.5">
                    {landmark.coordinates.lat}, {landmark.coordinates.lng}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: QR CODE */}
          {activeTab === 'qrcode' && (
            <div className="space-y-4 animate-in fade-in flex flex-col items-center">
              <QRCodeDisplay
                url={typeof window !== 'undefined' ? `${window.location.href.split('#')[0]}#landmark-${landmark.id}` : undefined}
                title={`№ ${landmark.number} • ${getTitle()}`}
                subtitle={lang === 'kk' ? 'Смартфоннан осы нысанның шежіресін тікелей ашу үшін сканерлеңіз' : 'Отсканируйте для прямого перехода к экспозиции'}
                size={220}
              />
            </div>
          )}
        </div>

        {/* Modal Bottom Pagination Navigator */}
        <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => onNavigate(prevLandmark)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">
              № {prevLandmark.number}: {lang === 'ru' ? prevLandmark.titleRu : prevLandmark.titleKk}
            </span>
            <span className="sm:hidden">Алдыңғы</span>
          </button>

          <span className="text-xs font-bold text-amber-500">
            {landmark.number} / {landmarks.length}
          </span>

          <button
            onClick={() => onNavigate(nextLandmark)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            <span className="hidden sm:inline">
              № {nextLandmark.number}: {lang === 'ru' ? nextLandmark.titleRu : nextLandmark.titleKk}
            </span>
            <span className="sm:hidden">Келесі</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
