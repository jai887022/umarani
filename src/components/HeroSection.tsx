import { Play, Sparkles, CheckCircle, ShieldCheck, Clock, Users, Gift } from "lucide-react";

interface HeroSectionProps {
  onEnrollClick: () => void;
  onPreviewClick: () => void;
}

export default function HeroSection({ onEnrollClick, onPreviewClick }: HeroSectionProps) {
  // Use our generated image asset path
  const bannerImage = "/src/assets/images/canva_tamil_course_banner_1781764336287.jpg";

  return (
    <section className="relative overflow-hidden bg-slate-950 pt-16 pb-12 sm:pt-20 sm:pb-16 border-b border-slate-900">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text Left Column: takes 7 cols on large screens */}
          <div className="lg:col-span-7 text-left space-y-5">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-400/20 rounded-full text-indigo-400 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>முழுக்க எளிய தமிழில் Canva டிசைனிங் கோர்ஸ்!</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-white tracking-tight leading-[1.15]">
              மாஸ்டர் <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-indigo-500 bg-clip-text text-transparent">Canva Design</span> தமிழில் வெறும் ₹499-இல்!
            </h1>

 

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-400 pt-1">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>40+ HD Video Lectures (Simple Tamil)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Downloadable Project Assets & Templates</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Freelancing & Agency Guide (Fiverr Tips)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>AI tools integration (Canva AI tools explained)</span>
              </div>
            </div>

            {/* Modern Enroll CTA Section below checklist */}
            <div className="pt-6">
              <button
                onClick={onEnrollClick}
                id="hero-buy-btn"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-500 hover:to-indigo-600 text-slate-950 hover:text-white rounded-xl text-sm sm:text-base font-bold shadow-lg shadow-cyan-500/20 active:scale-95 transition-all text-center cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Enroll for 499 only!</span>
              </button>
              <div className="mt-3 flex items-center space-x-3 text-xs sm:text-sm text-slate-400">
                <span className="text-cyan-400 font-extrabold text-base">₹499</span>
                <span className="text-white/20">|</span>
                <span className="flex items-center text-emerald-400">
                  <Clock className="w-3.5 h-3.5 mr-1" /> Lifetime Access
                </span>
                <span className="text-white/20">|</span>
                <span className="text-slate-500">No hidden fees</span>
              </div>
            </div>






          </div>

          {/* Visual Right Column: takes 5 cols on large screens */}
          <div className="lg:col-span-5 relative w-full flex justify-center mt-6 lg:mt-0">
            <div className="relative group max-w-md w-full">
              {/* Outer soft shadow glow */}
              <div className="absolute inset-x-0 -bottom-2 h-full bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 transform group-hover:scale-[1.01]">
                


                {/* Overlaid badge */}
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800 text-[10px] font-bold text-white flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>Enrollment Closing Tonight!</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
