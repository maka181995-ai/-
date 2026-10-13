/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { LANDMARKS } from './data/landmarksData';
import { TIMELINE_EVENTS } from './data/timelineData';
import { QUIZ_QUESTIONS } from './data/quizData';
import { Landmark } from './types/chronicle';
import { soundscape } from './utils/audioSynth';

import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { LandmarkCard } from './components/LandmarkCard';
import { LandmarkDetailModal } from './components/LandmarkDetailModal';
import { InteractiveMap } from './components/InteractiveMap';
import { TimelineSection } from './components/TimelineSection';
import { ArtifactGallery } from './components/ArtifactGallery';
import { QuizSection } from './components/QuizSection';
import { Footer } from './components/Footer';
import { QRCodeModal } from './components/QRCodeModal';

import { Search, Sparkles, Filter, Layers, BookOpen } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'kk' | 'ru' | 'en'>('kk');
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeAudioLandmarkId, setActiveAudioLandmarkId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('landmarks');
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
  const [qrTargetLandmarkId, setQrTargetLandmarkId] = useState<string>('main');

  const landmarksRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const artifactsRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);

  // Audio Toggle for Card
  const handleToggleCardAudio = (landmark: Landmark) => {
    if (activeAudioLandmarkId === landmark.id) {
      soundscape.stopSound();
      setActiveAudioLandmarkId(null);
    } else {
      soundscape.playSound(landmark.soundType);
      setActiveAudioLandmarkId(landmark.id);
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    let targetEl: HTMLElement | null = null;
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (sectionId === 'landmarks') targetEl = landmarksRef.current;
    if (sectionId === 'map') targetEl = mapRef.current;
    if (sectionId === 'timeline') targetEl = timelineRef.current;
    if (sectionId === 'artifacts') targetEl = artifactsRef.current;
    if (sectionId === 'quiz') targetEl = quizRef.current;

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter landmarks
  const filteredLandmarks = LANDMARKS.filter((l) => {
    if (activeCategory !== 'all' && l.category !== activeCategory) {
      // Support grouping
      if (activeCategory === 'industry_power' && (l.category === 'industry' || l.category === 'power')) return true;
      if (activeCategory === 'culture_art' && (l.category === 'culture' || l.category === 'personality')) return true;
      if (activeCategory === 'heritage_museum' && (l.category === 'museum' || l.category === 'heritage' || l.category === 'memorial')) return true;
      if (activeCategory === 'park_transport' && (l.category === 'park' || l.category === 'transport')) return true;
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchKk = l.titleKk.toLowerCase().includes(q) || l.subtitleKk.toLowerCase().includes(q);
      const matchRu = l.titleRu.toLowerCase().includes(q) || l.subtitleRu.toLowerCase().includes(q);
      const matchEn = l.titleEn.toLowerCase().includes(q) || l.subtitleEn.toLowerCase().includes(q);
      const matchNum = l.number.toString().includes(q);
      return matchKk || matchRu || matchEn || matchNum;
    }
    return true;
  });

  const handleSelectLandmarkById = (id: string) => {
    const found = LANDMARKS.find((l) => l.id === id);
    if (found) {
      setSelectedLandmark(found);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        lang={lang}
        onLangChange={setLang}
        activeSection={activeSection}
        onNavigateSection={handleNavigateSection}
        onOpenQrModal={() => {
          setQrTargetLandmarkId('main');
          setIsQrModalOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-16">
        {/* Hero Section */}
        <HeroBanner
          lang={lang}
          onExploreClick={() => handleNavigateSection('landmarks')}
          onMapClick={() => handleNavigateSection('map')}
          onQrClick={() => {
            setQrTargetLandmarkId('main');
            setIsQrModalOpen(true);
          }}
        />

        {/* SECTION 1: THE 10 LANDMARK CHAPTERS */}
        <section ref={landmarksRef} id="landmarks" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-amber-500 font-semibold text-xs tracking-wider uppercase mb-1">
                <Layers className="w-4 h-4" />
                {lang === 'kk' ? 'Шежірелік 10 нысан' : lang === 'ru' ? '10 Достояний города' : '10 Historical Landmarks'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {lang === 'kk' ? 'Екібастұздың он тарихи мақтанышы' : lang === 'ru' ? 'Десять исторических жемчужин Экибастуза' : 'The Ten Historical Treasures of Ekibastuz'}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                {lang === 'kk'
                  ? 'Өндірістік алыптардан қаланың мәдени ошақтарына дейінгі толық сипаттама, деректер мен дыбыстық атмосфера.'
                  : 'От гигантов индустрии до культурных очагов города: факты, архивы и звуковая атмосфера.'}
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'kk' ? 'Нысан атауын іздеу...' : 'Поиск объекта...'}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', labelKk: 'Барлық 10 нысан', labelRu: 'Все 10 объектов', labelEn: 'All 10 Sites' },
              { id: 'industry_power', labelKk: '«Богатырь» мен ГРЭС', labelRu: '«Богатырь» и ГРЭС', labelEn: 'Bogatyr & GRES' },
              { id: 'culture_art', labelKk: 'Қ. Пішенбаев & «Шахтер» сарайы', labelRu: 'Пшембаев & ДК «Шахтер»', labelEn: 'Pshembayev & Shakhter' },
              { id: 'heritage_museum', labelKk: 'Мұражай, Сәулет, Кеншілер даңқы', labelRu: 'Музей, Архитектура, Аллея', labelEn: 'Museum & Heritage' },
              { id: 'park_transport', labelKk: 'Кітапхана, Саябақ, Тұңғыш теміржол', labelRu: 'Библиотека, Парк, Ж/Д 1899', labelEn: 'Library, Park, Railway' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveCategory(btn.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === btn.id
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                {lang === 'ru' ? btn.labelRu : lang === 'en' ? btn.labelEn : btn.labelKk}
              </button>
            ))}
          </div>

          {/* Cards Grid for all 10 landmarks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLandmarks.map((landmark) => (
              <LandmarkCard
                key={landmark.id}
                landmark={landmark}
                onOpenModal={setSelectedLandmark}
                lang={lang}
                isAudioPlaying={activeAudioLandmarkId === landmark.id}
                onToggleAudio={handleToggleCardAudio}
                onOpenQr={(l) => {
                  setQrTargetLandmarkId(l.id);
                  setIsQrModalOpen(true);
                }}
              />
            ))}
          </div>

          {filteredLandmarks.length === 0 && (
            <div className="p-12 text-center bg-slate-900/50 rounded-2xl border border-slate-800">
              <p className="text-slate-400 text-sm">
                {lang === 'kk'
                  ? 'Сұрауыңыз бойынша нысан табылмады. Басқа сөзбен іздеп көріңіз.'
                  : 'По вашему запросу ничего не найдено.'}
              </p>
            </div>
          )}
        </section>

        {/* SECTION 2: SPATIAL INTERACTIVE MAP */}
        <section ref={mapRef} id="map" className="scroll-mt-24">
          <InteractiveMap
            landmarks={LANDMARKS}
            selectedLandmark={selectedLandmark}
            onSelectLandmark={setSelectedLandmark}
            lang={lang}
          />
        </section>

        {/* SECTION 3: TIMELINE (1886 - 2026) */}
        <section ref={timelineRef} id="timeline" className="scroll-mt-24">
          <TimelineSection
            events={TIMELINE_EVENTS}
            landmarks={LANDMARKS}
            onSelectLandmarkById={handleSelectLandmarkById}
            lang={lang}
          />
        </section>

        {/* SECTION 4: ARTIFACTS GALLERY */}
        <section ref={artifactsRef} id="artifacts" className="scroll-mt-24">
          <ArtifactGallery
            landmarks={LANDMARKS}
            onSelectLandmark={setSelectedLandmark}
            lang={lang}
          />
        </section>

        {/* SECTION 5: KNOWLEDGE QUIZ */}
        <section ref={quizRef} id="quiz" className="scroll-mt-24">
          <QuizSection
            questions={QUIZ_QUESTIONS}
            landmarks={LANDMARKS}
            lang={lang}
          />
        </section>
      </main>

      {/* Detail Modal */}
      <LandmarkDetailModal
        landmark={selectedLandmark}
        onClose={() => setSelectedLandmark(null)}
        landmarks={LANDMARKS}
        onNavigate={setSelectedLandmark}
        lang={lang}
      />

      {/* QR Code & Mobile Guide Modal */}
      <QRCodeModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        landmarks={LANDMARKS}
        initialLandmarkId={qrTargetLandmarkId}
        lang={lang}
      />

      {/* Footer */}
      <Footer
        landmarks={LANDMARKS}
        onSelectLandmark={setSelectedLandmark}
        lang={lang}
      />
    </div>
  );
}
