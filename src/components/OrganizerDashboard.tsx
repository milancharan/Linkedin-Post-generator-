import React, { useState } from 'react';
import { EventConfig, PromptQuote } from '../types';

interface OrganizerDashboardProps {
  eventConfig: EventConfig;
  setEventConfig: React.Dispatch<React.SetStateAction<EventConfig>>;
  onPreviewAttendeeFlow: () => void;
  onOpenEditPrompts: () => void;
  onOpenQrModal: () => void;
  quotesCount: number;
  showToast: (msg: string) => void;
}

export const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({
  eventConfig,
  setEventConfig,
  onPreviewAttendeeFlow,
  onOpenEditPrompts,
  onOpenQrModal,
  quotesCount,
  showToast
}) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');
  const [showAddTagInput, setShowAddTagInput] = useState(false);

  const handleCopyLink = () => {
    const portalUrl = `eventpulse.app/event/${eventConfig.portalSlug}`;
    navigator.clipboard.writeText(portalUrl).then(() => {
      setIsCopied(true);
      showToast('Portal link copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2200);
    }).catch(() => {
      showToast('Portal link copied!');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    });
  };

  const handlePublishUpdates = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      showToast('Event configuration published to all attendee portals!');
    }, 1200);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEventConfig(prev => ({
      ...prev,
      hashtags: prev.hashtags.filter(t => t !== tagToRemove)
    }));
  };

  const handleAddTag = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newTagInput.trim()) return;
    let formatted = newTagInput.trim();
    if (!formatted.startsWith('#')) {
      formatted = '#' + formatted;
    }
    // Prevent duplicates
    if (!eventConfig.hashtags.includes(formatted)) {
      setEventConfig(prev => ({
        ...prev,
        hashtags: [...prev.hashtags, formatted]
      }));
    }
    setNewTagInput('');
    setShowAddTagInput(false);
    showToast(`Added ${formatted}`);
  };

  const handleSaveAndGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    handleCopyLink();
    showToast('Event configuration saved. Share links updated!');
  };

  const handleReset = () => {
    setEventConfig({
      name: 'SaaS Innovate & Scale Summit 2025',
      shortName: 'SaaS Innovate 2025',
      organizer: 'VentureScale Global & TechPulse',
      dates: 'Oct 24-26, 2025',
      location: 'San Francisco, CA • Moscone Center West & Live Stream',
      hashtags: ['#SaaSInnovate2025', '#FutureOfSaaS', '#B2BGrowth', '#ProductLed'],
      linkedinHandle: 'company/venturescaleglobal',
      twitterHandle: 'SaaSInnovateConf',
      websiteUrl: 'https://saassummit2025.io',
      portalSlug: 'saas-innovate-2025',
      attendeeCount: 1248
    });
    showToast('Reset to default event settings');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Ambient Glow Decorator */}
      <div className="relative w-full">
        <div className="absolute -top-10 left-1/3 w-96 h-48 bg-[#8466c2]/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-20 right-10 w-72 h-44 bg-[#005eb5]/10 rounded-full blur-2xl pointer-events-none -z-10"></div>

        {/* Page Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-[11px] uppercase text-[#6b4da7] font-bold tracking-wider">
                Live Management Console
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#141b2b] tracking-tight font-display-hero">
              Organizer Dashboard
            </h1>
            <p className="text-sm sm:text-base text-[#494551] max-w-2xl">
              Configure your event profile, manage attendee post prompts, and track social reach in real time.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onPreviewAttendeeFlow}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#141b2b] text-sm font-semibold shadow-sm hover:bg-[#e9edff] transition-all cursor-pointer border border-[#cbc4d2]/30 active:scale-95"
              id="previewFlowBtn"
            >
              <span className="material-symbols-outlined text-[#6b4da7] text-[19px]">visibility</span>
              <span>Preview Attendee Flow</span>
            </button>
            <button
              onClick={handlePublishUpdates}
              disabled={isPublishing}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#8466c2] text-white text-sm font-semibold shadow-md hover:bg-[#6b4da7] transition-all cursor-pointer active:scale-95 disabled:opacity-75"
              id="publishUpdatesBtn"
            >
              <span className={`material-symbols-outlined text-white text-[19px] ${isPublishing ? 'animate-spin' : ''}`}>
                {isPublishing ? 'refresh' : 'rocket_launch'}
              </span>
              <span>{isPublishing ? 'Publishing...' : 'Publish Updates'}</span>
            </button>
          </div>
        </div>

        {/* Main Content 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Create/Edit Event Form (Span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#cbc4d2]/20">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#e9edff]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#eaddff] text-[#25005a]">
                    <span className="material-symbols-outlined text-[22px]">event_note</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#141b2b] font-display-hero">Event Configuration</h2>
                    <p className="text-xs text-[#494551]">Central metadata for your attendee social engine</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active Edition
                </span>
              </div>

              {/* Form Fields Container */}
              <form className="flex flex-col gap-4" onSubmit={handleSaveAndGenerate}>
                {/* Event Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-[#141b2b] font-semibold flex items-center justify-between">
                    <span>Event Name <span className="text-[#ba1a1a]">*</span></span>
                    <span className="text-[11px] uppercase tracking-wider text-[#494551]/80">Public Title</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-[#6b4da7] text-[20px] pointer-events-none">
                      calendar_month
                    </span>
                    <input
                      className="w-full pl-11 pr-4 py-2.5 bg-white border border-[#cbc4d2]/40 text-[#141b2b] rounded-xl text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-[#8466c2] transition-all"
                      placeholder="e.g. Developer Week Global 2025"
                      type="text"
                      value={eventConfig.name}
                      onChange={(e) => setEventConfig({ ...eventConfig, name: e.target.value })}
                    />
                  </div>
                </div>

                {/* Organizer / Company Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-[#141b2b] font-semibold flex items-center justify-between">
                    <span>Organizer / Company Host</span>
                    <span className="text-[11px] uppercase tracking-wider text-[#494551]/80">Brand Authority</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-[#494551] text-[20px] pointer-events-none">
                      apartment
                    </span>
                    <input
                      className="w-full pl-11 pr-4 py-2.5 bg-white border border-[#cbc4d2]/40 text-[#141b2b] rounded-xl text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-[#8466c2] transition-all"
                      placeholder="e.g. Acme Media Corp"
                      type="text"
                      value={eventConfig.organizer}
                      onChange={(e) => setEventConfig({ ...eventConfig, organizer: e.target.value })}
                    />
                  </div>
                </div>

                {/* Recommended Hashtags */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-[#141b2b] font-semibold">Recommended Hashtags</label>
                    <span className="text-xs text-[#494551]">Appended to attendee prompts</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 p-3 bg-[#f1f3ff] rounded-xl min-h-[52px]" id="hashtagList">
                    {eventConfig.hashtags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-white text-[#6b4da7] text-xs font-semibold rounded-full shadow-xs border border-[#cbc4d2]/30"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-[#ba1a1a] transition-colors flex items-center ml-0.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </span>
                    ))}

                    {showAddTagInput ? (
                      <div className="inline-flex items-center gap-1">
                        <input
                          type="text"
                          autoFocus
                          placeholder="#Topic"
                          value={newTagInput}
                          onChange={(e) => setNewTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddTag();
                            } else if (e.key === 'Escape') {
                              setShowAddTagInput(false);
                            }
                          }}
                          className="px-2.5 py-0.5 text-xs bg-white border border-[#8466c2] rounded-full focus:outline-none text-[#6b4da7] font-semibold w-28"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddTag()}
                          className="p-1 bg-[#8466c2] text-white rounded-full hover:bg-[#6b4da7] transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[13px]">check</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddTagInput(false)}
                          className="p-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[13px]">close</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowAddTagInput(true)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-[#8466c2]/10 hover:bg-[#8466c2]/20 text-[#6b4da7] text-xs font-semibold rounded-full transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[15px]">add</span>
                        <span>Add tag</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Social Links Section */}
                <div className="mt-2 pt-2 flex flex-col gap-3">
                  <span className="text-[11px] uppercase text-[#494551] tracking-wider font-bold">
                    Connected Social Links &amp; Badging
                  </span>

                  {/* LinkedIn Company Page */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-[#141b2b] font-semibold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#005eb5]">work</span>
                      LinkedIn Organization Handle / Page
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-[#494551] text-xs font-semibold select-none">
                        in/
                      </span>
                      <input
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#cbc4d2]/40 text-[#141b2b] rounded-xl text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-[#8466c2] transition-all"
                        type="text"
                        value={eventConfig.linkedinHandle}
                        onChange={(e) => setEventConfig({ ...eventConfig, linkedinHandle: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* X / Twitter Handle */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-[#141b2b] font-semibold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#141b2b]">alternate_email</span>
                      X (formerly Twitter) Community Handle
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-[#494551] text-[18px] pointer-events-none">
                        tag
                      </span>
                      <input
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-[#cbc4d2]/40 text-[#141b2b] rounded-xl text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-[#8466c2] transition-all"
                        type="text"
                        value={eventConfig.twitterHandle}
                        onChange={(e) => setEventConfig({ ...eventConfig, twitterHandle: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Official Website */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-[#141b2b] font-semibold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#6b4da7]">public</span>
                      Official Event Website
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-[#494551] text-[18px] pointer-events-none">
                        link
                      </span>
                      <input
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-[#cbc4d2]/40 text-[#141b2b] rounded-xl text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-[#8466c2] transition-all"
                        type="url"
                        value={eventConfig.websiteUrl}
                        onChange={(e) => setEventConfig({ ...eventConfig, websiteUrl: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Form Action Footer */}
                <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#e9edff]">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 py-2 rounded-full text-xs font-semibold text-[#494551] hover:text-[#141b2b] hover:bg-[#e9edff] transition-all cursor-pointer"
                  >
                    Reset Changes
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#8466c2] hover:bg-[#6b4da7] text-white text-sm font-semibold rounded-full shadow-md transition-all cursor-pointer active:scale-95"
                    id="saveShareBtn"
                  >
                    <span className="material-symbols-outlined text-[18px]">share</span>
                    <span>Save &amp; Generate Share Links</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Speaker & Topic Quick Prompt Booster Card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#cbc4d2]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-[#d6e3ff] text-[#001b3d]">
                  <span className="material-symbols-outlined text-[20px]">psychology</span>
                </div>
                <div>
                  <p className="font-bold text-[#141b2b] text-[15px] font-display-hero">AI Prompt Pre-Seeding</p>
                  <p className="text-xs text-[#494551] mt-0.5">
                    {quotesCount} curated keynote quotes already loaded into attendee draft options.
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenEditPrompts}
                className="px-4 py-1.5 rounded-full bg-[#e9edff] text-xs font-semibold text-[#141b2b] hover:bg-[#dce2f7] transition-all shrink-0 cursor-pointer"
              >
                Edit Prompts
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Event Overview & Shareable Attendee Kit (Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Live Event Card with Gradient Banner */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-[#cbc4d2]/20">
              {/* Gradient Mini Banner with Dynamic Event Visuals */}
              <div className="relative bg-gradient-to-r from-[#8466c2] via-[#8364ca] to-[#005eb5] p-6 text-white">
                <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
                <div className="relative flex flex-col gap-2 z-10">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[13px]">location_on</span>
                      San Francisco, CA
                    </span>
                    <span className="text-white/90 text-xs font-medium">3-Day Conference</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white leading-tight mt-1 font-display-hero">
                    {eventConfig.shortName || eventConfig.name}
                  </h3>
                  <p className="text-xs text-white/90">
                    {eventConfig.dates} • Moscone Center West &amp; Live Stream
                  </p>
                </div>
              </div>

              {/* Attendee Share Link Module */}
              <div className="p-6 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] uppercase text-[#6b4da7] font-bold tracking-wider">
                    Attendee Post Generator Portal
                  </span>
                  <p className="text-xs text-[#494551]">
                    Share this link with attendees via QR codes, stage slides, and email digests.
                  </p>
                </div>

                {/* URL Input + Copy Button */}
                <div className="flex flex-col sm:flex-row items-center gap-2 p-1.5 bg-[#f1f3ff] rounded-xl border border-[#dce2f7]">
                  <div className="flex items-center gap-2 px-3 py-2 w-full text-[#141b2b] text-xs truncate">
                    <span className="material-symbols-outlined text-[#6b4da7] text-[18px] shrink-0">link</span>
                    <span className="font-mono text-[#141b2b] truncate" id="portalUrl">
                      eventpulse.app/event/{eventConfig.portalSlug}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className={`w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 ${
                      isCopied ? 'bg-emerald-600' : 'bg-[#8466c2] hover:bg-[#6b4da7]'
                    } text-white text-xs font-semibold rounded-lg shadow-sm transition-all shrink-0 cursor-pointer active:scale-95`}
                    id="copyLinkBtn"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isCopied ? 'check' : 'content_copy'}
                    </span>
                    <span id="copyButtonText">{isCopied ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                </div>

                {/* Portal Status Indicator */}
                <div className="flex items-center justify-between text-[#494551] text-xs pt-1">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Link Active &amp; Ready
                  </span>
                  <span className="flex items-center gap-1 text-[#494551] font-medium">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span>
                    1,420 visits this week
                  </span>
                </div>
              </div>
            </div>

            {/* Post Metrics & Engagement Summary Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#cbc4d2]/20 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#141b2b] font-display-hero">Engagement Pulse</h3>
                <span className="text-[11px] uppercase bg-[#eaddff] text-[#52348e] px-2.5 py-0.5 rounded-full font-bold">
                  Real-Time
                </span>
              </div>

              {/* 3-Column Micro-Grid Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col p-3 rounded-xl bg-[#f1f3ff] border border-[#dce2f7]/60">
                  <span className="text-[10px] text-[#494551] uppercase font-bold tracking-wider">Generated</span>
                  <span className="text-xl font-bold text-[#6b4da7] mt-1 font-display-hero">
                    {eventConfig.attendeeCount.toLocaleString()}
                  </span>
                  <span className="text-emerald-600 font-semibold text-[11px] mt-0.5">+18% YoY</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl bg-[#f1f3ff] border border-[#dce2f7]/60">
                  <span className="text-[10px] text-[#494551] uppercase font-bold tracking-wider">Reach Est.</span>
                  <span className="text-xl font-bold text-[#141b2b] mt-1 font-display-hero">482K</span>
                  <span className="text-[#494551] text-[11px] mt-0.5">LinkedIn Views</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl bg-[#f1f3ff] border border-[#dce2f7]/60">
                  <span className="text-[10px] text-[#494551] uppercase font-bold tracking-wider">Share Rate</span>
                  <span className="text-xl font-bold text-[#005eb5] mt-1 font-display-hero">94.2%</span>
                  <span className="text-emerald-600 font-semibold text-[11px] mt-0.5">High Virality</span>
                </div>
              </div>

              {/* Micro SVG Sparkline Chart */}
              <div className="w-full flex flex-col gap-1 p-3 rounded-xl bg-[#f1f3ff]/70 border border-[#dce2f7]/60">
                <div className="flex items-center justify-between text-xs text-[#494551]">
                  <span>Viral Distribution (Hourly Velocity)</span>
                  <span className="text-[#6b4da7] font-semibold">Peak: Keynote 2</span>
                </div>
                <div className="w-full h-12 flex items-end">
                  <svg className="w-full h-full text-[#8466C2]" fill="none" preserveAspectRatio="none" viewBox="0 0 320 48">
                    <defs>
                      <linearGradient id="metricGrad" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#8466C2" stopOpacity="0.4"></stop>
                        <stop offset="100%" stopColor="#8466C2" stopOpacity="0.0"></stop>
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,40 Q30,35 60,38 T120,25 T180,10 T240,22 T320,5 L320,48 L0,48 Z"
                      fill="url(#metricGrad)"
                    ></path>
                    <path
                      d="M0,40 Q30,35 60,38 T120,25 T180,10 T240,22 T320,5"
                      fill="none"
                      stroke="#8466C2"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* Recent Attendee Activity Micro-Feed */}
              <div className="flex flex-col gap-2 pt-1">
                <span className="text-[11px] uppercase text-[#494551] font-bold tracking-wider">
                  Recent Amplifications
                </span>
                
                {/* Row 1 */}
                <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#f1f3ff] transition-all">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#eaddff] text-[#25005a] font-bold text-xs flex items-center justify-center shrink-0">
                      SJ
                    </div>
                    <div className="flex flex-col min-w-0">
                      <p className="text-xs text-[#141b2b] font-semibold truncate">Sarah Jenkins</p>
                      <p className="text-[11px] text-[#494551] truncate">Shared Keynote Takeaway • 12m ago</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#d6e3ff] text-[#001b3d] text-[10px] font-bold shrink-0">
                    LinkedIn
                  </span>
                </div>

                {/* Row 2 */}
                <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#f1f3ff] transition-all">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#d6e3ff] text-[#001b3d] font-bold text-xs flex items-center justify-center shrink-0">
                      MK
                    </div>
                    <div className="flex flex-col min-w-0">
                      <p className="text-xs text-[#141b2b] font-semibold truncate">Marcus Klein</p>
                      <p className="text-[11px] text-[#494551] truncate">Shared Speaker Praise • 35m ago</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#d6e3ff] text-[#001b3d] text-[10px] font-bold shrink-0">
                    LinkedIn
                  </span>
                </div>

                {/* Row 3 */}
                <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#f1f3ff] transition-all">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#e1e8fd] text-[#141b2b] font-bold text-xs flex items-center justify-center shrink-0">
                      ER
                    </div>
                    <div className="flex flex-col min-w-0">
                      <p className="text-xs text-[#141b2b] font-semibold truncate">Elena Rostova</p>
                      <p className="text-[11px] text-[#494551] truncate">Shared Contrarian Thread • 1h ago</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#d6e3ff] text-[#001b3d] text-[10px] font-bold shrink-0">
                    LinkedIn
                  </span>
                </div>
              </div>

              {/* Quick QR Code Snippet for Badges or Stage Screens */}
              <div className="p-3 bg-[#f1f3ff] rounded-xl flex items-center justify-between gap-3 border border-[#dce2f7]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-lg p-1.5 shadow-xs flex items-center justify-center shrink-0 border border-[#cbc4d2]/30">
                    <svg className="w-full h-full text-[#141b2b]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v4h-4v-4zm-4 4h4v4h-4v-4zm0-4h2v2h-2v-2zm4-2h2v2h-2v-2zm-2-2h4v2h-4v-2zm-2 2h2v2h-2v-2z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-[#141b2b] font-semibold">Badge &amp; Slides QR Generator</span>
                    <span className="text-[11px] text-[#494551]">Export print-ready vectors for lanyards</span>
                  </div>
                </div>
                <button
                  onClick={onOpenQrModal}
                  className="px-3 py-1.5 rounded-full bg-white text-[#6b4da7] text-xs font-semibold hover:bg-[#6b4da7] hover:text-white transition-all shadow-xs shrink-0 cursor-pointer border border-[#8466c2]/30"
                >
                  Export SVG
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
