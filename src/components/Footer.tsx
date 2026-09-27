import React from 'react';

interface FooterProps {
  onOpenHelpDocs?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenHelpDocs }) => {
  return (
    <footer className="w-full bg-[#ffffff] border-t border-[#cbc4d2]/30 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
          <span className="font-bold text-[#6b4da7] font-display-hero text-lg">
            EventPulse
          </span>
          <span className="text-xs text-[#494551]">
            © 2025 EventPulse Studio. Amplifier platform for attendees and organizers.
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs font-semibold text-[#494551]">
          <button
            onClick={onOpenHelpDocs}
            className="hover:text-[#6b4da7] transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            onClick={onOpenHelpDocs}
            className="hover:text-[#6b4da7] transition-colors cursor-pointer"
          >
            Terms of Service
          </button>
          <button
            onClick={onOpenHelpDocs}
            className="hover:text-[#6b4da7] transition-colors cursor-pointer"
          >
            LinkedIn Guidelines
          </button>
        </div>
      </div>
    </footer>
  );
};
