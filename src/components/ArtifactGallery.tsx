import React, { useState } from 'react';
import { Landmark } from '../types/chronicle';
import { Archive, Search, Filter, Sparkles, ArrowRight } from 'lucide-react';

interface ArtifactGalleryProps {
  landmarks: Landmark[];
  onSelectLandmark: (landmark: Landmark) => void;
  lang: 'kk' | 'ru' | 'en';
}

export const ArtifactGallery: React.FC<ArtifactGalleryProps> = ({
  landmarks,
  onSelectLandmark,
  lang,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  // Collect all artifacts from all landmarks
  const allArtifacts = landmarks.flatMap((landmark) =>
    landmark.artifacts.map((art) => ({
      ...art,
      landmark,
    }))
  );

  const filtered = allArtifacts.filter((item) => {
    if (filterCategory !== 'all' && item.category !== filterCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.landmark.titleKk.toLowerCase().includes(q) ||
        item.year.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Extract unique categories
  const categories = Array.from(new Set(allArtifacts.map((a) => a.category)));

  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-4 md:p-8 shadow-2xl relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-semibold text-xs tracking-wider uppercase mb-1">
            <Archive className="w-4 h-4" />
            {lang === 'kk' ? 'Цифрлық жәдігерлер қоры' : lang === 'ru' ? 'Фонд цифровых артефактов' : 'Digital Relics Collection'}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            {lang === 'kk' ? 'Мұрағаттық жәдігерлер мен сирек экспонаттар' : lang === 'ru' ? 'Архивные артефакты и редкие экспонаты' : 'Archival Artifacts & Rare Relics'}
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            {lang === 'kk'
              ? 'Екібастұз тарих және өлкетану мұражайында, кеніш мұрағаттары мен орталық кітапханада сақталған бірегей жәдігерлердің сандық галереясы.'
              : 'Цифровая галерея экспонатов, хранящихся в музее, разрезах и библиотеке.'}
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === 'kk' ? 'Жәдігерді іздеу...' : 'Поиск экспоната...'}
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            filterCategory === 'all'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
          }`}
        >
          {lang === 'kk' ? 'Барлық жәдігерлер' : 'Все экспонаты'} ({allArtifacts.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterCategory === cat
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Artifacts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-400 font-semibold border border-slate-800">
                  {item.category}
                </span>
                <span className="font-mono text-slate-400">{item.year}</span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                {item.name}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-amber-400 font-medium truncate max-w-[170px]">
                № {item.landmark.number}: {item.landmark.titleKk}
              </span>

              <button
                onClick={() => onSelectLandmark(item.landmark)}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white font-semibold transition-colors"
              >
                <span>Толығырақ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
