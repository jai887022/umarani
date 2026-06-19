import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, Play, Lock, Sparkles, Award } from "lucide-react";
import { Module } from "../types";

interface SyllabusSectionProps {
  onEnrollClick: () => void;
  onPreviewLesson: (videoUrl: string, titleName: string) => void;
  hasAccess: boolean;
}

export default function SyllabusSection({ onEnrollClick, onPreviewLesson, hasAccess }: SyllabusSectionProps) {
  const [openModuleId, setOpenModuleId] = useState<string | null>("mod-1");

  const syllabusModules: Module[] = [
    {
      id: "mod-1",
      title: "Module 1: Canva Fundamentals & Getting Started",
      titleTa: "கேன்பா அறிமுகம் மற்றும் கணக்கு துவங்குதல்",
      lessons: [
        { id: "les-1", title: "Introduction to Canva & UI Tour", titleTa: "கேன்பா அறிமுகம் மற்றும் அமைப்புகள்", duration: "12:15", description: "Discover the Canva environment, tools workspace, and how to set up your free account.", unlocked: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
      ]
    },
    {
      id: "mod-2",
      title: "Module 2: Professional Branding & Logo Graphic Design",
      titleTa: "பிராண்டிங் மற்றும் லோகோ வடிவமைப்பு",
      lessons: [
        { id: "les-4", title: "Designing Unique Corporate Logos", titleTa: "நிறுவனங்களுக்கான லோகோ உருவாக்குதல்", duration: "22:10", description: "Learn to design modern, clean vector logos from scratch using shapes, text, and elements.", unlocked: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
        { id: "les-5", title: "Creating Brand Kits & Presets", titleTa: "பிராண்ட் கிட் உருவாக்குதல்", duration: "14:30", description: "Create permanent presets with brand colors, fonts, and assets.", unlocked: false, videoUrl: "" }
      ]
    },
    {
      id: "mod-3",
      title: "Module 3: High-Converting Social Media Graphic layouts",
      titleTa: "சமூக ஊடகத்திற்கான போஸ்டர்கள்",
      lessons: [
        { id: "les-6", title: "Instagram Carousel Posts & Grid layouts", titleTa: "இன்ஸ்டாகிராம் தொடர் பதிவுகள்", duration: "25:15", description: "Design responsive carousels that flow smoothly across slides to maximize swipe engagement.", unlocked: false, videoUrl: "" },
        { id: "les-7", title: "Facebook Ads Poster Layout Design", titleTa: "பேஸ்புக் விளம்பர போஸ்டர்கள்", duration: "19:05", description: "Craft standard layouts designed to capture immediate scroll attention with high CTR.", unlocked: false, videoUrl: "" }
      ]
    },
    {
      id: "mod-4",
      title: "Module 4: YouTube Thumbnail Masterclass",
      titleTa: "யூடியூப் தம்ப்நெயில் மாஸ்டர்கிளாஸ்",
      lessons: [
        { id: "les-8", title: "Secrets to High CTR Thumbnails", titleTa: "அதிக பார்வைகளை பெறும் தம்ப்நெயில்", duration: "20:45", description: "How to use outline silhouettes, text drop shadows, neon circles, and glowing faces.", unlocked: false, videoUrl: "" },
        { id: "les-9", title: "Thumbnails for Vlogs, Gamers & Tech channels", titleTa: "பல்வேறு வகையான தம்ப்நெயில்கள்", duration: "16:30", description: "Case studies of trending channels and building corresponding templates.", unlocked: false, videoUrl: "" }
      ]
    },
    {
      id: "mod-5",
      title: "Module 5: Reels, TikTok & Shorts Vertical Video Editing",
      titleTa: "மொபைல் வீடியோக்கள் மற்றும் ரீல்ஸ் எடிட்டிங்",
      lessons: [
        { id: "les-10", title: "Video Timeline Editing & Audio Syncing", titleTa: "வீடியோ டைம்லைன் மற்றும் ஆடியோ இணைத்தல்", duration: "24:12", description: "Import clips, split scenes, and coordinate background audio beats to fit dynamic reels.", unlocked: false, videoUrl: "" },
        { id: "les-11", title: "Animated Overlays & Text Animation Effects", titleTa: "வீடியோ டெக்ஸ்ட் அனிமேஷன்", duration: "15:40", description: "Adding captions, typography transitions, and cool zoom effects inside Canva video.", unlocked: false, videoUrl: "" }
      ]
    },
    {
      id: "mod-6",
      title: "Module 6: Premium Resumes & Business Stationery",
      titleTa: "இருப்பிடச் சான்றிதழ், பயோடேட்டா மற்றும் விசிட்டிங் கார்டு",
      lessons: [
        { id: "les-12", title: "Designing Modern ATS-Friendly Resumes", titleTa: "பயோடேட்டா மற்றும் சிவி தயாரித்தல்", duration: "18:20", description: "Build cleanly structured corporate CVs that pass standard ATS requirements.", unlocked: false, videoUrl: "" },
        { id: "les-13", title: "Print-Ready Business Cards & Letterheads", titleTa: "அச்சிடக்கூடிய விசிட்டிங் கார்டுகள்", duration: "12:50", description: "Configure bleeds, trim marks, and print CMYK layouts correctly.", unlocked: false, videoUrl: "" }
      ]
    },
    {
      id: "mod-7",
      title: "Module 7: AI in Canva - Canva Magic Studio",
      titleTa: "கேன்பா ஏஐ (Canva AI) ரகசியங்கள்",
      lessons: [
        { id: "les-14", title: "Magic Eraser & Magic Expand", titleTa: "மேஜிக் எரேசர் மற்றும் இமேஜ் எக்ஸ்பான்ட்", duration: "16:15", description: "Command Canva AI to erase elements or expand boundaries intelligently.", unlocked: false, videoUrl: "" },
        { id: "les-15", title: "AI Text to Image & Magic Write", titleTa: "ஏஐ மூலம் படம் மற்றும் கட்டுரைகள்", duration: "14:10", description: "Generate beautiful original images and headlines directly inside your project using prompts.", unlocked: false, videoUrl: "" }
      ]
    },
    {
      id: "mod-8",
      title: "Module 8: Freelance Earning Blueprint & Fiverr Guide",
      titleTa: "ஃபிரீலான்சிங் மூலம் பணம் சம்பாதிப்பது எப்படி?",
      lessons: [
        { id: "les-16", title: "Fiverr Gigs Setup & Client Acquisition", titleTa: "ஃபைவர் கிக் அமைப்புகள் & வாடிக்கையாளர்கள்", duration: "32:40", description: "How to set up Canva graphic design gigs, bid on projects, and manage Tamil/international clients.", unlocked: false, videoUrl: "" },
        { id: "les-17", title: "Pricing Your Services & Invoice Design", titleTa: "விலை நிர்ணயம் மற்றும் பில் தயாரித்தல்", duration: "15:10", description: "Create price rate cards and invoices that stand out.", unlocked: false, videoUrl: "" }
      ]
    }
  ];

  const handleLessonClick = (lesson: any) => {
    if (lesson.unlocked || hasAccess) {
      onPreviewLesson(lesson.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4", lesson.title);
    } else {
      onEnrollClick();
    }
  };

  return (
    <section id="course-curriculum" className="py-16 bg-slate-900 border-b border-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-[11px] font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>LEARNING SYLLABUS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
            பாடத்திட்டம் <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">(What is inside the course?)</span>
          </h2>

        </div>

        {/* Modules Accordion */}
        <div className="space-y-3">
          {syllabusModules.map((mod) => {
            const isOpen = openModuleId === mod.id;
            return (
              <div 
                key={mod.id} 
                className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenModuleId(isOpen ? null : mod.id)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-900/60 transition-colors text-left"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-cyan-400 font-sans tracking-wide">{mod.title}</p>
                    <h3 className="text-sm font-bold text-slate-200">{mod.titleTa}</h3>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-500 ml-4 shrink-0">
                    <span className="text-[11px] bg-slate-900 px-2 py-0.5 rounded-full text-slate-400 font-semibold border border-slate-800">
                      {mod.lessons.length} Lessons
                    </span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-900 divide-y divide-slate-900 bg-slate-950/60">
                    {mod.lessons.map((lesson) => {
                      const isPlayable = lesson.unlocked || hasAccess;
                      return (
                        <div 
                          key={lesson.id} 
                          className="px-5 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between sm:space-x-4 hover:bg-slate-900/20 transition-colors group"
                        >
                          <div className="space-y-1 text-left flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">
                                {lesson.title}
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono">
                                ({lesson.titleTa})
                              </span>
                              {lesson.unlocked && !hasAccess && (
                                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.2 rounded border border-emerald-500/20">
                                  FREE PREVIEW
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 max-w-2xl leading-relaxed">
                              {lesson.description}
                            </p>
                          </div>

                          <div className="flex items-center space-x-3 mt-2 sm:mt-0 ml-auto sm:ml-4 shrink-0">
                            <span className="text-[11px] text-slate-500 font-mono">{lesson.duration}</span>
                            <button
                              onClick={() => handleLessonClick(lesson)}
                              id={`preview-lesson-${lesson.id}`}
                              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold font-sans transition-all duration-200 ${
                                isPlayable 
                                  ? "bg-slate-800 hover:bg-cyan-400 hover:text-slate-950 text-cyan-400 cursor-pointer"
                                  : "bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed"
                              }`}
                            >
                              {isPlayable ? (
                                <>
                                  <Play className="w-3 h-3 fill-current" />
                                  <span>Watch Trial</span>
                                </>
                              ) : (
                                <>
                                  <Lock className="w-3 h-3 text-slate-600" />
                                  <span>Locked</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>



      </div>
    </section>
  );
}
