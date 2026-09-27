import React, { useState, useRef, useEffect } from 'react';
import { EventConfig, ConferencePhoto, AttendeeProfile, VoiceTone } from '../types';
import { SAMPLE_GENERATED_POSTS } from '../data/initialData';

interface AttendeeGeneratorProps {
  eventConfig: EventConfig;
  currentProfile: AttendeeProfile;
  photos: ConferencePhoto[];
  onAddPhoto: (photo: ConferencePhoto) => void;
  onRemovePhoto: (id: string) => void;
  showToast: (msg: string) => void;
  onOpenProfileSwitcher: () => void;
}

export const AttendeeGenerator: React.FC<AttendeeGeneratorProps> = ({
  eventConfig,
  currentProfile,
  photos,
  onAddPhoto,
  onRemovePhoto,
  showToast,
  onOpenProfileSwitcher
}) => {
  const [selectedPhotoId, setSelectedPhotoId] = useState<string>(photos[0]?.id || 'photo-1');
  const [notes, setNotes] = useState<string>(
    'Attended the opening keynote by Elena Vance on AI-augmented GTM workflows. Mind blown by the session on $0 to $20M ARR playbooks with the VentureScale crew! Key insight: prioritize customer retention loops early.'
  );
  const [selectedTone, setSelectedTone] = useState<VoiceTone>('Grateful Attendee');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  // Interactive LinkedIn Reactions
  const [hasLiked, setHasLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(142);
  const [commentsCount, setCommentsCount] = useState(28);
  const [repostsCount, setRepostsCount] = useState(9);

  // Generated post content
  const [postText, setPostText] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const postArticleRef = useRef<HTMLElement>(null);

  // Generate initial post based on default notes and tone
  useEffect(() => {
    const generator = SAMPLE_GENERATED_POSTS[selectedTone] || SAMPLE_GENERATED_POSTS['Grateful Attendee'];
    setPostText(generator(eventConfig, notes));
  }, [eventConfig, selectedTone]);

  const handleGenerate = (customNotes?: string, customTone?: VoiceTone) => {
    setIsGenerating(true);
    const activeNotes = customNotes !== undefined ? customNotes : notes;
    const activeTone = customTone !== undefined ? customTone : selectedTone;

    setTimeout(() => {
      const generator = SAMPLE_GENERATED_POSTS[activeTone] || SAMPLE_GENERATED_POSTS['Grateful Attendee'];
      setPostText(generator(eventConfig, activeNotes));
      setIsGenerating(false);
      showToast('LinkedIn post optimized with event hashtags & tags!');

      // Highlight pulse on preview
      if (postArticleRef.current) {
        postArticleRef.current.classList.add('ring-2', 'ring-[#8466c2]', 'shadow-xl');
        setTimeout(() => {
          postArticleRef.current?.classList.remove('ring-2', 'ring-[#8466c2]', 'shadow-xl');
        }, 1000);
      }
    }, 700);
  };

  const handleCopyPost = () => {
    navigator.clipboard.writeText(postText).then(() => {
      setIsCopied(true);
      showToast('Post copied! Paste directly into LinkedIn.');
      setTimeout(() => setIsCopied(false), 2400);
    }).catch(() => {
      setIsCopied(true);
      showToast('Copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2400);
    });
  };

  const handleLikeToggle = () => {
    if (hasLiked) {
      setHasLiked(false);
      setLikesCount(prev => prev - 1);
    } else {
      setHasLiked(true);
      setLikesCount(prev => prev + 1);
      showToast('Liked post preview');
    }
  };

  const handleQuickAdd = (snippet: string) => {
    const updatedNotes = notes ? `${notes}\n\n${snippet}` : snippet;
    setNotes(updatedNotes);
    showToast('Takeaway snippet added to notes');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const url = uploadEvent.target?.result as string;
        const newPhoto: ConferencePhoto = {
          id: `custom-${Date.now()}`,
          label: file.name.split('.')[0] || 'My Photo',
          url,
          caption: `Photo by ${currentProfile.name} • ${eventConfig.shortName}`,
          alt: file.name
        };
        onAddPhoto(newPhoto);
        setSelectedPhotoId(newPhoto.id);
        showToast('Photo uploaded and selected!');
      };
      reader.readAsDataURL(file);
    }
  };

  const selectedPhoto = photos.find(p => p.id === selectedPhotoId) || photos[0];

  return (
    <div className="flex flex-col w-full">
      {/* Event Banner Top Ribbon */}
      <div className="w-full bg-white rounded-2xl p-4 sm:p-6 shadow-sm mb-6 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 border border-[#cbc4d2]/20">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2 bg-[#eaddff]/50 px-3.5 py-1.5 rounded-full shrink-0 border border-[#8466c2]/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6b4da7] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#6b4da7]"></span>
            </span>
            <span className="text-[11px] uppercase text-[#6b4da7] font-bold tracking-wider">
              Official Event Space
            </span>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#141b2b] tracking-tight font-display-hero">
              {eventConfig.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#494551] mt-0.5">
              Hosted by <span className="font-semibold text-[#6b4da7]">{eventConfig.organizer.split('&')[0]?.trim()}</span>
              {eventConfig.organizer.includes('&') && (
                <> &amp; <span className="font-semibold text-[#005eb5]">{eventConfig.organizer.split('&')[1]?.trim()}</span></>
              )} • Moscone Center, SF
            </p>
          </div>
        </div>

        {/* Tags & Live Count */}
        <div className="flex flex-wrap items-center gap-2 pt-2 xl:pt-0">
          {eventConfig.hashtags.slice(0, 2).map((tag) => (
            <button
              key={tag}
              onClick={() => handleQuickAdd(tag)}
              className="bg-[#f1f3ff] hover:bg-[#e9edff] transition-colors px-3 py-1 rounded-full text-[#494551] text-xs font-medium flex items-center gap-1.5 cursor-pointer border border-[#dce2f7]"
            >
              <span className="text-[#6b4da7] font-bold">#</span>{tag.replace('#', '')}
            </button>
          ))}
          <button
            onClick={() => handleQuickAdd(`@${eventConfig.organizer.split('&')[0]?.trim()}`)}
            className="bg-[#f1f3ff] hover:bg-[#e9edff] transition-colors px-3 py-1 rounded-full text-[#494551] text-xs font-medium hidden md:flex items-center gap-1.5 cursor-pointer border border-[#dce2f7]"
          >
            <span className="material-symbols-outlined text-[15px] text-[#005eb5]">business</span>
            @{eventConfig.organizer.split('&')[0]?.trim().replace(/\s+/g, '')}
          </button>
          <div className="flex items-center gap-2 bg-[#e9edff] px-3.5 py-1 rounded-full ml-auto xl:ml-2 border border-[#8466c2]/20">
            <span className="material-symbols-outlined text-[16px] text-[#6b4da7]">groups</span>
            <span className="text-xs text-[#141b2b] font-semibold">
              {eventConfig.attendeeCount.toLocaleString()}+ attendees posting
            </span>
          </div>
        </div>
      </div>

      {/* Studio Split Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Generator Controls (col-span-12 lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Input Main Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-4 border border-[#cbc4d2]/20">
            {/* Header with AI Chip */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#6b4da7] text-[24px]">auto_awesome</span>
                <h2 className="text-xl font-bold text-[#141b2b] font-display-hero">Craft Your LinkedIn Post</h2>
              </div>
              <span className="bg-[#eaddff] text-[#25005a] text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                AI Studio 2.4
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#494551] -mt-2">
              Transform your stage notes and takeaways into an organic, high-reach post in seconds.
            </p>

            {/* Photo Upload Dropzone */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-[#141b2b] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#6b4da7]">add_a_photo</span>
                  Conference Photos &amp; Selfies
                </label>
                <span className="text-xs text-[#494551]/80">
                  {photos.length} available
                </span>
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />

              {/* Dotted drop target */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#f1f3ff] hover:bg-[#e9edff] transition-all cursor-pointer rounded-xl p-4 flex flex-col items-center justify-center text-center group border-2 border-dashed border-[#8466c2]/30 hover:border-[#8466c2]"
              >
                <div className="w-10 h-10 rounded-full bg-[#eaddff]/80 flex items-center justify-center text-[#6b4da7] group-hover:scale-110 transition-transform mb-2">
                  <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#141b2b]">Click to add or drag photos here</p>
                <p className="text-[11px] text-[#494551] max-w-xs mt-0.5">
                  Speaker selfies, keynote slides, or booth badges (PNG, JPG up to 10MB)
                </p>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                {photos.slice(0, 3).map((photo) => {
                  const isSelected = selectedPhotoId === photo.id;
                  return (
                    <div
                      key={photo.id}
                      onClick={() => setSelectedPhotoId(photo.id)}
                      className={`relative group rounded-xl overflow-hidden shadow-xs bg-[#e9edff] cursor-pointer transition-all ${
                        isSelected ? 'ring-2 ring-[#8466c2]' : 'hover:opacity-90'
                      }`}
                    >
                      <img
                        className="w-full h-20 object-cover"
                        src={photo.url}
                        alt={photo.alt}
                      />
                      <div className={`absolute inset-0 transition-colors ${
                        isSelected ? 'bg-black/20' : 'bg-black/10 group-hover:bg-black/25'
                      }`} />
                      {isSelected && (
                        <div className="absolute top-1.5 left-1.5 bg-[#8466c2] text-white rounded-full p-0.5 flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-[13px]">check</span>
                        </div>
                      )}
                      <span className="absolute bottom-1 left-1.5 text-[10px] text-white drop-shadow font-semibold truncate max-w-[85%]">
                        {photo.label}
                      </span>
                      {photo.id.startsWith('custom-') && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemovePhoto(photo.id);
                          }}
                          className="absolute top-1.5 right-1.5 bg-black/50 hover:bg-[#ba1a1a] text-white rounded-full p-0.5 transition-colors"
                          title="Remove uploaded image"
                        >
                          <span className="material-symbols-outlined text-[12px]">close</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Highlights / Raw Takeaways Area */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-[#141b2b] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#6b4da7]">edit_note</span>
                  Key Highlights &amp; Session Takeaways
                </label>
                <span className="text-[11px] text-[#494551] font-mono">
                  {notes.length} / 1,500 chars
                </span>
              </div>
              <div className="relative">
                <textarea
                  className="w-full bg-[#f9f9ff] border border-[#cbc4d2]/40 rounded-xl p-3 text-xs sm:text-sm text-[#141b2b] placeholder:text-[#494551]/50 focus:outline-none focus:ring-2 focus:ring-[#8466c2] shadow-inner resize-none transition-all leading-relaxed"
                  id="raw-notes-input"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Paste raw bullet points, speaker quotes, or session notes..."
                />
              </div>

              {/* Quick insert pill prompt buttons */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] uppercase text-[#494551] font-bold mr-1">Quick Add:</span>
                <button
                  type="button"
                  onClick={() => handleQuickAdd('"Prioritize customer retention loops early; compounding retention beats hyper-acquisition every time." — Elena Vance')}
                  className="bg-[#f1f3ff] hover:bg-[#e9edff] text-[#494551] hover:text-[#141b2b] transition-all px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer border border-[#dce2f7]"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#6b4da7]">format_quote</span>
                  + Elena Vance Quote
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAdd('Stopped by the VentureScale Innovation Booth for live architectural reviews!')}
                  className="bg-[#f1f3ff] hover:bg-[#e9edff] text-[#494551] hover:text-[#141b2b] transition-all px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer border border-[#dce2f7]"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#6b4da7]">storefront</span>
                  + Booth Mention
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAdd('If you are attending in person, let us connect over coffee at Moscone!')}
                  className="bg-[#f1f3ff] hover:bg-[#e9edff] text-[#494551] hover:text-[#141b2b] transition-all px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer border border-[#dce2f7]"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#6b4da7]">handshake</span>
                  + Networking Ask
                </button>
              </div>
            </div>

            {/* Tone Selector Chips */}
            <div className="flex flex-col gap-2 pt-1">
              <label className="text-sm font-semibold text-[#141b2b]">Select Voice &amp; Tone:</label>
              <div className="grid grid-cols-3 gap-2" id="tone-selector">
                {(['Professional', 'Grateful Attendee', 'Key Takeaways'] as VoiceTone[]).map((tone) => {
                  const isActive = selectedTone === tone;
                  return (
                    <button
                      key={tone}
                      type="button"
                      onClick={() => {
                        setSelectedTone(tone);
                        handleGenerate(notes, tone);
                      }}
                      className={`tone-pill px-2.5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#8466c2] text-white shadow-md shadow-[#8466c2]/20 font-bold scale-[1.02]'
                          : 'bg-[#f1f3ff] hover:bg-[#e9edff] text-[#494551] font-medium border border-[#dce2f7]'
                      }`}
                    >
                      {isActive && (
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      )}
                      <span className="truncate">{tone}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary CTA Generate Button */}
            <div className="pt-2">
              <button
                type="button"
                disabled={isGenerating}
                onClick={() => handleGenerate()}
                id="generate-btn"
                className="w-full bg-[#8466c2] hover:bg-[#6b4da7] text-white text-base font-bold py-3 px-6 rounded-full shadow-lg shadow-[#8466c2]/25 hover:shadow-xl hover:shadow-[#8466c2]/35 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.99] disabled:opacity-75"
              >
                <span className={`material-symbols-outlined text-[20px] ${isGenerating ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'}`}>
                  {isGenerating ? 'refresh' : 'bolt'}
                </span>
                <span>{isGenerating ? 'Optimizing LinkedIn Draft...' : 'Generate LinkedIn Post'}</span>
              </button>
              <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[#494551]">
                <span className="material-symbols-outlined text-[14px] text-emerald-600">verified</span>
                <span className="text-xs">Optimized for LinkedIn algorithm reach &amp; engagement</span>
              </div>
            </div>
          </div>

          {/* Quick Tips Bento Microcard */}
          <div className="bg-[#f1f3ff] rounded-2xl p-4 flex items-center gap-4 border border-[#dce2f7]">
            <div className="w-10 h-10 rounded-full bg-[#d6e3ff] flex items-center justify-center text-[#001b3d] shrink-0">
              <span className="material-symbols-outlined text-[20px]">lightbulb</span>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-bold text-[#141b2b]">Pro tip for 2x engagement</h4>
              <p className="text-xs text-[#494551] mt-0.5">
                Posts with a question in the final line receive 43% more comments during conference week.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Realistic Live LinkedIn Post Preview (col-span-12 lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col gap-4 lg:sticky lg:top-20">
          {/* Preview Header Ribbon */}
          <div className="flex items-center justify-between bg-white rounded-2xl px-5 py-3 shadow-xs border border-[#cbc4d2]/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#005eb5] text-[20px]">visibility</span>
              <span className="text-sm font-bold text-[#141b2b] font-display-hero">Live Post Preview</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Algorithm Ready
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-[#f1f3ff] rounded-full p-0.5 text-xs font-semibold border border-[#dce2f7]">
                <button
                  type="button"
                  onClick={() => setPreviewMode('desktop')}
                  className={`px-3 py-1 rounded-full cursor-pointer transition-all ${
                    previewMode === 'desktop'
                      ? 'bg-white text-[#141b2b] shadow-xs'
                      : 'text-[#494551] hover:text-[#141b2b]'
                  }`}
                >
                  Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('mobile')}
                  className={`px-3 py-1 rounded-full cursor-pointer transition-all ${
                    previewMode === 'mobile'
                      ? 'bg-white text-[#141b2b] shadow-xs'
                      : 'text-[#494551] hover:text-[#141b2b]'
                  }`}
                >
                  Mobile Feed
                </button>
              </div>
              <button
                type="button"
                onClick={onOpenProfileSwitcher}
                className="p-1 rounded-full hover:bg-[#f1f3ff] text-[#494551] transition-colors cursor-pointer"
                title="Switch attendee author"
              >
                <span className="material-symbols-outlined text-[18px]">switch_account</span>
              </button>
            </div>
          </div>

          {/* Real LinkedIn Card Mockup Container */}
          <div className={`w-full transition-all duration-300 ${previewMode === 'mobile' ? 'max-w-md mx-auto' : ''}`}>
            <article
              ref={postArticleRef}
              className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 border border-[#cbc4d2]/30"
            >
              {/* Author Info Header */}
              <div className="p-4 pb-2 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    alt={currentProfile.name}
                    className="w-12 h-12 rounded-full object-cover shadow-xs ring-1 ring-[#cbc4d2]/30 cursor-pointer"
                    src={currentProfile.avatar}
                    onClick={onOpenProfileSwitcher}
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span
                        onClick={onOpenProfileSwitcher}
                        className="text-sm font-bold text-[#141b2b] hover:text-[#005eb5] hover:underline cursor-pointer"
                      >
                        {currentProfile.name}
                      </span>
                      <span className="text-[10px] text-[#494551]/70 font-semibold">• 1st</span>
                    </div>
                    <p className="text-xs text-[#494551] leading-tight truncate max-w-xs sm:max-w-md">
                      {currentProfile.role}
                    </p>
                    <div className="flex items-center gap-1 text-[#494551]/70 text-[11px] mt-0.5">
                      <span>2h</span>
                      <span>•</span>
                      <span>Edited</span>
                      <span>•</span>
                      <span className="material-symbols-outlined text-[13px] leading-none">public</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="text-[#494551] hover:text-[#141b2b] p-1 rounded-full transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                  </button>
                </div>
              </div>

              {/* Post Body Content */}
              <div
                className="px-4 py-2 text-sm text-[#141b2b] leading-relaxed whitespace-pre-line select-text"
                id="post-content-container"
              >
                {postText}
              </div>

              {/* Post Media Asset */}
              {selectedPhoto && (
                <div className="relative w-full aspect-video bg-[#e9edff] overflow-hidden group">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                    src={selectedPhoto.url}
                    alt={selectedPhoto.alt}
                  />
                  <div className="absolute bottom-3 left-3 bg-[#141b2b]/85 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <span className="material-symbols-outlined text-[14px] text-[#d1bcff]">photo_camera</span>
                    <span>{selectedPhoto.caption}</span>
                  </div>
                </div>
              )}

              {/* Social Proof Stats Row */}
              <div className="px-4 py-2.5 flex items-center justify-between text-xs text-[#494551] border-b border-[#e9edff]/80">
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-1 items-center">
                    <span className="w-4 h-4 rounded-full bg-[#005eb5] flex items-center justify-center text-white text-[9px] shadow-xs">
                      👍
                    </span>
                    <span className="w-4 h-4 rounded-full bg-[#ba1a1a] flex items-center justify-center text-white text-[9px] shadow-xs">
                      ❤️
                    </span>
                    <span className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-white text-[9px] shadow-xs">
                      💡
                    </span>
                  </div>
                  <span
                    onClick={handleLikeToggle}
                    className="hover:text-[#005eb5] hover:underline cursor-pointer font-medium"
                  >
                    {likesCount}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hover:text-[#005eb5] hover:underline cursor-pointer">
                    {commentsCount} comments
                  </span>
                  <span>•</span>
                  <span className="hover:text-[#005eb5] hover:underline cursor-pointer">
                    {repostsCount} reposts
                  </span>
                </div>
              </div>

              {/* Classic LinkedIn Social Interaction Bar */}
              <div className="px-2 py-1 mx-3 mb-2 mt-1 bg-[#f1f3ff] rounded-xl grid grid-cols-4 gap-1 text-center text-xs text-[#494551] font-semibold">
                <button
                  type="button"
                  onClick={handleLikeToggle}
                  className={`flex items-center justify-center gap-1.5 py-2 hover:bg-[#e9edff] rounded-lg transition-colors cursor-pointer ${
                    hasLiked ? 'text-[#005eb5] font-bold' : 'text-[#141b2b]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {hasLiked ? 'thumb_up' : 'thumb_up'}
                  </span>
                  <span className="hidden sm:inline">{hasLiked ? 'Liked' : 'Like'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCommentsCount(prev => prev + 1);
                    showToast('Comment simulated');
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 hover:bg-[#e9edff] rounded-lg transition-colors cursor-pointer text-[#141b2b]"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span className="hidden sm:inline">Comment</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRepostsCount(prev => prev + 1);
                    showToast('Repost simulated');
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 hover:bg-[#e9edff] rounded-lg transition-colors cursor-pointer text-[#141b2b]"
                >
                  <span className="material-symbols-outlined text-[18px]">repeat</span>
                  <span className="hidden sm:inline">Repost</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyPost}
                  className="flex items-center justify-center gap-1.5 py-2 hover:bg-[#e9edff] rounded-lg transition-colors cursor-pointer text-[#141b2b]"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
            </article>
          </div>

          {/* Preview Action Controls */}
          <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3 border border-[#cbc4d2]/20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Copy Text Button */}
              <button
                type="button"
                onClick={handleCopyPost}
                id="copy-btn"
                className={`py-2.5 px-4 rounded-full font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98] ${
                  isCopied
                    ? 'bg-[#eaddff] text-[#25005a] border border-[#8466c2]'
                    : 'bg-[#f1f3ff] hover:bg-[#e9edff] text-[#141b2b] border border-[#dce2f7]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px] text-[#6b4da7]" id="copy-icon">
                  {isCopied ? 'check' : 'content_copy'}
                </span>
                <span id="copy-text">{isCopied ? 'Copied to Clipboard!' : 'Copy Post Text'}</span>
              </button>

              {/* Regenerate Button */}
              <button
                type="button"
                onClick={() => handleGenerate()}
                id="regen-btn"
                className="bg-[#f1f3ff] hover:bg-[#e9edff] text-[#141b2b] text-xs sm:text-sm py-2.5 px-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98] border border-[#dce2f7]"
              >
                <span className="material-symbols-outlined text-[18px] text-[#494551]">refresh</span>
                <span>Regenerate</span>
              </button>

              {/* Open LinkedIn Button */}
              <a
                href="https://www.linkedin.com/feed/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  navigator.clipboard.writeText(postText);
                  showToast('Post copied to clipboard! Ready to paste into LinkedIn feed.');
                }}
                className="bg-[#005eb5] hover:bg-[#00468a] text-white text-xs sm:text-sm py-2.5 px-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 shadow-md shadow-[#005eb5]/20 cursor-pointer active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                <span>Open LinkedIn</span>
              </a>
            </div>

            <div className="flex items-center justify-between text-[#494551] text-xs pt-1 px-1">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-[#6b4da7]">touch_app</span>
                <span>1-click copy formatted text ready to paste directly into your LinkedIn feed.</span>
              </div>
              <span className="hidden md:inline-block text-[11px] text-[#6b4da7] uppercase font-bold tracking-wider">
                Hashtags Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
