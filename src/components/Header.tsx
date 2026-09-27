import React from 'react';
import { AttendeeProfile } from '../types';

interface HeaderProps {
  activeTab: 'organizer-dashboard' | 'attendee-generator';
  setActiveTab: (tab: 'organizer-dashboard' | 'attendee-generator') => void;
  onOpenHelpDocs: () => void;
  onOpenProfileSwitcher?: () => void;
  currentProfile: AttendeeProfile;
  liveEventName: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenHelpDocs,
  onOpenProfileSwitcher,
  currentProfile,
  liveEventName
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff] border-b border-[#cbc4d2]/30 shadow-[0_1px_3px_rgba(17,24,39,0.04)]">
      <div className="h-16 w-full px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div 
          className="flex items-center gap-3 shrink-0 cursor-pointer select-none"
          onClick={() => setActiveTab('organizer-dashboard')}
        >
          {/* Official EventPulse SVG Logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            width="32"
            height="32"
            fill="none"
            className="shrink-0"
          >
            <rect width="40" height="40" rx="10" fill="#8466C2" />
            <path
              d="M10 20H15L18 12L22 28L25 17L27 20H30"
              stroke="#FFFFFF"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="28" cy="13" r="2.5" fill="#EADCF8" />
          </svg>
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-[20px] font-bold text-[#141b2b] tracking-tight font-display-hero">
              EventPulse
            </span>
            <span className="font-label-caps text-[11px] uppercase bg-[#eaddff] text-[#52348e] px-2.5 py-0.5 rounded-full font-bold tracking-wider">
              Post Studio
            </span>
          </div>
        </div>

        {/* Center Pill Navigation */}
        <div className="flex items-center justify-center">
          <nav className="flex items-center p-1 bg-[#e9edff] rounded-full">
            <button
              onClick={() => setActiveTab('organizer-dashboard')}
              className={`px-4 sm:px-5 py-1.5 rounded-full transition-all text-sm font-semibold cursor-pointer ${
                activeTab === 'organizer-dashboard'
                  ? 'bg-[#8466c2] text-white shadow-sm'
                  : 'text-[#494551] hover:text-[#141b2b]'
              }`}
            >
              Organizer Dashboard
            </button>
            <button
              onClick={() => setActiveTab('attendee-generator')}
              className={`px-4 sm:px-5 py-1.5 rounded-full transition-all text-sm font-semibold cursor-pointer ${
                activeTab === 'attendee-generator'
                  ? 'bg-[#8466c2] text-white shadow-sm'
                  : 'text-[#494551] hover:text-[#141b2b]'
              }`}
            >
              Attendee Generator
            </button>
          </nav>
        </div>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            onClick={onOpenHelpDocs}
            className="hidden lg:inline-flex items-center text-sm font-semibold text-[#494551] hover:text-[#6b4da7] transition-colors cursor-pointer"
          >
            Help &amp; Docs
          </button>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#f1f3ff] rounded-full border border-[#dce2f7]/50">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs text-[#494551] font-medium">
              <span className="text-[#494551]/70">Live:</span> {liveEventName}
            </span>
          </div>

          <div 
            onClick={onOpenProfileSwitcher}
            className="flex items-center pl-1 cursor-pointer group"
            title={`Active attendee profile: ${currentProfile.name}. Click to switch.`}
          >
            <img
              alt={currentProfile.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#6b4da7]/30 group-hover:ring-[#6b4da7] transition-all"
              src={currentProfile.avatar}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
