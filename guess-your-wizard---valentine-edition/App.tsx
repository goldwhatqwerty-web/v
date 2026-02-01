
import React, { useState, useEffect, useCallback } from 'react';
import { QUESTIONS, ICON_MAP } from './constants';
import { QuizState } from './types';
import FloatingHearts from './components/FloatingHearts';
import FairyEffect from './components/FairyEffect';
import { getGeminiHint } from './services/geminiService';
import { Sparkles, ChevronRight, HelpCircle, Heart as HeartIcon, RefreshCcw, Star, Trophy, Crown } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    currentStep: 0,
    answers: {},
    isFinished: false,
    hintsUsed: 0
  });

  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [loadingHint, setLoadingHint] = useState(false);
  const [activeHint, setActiveHint] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const [shake, setShake] = useState(false);

  const currentQuestion = QUESTIONS[state.currentStep];

  const handleNext = useCallback(() => {
    if (input.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
      const nextStep = state.currentStep + 1;
      if (nextStep >= QUESTIONS.length) {
        setState(prev => ({ ...prev, isFinished: true }));
      } else {
        setState(prev => ({ ...prev, currentStep: nextStep }));
        setInput('');
        setError('');
        setActiveHint('');
      }
    } else {
      setError("Hmm, that's not quite right, my lovely... Try once more! 💖");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }, [input, currentQuestion, state.currentStep]);

  const handleHint = async () => {
    if (loadingHint) return;
    setLoadingHint(true);
    const hint = await getGeminiHint(currentQuestion.text, currentQuestion.answer);
    setActiveHint(hint);
    setState(prev => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }));
    setLoadingHint(false);
  };

  const resetQuiz = () => {
    setState({
      currentStep: 0,
      answers: {},
      isFinished: false,
      hintsUsed: 0
    });
    setInput('');
    setError('');
    setActiveHint('');
    setShowIntro(true);
  };

  if (showIntro) {
    return (
      <div className="min-h-screen bg-[#fff5f7] flex flex-col items-center justify-center p-6 text-center">
        <FloatingHearts />
        <div className="z-10 bg-white/90 backdrop-blur-lg p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(255,182,193,0.3)] border-2 border-pink-100 max-w-lg animate-float">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-pink-200 blur-2xl opacity-50 rounded-full animate-pulse"></div>
            <HeartIcon className="relative w-24 h-24 text-rose-500 animate-pulse" />
            <Crown className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-10 text-yellow-500 drop-shadow-md" />
          </div>
          <h1 className="text-5xl font-bold text-pink-600 mb-6 font-romantic tracking-wide">
            Hey Lovely, <br/> Guess Your Wizard
          </h1>
          <p className="text-gray-600 mb-10 text-xl leading-relaxed">
            A magical journey through our <span className="text-rose-400 font-bold">loveliest memories</span>. <br/>
            Answer all questions to unlock the Wizard's heart.
          </p>
          <button 
            onClick={() => setShowIntro(false)}
            className="w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-bold py-5 px-10 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(244,114,182,0.5)] flex items-center justify-center gap-3 text-lg"
          >
            Enter the Love Garden <ChevronRight />
          </button>
        </div>
        <p className="fixed bottom-8 text-pink-300 font-romantic text-2xl animate-pulse">Your Wizard is waiting... 🕸️</p>
      </div>
    );
  }

  if (state.isFinished) {
    return (
      <div className="min-h-screen bg-[#fff0f3] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <FloatingHearts />
        <FairyEffect />
        
        {/* Memory Locket Reveal */}
        <div className="z-10 bg-white/95 backdrop-blur-2xl p-10 rounded-[3.5rem] shadow-[0_40px_100px_rgba(251,113,133,0.3)] border-4 border-rose-100 max-w-2xl w-full animate-in zoom-in duration-1000">
          <div className="flex justify-center gap-4 mb-8">
            <Sparkles className="w-10 h-10 text-yellow-400 animate-bounce" />
            <div className="bg-rose-100 p-4 rounded-full">
              <Trophy className="w-12 h-12 text-rose-500" />
            </div>
            <Sparkles className="w-10 h-10 text-yellow-400 animate-bounce delay-150" />
          </div>

          <h2 className="text-5xl font-bold text-rose-600 mb-2 font-romantic text-shadow-pink">You've Won My Heart!</h2>
          <p className="text-xl text-pink-400 mb-10 italic font-medium">"The loveliest girl in the world found her Wizard."</p>
          
          <div className="relative group mb-10 flex justify-center">
            {/* Elegant Frame for the provided image */}
            <div className="relative p-3 bg-gradient-to-br from-yellow-300 via-rose-300 to-yellow-500 rounded-[2rem] shadow-[0_20px_60px_rgba(251,113,133,0.4)] transform rotate-1 hover:rotate-0 transition-transform duration-500 scale-105">
               <div className="bg-white p-2 rounded-[1.5rem] overflow-hidden">
                  <img 
                    src="https://i.ibb.co/35fBXh2L/Whats-App-Image-2026-02-01-at-9-12-02-PM.jpg" 
                    alt="The Lovely One" 
                    className="w-80 h-80 object-cover rounded-[1rem] shadow-inner transition-all duration-1000 group-hover:scale-105"
                  />
               </div>
               {/* Decorative Overlay */}
               <div className="absolute -top-5 -right-5 bg-rose-500 text-white p-3 rounded-full shadow-lg border-4 border-white animate-pulse">
                  <HeartIcon className="w-6 h-6 fill-white" />
               </div>
               <div className="absolute -bottom-5 -left-5 bg-yellow-400 text-white p-3 rounded-full shadow-lg border-4 border-white animate-spin-slow">
                  <Star className="w-6 h-6 fill-white" />
               </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-3xl mb-10 border border-rose-100 shadow-inner relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
             <h3 className="text-3xl font-bold text-rose-600 font-romantic mb-4 italic">To My Eternal Princess ❤️</h3>
             <p className="text-gray-700 text-lg leading-relaxed mb-4">
                "You remembered every step of our lovely journey. <br/>
                No matter where we go, I'll always be your <b>Spidey</b>, <br/>
                swinging by to catch you and keep you safe."
             </p>
             <div className="flex items-center justify-center gap-2 text-rose-400 font-bold bg-white/40 py-2 px-4 rounded-full inline-flex">
                <HeartIcon className="w-4 h-4 fill-rose-400" />
                <span>Completed with {state.hintsUsed} lovely hints</span>
                <HeartIcon className="w-4 h-4 fill-rose-400" />
             </div>
          </div>

          <button 
            onClick={resetQuiz}
            className="group flex items-center justify-center gap-3 mx-auto px-10 py-4 bg-white border-2 border-rose-200 rounded-full text-rose-500 hover:text-rose-700 font-bold transition-all hover:shadow-xl active:scale-95 hover:-translate-y-1"
          >
            <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" /> 
            Relive the Magic
          </button>
        </div>

        <footer className="fixed bottom-6 w-full text-center pointer-events-none opacity-40">
           <p className="text-rose-300 font-romantic text-2xl">Forever & Always</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffafa] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts />
      <FairyEffect />

      {/* Progress Bar with Heart Slider */}
      <div className="fixed top-10 w-full max-w-md px-6 z-20">
        <div className="relative h-5 bg-white/60 backdrop-blur-sm rounded-full overflow-hidden shadow-inner border border-pink-100">
          <div 
            className="h-full bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 transition-all duration-700 ease-out rounded-full shadow-[0_0_20px_rgba(244,114,182,0.5)]"
            style={{ width: `${((state.currentStep + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-3 px-2">
          <span className="text-rose-500 font-bold text-xs tracking-widest uppercase bg-white/80 px-3 py-1 rounded-full shadow-sm">
            Memory {state.currentStep + 1}
          </span>
          <span className="text-pink-400 font-romantic text-2xl animate-pulse">Nearly there, princess...</span>
        </div>
      </div>

      {/* Question Card */}
      <div className={`z-10 w-full max-w-md mt-16 transition-all duration-300 ${shake ? 'animate-shake' : ''}`}>
        <div className="bg-white/95 backdrop-blur-xl p-10 rounded-[3rem] shadow-[0_30px_80px_rgba(255,182,203,0.4)] border border-pink-50 relative overflow-hidden group">
          {/* Decorative Corner Hearts */}
          <HeartIcon className="absolute -top-6 -right-6 text-pink-50 w-24 h-24 rotate-12 transition-transform group-hover:scale-110" />
          <HeartIcon className="absolute -bottom-10 -left-10 text-rose-50 w-32 h-32 -rotate-12" />

          <div className="relative z-10">
            <div className="bg-gradient-to-br from-rose-50 to-pink-100 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-lg border border-white transform hover:rotate-6 transition-transform">
              {ICON_MAP[currentQuestion.icon]}
            </div>

            <h3 className="text-3xl font-bold text-gray-800 text-center mb-10 leading-[1.3] font-sans">
              {currentQuestion.text}
            </h3>

            <div className="space-y-6">
              <div className="relative group">
                <input
                  type="text"
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  placeholder={currentQuestion.placeholder}
                  className={`w-full bg-pink-50/20 border-2 ${error ? 'border-rose-300 bg-rose-50/50' : 'border-pink-100'} focus:border-rose-400 focus:bg-white focus:outline-none rounded-[1.5rem] py-6 px-8 text-2xl transition-all shadow-sm placeholder:text-pink-200 text-center text-rose-700 font-medium`}
                />
                {error && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-rose-500 font-bold animate-bounce text-sm">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{error}</span>
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                )}
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-rose-400 to-pink-600 hover:from-rose-500 hover:to-pink-700 text-white font-bold py-5 px-8 rounded-[1.5rem] transition-all shadow-xl hover:shadow-rose-300/60 active:scale-[0.98] flex items-center justify-center gap-4 text-xl group/btn"
              >
                Unlock This Memory 
                <HeartIcon className="w-6 h-6 group-hover/btn:scale-125 transition-transform duration-300" />
              </button>

              <div className="pt-8 border-t border-pink-50 flex flex-col items-center">
                <button
                  onClick={handleHint}
                  disabled={loadingHint}
                  className="group/hint text-rose-400 hover:text-rose-600 text-base font-bold flex items-center gap-3 transition-all disabled:opacity-50"
                >
                  <div className="bg-rose-50 p-3 rounded-full group-hover/hint:bg-rose-100 transition-colors shadow-sm">
                      <HelpCircle className="w-6 h-6" /> 
                  </div>
                  <span className="font-romantic text-xl italic">{loadingHint ? 'Summoning Magic...' : 'Ask the Love Fairy for a hint'}</span>
                </button>

                {activeHint && (
                  <div className="mt-8 p-6 bg-white/80 border-2 border-rose-100 rounded-3xl text-rose-800 text-lg italic text-center shadow-lg animate-in fade-in slide-in-from-bottom-6 duration-700 relative">
                     <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-400 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-tighter font-bold">Whisper</div>
                     " {activeHint} "
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-16 text-center z-10">
        <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-md px-6 py-2 rounded-full border border-pink-100 shadow-sm">
           <Crown className="w-4 h-4 text-yellow-500" />
           <p className="text-pink-400 text-xl font-romantic">
              For Spidey's Loveliest Princess 💖
           </p>
        </div>
      </footer>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .text-shadow-pink {
          text-shadow: 2px 2px 4px rgba(244, 114, 182, 0.3);
        }
      `}</style>
    </div>
  );
};

export default App;
