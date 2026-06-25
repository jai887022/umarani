import React, { useState, useEffect, useRef } from "react";
import { 
  Palette, GraduationCap, ArrowRight, ShieldCheck, Play, Sparkles, 
  CheckCircle, Clock, Users, Gift, ChevronDown, ChevronUp, Lock, Award, 
  RefreshCw, Sliders, Type, Image, Square, Download, Check, HelpCircle, X, CreditCard, Laptop, ArrowLeft, DownloadCloud, Flame
} from "lucide-react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SyllabusSection from "./components/SyllabusSection";
import { CanvasElement } from "./types";

export default function App() {
  // Access and View state
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [showDashboard, setShowDashboard] = useState<boolean>(false);
  
  // Video preview player state
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string>("");

  // Checkout modal state
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const [purchaserName, setPurchaserName] = useState<string>("");
  const [purchaserEmail, setPurchaserEmail] = useState<string>("");
  const [checkoutStep, setCheckoutStep] = useState<"form" | "paying" | "success">("form");
  const [paymentGateway, setPaymentGateway] = useState<"gpay" | "phonepe" | "card" | "upi">("gpay");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationProgress, setVerificationProgress] = useState<number>(0);
  const [verificationHeading, setVerificationHeading] = useState<string>("Initializing Google Pay connection...");

  // Unlocked Dashboard progress state
  const [completedLessons, setCompletedLessons] = useState<string[]>([
    "les-1" // Starts with first video completed mock
  ]);
  const [currentPlayingVideo, setCurrentPlayingVideo] = useState<string>("https://www.w3schools.com/html/mov_bbb.mp4");
  const [currentPlayingTitle, setCurrentPlayingTitle] = useState<string>("Introduction to Canva & UI Tour");
  const [certificateName, setCertificateName] = useState<string>("");
  const [showCertAlert, setShowCertAlert] = useState<boolean>(false);

  // Canva Simulator Sandbox State
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: "", show: false });

  const showToast = (msg: string) => {
    setToast({ message: msg, show: true });
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Payment mock trigger (Does not auto-complete anymore to allow user interaction)
  const handleStartPayment = (gateway: "gpay" | "phonepe" | "card" | "upi") => {
    setPaymentGateway(gateway);
    setCheckoutStep("paying");
    setIsVerifying(false);
    setVerificationProgress(0);
  };

  const triggerVerification = () => {
    setIsVerifying(true);
    setVerificationProgress(5);
    setVerificationHeading("Initializing Google Pay UPI connection...");
    
    // Stage 1 - Scan detect
    setTimeout(() => {
      setVerificationProgress(30);
      setVerificationHeading("GPay Mobile app scan detected! Processing...");
    }, 1200);

    // Stage 2 - Verifying transfer
    setTimeout(() => {
      setVerificationProgress(65);
      setVerificationHeading("Verifying ₹499 UPI transaction secure receipt...");
    }, 2600);

    // Stage 3 - Finalizing Access key
    setTimeout(() => {
      setVerificationProgress(90);
      setVerificationHeading("Authorizing secure lifetime certificate keys...");
    }, 4000);

    // Stage 4 - Complete
    setTimeout(() => {
      setVerificationProgress(100);
      setVerificationHeading("Unlocked successfully!");
      setIsVerifying(false);
      setCheckoutStep("success");
      setHasAccess(true);
      showToast("🎉 Google Pay successful! Canva training VIP access unlocked.");
    }, 5000);
  };

  const [sandboxBg, setSandboxBg] = useState<string>("from-slate-950 via-[#0e171a] to-slate-900");
  const [sandboxElements, setSandboxElements] = useState<CanvasElement[]>([
    { id: "e1", type: "text", content: "கேன்வா டிசைனிங்", color: "#00C4CC", fontSize: 32, x: 50, y: 35, width: 300, height: 60 },
    { id: "e2", type: "text", content: "தமிழில் மாஸ்டர்கிளாஸ்", color: "#FFFFFF", fontSize: 20, x: 50, y: 90, width: 300, height: 40 },
    { id: "e3", type: "shape", content: "neon-glow", color: "#FF4B4B", fontSize: 14, x: 420, y: 70, width: 120, height: 120 }
  ]);
  const [selectedElementId, setSelectedElementId] = useState<string>("e1");

  // Preset layouts for Canva sandbox
  const applySandboxPreset = (type: "thumbnail" | "reel" | "post") => {
    if (type === "thumbnail") {
      setSandboxBg("from-slate-950 via-[#101f30] to-slate-900 border-l border-cyan-500/20");
      setSandboxElements([
        { id: "e1", type: "text", content: "YouTube Thumbnail", color: "#FF4B4B", fontSize: 26, x: 20, y: 30, width: 250, height: 40 },
        { id: "e2", type: "text", content: "3 நிமிடத்தில் செய்வது எப்படி?", color: "#00C4CC", fontSize: 18, x: 20, y: 75, width: 280, height: 40 },
        { id: "e3", type: "image", content: "✨ GLOW ACCENT", color: "#FFDF00", fontSize: 12, x: 380, y: 40, width: 140, height: 140 }
      ]);
    } else if (type === "reel") {
      setSandboxBg("from-[#1c082e] via-slate-950 to-slate-900");
      setSandboxElements([
        { id: "e1", type: "text", content: "Reels & Shorts", color: "#FFD700", fontSize: 28, x: 60, y: 40, width: 220, height: 45 },
        { id: "e2", type: "text", content: "@MyBrandTamil", color: "#FFFFFF", fontSize: 14, x: 60, y: 95, width: 180, height: 30 },
        { id: "e3", type: "shape", content: "circle-gradient", color: "#00C4CC", fontSize: 14, x: 400, y: 60, width: 100, height: 100 }
      ]);
    } else {
      setSandboxBg("from-slate-950 via-teal-950 to-slate-900");
      setSandboxElements([
        { id: "e1", type: "text", content: "விற்பனை சலுகை 80%!", color: "#FFFFFF", fontSize: 24, x: 40, y: 45, width: 260, height: 40 },
        { id: "e2", type: "text", content: "₹499 மட்டுமே", color: "#00C4CC", fontSize: 22, x: 40, y: 95, width: 200, height: 40 },
        { id: "e3", type: "shape", content: "badge-banner", color: "#FF4B4B", fontSize: 12, x: 430, y: 50, width: 110, height: 110 }
      ]);
    }
  };

  // Modify currently selected element
  const updateSelectedElement = (key: keyof CanvasElement, value: any) => {
    setSandboxElements((prev) => 
      prev.map((el) => el.id === selectedElementId ? { ...el, [key]: value } : el)
    );
  };

  const selectedElement = sandboxElements.find((el) => el.id === selectedElementId);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans selection:bg-[#00C4CC] selection:text-black antialiased">
      


      {/* Landing / Core Navigation */}
      <Navbar 
        onEnrollClick={() => {
          setCheckoutStep("form");
          setShowCheckout(true);
        }}
        hasAccess={hasAccess}
        onDashboardClick={() => setShowDashboard(true)}
      />

      {/* Main Container Switcher */}
      {showDashboard && hasAccess ? (
        
        /* STUDENT COURSE VIEWPORT */
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="space-y-1 mb-4 lg:mb-0">
              <button 
                onClick={() => setShowDashboard(false)}
                className="flex items-center space-x-1 text-slate-400 hover:text-white text-xs font-semibold transition-colors uppercase tracking-wider mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sales Page</span>
              </button>
              <div className="flex items-center space-x-2">
                <span className="bg-[#00C4CC] text-black text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">VIP STUDENT PORTAL</span>
                <span className="text-white/40">•</span>
                <span className="text-xs text-emerald-400 font-semibold">{completedLessons.length} / 17 Lessons Completed</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-sans bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                Canva தமிழ் டிசைனிங் மாஸ்டர்கிளாஸ்
              </h1>
            </div>

            {/* Quick progress meter */}
            <div className="bg-white/5 border border-white/10 p-3 rounded-xl w-full lg:w-72">
              <div className="flex justify-between items-center text-xs mb-1.5 font-sans">
                <span className="text-slate-400">Course Progress</span>
                <span className="font-bold text-[#00C4CC]">
                  {Math.round((completedLessons.length / 17) * 100)}%
                </span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(completedLessons.length / 17) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-white/50 text-right mt-1 font-mono">
                100% hits Certificate download!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Video Player and details column */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Core Active Lesson Frame */}
              <div className="bg-[#111] border border-white/15 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-4 bg-black/60 border-b border-white/10 flex items-center justify-between">
                  <span className="text-xs text-[#00C4CC] font-bold tracking-wider uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Lecture Playing
                  </span>
                  <span className="text-xs font-mono text-white/50">Full HD Stream • Simple Tamil</span>
                </div>
                
                {/* Embedded HTML5 Simulated Video Player */}
                <div className="relative aspect-video bg-black flex items-center justify-center">
                  <video 
                    key={currentPlayingVideo}
                    src={currentPlayingVideo} 
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    playsInline
                  />
                </div>

                <div className="p-6 bg-[#0c0c0c] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-cyan-400 font-semibold uppercase">Currently Learning:</p>
                    <h3 className="text-lg sm:text-xl font-bold text-white">{currentPlayingTitle}</h3>
                    <p className="text-xs text-slate-400 max-w-xl">
                      இந்த பாடத்தில் கேன்வா மூலம் மிக எளிதாக எடிட் செய்வது, புதிய வடிவங்கள் சேர்ப்பது மற்றும் கலர் காம்பினேஷன்களை எப்படி மேம்படுத்துவது போன்றவற்றை தெளிவாக பார்க்கிறோம்.
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center space-x-2">
                    {completedLessons.includes(currentPlayingTitle) ? (
                      <button 
                        onClick={() => setCompletedLessons(prev => prev.filter(t => t !== currentPlayingTitle))}
                        className="bg-emerald-500 text-slate-950 font-sans font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all"
                      >
                        <Check className="w-4 h-4 text-slate-900" />
                        <span>Completed!</span>
                      </button>
                    ) : (
                      <button 
                        onClick={() => {
                          if (!completedLessons.includes(currentPlayingTitle)) {
                            setCompletedLessons(prev => [...prev, currentPlayingTitle]);
                            if (completedLessons.length + 1 >= 17) {
                              setShowCertAlert(true);
                            }
                          }
                        }}
                        className="bg-white/10 hover:bg-[#00C4CC] hover:text-black text-white font-sans font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1"
                      >
                        <span>Mark as Finished</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* VIP Benefits & Premium Materials Box */}
              <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center space-x-2.5 mb-4">
                  <div className="bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 text-amber-400">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">Premium Tools Bonus Bundle (Included Free!)</h3>
                    <p className="text-xs text-slate-500">Download files to jumpstart your Canva design journey</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { name: "50+ Premium Tamil Unicode Fonts", desc: "For posters & banners", size: "18.5 MB" },
                    { name: "200+ Transparent PNG Glow Stickers", desc: "Silhouettes & neon assets", size: "45.2 MB" },
                    { name: "Fiverr Ready-Made Gig Poster files", desc: "To launch your freelancing", size: "8.4 MB" },
                    { name: "YT Thumbnail Raw Template Files", desc: "Mock Photoshop/Canva files", size: "29.1 MB" },
                    { name: "Instagram 10-Slide Carousel Blueprint", desc: "Swipe engagement layout", size: "14.2 MB" },
                    { name: "Canva Pro Free Elements tricks", desc: "Bonus handbook PDF", size: "3.1 MB" }
                  ].map((res, idx) => (
                    <div key={idx} className="bg-black/40 border border-white/5 p-3.5 rounded-xl flex items-center justify-between group hover:border-slate-700 transition-all">
                      <div className="text-left space-y-0.5">
                        <p className="text-[11px] font-bold text-slate-200 group-hover:text-cyan-400 transition-colors uppercase truncate max-w-[160px]">{res.name}</p>
                        <p className="text-[10px] text-white/50">{res.desc}</p>
                        <span className="text-[9px] font-mono text-white/30">{res.size}</span>
                      </div>
                      <button 
                        onClick={() => showToast(`Your premium asset library: "${res.name}" simulation started. Enjoy designing!`)}
                        id={`down-btn-${idx}`}
                        className="bg-white/5 text-slate-400 hover:bg-cyan-500/20 hover:text-cyan-400 p-2 rounded-md transition-colors"
                        title="Download Asset"
                      >
                        <DownloadCloud className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Student Certificate Section */}
              <div className="bg-gradient-to-r from-indigo-950/20 via-[#0e171a] to-slate-900 border border-cyan-500/20 rounded-3xl p-6 relative">
                <div className="absolute top-4 right-4 bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono tracking-wider">
                  Verified Certificate
                </div>

                <div className="text-left space-y-4">
                  <div className="flex items-center space-x-3">
                    <Award className="w-8 h-8 text-[#00C4CC] shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-white">Canva Designer Certified Badge Generator</h3>
                      <p className="text-xs text-slate-400">Complete curriculum and print/download your certified Tamil badge.</p>
                    </div>
                  </div>

                  {completedLessons.length >= 12 ? (
                    <div className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <label className="text-xs text-slate-300 block font-medium">Enter your Name for Certificate (உங்கள் பெயர்):</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={certificateName}
                            onChange={(e) => setCertificateName(e.target.value)}
                            placeholder="e.g. Ramesh Kumar / ரமேஷ் குமார்"
                            className="bg-black/60 border border-white/20 text-white rounded-xl px-4 py-2.5 text-xs flex-1 focus:outline-none focus:border-[#00C4CC]"
                          />
                        </div>
                      </div>

                      {/* Real certificate design rendering frame */}
                      <div className="bg-[#111] border border-amber-500/30 p-6 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center text-center text-white/90">
                        {/* Certificate watermark designs */}
                        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                        <div className="absolute -top-10 -left-10 w-48 h-48 bg-cyan-400/5 rounded-full blur-xl pointer-events-none" />
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-amber-400/5 rounded-full blur-xl pointer-events-none" />
                        
                        {/* Certificate inner boundary */}
                        <div className="border border-double border-amber-500/25 p-4 rounded-xl w-full flex flex-col items-center">
                          <Palette className="w-8 h-8 text-[#00C4CC] mb-2" />
                          <p className="text-[10px] uppercase tracking-widest text-[#00C4CC] font-bold font-sans">TAMIL DESIGN ACADEMY</p>
                          <h2 className="text-lg font-bold font-serif text-white uppercase tracking-tight mt-1">Certificate of Achievement</h2>
                          <p className="text-[10px] text-white/40 italic mt-0.5">This is proudly awarded to</p>
                          
                          <p className="text-xl font-bold text-amber-400 py-2.5 font-serif border-b border-white/10 min-w-[220px] tracking-wide">
                            {certificateName || "YOUR NAME HERE"}
                          </p>

                          <p className="text-[9px] text-slate-400 max-w-md leading-relaxed mt-2.5 font-sans">
                            for completing the intensive training curriculum <span className="text-[#00C4CC] font-semibold">"Canva Masterclass in Tamil"</span> for graphic design, incorporating layouts, logo design, reels timeline, and Fiverr freelancing tools.
                          </p>

                          <div className="flex justify-between items-center w-full max-w-sm mt-5 pt-3 border-t border-white/5 text-[9px] text-white/50">
                            <div className="text-left">
                              <span className="block font-mono text-white/70">AUTHORIZED SIGN</span>
                              <span className="block text-slate-500">Coach Kavitha</span>
                            </div>
                            <div className="text-right">
                              <span className="block text-white/70">CERTIFICATE STATE</span>
                              <span className="block text-emerald-400 font-bold">VERIFIED</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 text-xs">
                        <button 
                          onClick={() => window.print()}
                          className="bg-white text-black font-bold px-4 py-2 rounded-xl hover:bg-slate-200 transition-all flex items-center gap-1"
                        >
                          <Download className="w-4 h-4" />
                          <span>Print Certificate</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-black/30 border border-white/5 rounded-xl p-4 text-center mt-2">
                      <Lock className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                      <p className="text-xs text-slate-400">
                        Please watch at least <span className="text-cyan-400 font-bold">12 lessons</span> to generate your personalized certificate. You currently finished <span className="text-emerald-400 font-mono font-bold">{completedLessons.length}</span> classes. Let's keep learning!
                      </p>
                    </div>
                  )}

                </div>
              </div>

            </div>

            {/* Right: Modules syllabus navigator sidebar */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[#111] border border-white/10 rounded-2xl p-4 sticky top-16">
                <div className="flex items-center space-x-2.5 mb-4 pb-3 border-b border-white/10">
                  <Laptop className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-100">Course Index (17 Lessons)</h3>
                </div>

                {/* Modules menu inside dashboard */}
                <div className="space-y-4 text-left overflow-y-auto max-h-[580px] pr-1">
                  
                  {/* Module 1 */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] text-cyan-400 font-mono uppercase tracking-wide">M1: Canva Introduction</p>
                    <div className="space-y-1">
                      {[
                        { title: "Introduction to Canva & UI Tour", duration: "12:15", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { title: "Working with Elements & Layers", duration: "18:45", url: "https://www.w3schools.com/html/movie.mp4" },
                        { title: "Magic of Color Theory & Font Pairings", duration: "15:20" }
                      ].map((item, idx) => (
                        <button 
                          key={idx}
                          onClick={() => {
                            if (item.url) {
                              setCurrentPlayingVideo(item.url);
                              setCurrentPlayingTitle(item.title);
                            } else {
                              showToast("Let's unlock the color schemes trial or mark standard lessons completed!");
                            }
                          }}
                          className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between text-xs transition-all ${
                            currentPlayingTitle === item.title 
                              ? "bg-slate-800 text-cyan-400 font-bold" 
                              : "bg-black/30 hover:bg-white/5 text-slate-300"
                          }`}
                        >
                          <div className="flex items-center space-x-2 truncate">
                            {completedLessons.includes(item.title) ? (
                              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <Play className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                            )}
                            <span className="truncate">{item.title}</span>
                          </div>
                          <span className="text-[9px] text-white/40 grow-0 ml-2 font-mono">{item.duration}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Module 2 */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] text-cyan-400 font-mono uppercase tracking-wide">M2: Logos & Graphic sets</p>
                    <div className="space-y-1">
                      {[
                        { title: "Designing Unique Corporate Logos", duration: "22:10", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
                        { title: "Creating Brand Kits & Presets", duration: "14:30" }
                      ].map((item, idx) => (
                        <button 
                          key={idx}
                          onClick={() => {
                            if (item.url) {
                              setCurrentPlayingVideo(item.url);
                              setCurrentPlayingTitle(item.title);
                            } else {
                              showToast("Loaded premium Brand Kits mock simulation lesson. Go ahead!");
                            }
                          }}
                          className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between text-xs transition-all ${
                            currentPlayingTitle === item.title 
                              ? "bg-slate-800 text-cyan-400 font-bold" 
                              : "bg-black/30 hover:bg-white/5 text-slate-300"
                          }`}
                        >
                          <div className="flex items-center space-x-2 truncate">
                            {completedLessons.includes(item.title) ? (
                              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <Play className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                            )}
                            <span className="truncate">{item.title}</span>
                          </div>
                          <span className="text-[9px] text-white/40 font-mono">{item.duration}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Module 3 */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] text-cyan-400 font-mono uppercase tracking-wide">M3: Social Media Posts</p>
                    <div className="space-y-1">
                      {[
                        { title: "Instagram Carousel Posts & Grid layouts", duration: "25:15" },
                        { title: "Facebook Ads Poster Layout Design", duration: "19:05" }
                      ].map((item, idx) => (
                        <button 
                          key={idx}
                          onClick={() => {
                            setCurrentPlayingTitle(item.title);
                            showToast("This premium class is unlocked in your master portal. Let's watch standard layouts!");
                          }}
                          className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between text-xs transition-all ${
                            currentPlayingTitle === item.title 
                              ? "bg-slate-800 text-cyan-400 font-bold" 
                              : "bg-black/30 hover:bg-white/5 text-slate-300"
                          }`}
                        >
                          <div className="flex items-center space-x-2 truncate">
                            {completedLessons.includes(item.title) ? (
                              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <Play className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                            )}
                            <span className="truncate">{item.title}</span>
                          </div>
                          <span className="text-[9px] text-white/40 font-mono">{item.duration}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Module 4 */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] text-cyan-400 font-mono uppercase tracking-wide">M4: YouTube Thumbnail Masterclass</p>
                    <div className="space-y-1 text-slate-400">
                      <p className="text-[11px] italic text-[#00C4CC]/70 px-2">Secrets to High CTR Thumbnails & Neon glow layouts are fully ready and available in your download resources pool as templates!</p>
                    </div>
                  </div>

                  {/* Quick toggle out */}
                  <div className="pt-4 border-t border-white/10 text-center">
                    <button 
                      onClick={() => setShowDashboard(false)}
                      className="text-xs text-[#00C4CC] hover:underline font-bold"
                    >
                      Return to course home page
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </main>
      ) : (
        
        /* GENERAL COURSE sales / landing view */
        <div className="flex-1">
          
          {/* Main Hero block */}
          <HeroSection 
            onEnrollClick={() => {
              setCheckoutStep("form");
              setShowCheckout(true);
            }}
            onPreviewClick={() => {
              setActiveVideoUrl("https://www.w3schools.com/html/mov_bbb.mp4");
              setActiveVideoTitle("കேன்வா என்றால் என்ன? (Introduction & Interface)");
            }}
          />

          {/* Social Proof Stats Bar */}
          <section className="bg-black py-10 border-b border-white/5 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Students Enrolled Card */}
                <div className="bg-gradient-to-tr from-cyan-400/80 via-[#00C4CC]/50 to-indigo-500/10 rounded-2xl p-[1px] hover:scale-[1.03] hover:shadow-cyan-500/10 hover:shadow-lg transition-all duration-300 group relative">
                  <div className="bg-slate-950/95 rounded-[15px] p-6 text-center h-full relative overflow-hidden flex flex-col items-center justify-center">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
                    <p className="text-3xl sm:text-4xl font-extrabold text-[#00C4CC] tracking-tight">2400+</p>
                    <p className="text-[10px] mt-2 text-white/50 uppercase tracking-widest font-bold">Students Enrolled</p>
                  </div>
                </div>
                
                {/* Average Google Rating Card */}
                <div className="bg-gradient-to-tr from-amber-400/80 via-yellow-500/50 to-indigo-500/10 rounded-2xl p-[1px] hover:scale-[1.03] hover:shadow-indigo-500/10 hover:shadow-lg transition-all duration-300 group relative">
                  <div className="bg-slate-950/95 rounded-[15px] p-6 text-center h-full relative overflow-hidden flex flex-col items-center justify-center">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent" />
                    <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">4.9/5</p>
                    <p className="text-[10px] mt-2 text-white/50 uppercase tracking-widest font-bold">Average Google Rating</p>
                  </div>
                </div>
                
                {/* Tamil Instruction Card */}
                <div className="bg-gradient-to-tr from-[#00C4CC]/80 via-teal-500/50 to-cyan-500/10 rounded-2xl p-[1px] hover:scale-[1.03] hover:shadow-[#00C4CC]/10 hover:shadow-lg transition-all duration-300 group relative">
                  <div className="bg-slate-950/95 rounded-[15px] p-6 text-center h-full relative overflow-hidden flex flex-col items-center justify-center">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#00C4CC]/20 to-transparent" />
                    <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-[#00C4CC] bg-clip-text text-transparent tracking-tight">100%</p>
                    <p className="text-[10px] mt-2 text-[#00C4CC]/70 uppercase tracking-widest font-bold">Tamil Instruction</p>
                  </div>
                </div>
                
                {/* Practical Material Card */}
                <div className="bg-gradient-to-tr from-purple-400/80 via-indigo-500/50 to-cyan-500/10 rounded-2xl p-[1px] hover:scale-[1.03] hover:shadow-purple-500/10 hover:shadow-lg transition-all duration-300 group relative">
                  <div className="bg-slate-950/95 rounded-[15px] p-6 text-center h-full relative overflow-hidden flex flex-col items-center justify-center">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent" />
                    <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">40+ Hrs</p>
                    <p className="text-[10px] mt-2 text-white/50 uppercase tracking-widest font-bold">Practical Material</p>
                  </div>
                </div>
              </div>

              {/* Added bottom Enroll Option */}
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center justify-center space-y-3">
                <button
                  onClick={() => {
                    setCheckoutStep("form");
                    setShowCheckout(true);
                  }}
                  className="w-full sm:w-auto px-10 py-3.5 bg-gradient-to-r from-cyan-400 via-[#00C4CC] to-indigo-500 hover:from-cyan-500 hover:to-indigo-600 text-slate-950 hover:text-white rounded-2xl text-sm sm:text-base font-extrabold shadow-xl shadow-cyan-500/10 active:scale-95 transition-all text-center flex items-center justify-center space-x-2.5 cursor-pointer ring-2 ring-cyan-400/20"
                >
                  <Sparkles className="w-5 h-5 animate-pulse text-inherit" />
                  <span>Enroll for 499 only !</span>
                </button>
              </div>

              {/* Premium Canva Templates Mockup Showcase */}
              <div className="mt-16 pt-12 border-t border-white/5 space-y-8">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    மாணவர்கள் பெறும் <span className="bg-gradient-to-r from-[#00C4CC] via-indigo-400 to-purple-400 bg-clip-text text-transparent font-black">Premium Canva</span> டெம்ப்ளேட்கள்
                  </h3>
                  <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
                    தயாராக வடிவமைக்கப்பட்ட தமிழ் திருவிழா வாழ்த்துகள், யூடியூப் தம்ப்நெயில்ஸ், விசிட்டிங் கார்டு மற்றும் இன்ஸ்டாகிராம் ரீல்ஸ் டெம்ப்ளேட்கள் உங்கள் வர்த்தகத்தை உயர்த்த உதவும்.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Festival Poster Card */}
                  <div className="group bg-gradient-to-br from-cyan-400 via-[#00C4CC] to-[#00C4CC]/10 p-[1px] rounded-3xl transition-transform duration-300 hover:scale-[1.04] shadow-lg hover:shadow-cyan-400/20">
                    <div className="bg-slate-950 rounded-[23px] overflow-hidden p-3 h-full flex flex-col justify-between">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 border border-white/10">
                        <img 
                          src="/src/assets/images/template_festival_1781850016692.jpg" 
                          alt="Festival Template Screenshot"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 left-2 bg-slate-950/90 text-cyan-400 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-cyan-400/30">
                          Festival / விழாக்கள்
                        </div>
                      </div>
                      <div className="px-1 pb-1">
                        <h4 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">திருவிழா வாழ்த்து போஸ்டர்</h4>
                        <p className="text-[10px] text-slate-400 mt-1">மகிழ்ச்சியான தமிழ் பண்டிகைகளுக்கான எடிட் செய்யக்கூடிய டிசைன்கள்.</p>
                      </div>
                    </div>
                  </div>

                  {/* Business Card Card */}
                  <div className="group bg-gradient-to-br from-emerald-400 via-[#00C4CC] to-indigo-500/10 p-[1px] rounded-3xl transition-transform duration-300 hover:scale-[1.04] shadow-lg hover:shadow-emerald-400/20">
                    <div className="bg-slate-950 rounded-[23px] overflow-hidden p-3 h-full flex flex-col justify-between">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 border border-white/10">
                        <img 
                          src="/src/assets/images/template_business_1781850049056.jpg" 
                          alt="Business Template Screenshot"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 left-2 bg-slate-950/90 text-emerald-400 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-emerald-400/30">
                          Business Branding
                        </div>
                      </div>
                      <div className="px-1 pb-1">
                        <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">Sleek தமிழ் விசிட்டிங் கார்டு</h4>
                        <p className="text-[10px] text-slate-400 mt-1">கேன்வா மூலம் அழகிய முறையில் பிராண்டிங் செய்ய உதவும் கார்டுகள்.</p>
                      </div>
                    </div>
                  </div>

                  {/* Instagram Reels Card */}
                  <div className="group bg-gradient-to-br from-purple-400 via-indigo-500 to-cyan-500/10 p-[1px] rounded-3xl transition-transform duration-300 hover:scale-[1.04] shadow-lg hover:shadow-purple-400/20">
                    <div className="bg-slate-950 rounded-[23px] overflow-hidden p-3 h-full flex flex-col justify-between">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 border border-white/10">
                        <img 
                          src="/src/assets/images/template_reels_1781850062791.jpg" 
                          alt="Reels Template Screenshot"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 left-2 bg-slate-950/90 text-purple-400 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-purple-400/30">
                          Reels Cover
                        </div>
                      </div>
                      <div className="px-1 pb-1">
                        <h4 className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors">இன்ஸ்டாகிராம் ரீல்ஸ் கவர்</h4>
                        <p className="text-[10px] text-slate-400 mt-1">வைரல் வீடியோக்களுக்கான நேர்த்தியான தமிழ் கிட் டெம்ப்ளேட்கள்.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SYLLABUS SECTION */}
          <SyllabusSection 
            onEnrollClick={() => {
              setCheckoutStep("form");
              setShowCheckout(true);
            }}
            onPreviewLesson={(videoUrl, titleName) => {
              setActiveVideoUrl(videoUrl);
              setActiveVideoTitle(titleName);
            }}
            hasAccess={hasAccess}
          />

          {/* MOCK STUDENT TESTIMONIALS SLIDER */}
          <section className="py-16 bg-slate-950 border-b border-white/5 relative">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              
              <div className="text-center space-y-3 mb-10">
                <span className="text-[10px] bg-cyan-500/10 border border-cyan-500/20 text-[#00C4CC] px-3 py-1 rounded-full font-bold uppercase tracking-wider">REACTIVE STUDENT STORIES</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">டிசைனர்களின் வெற்றி சான்று <span className="bg-gradient-to-r from-[#00C4CC] to-indigo-400 bg-clip-text text-transparent">Reviews</span></h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">See how local Tamil creators and freelancers boosted their revenue after mastering Canva.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "சரவணன் குமார்",
                    role: "Freelance Designer (Fiverr)",
                    comment: "வெறும் ₹499-இல் இவ்வளவு பயனுள்ள தகவல்களை நான் எதிர்பார்க்கவில்லை. குறிப்பாக யூடியூப் தம்ப்நெயில் செய்யும் எபிசோட்ஸ் என் கிக் வியூஸை 300% அதிகரித்துள்ளது! 🙏",
                    rating: 5,
                    city: "Madurai"
                  },
                  {
                    name: "கல்பனா விவேக்",
                    role: "Home Baker & Business Owner",
                    comment: "என்னுடைய பேக்கிங் தொழிலுக்கு இன்ஸ்டாகிராம் போஸ்டர்கள் செய்ய இவ்வளவு நாள் காசு கொடுத்து ஆட்களை நியமித்தேன். இப்போது நானே லோகோ, பேக்கேஜிங் கவர் செய்கிறேன்!",
                    rating: 5,
                    city: "Chennai"
                  },
                  {
                    name: "நவீன் ராஜ்",
                    role: "Vlogger & Student Creator",
                    comment: "ரீல்ஸ் டைம்லைனில் ஆடியோ சிங்க் செய்து கேன்வா மூலம் எடிட் செய்வது செம்ம ஈஸி. தமிழ் ஃபான்ட்ஸ் இம்போர்ட் செய்யும் வீடியோ அருமையான விளக்கம். மிக்க நன்றி!",
                    rating: 5,
                    city: "Coimbatore"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-tr from-[#111] to-slate-900 border border-white/10 p-6 rounded-2xl relative flex flex-col justify-between">
                    <p className="text-amber-400 text-sm mb-3">★★★★★</p>
                    <p className="text-xs text-slate-300 italic leading-relaxed text-left flex-1">
                      "{item.comment}"
                    </p>
                    <div className="flex items-center space-x-3 mt-4 pt-3 border-t border-white/5 text-left">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 flex items-center justify-center font-bold text-slate-950 text-xs">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{item.name}</h4>
                        <p className="text-[10px] text-white/40">{item.role} • <span className="text-[#00C4CC]">{item.city}</span></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col items-center">
                <button
                  onClick={() => {
                    setCheckoutStep("form");
                    setShowCheckout(true);
                  }}
                  id="middle-enroll-btn"
                  className="px-8 py-4 bg-gradient-to-r from-cyan-400 via-[#00C4CC] to-indigo-500 hover:from-cyan-500 hover:to-indigo-600 text-slate-950 hover:text-white rounded-xl text-sm sm:text-base font-extrabold transition-all tracking-wide flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-cyan-500/20 active:scale-95"
                >
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  <span>Enroll Now (₹499 Only!)</span>
                </button>
              </div>

            </div>
          </section>

          {/* SIMPLE COMPACT ACCORDION FAQ */}
          <section className="py-16 bg-[#0a0a0a] border-b border-white/5">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              
              <div className="text-center space-y-3 mb-10">
                <HelpCircle className="w-8 h-8 text-cyan-400 mx-auto" />
                <h3 className="text-2xl font-bold font-sans">அடிக்கடி கேட்கப்படும் கேள்விகள் (FAQs)</h3>
                <p className="text-xs text-slate-400">Canva தமிழ் கோர்ஸ் சார்ந்த முக்கிய கேள்விகள்</p>
              </div>

              {[
                { q: "இந்த கோர்ஸில் சேர எனக்கு லேப்டாப் தேவையா?", a: "தேவையில்லை! மொபைல் போன் இருந்தாலே போதும், நீங்கள் கேன்வா மொபைல் ஆப் மூலமே சோஷியல் மீடியா டிசைன்களை செய்யலாம். லேப்டாப் இருந்தால் இன்னும் சிறப்பு." },
                { q: "Canva Pro கணக்கு வேண்டுமா, அதன் கட்டணம் என்ன?", a: "இல்லை! இந்த கோர்ஸில் 95% இலவச கேன்வா கணக்கு (Canva Free Account) வைத்தே எப்படி உயர்தர டிசைன்களை செய்வது என்று முழுமையாக விளக்குகிறோம். எனவே மெம்பர்ஷிப் கட்டணம் செலுத்த தேவையில்லை." },
                { q: "Lifetime Access என்றால் என்ன?", a: "பதிவு செய்ததும் உங்களுக்கு வாழ்நாள் முழுமைக்கும் வீடியோ ஆவணங்கள், டெம்ப்ளேட்டுகள் கிடைக்கும். எதிர்காலத்தில் புதிய அப்டேட்டுகள் மற்றும் கிளாஸ்கள் சேர்க்கப்பட்டால் அவை உங்களுக்கு முற்றிலும் இலவசம்!" },
                { q: "சான்றிதழ் (Completion Certificate) எப்போது கிடைக்கும்?", a: "பாடநெறி வீடியோக்களை 100% பார்த்து முடித்ததும், உங்களுடைய மாணவர் போர்ட்டல் பக்கத்தில் உங்கள் பெயரை உள்ளிட்டு ஒரே நொடியில் டிஜிட்டல் சான்றிதழைப் பெற்றுக்கொள்ளலாம்." }
              ].map((faq, index) => (
                <div key={index} className="border-b border-white/10 py-4 text-left">
                  <h4 className="text-sm font-bold text-slate-100 mb-1 flex items-start gap-2">
                    <span className="text-[#00C4CC]">Q.</span>
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-xs text-slate-400 pl-5 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}



            </div>
          </section>

          {/* FULL STYLE FOOTER IN COMPLIANCE WITH ELEGANT DARK */}
          <footer className="bg-black py-12 border-t border-white/10 text-[10px] text-white/30 uppercase tracking-widest">
            <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
              <div className="flex flex-col items-center justify-center space-y-3">
                <button
                  onClick={() => {
                    setCheckoutStep("form");
                    setShowCheckout(true);
                  }}
                  className="px-8 py-3.5 bg-gradient-to-r from-cyan-400 via-[#00C4CC] to-indigo-500 hover:from-cyan-500 hover:to-indigo-600 text-slate-950 hover:text-white rounded-xl text-xs sm:text-sm font-black transition-all tracking-normal lowercase flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-cyan-500/10 active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-inherit" />
                  <span>enroll for 499 only!</span>
                </button>
              </div>
              

            </div>
          </footer>

        </div>
      )}

      {/* SECURE PAYMENT CHECKOUT SIMULATOR DIALOG/MODAL */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/20 w-full max-w-sm rounded-3xl p-6 relative overflow-hidden shadow-2xl">
            
            {/* LIMITED OFFER ROTATED BADGE */}
            <div className="absolute -top-3 -right-3 bg-red-600 text-white text-[9px] font-black py-1.5 px-3 rounded-full rotate-12 shadow-md uppercase tracking-wider animate-bounce">
              LIMITED OFFER!
            </div>

            {/* Close trigger */}
            <button 
              onClick={() => setShowCheckout(false)}
              className="absolute top-4 left-4 text-slate-400 hover:text-white p-1 rounded-full bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-5 pt-3">
              
              <div className="space-y-1">
                <span className="text-[10px] bg-[#00C4CC]/10 text-[#00C4CC] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-widest block w-max mx-auto">GPay Safe Checkout</span>
                <p className="text-white/40 line-through text-xs italic mt-1">Original Price ₹2,999</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-white/60 text-xs font-bold font-mono">Total Due:</span>
                  <p className="text-4xl font-black text-white tracking-tighter">₹499</p>
                </div>
                <p className="text-[#00C4CC]/90 font-bold uppercase tracking-wider text-[10px]">Canva Masterclass Lifetime Access</p>
              </div>

              {checkoutStep === "form" && (
                <div className="space-y-4 text-left">
                  <div className="space-y-3 bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-300 font-extrabold uppercase tracking-wide block">Your Name *</label>
                      <input 
                        type="text" 
                        value={purchaserName}
                        onChange={(e) => setPurchaserName(e.target.value)}
                        placeholder="Enter full name"
                        className="w-full bg-black/60 border border-white/10 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-300 font-extrabold uppercase tracking-wide block">Email ID *</label>
                      <input 
                        type="email" 
                        value={purchaserEmail}
                        onChange={(e) => setPurchaserEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full bg-black/60 border border-white/10 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button 
                      onClick={() => {
                        if (!purchaserName.trim() || !purchaserEmail.trim()) {
                          showToast("Please fill in both Name and Email ID to proceed.");
                          return;
                        }
                        handleStartPayment("gpay");
                      }}
                      className="w-full py-4 bg-gradient-to-r from-emerald-400 via-[#00C4CC] to-blue-500 hover:from-emerald-500 hover:to-blue-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition-all text-center flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/10 cursor-pointer active:scale-95 duration-150"
                    >
                      <Sparkles className="w-4 h-4 text-inherit" />
                      <span>CONTINUE TO GPAY (PAY ₹499)</span>
                    </button>
                    <p className="text-[9px] text-slate-400 text-center tracking-normal font-sans pt-1">
                      🔒 Secured via official Google Pay UPI integration. Course unlocks instantly!
                    </p>
                  </div>
                </div>
              )}

              {/* DIRECT GPAY SCREEN */}
              {checkoutStep === "paying" && (
                <div className="py-2 space-y-4 text-center">
                  {isVerifying ? (
                    <div className="bg-slate-950 p-6 border border-[#00C4CC]/30 rounded-2xl space-y-6 shadow-inner">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="relative w-16 h-16 flex items-center justify-center">
                          <span className="absolute inset-0 rounded-full border-4 border-cyan-500/20 border-t-[#00C4CC] animate-spin" />
                          <Sparkles className="w-6 h-6 text-[#00C4CC] animate-pulse" />
                        </div>
                        
                        <div className="space-y-1.5">
                          <h4 className="text-xs font-black text-white uppercase tracking-widest font-mono">UPI TRANSITION ENGINE</h4>
                          <p className="text-[11px] text-cyan-400 font-bold min-h-[16px] transition-all duration-300">{verificationHeading}</p>
                        </div>
                      </div>

                      <div className="space-y-1.5 bg-white/5 p-4 rounded-xl border border-white/5">
                        <div className="flex justify-between items-center text-[10px] text-white/50 font-mono">
                          <span>Secure GPay Scan Sync</span>
                          <span className="font-bold text-cyan-400">{verificationProgress}%</span>
                        </div>
                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-cyan-400 via-[#00C4CC] to-emerald-400 h-full transition-all duration-300"
                            style={{ width: `${verificationProgress}%` }}
                          />
                        </div>
                      </div>

                      <p className="text-[9px] text-slate-500 tracking-wide font-medium lowercase">
                        * connecting securely with google pay simulator API. do not refresh.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="bg-slate-950 p-4 border border-white/10 rounded-2xl space-y-4 shadow-inner">
                        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-cyan-900/40 border border-cyan-400/20 rounded-full text-[9px] font-bold text-cyan-400 uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                          <span>Ready to Pay with Google Pay (GPay)</span>
                        </div>

                        <p className="text-xs font-bold text-white uppercase tracking-wider">
                          Scan QR or Tap Code Below to Complete Pay!
                        </p>
                        
                        {/* Generative QR Code pointing directly to GPay UPI with click delay simulator */}
                        <div 
                          onClick={triggerVerification}
                          className="relative w-44 h-44 mx-auto p-2 bg-white rounded-2xl shadow-xl border-2 border-emerald-400 hover:border-[#00C4CC] flex flex-col items-center justify-center group hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                          title="Click / Tap QR Code to simulate scan & purchase with delay"
                        >
                          <img 
                            src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi%3A%2F%2Fpay%3Fpa%3D8870226982%40ybl%26pn%3dTamil%20Design%20Academy%26am%3D499%26cu%3DINR%26tn%3DCanva%20Tamil%20Course" 
                            alt="GPay QR Code 8870226982" 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain"
                          />
                          <div className="absolute inset-0 bg-slate-950/80 rounded-2xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300">
                            <span className="text-white text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-slate-950 px-2.5 py-1 rounded-full animate-bounce">
                              TAP TO SCAN
                            </span>
                            <p className="text-[8px] text-slate-300 mt-1">Simulate mobile scan</p>
                          </div>
                        </div>

                        <div className="space-y-1.5 pt-1">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            Google Pay UPI ID / Number:
                          </p>
                          <div className="flex items-center justify-center space-x-2 bg-white/5 border border-white/15 px-3 py-1.5 rounded-xl max-w-[200px] mx-auto">
                            <span className="text-xs font-black font-mono text-[#00C4CC]">8870226982</span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText("8870226982");
                                showToast("Copied GPay number 8870226982 successfully!");
                              }}
                              className="bg-white/10 hover:bg-white/20 text-white rounded-lg px-2 py-0.5 text-[9px] font-black tracking-widest active:scale-95 transition-all"
                            >
                              COPY
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={triggerVerification}
                            className="w-full py-3 bg-gradient-to-r from-emerald-400 to-[#00C4CC] text-slate-950 hover:text-white font-extrabold text-xs rounded-xl text-center flex items-center justify-center space-x-2 shadow-md hover:scale-[1.01] transition-transform"
                          >
                            <span>🚀 LAUNCH GPAY APP DIRECTLY</span>
                          </button>

                          <button
                            onClick={triggerVerification}
                            className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs rounded-xl hover:brightness-110 active:scale-95 transition-all text-center flex items-center justify-center space-x-2 cursor-pointer border border-white/10"
                          >
                            <Check className="w-3.5 h-3.5 text-emerald-400 font-bold" />
                            <span>I have paid ₹499 (Verify on GPay)</span>
                          </button>
                          
                          <button
                            onClick={() => setCheckoutStep("form")}
                            className="text-[10px] text-slate-500 hover:text-slate-300 font-mono pt-1"
                          >
                            ← Edit Name / Email ID
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="pt-1 border-t border-white/5 flex items-center justify-center gap-2 text-[9px] text-[#00C4CC] font-mono select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Verified GPay UPI Sandbox Engine
                  </div>
                </div>
              )}

              {checkoutStep === "success" && (
                <div className="py-6 space-y-4 text-center">
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-400/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-[#00C4CC]">கட்டணம் வெற்றிகரமாக செலுத்தப்பட்டது!</h4>
                    <p className="text-xs text-white/90 mt-1">
                      Welcome to the club, <span className="font-bold underline text-white">{purchaserName || "Tamil Designer"}</span>! Your Canva Masterclass has been unlocked.
                    </p>
                  </div>
                  
                  <div className="bg-emerald-500/5 p-3 rounded-xl text-xs text-left text-emerald-400 border border-emerald-500/20">
                    🎉 Student login enabled successfully. Go to Course modules dashboard inside the vip portal and play video items instantly.
                  </div>

                  <button 
                    onClick={() => {
                      setShowCheckout(false);
                      setShowDashboard(true);
                      if (purchaserName) setCertificateName(purchaserName);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs rounded-xl hover:brightness-110 active:scale-95 transition-all"
                  >
                    Go to VIP Course Portal 🚀
                  </button>
                </div>
              )}

              {/* Secure transaction visual details footer */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-center gap-4 text-[9px] text-white/30 font-medium">
                <span>🔒 256-Bit SSL</span>
                <span>•</span>
                <span>Refund Protected</span>
                <span>•</span>
                <span>GST Registered</span>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* MOCK/HTML VIDEO ACCESSIBILITY PREVIEW MODAL PLAYER */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/20 w-full max-w-2xl rounded-3xl p-5 relative overflow-hidden shadow-2xl space-y-3">
            
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs text-slate-400">
              <span className="font-bold text-[#00C4CC] uppercase tracking-wider">Free Trial Lesson Preview in Tamil</span>
              <button 
                onClick={() => {
                  setActiveVideoUrl(null);
                  setActiveVideoTitle("");
                }}
                className="text-slate-400 hover:text-white bg-white/5 hover:bg-slate-800 p-1 rounded-full transition-colors"
                id="close-preview-modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-video bg-black rounded-xl overflow-hidden relative">
              <video 
                src={activeVideoUrl}
                className="w-full h-full object-contain"
                controls
                autoPlay
                playsInline
              />
            </div>

            <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-3 text-left">
              <div>
                <h4 className="text-sm font-bold text-slate-100">{activeVideoTitle}</h4>
                <p className="text-[11px] text-white/50">Master layouts, glowing stars, outline strokes, and customizable brand sets taught at 100% simple Tamil pace.</p>
              </div>

              {!hasAccess && (
                <button
                  onClick={() => {
                    setActiveVideoUrl(null);
                    setCheckoutStep("form");
                    setShowCheckout(true);
                  }}
                  className="bg-[#00C4CC] text-black font-sans font-bold text-xs px-4 py-2 rounded-xl hover:brightness-110 active:scale-95 transition-all w-full md:w-auto text-center font-bold"
                >
                  Join Course for ₹499 (Limited Seat)
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {toast.show && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#111] border border-[#00C4CC]/30 text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-2xl shadow-xl shadow-cyan-900/10 flex items-center space-x-2 animate-pulse">
          <Sparkles className="w-4.5 h-4.5 text-[#00C4CC]" />
          <span>{toast.message}</span>
        </div>
      )}

    </div>
  );
}
