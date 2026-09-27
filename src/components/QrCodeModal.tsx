import React, { useState } from 'react';
import { EventConfig } from '../types';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventConfig: EventConfig;
  showToast: (msg: string) => void;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onClose,
  eventConfig,
  showToast
}) => {
  const [downloadFormat, setDownloadFormat] = useState<'svg' | 'png'>('svg');

  if (!isOpen) return null;

  const portalUrl = `https://eventpulse.app/event/${eventConfig.portalSlug}`;

  const downloadSvg = () => {
    const svgElement = document.getElementById('qr-code-svg');
    if (!svgElement) return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElement);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${eventConfig.portalSlug}-qr-code.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Downloaded print-ready vector SVG QR code!');
  };

  const copyEmbedCode = () => {
    const embed = `<div style="text-align:center"><img src="${portalUrl}/qr.svg" alt="Scan to post on LinkedIn" /><p>Scan to generate your LinkedIn takeaway</p></div>`;
    navigator.clipboard.writeText(embed);
    showToast('Slide embed HTML copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full flex flex-col shadow-2xl overflow-hidden border border-[#cbc4d2]/30 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[#e9edff] flex items-center justify-between bg-[#f9f9ff]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#eaddff] text-[#25005a]">
              <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#141b2b] font-display-hero">
                Badge &amp; Slides QR Generator
              </h3>
              <p className="text-xs text-[#494551]">
                High-resolution vector assets for physical badges &amp; mainstage screens
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

        {/* QR Code Presentation */}
        <div className="p-6 flex flex-col items-center justify-center bg-white text-center">
          <div className="p-4 bg-white rounded-2xl shadow-md border-2 border-[#8466c2]/20 flex flex-col items-center">
            {/* High fidelity SVG QR representation */}
            <svg
              id="qr-code-svg"
              className="w-48 h-48 text-[#141b2b]"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" fill="#ffffff" />
              <path
                fill="#141b2b"
                d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v4h-4v-4zm-4 4h4v4h-4v-4zm0-4h2v2h-2v-2zm4-2h2v2h-2v-2zm-2-2h4v2h-4v-2zm-2 2h2v2h-2v-2z"
              />
              {/* EventPulse mini center badge */}
              <rect x="9.5" y="9.5" width="5" height="5" rx="1.5" fill="#8466C2" />
              <circle cx="12" cy="12" r="1.2" fill="#FFFFFF" />
            </svg>

            <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#6b4da7]">
              <span>EventPulse Smart Routing</span>
              <span className="material-symbols-outlined text-[14px]">bolt</span>
            </div>
          </div>

          <div className="mt-4 text-xs font-mono bg-[#f1f3ff] px-3 py-1.5 rounded-lg text-[#141b2b] border border-[#dce2f7] max-w-xs truncate">
            {portalUrl}
          </div>
          <p className="text-[11px] text-[#494551] mt-2 max-w-xs">
            Directs attendees straight to their pre-filled LinkedIn post generator with event branding and keynote takeaways pre-loaded.
          </p>
        </div>

        {/* Action Controls */}
        <div className="p-4 bg-[#f9f9ff] border-t border-[#e9edff] flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={downloadSvg}
              className="py-2.5 px-4 rounded-full bg-[#8466c2] hover:bg-[#6b4da7] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Export Vector SVG</span>
            </button>
            <button
              onClick={copyEmbedCode}
              className="py-2.5 px-4 rounded-full bg-white hover:bg-[#e9edff] text-[#141b2b] border border-[#cbc4d2]/40 text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">code</span>
              <span>Copy Slide Code</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-center text-xs text-[#494551] hover:text-[#141b2b] pt-1 cursor-pointer font-medium"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
