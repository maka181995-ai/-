import React, { useState } from 'react';
import { Compass, Volume2, VolumeX, Menu, X, Globe, Sparkles, BookOpen, QrCode } from 'lucide-react';
import { soundscape } from '../utils/audioSynth';

interface NavbarProps {
  lang: 'kk' | 'ru' | 'en';
  onLangChange: (lang: 'kk' | 'ru' | 'en') => void;
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
  onOpenQrModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLangChange,
  activeSection,
  onNavigateSection,
  onOpenQrModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  const handleGlobalAudioToggle = () => {
    if (isAudioActive) {
      soundscape.stopSound();
      setIsAudioActive(false);
    } else {
      soundscape.playSound('wind');
      setIsAudioActive(true);
    }
  };

  const navItems = [
    { id: 'landmarks', labelKk: '10 Басты Мұра', labelRu: '10 Достояний', labelEn: '10 Landmarks' },
    { id: 'map', labelKk: 'Интерактивті карта', labelRu: 'Карта', labelEn: 'Map' },
    { id: 'timeline', labelKk: 'Хронология (1886-2026)', labelRu: 'Хронология', labelEn: 'Timeline' },
    { id: 'artifacts', labelKk: 'Жәдігерлер қоры', labelRu: 'Экспонаты', labelEn: 'Artifacts' },
    { id: 'quiz', labelKk: 'Викторина', labelRu: 'Викторина', labelEn: 'Quiz' },
  ];

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-black flex items-center justify-center font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <span className="text-xl">Е</span>
          </div>
          <div>
            <div className="text-sm sm:text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
              <span>ЕКІБАСТҰЗ</span>
              <span className="text-amber-400 font-semibold text-xs px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                ШЕЖІРЕ
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
              {lang === 'kk' ? 'Цифрлық тарихи платформа' : lang === 'ru' ? 'Цифровая историческая летопись' : 'Digital Historical Archive'}
            </div>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all ${
                activeSection === item.id
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              {lang === 'ru' ? item.labelRu : lang === 'en' ? item.labelEn : item.labelKk}
            </button>
          ))}
        </nav>

        {/* Right Tools (Language Switcher & Audio Toggle & QR Code) */}
        <div className="hidden sm:flex items-center gap-2">
          {/* QR Code Modal Trigger */}
          <button
            onClick={onOpenQrModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-700 hover:border-amber-500/40 hover:text-amber-400 transition-all shadow"
            title="QR-код және Мобильді гид"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-400" />
            <span>QR-код</span>
          </button>

          {/* Audio Soundscape Toggle */}
          <button
            onClick={handleGlobalAudioToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isAudioActive
                ? 'bg-amber-500 text-black border-amber-400 shadow-lg shadow-amber-500/20 animate-pulse'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-amber-500/40 hover:text-amber-400'
            }`}
            title="Дала самалы мен өндіріс дыбыстары"
          >
            {isAudioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{isAudioActive ? 'Атмосфера қосулы' : 'Атмосфера'}</span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs font-bold">
            <button
              onClick={() => onLangChange('kk')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                lang === 'kk' ? 'bg-amber-500 text-black shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              ҚАЗ
            </button>
            <button
              onClick={() => onLangChange('ru')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                lang === 'ru' ? 'bg-amber-500 text-black shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              РУС
            </button>
            <button
              onClick={() => onLangChange('en')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                lang === 'en' ? 'bg-amber-500 text-black shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              ENG
            </button>
          </div>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenQrModal}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400"
            title="QR-код"
          >
            <QrCode className="w-4 h-4 text-amber-400" />
          </button>

          <button
            onClick={handleGlobalAudioToggle}
            className={`p-2 rounded-xl border ${
              isAudioActive ? 'bg-amber-500 text-black border-amber-400' : 'bg-slate-900 text-slate-300 border-slate-800'
            }`}
          >
            {isAudioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 p-4 space-y-3 animate-in slide-in-from-top-2">
          <div className="flex justify-center gap-2 pb-3 border-b border-slate-800">
            <button
              onClick={() => onLangChange('kk')}
              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                lang === 'kk' ? 'bg-amber-500 text-black' : 'text-slate-400'
              }`}
            >
              Қазақша
            </button>
            <button
              onClick={() => onLangChange('ru')}
              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                lang === 'ru' ? 'bg-amber-500 text-black' : 'text-slate-400'
              }`}
            >
              Русский
            </button>
            <button
              onClick={() => onLangChange('en')}
              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                lang === 'en' ? 'bg-amber-500 text-black' : 'text-slate-400'
              }`}
            >
              English
            </button>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900 hover:text-amber-400 transition-colors"
              >
                {lang === 'ru' ? item.labelRu : lang === 'en' ? item.labelEn : item.labelKk}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
