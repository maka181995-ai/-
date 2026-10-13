import React, { useState } from 'react';
import { TimelineEvent, Landmark } from '../types/chronicle';
import { History, Calendar, ArrowUpRight, Filter, Search, Sparkles } from 'lucide-react';

interface TimelineSectionProps {
  events: TimelineEvent[];
  landmarks: Landmark[];
  onSelectLandmarkById: (landmarkId: string) => void;
  lang: 'kk' | 'ru' | 'en';
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  events,
  landmarks,
  onSelectLandmarkById,
  lang,
}) => {
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredEvents = events.filter((e) => {
    // Era filter
    if (selectedEra === 'early' && e.year >= 1940) return false;
    if (selectedEra === 'soviet' && (e.year < 1940 || e.year >= 1991)) return false;
    if (selectedEra === 'modern' && e.year < 1991) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchKk = e.titleKk.toLowerCase().includes(q) || e.descriptionKk.toLowerCase().includes(q);
      const matchRu = e.titleRu.toLowerCase().includes(q) || e.descriptionRu.toLowerCase().includes(q);
      const matchYear = e.year.toString().includes(q);
      return matchKk || matchRu || matchYear;
    }
    return true;
  });

  const getTitle = (e: TimelineEvent) => {
    if (lang === 'ru') return e.titleRu;
    if (lang === 'en') return e.titleEn;
    return e.titleKk;
  };

  const getDescription = (e: TimelineEvent) => {
    if (lang === 'ru') return e.descriptionRu;
    if (lang === 'en') return e.descriptionEn;
    return e.descriptionKk;
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-4 md:p-8 shadow-2xl relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-semibold text-xs tracking-wider uppercase mb-1">
            <History className="w-4 h-4" />
            {lang === 'kk' ? 'Тарихи уақыт сызығы' : lang === 'ru' ? 'Историческая хроника' : 'Historical Timeline'}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            {lang === 'kk' ? '1886 — 2026: Екібастұз шежіресінің ұлы белестері' : lang === 'ru' ? '1886 — 2026: Великие вехи летописи Экибастуза' : '1886 — 2026: Milestones of Ekibastuz History'}
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            {lang === 'kk'
              ? 'Қосым Пішенбаевтың алғашқы көмірді табуынан бастап, алып өндіріс орындары мен заманауи экологиялық жаңғыруға дейінгі хронология.'
              : lang === 'ru'
              ? 'От первой находки угля Косымом Пшембаевым до индустриальных рекордов и цифрового настоящего.'
              : 'From the initial coal discovery by Kosym Pshembayev to industrial world records and modernization.'}
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'kk' ? 'Жыл немесе оқиға...' : 'Поиск года или события...'}
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Era filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { id: 'all', labelKk: 'Барлық дәуір (1886–2026)', labelRu: 'Все эпохи', labelEn: 'All Eras' },
          { id: 'early', labelKk: 'Бастау кезеңі (1886–1939)', labelRu: 'Истоки (1886–1939)', labelEn: 'Origins (1886–1939)' },
          { id: 'soviet', labelKk: 'Индустриялық серпіліс (1940–1990)', labelRu: 'Индустриальный прорыв (1940–1990)', labelEn: 'Industrial Surge (1940–1990)' },
          { id: 'modern', labelKk: 'Тәуелсіздік & Жаңа дәуір (1991–2026)', labelRu: 'Независимость & XXI век (1991–2026)', labelEn: 'Modern Era (1991–2026)' },
        ].map((era) => (
          <button
            key={era.id}
            onClick={() => setSelectedEra(era.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedEra === era.id
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
            }`}
          >
            {lang === 'ru' ? era.labelRu : lang === 'en' ? era.labelEn : era.labelKk}
          </button>
        ))}
      </div>

      {/* Vertical Interactive Timeline */}
      <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-amber-500 before:via-cyan-500 before:to-emerald-500">
        {filteredEvents.map((ev, index) => {
          const isMajor = ev.importance === 'major';
          const relatedLandmark = landmarks.find((l) => l.id === ev.landmarkId);

          return (
            <div key={index} className="relative group">
              {/* Timeline Marker Dot */}
              <div
                className={`absolute -left-6 sm:-left-10 top-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all ${
                  isMajor
                    ? 'bg-amber-500 text-black ring-4 ring-amber-500/20 font-extrabold text-xs'
                    : 'bg-slate-900 border-2 border-slate-700 text-slate-400 group-hover:border-amber-400 group-hover:text-amber-400'
                }`}
              >
                {isMajor ? <Sparkles className="w-3.5 h-3.5" /> : <span className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-amber-400" />}
              </div>

              {/* Event Content Card */}
              <div
                className={`bg-slate-950/70 rounded-2xl p-5 border transition-all duration-300 ${
                  isMajor
                    ? 'border-amber-500/40 hover:border-amber-400 shadow-lg shadow-amber-500/5'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-black text-amber-400 tracking-tight">
                      {ev.year}
                    </span>
                    {ev.exactDate && (
                      <span className="text-xs text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-800">
                        {ev.exactDate}
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {ev.tagKk}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {getTitle(ev)}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {getDescription(ev)}
                </p>

                {/* If event connects directly to one of the 10 landmarks */}
                {relatedLandmark && (
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      {lang === 'kk' ? 'Байланысты нысан:' : lang === 'ru' ? 'Связанный объект:' : 'Related Landmark:'}{' '}
                      <strong className="text-white">№ {relatedLandmark.number}</strong>
                    </span>

                    <button
                      onClick={() => onSelectLandmarkById(relatedLandmark.id)}
                      className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-bold group/link"
                    >
                      <span>
                        {lang === 'ru' ? relatedLandmark.titleRu : relatedLandmark.titleKk}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
