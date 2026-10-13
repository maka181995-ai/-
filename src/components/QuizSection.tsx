import React, { useState, useEffect } from 'react';
import { QuizQuestion, Landmark } from '../types/chronicle';
import confetti from 'canvas-confetti';
import QRCode from 'qrcode';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Sparkles,
  RotateCcw,
  Award,
  Printer,
  ChevronRight,
  Share2,
  QrCode,
} from 'lucide-react';

interface QuizSectionProps {
  questions: QuizQuestion[];
  landmarks: Landmark[];
  lang: 'kk' | 'ru' | 'en';
}

export const QuizSection: React.FC<QuizSectionProps> = ({ questions, landmarks, lang }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [participantName, setParticipantName] = useState<string>('');
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [certQrUrl, setCertQrUrl] = useState<string>('');

  useEffect(() => {
    if (showCertificate && participantName) {
      const verifyUrl = typeof window !== 'undefined' ? `${window.location.href.split('#')[0]}#certificate-verified` : 'https://ekibastuz-chronicle.kz';
      QRCode.toDataURL(verifyUrl, {
        width: 140,
        margin: 1,
        color: { dark: '#0f172a', light: '#ffffff' }
      })
        .then(setCertQrUrl)
        .catch(() => {});
    }
  }, [showCertificate, participantName]);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    setIsAnswerSubmitted(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
      // Trigger festive celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#06b6d4', '#10b981', '#ef4444', '#8b5cf6'],
        });
      } catch {
        // ignore
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
    setShowCertificate(false);
  };

  const getQuestionText = () => {
    if (lang === 'ru') return currentQ.questionRu;
    if (lang === 'en') return currentQ.questionEn;
    return currentQ.questionKk;
  };

  const getOptions = () => {
    if (lang === 'ru') return currentQ.optionsRu;
    if (lang === 'en') return currentQ.optionsEn;
    return currentQ.optionsKk;
  };

  const getExplanation = () => {
    if (lang === 'ru') return currentQ.explanationRu;
    if (lang === 'en') return currentQ.explanationEn;
    return currentQ.explanationKk;
  };

  const getRankBadge = () => {
    if (score === 10) {
      return {
        titleKk: 'Екібастұз шежіресінің хас білгірі',
        titleRu: 'Мастер-летописец Экибастуза',
        titleEn: 'Master Chronicler of Ekibastuz',
        descKk: 'Барлық 10 тарихи нысан мен оқиғаны мінсіз білетін нағыз өлкетанушы!',
        color: 'from-amber-400 to-amber-600',
      };
    }
    if (score >= 8) {
      return {
        titleKk: 'Құрметті қала зерттеушісі',
        titleRu: 'Почетный исследователь города',
        titleEn: 'Distinguished City Scholar',
        descKk: 'Екібастұздың бай өндірістік және мәдени тарихын өте жақсы меңгерген!',
        color: 'from-cyan-400 to-blue-600',
      };
    }
    if (score >= 5) {
      return {
        titleKk: 'Жас кенші-ізденуші',
        titleRu: 'Юный горняк-краевед',
        titleEn: 'Junior Explorer',
        descKk: 'Жақсы нәтиже! Қаланың негізгі рекордтарымен таныссыз.',
        color: 'from-emerald-400 to-teal-600',
      };
    }
    return {
      titleKk: 'Тарихқа алғашқы қадам',
      titleRu: 'Первые шаги в истории',
      titleEn: 'First Steps in History',
      descKk: 'Шежірелік картаны тағы бір шолып, біліміңізді толықтыруға кеңес береміз!',
      color: 'from-slate-400 to-slate-600',
    };
  };

  const rank = getRankBadge();

  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-4 md:p-8 shadow-2xl relative">
      {/* Quiz Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-semibold text-xs tracking-wider uppercase mb-1">
            <HelpCircle className="w-4 h-4" />
            {lang === 'kk' ? 'Танымдық викторина' : lang === 'ru' ? 'Краеведческая викторина' : 'Knowledge Quiz'}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            {lang === 'kk' ? 'Екібастұз шежіресін қаншалықты білесіз?' : lang === 'ru' ? 'Насколько хорошо вы знаете летопись Экибастуза?' : 'How Well Do You Know Ekibastuz History?'}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {lang === 'kk'
              ? 'Қаланың 10 басты тарихи және өндірістік нысаны бойынша 10 сұраққа жауап беріп, шежіреші куәлігін алыңыз.'
              : 'Ответьте на 10 вопросов по 10 объектам и получите именное свидетельство знатока города.'}
          </p>
        </div>

        {!isFinished && (
          <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">{lang === 'kk' ? 'Нәтиже:' : 'Счет:'}</span>
            <span className="text-base font-extrabold text-amber-400">
              {score} / {questions.length}
            </span>
          </div>
        )}
      </div>

      {/* Quiz In-Progress Screen */}
      {!isFinished ? (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-2 font-semibold">
              <span>
                {lang === 'kk' ? 'Сұрақ' : 'Вопрос'} {currentIdx + 1} / {questions.length}
              </span>
              <span>{Math.round(((currentIdx + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-slate-950/90 rounded-2xl p-6 border border-slate-800 shadow-xl">
            <span className="inline-block px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 font-bold text-xs mb-3 border border-amber-500/20">
              № {currentIdx + 1} {lang === 'kk' ? 'Тақырып' : 'Тема'}: {landmarks[currentIdx]?.titleKk}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {getQuestionText()}
            </h3>

            {/* Options list */}
            <div className="mt-6 space-y-3">
              {getOptions().map((opt, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const isCorrect = optIdx === currentQ.correctIndex;

                let btnStyles = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-800/80';
                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    btnStyles = 'bg-emerald-950/70 border-emerald-500 text-emerald-200';
                  } else if (isSelected) {
                    btnStyles = 'bg-rose-950/70 border-rose-500 text-rose-200';
                  } else {
                    btnStyles = 'bg-slate-950/40 border-slate-800/50 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base font-medium transition-all flex items-center justify-between gap-3 ${btnStyles}`}
                  >
                    <span>{opt}</span>
                    {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                    {isAnswerSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation card after submit */}
            {isAnswerSubmitted && (
              <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 animate-in fade-in">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      {lang === 'kk' ? 'Шежірелік түсініктеме' : 'Историческая справка'}
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      {getExplanation()}
                    </p>
                    {currentQ.funFactKk && (
                      <p className="text-xs text-amber-300/90 mt-2 font-medium">
                        💡 {currentQ.funFactKk}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs sm:text-sm transition-all shadow-lg"
                  >
                    <span>
                      {currentIdx + 1 === questions.length
                        ? (lang === 'kk' ? 'Нәтижені көру' : 'Посмотреть итог')
                        : (lang === 'kk' ? 'Келесі сұрақ' : 'Следующий вопрос')}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Completion & Certificate Screen */
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-black flex items-center justify-center shadow-2xl shadow-amber-500/20">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {lang === 'kk' ? 'Викторина аяқталды!' : 'Викторина завершена!'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {score} / {questions.length} {lang === 'kk' ? 'дұрыс жауап' : 'правильных ответов'}
            </h3>
            <p className="text-sm font-semibold text-amber-300 mt-2">
              «{lang === 'ru' ? rank.titleRu : rank.titleKk}»
            </p>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
              {rank.descKk}
            </p>
          </div>

          {/* Certificate Input */}
          {!showCertificate ? (
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white">
                {lang === 'kk' ? 'Естелік сертификат алу үшін аты-жөніңізді енгізіңіз:' : 'Введите имя для именного сертификата:'}
              </h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  placeholder={lang === 'kk' ? 'Мысалы: Арман Серікұлы' : 'Например: Арман Сериков'}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={() => setShowCertificate(true)}
                  disabled={!participantName.trim()}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold text-xs sm:text-sm transition-all"
                >
                  {lang === 'kk' ? 'Сертификатты ашу' : 'Получить'}
                </button>
              </div>
            </div>
          ) : (
            /* Printable Commemorative Certificate */
            <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border-2 border-amber-500/60 shadow-2xl relative text-center print:border-black print:text-black">
              <div className="absolute top-3 left-3 text-[10px] text-amber-500/80 font-mono tracking-widest uppercase">
                № EKB-{Math.floor(100000 + Math.random() * 900000)}
              </div>

              <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6" />
              </div>

              <h4 className="text-xs font-bold tracking-widest text-amber-400 uppercase">
                СЕРТИФИКАТ • КУӘЛІК
              </h4>
              <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-white mt-1">
                Екібастұздың цифрлық шежіресін танушы
              </h2>

              <p className="text-xs text-slate-400 mt-2">
                Бұл куәлік Екібастұз қаласының 10 тарихи нысаны мен мұраларын терең зерттегені үшін табысталады:
              </p>

              <div className="my-4 py-2 border-y border-amber-500/30 text-lg sm:text-2xl font-bold text-amber-300 font-serif">
                {participantName}
              </div>

              <p className="text-xs text-slate-300">
                Нәтиже: <strong className="text-amber-400">{score} / 10</strong> балл • Дәрежесі:{' '}
                <strong className="text-amber-400">«{rank.titleKk}»</strong>
              </p>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
                <div className="text-center sm:text-left">
                  <div className="font-semibold text-slate-400">Екібастұз қаласы, 2026 ж.</div>
                  <div>Сандық тарихи-өлкетану мұрағат қоры</div>
                </div>

                {certQrUrl && (
                  <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-amber-500/30">
                    <img
                      src={certQrUrl}
                      alt="Куәлік QR коды"
                      className="w-12 h-12 rounded-lg bg-white p-0.5"
                    />
                    <div className="text-[10px] text-left leading-tight text-slate-400">
                      <div className="font-bold text-amber-400">QR ВЕРИФИКАЦИЯ</div>
                      <div>Куәлік түпнұсқасы</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-center gap-3 print:hidden">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Басып шығару (Печать)</span>
                </button>
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{lang === 'kk' ? 'Викторинаны қайта тапсыру' : 'Пройти викторину снова'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
