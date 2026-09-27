import React from 'react';

interface HelpDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToAttendee: () => void;
  onGoToOrganizer: () => void;
}

export const HelpDocsModal: React.FC<HelpDocsModalProps> = ({
  isOpen,
  onClose,
  onGoToAttendee,
  onGoToOrganizer
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-[#cbc4d2]/30 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[#e9edff] flex items-center justify-between bg-[#f9f9ff]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#eaddff] text-[#25005a]">
              <span className="material-symbols-outlined text-[20px]">menu_book</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#141b2b] font-display-hero">
                EventPulse Studio Documentation
              </h3>
              <p className="text-xs text-[#494551]">
                The conference viral loop amplifier for organizers and attendees
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#e9edff] text-[#494551] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6 text-[#141b2b]">
          {/* Section 1 */}
          <div>
            <h4 className="text-sm font-bold flex items-center gap-2 text-[#6b4da7]">
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              What is EventPulse?
            </h4>
            <p className="text-xs text-[#494551] mt-1.5 leading-relaxed">
              EventPulse transforms passive conference attendees into active brand amplifiers on LinkedIn. By lowering the cognitive effort of writing session takeaways from 15 minutes to 30 seconds, conferences experience an average <strong>3.8x increase in organic social reach</strong> during keynote weeks.
            </p>
          </div>

          {/* Section 2: Step-by-Step Flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#f1f3ff] border border-[#dce2f7] flex flex-col gap-2">
              <div className="flex items-center gap-2 font-bold text-xs text-[#141b2b]">
                <span className="w-5 h-5 rounded-full bg-[#8466c2] text-white flex items-center justify-center text-[11px]">1</span>
                For Organizers
              </div>
              <ul className="text-[12px] text-[#494551] flex flex-col gap-1.5 list-disc pl-4">
                <li>Configure public event title, hashtag sets, and social handles.</li>
                <li>Pre-seed keynote speaker quotes so attendees can 1-click cite them.</li>
                <li>Export high-resolution vector QR codes for badges, lanyards, and stage holding slides.</li>
                <li>Track live generation volume and estimated LinkedIn impressions.</li>
              </ul>
              <button
                onClick={() => {
                  onClose();
                  onGoToOrganizer();
                }}
                className="mt-2 text-xs font-bold text-[#6b4da7] hover:underline self-start"
              >
                Go to Organizer Dashboard →
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#f1f3ff] border border-[#dce2f7] flex flex-col gap-2">
              <div className="flex items-center gap-2 font-bold text-xs text-[#141b2b]">
                <span className="w-5 h-5 rounded-full bg-[#005eb5] text-white flex items-center justify-center text-[11px]">2</span>
                For Attendees
              </div>
              <ul className="text-[12px] text-[#494551] flex flex-col gap-1.5 list-disc pl-4">
                <li>Scan the event QR code or visit the short URL on mobile or laptop.</li>
                <li>Snap or select stage photos, speaker selfies, or expo shots.</li>
                <li>Jot down raw bullet points or tap curated speaker quotes.</li>
                <li>Pick your voice (Professional, Grateful, or Key Takeaways) and 1-click copy formatted draft to LinkedIn.</li>
              </ul>
              <button
                onClick={() => {
                  onClose();
                  onGoToAttendee();
                }}
                className="mt-2 text-xs font-bold text-[#005eb5] hover:underline self-start"
              >
                Go to Attendee Generator →
              </button>
            </div>
          </div>

          {/* Section 3: LinkedIn Algorithm Pro-Tips */}
          <div className="p-4 rounded-xl bg-[#eaddff]/30 border border-[#8466c2]/30 flex flex-col gap-2">
            <h5 className="text-xs font-bold text-[#52348e] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              LinkedIn Algorithm Maximization Tips
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#494551] mt-1">
              <div>
                <p className="font-bold text-[#141b2b]">Question Hooks</p>
                <p className="text-[11px] mt-0.5 leading-snug">
                  Closing posts with a focused question drives 43% higher comment dwell time.
                </p>
              </div>
              <div>
                <p className="font-bold text-[#141b2b]">3-5 Hashtags</p>
                <p className="text-[11px] mt-0.5 leading-snug">
                  Using 3 targeted event tags outperforms hashtag stuffing by 62%.
                </p>
              </div>
              <div>
                <p className="font-bold text-[#141b2b]">Photo Quality</p>
                <p className="text-[11px] mt-0.5 leading-snug">
                  Authentic candid stage photos get 2.4x more reposts than corporate logos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f9f9ff] border-t border-[#e9edff] flex items-center justify-between">
          <span className="text-xs text-[#494551]">
            EventPulse Post Studio • v2.4 Release
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#8466c2] hover:bg-[#6b4da7] text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
