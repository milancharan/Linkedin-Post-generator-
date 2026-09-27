import React, { useState } from 'react';
import { AttendeeProfile } from '../types';

interface ProfileSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: AttendeeProfile[];
  currentProfile: AttendeeProfile;
  onSelectProfile: (profile: AttendeeProfile) => void;
  onUpdateCurrentProfile: (profile: AttendeeProfile) => void;
  showToast: (msg: string) => void;
}

export const ProfileSwitcherModal: React.FC<ProfileSwitcherModalProps> = ({
  isOpen,
  onClose,
  profiles,
  currentProfile,
  onSelectProfile,
  onUpdateCurrentProfile,
  showToast
}) => {
  const [customName, setCustomName] = useState(currentProfile.name);
  const [customRole, setCustomRole] = useState(currentProfile.role);
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    onUpdateCurrentProfile({
      ...currentProfile,
      name: customName.trim(),
      role: customRole.trim()
    });
    setIsEditing(false);
    showToast(`Updated author profile to ${customName}!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full flex flex-col shadow-2xl overflow-hidden border border-[#cbc4d2]/30 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[#e9edff] flex items-center justify-between bg-[#f9f9ff]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#eaddff] text-[#25005a]">
              <span className="material-symbols-outlined text-[20px]">badge</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#141b2b] font-display-hero">
                Attendee Author Profile
              </h3>
              <p className="text-xs text-[#494551]">
                Simulate post generation from different attendee viewpoints
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

        {/* Preset Profiles */}
        <div className="p-5 flex flex-col gap-3">
          <label className="text-xs font-bold text-[#141b2b] uppercase tracking-wider">
            Select Test Attendee Persona
          </label>
          <div className="flex flex-col gap-2">
            {profiles.map((p) => {
              const isSelected = currentProfile.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProfile(p);
                    setCustomName(p.name);
                    setCustomRole(p.role);
                    showToast(`Switched profile to ${p.name}`);
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#8466c2] bg-[#f1f3ff]'
                      : 'border-[#cbc4d2]/30 hover:border-[#8466c2]/50 hover:bg-[#f9f9ff]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-[#cbc4d2]/40"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-[#141b2b] truncate">{p.name}</span>
                      <span className="text-[11px] text-[#494551] truncate">{p.role}</span>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="p-1 rounded-full bg-[#8466c2] text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Custom Edit Option */}
          <div className="pt-2 border-t border-[#e9edff] mt-2">
            {isEditing ? (
              <form onSubmit={handleSaveCustom} className="flex flex-col gap-2.5">
                <span className="text-xs font-bold text-[#141b2b]">Customize Name &amp; Title</span>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="px-3 py-2 text-xs border border-[#cbc4d2]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8466c2]"
                />
                <input
                  type="text"
                  placeholder="Your Professional Headline"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  className="px-3 py-2 text-xs border border-[#cbc4d2]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8466c2]"
                />
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 text-xs text-[#494551]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#8466c2] text-white text-xs font-bold rounded-full"
                  >
                    Save Persona
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-2 px-3 text-xs font-bold text-[#6b4da7] bg-[#eaddff]/40 hover:bg-[#eaddff]/70 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">edit</span>
                <span>Customize Current Persona Details</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f9f9ff] border-t border-[#e9edff] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#8466c2] hover:bg-[#6b4da7] text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
