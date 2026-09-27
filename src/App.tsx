/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OrganizerDashboard } from './components/OrganizerDashboard';
import { AttendeeGenerator } from './components/AttendeeGenerator';
import { EditPromptsModal } from './components/EditPromptsModal';
import { QrCodeModal } from './components/QrCodeModal';
import { HelpDocsModal } from './components/HelpDocsModal';
import { ProfileSwitcherModal } from './components/ProfileSwitcherModal';
import { Toast } from './components/Toast';
import {
  INITIAL_EVENT_CONFIG,
  INITIAL_PHOTOS,
  PRESEEDED_QUOTES,
  ATTENDEE_PROFILES
} from './data/initialData';
import { EventConfig, ConferencePhoto, PromptQuote, AttendeeProfile } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'organizer-dashboard' | 'attendee-generator'>('organizer-dashboard');
  
  // Event state (shared across organizer & attendee views)
  const [eventConfig, setEventConfig] = useState<EventConfig>(INITIAL_EVENT_CONFIG);
  const [photos, setPhotos] = useState<ConferencePhoto[]>(INITIAL_PHOTOS);
  const [quotes, setQuotes] = useState<PromptQuote[]>(PRESEEDED_QUOTES);
  
  // Attendee personas
  const [profiles, setProfiles] = useState<AttendeeProfile[]>(ATTENDEE_PROFILES);
  const [currentProfile, setCurrentProfile] = useState<AttendeeProfile>(ATTENDEE_PROFILES[0]);

  // Modals state
  const [isEditPromptsOpen, setIsEditPromptsOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isHelpDocsOpen, setIsHelpDocsOpen] = useState(false);
  const [isProfileSwitcherOpen, setIsProfileSwitcherOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleAddPhoto = (newPhoto: ConferencePhoto) => {
    setPhotos(prev => [newPhoto, ...prev]);
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
    showToast('Photo removed');
  };

  const handleUpdateCurrentProfile = (updated: AttendeeProfile) => {
    setCurrentProfile(updated);
    setProfiles(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9ff] text-[#141b2b] font-body-md antialiased selection:bg-[#eaddff] selection:text-[#25005a]">
      {/* Top Fixed Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenHelpDocs={() => setIsHelpDocsOpen(true)}
        onOpenProfileSwitcher={() => setIsProfileSwitcherOpen(true)}
        currentProfile={currentProfile}
        liveEventName={eventConfig.shortName || eventConfig.name}
      />

      {/* Main Body Content with padding for fixed header */}
      <main className="w-full pt-16 bg-[#f9f9ff] flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {activeTab === 'organizer-dashboard' ? (
            <OrganizerDashboard
              eventConfig={eventConfig}
              setEventConfig={setEventConfig}
              onPreviewAttendeeFlow={() => setActiveTab('attendee-generator')}
              onOpenEditPrompts={() => setIsEditPromptsOpen(true)}
              onOpenQrModal={() => setIsQrModalOpen(true)}
              quotesCount={quotes.length}
              showToast={showToast}
            />
          ) : (
            <AttendeeGenerator
              eventConfig={eventConfig}
              currentProfile={currentProfile}
              photos={photos}
              onAddPhoto={handleAddPhoto}
              onRemovePhoto={handleRemovePhoto}
              showToast={showToast}
              onOpenProfileSwitcher={() => setIsProfileSwitcherOpen(true)}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer onOpenHelpDocs={() => setIsHelpDocsOpen(true)} />

      {/* Modals */}
      <EditPromptsModal
        isOpen={isEditPromptsOpen}
        onClose={() => setIsEditPromptsOpen(false)}
        quotes={quotes}
        onSaveQuotes={(updated) => setQuotes(updated)}
        showToast={showToast}
      />

      <QrCodeModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        eventConfig={eventConfig}
        showToast={showToast}
      />

      <HelpDocsModal
        isOpen={isHelpDocsOpen}
        onClose={() => setIsHelpDocsOpen(false)}
        onGoToAttendee={() => setActiveTab('attendee-generator')}
        onGoToOrganizer={() => setActiveTab('organizer-dashboard')}
      />

      <ProfileSwitcherModal
        isOpen={isProfileSwitcherOpen}
        onClose={() => setIsProfileSwitcherOpen(false)}
        profiles={profiles}
        currentProfile={currentProfile}
        onSelectProfile={(p) => setCurrentProfile(p)}
        onUpdateCurrentProfile={handleUpdateCurrentProfile}
        showToast={showToast}
      />

      {/* Global Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
