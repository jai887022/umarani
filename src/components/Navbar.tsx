import { Palette, GraduationCap, ArrowRight, ShieldCheck } from "lucide-react";

interface NavbarProps {
  onEnrollClick: () => void;
  hasAccess: boolean;
  onDashboardClick: () => void;
}

export default function Navbar({ onEnrollClick, hasAccess, onDashboardClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-sans font-bold text-lg bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Canva தமிழ்
          </span>
          <span className="hidden sm:inline bg-slate-800 text-cyan-400 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-cyan-500/20">
            ₹499 Only
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          {!hasAccess && (
            <button
              onClick={onEnrollClick}
              id="nav-enroll-btn"
              className="flex items-center space-x-1 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white rounded-lg text-xs font-semibold shadow-md hover:shadow-cyan-500/20 transition-all duration-200"
            >
              <GraduationCap className="h-4 w-4" />
              <span>Enroll (₹499)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
