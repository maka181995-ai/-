import React from 'react';
import { Landmark } from '../types/chronicle';
import { Flame, Heart, BookOpen, MapPin, Award, ExternalLink } from 'lucide-react';

interface FooterProps {
  landmarks: Landmark[];
  onSelectLandmark: (landmark: Landmark) => void;
  lang: 'kk' | 'ru' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ landmarks, onSelectLandmark, lang }) => {
  return (
    <footer className="mt-16 bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Tribute */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-black font-extrabold flex items-center justify-center text-sm">
                Е
              </div>
              <span className="font-extrabold text-sm text-white tracking-wider">
                ЕКІБАСТҰЗ ШЕЖІРЕСІ
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              {lang === 'kk'
                ? 'Екібастұз қаласының 10 басты тарихи және өндірістік мақтанышын цифрлық кеңістікте жаңғыртуға арналған білім беру және өлкетану платформасы.'
                : 'Краеведческая и образовательная платформа, посвященная 10 историческим и промышленным достояниям города Экибастуз.'}
            </p>
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
              <Flame className="w-3.5 h-3.5" />
              <span>Қазақстанның энергетикалық жүрегі</span>
            </div>
          </div>

          {/* Col 2: 10 Landmark Quick Links (1-5) */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs text-amber-500">
              Тарихи мұралар (1-5)
            </h4>
            <ul className="space-y-1.5">
              {landmarks.slice(0, 5).map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => onSelectLandmark(l)}
                    className="hover:text-amber-400 transition-colors text-left truncate w-full"
                  >
                    {l.number}. {lang === 'ru' ? l.titleRu : l.titleKk}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: 10 Landmark Quick Links (6-10) */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs text-amber-500">
              Тарихи мұралар (6-10)
            </h4>
            <ul className="space-y-1.5">
              {landmarks.slice(5, 10).map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => onSelectLandmark(l)}
                    className="hover:text-amber-400 transition-colors text-left truncate w-full"
                  >
                    {l.number}. {lang === 'ru' ? l.titleRu : l.titleKk}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Archival Sources & Local Lore */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs text-amber-500">
              Дереккөздер мен Мұрағаттар
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>• Екібастұз тарих және өлкетану мұражайы қорлары</li>
              <li>• Бұқар жырау атындағы орталық қалалық кітапхана</li>
              <li>• «Богатырь Көмір» ЖШС тарихи мұрағаты</li>
              <li>• «Екібастұз ГРЭС-1 және ГРЭС-2» шежірелік деректері</li>
              <li>• Павлодар облысының мемлекеттік мұрағаты</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            © 1886 — 2026 Екібастұздың цифрлық шежіресі. Барлық құқықтар қорғалған.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Екібастұз кеншілері мен энергетиктерінің ұлы еңбегіне тағзым</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
