import React, { useState } from 'react';
import { PromptQuote } from '../types';

interface EditPromptsModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotes: PromptQuote[];
  onSaveQuotes: (newQuotes: PromptQuote[]) => void;
  showToast: (msg: string) => void;
}

export const EditPromptsModal: React.FC<EditPromptsModalProps> = ({
  isOpen,
  onClose,
  quotes,
  onSaveQuotes,
  showToast
}) => {
  const [localQuotes, setLocalQuotes] = useState<PromptQuote[]>(quotes);
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // New quote form
  const [newSpeaker, setNewSpeaker] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newQuote, setNewQuote] = useState('');
  const [newTopic, setNewTopic] = useState('Keynote');

  if (!isOpen) return null;

  const topics = ['All', ...Array.from(new Set(localQuotes.map(q => q.topic)))];

  const filteredQuotes = selectedTopic === 'All'
    ? localQuotes
    : localQuotes.filter(q => q.topic === selectedTopic);

  const handleUpdateQuote = (id: string, updatedQuote: string) => {
    setLocalQuotes(prev =>
      prev.map(q => q.id === id ? { ...q, quote: updatedQuote } : q)
    );
  };

  const handleDelete = (id: string) => {
    setLocalQuotes(prev => prev.filter(q => q.id !== id));
    showToast('Quote removed from attendee boosters');
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpeaker || !newQuote) return;

    const created: PromptQuote = {
      id: `q-${Date.now()}`,
      speaker: newSpeaker,
      title: newTitle || 'Speaker',
      quote: newQuote,
      topic: newTopic
    };

    const updated = [created, ...localQuotes];
    setLocalQuotes(updated);
    setNewSpeaker('');
    setNewTitle('');
    setNewQuote('');
    setShowAddForm(false);
    showToast(`Added quote from ${newSpeaker}`);
  };

  const handleSaveAll = () => {
    onSaveQuotes(localQuotes);
    showToast('AI prompt seeds saved successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-[#cbc4d2]/30 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[#e9edff] flex items-center justify-between bg-[#f9f9ff]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#d6e3ff] text-[#001b3d]">
              <span className="material-symbols-outlined text-[20px]">psychology</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#141b2b] font-display-hero">
                AI Prompt Pre-Seeding Management
              </h3>
              <p className="text-xs text-[#494551]">
                {localQuotes.length} curated keynote quotes and takeaways available in attendee quick-adds
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

        {/* Topic Filter Pills */}
        <div className="px-5 py-3 border-b border-[#e9edff] flex items-center justify-between gap-2 overflow-x-auto bg-white">
          <div className="flex items-center gap-1.5 shrink-0">
            {topics.map(t => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  selectedTopic === t
                    ? 'bg-[#8466c2] text-white'
                    : 'bg-[#f1f3ff] text-[#494551] hover:bg-[#e9edff]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-1 px-3 py-1 bg-[#8466c2]/10 hover:bg-[#8466c2]/20 text-[#6b4da7] text-xs font-bold rounded-full transition-all shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">{showAddForm ? 'close' : 'add'}</span>
            <span>{showAddForm ? 'Cancel' : 'New Quote'}</span>
          </button>
        </div>

        {/* Add New Form */}
        {showAddForm && (
          <form onSubmit={handleAdd} className="p-4 bg-[#f1f3ff] border-b border-[#dce2f7] flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#141b2b] uppercase tracking-wider">
              Add New Keynote / Panelist Takeaway
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder="Speaker Name (e.g. Elena Vance)"
                value={newSpeaker}
                onChange={e => setNewSpeaker(e.target.value)}
                className="px-3 py-2 text-xs bg-white border border-[#cbc4d2]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8466c2]"
              />
              <input
                type="text"
                placeholder="Speaker Role/Company"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="px-3 py-2 text-xs bg-white border border-[#cbc4d2]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8466c2]"
              />
            </div>
            <textarea
              required
              rows={2}
              placeholder="Insight or Quote (e.g. 'Retention loops beat raw acquisition...')"
              value={newQuote}
              onChange={e => setNewQuote(e.target.value)}
              className="px-3 py-2 text-xs bg-white border border-[#cbc4d2]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8466c2]"
            />
            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="Topic / Category (e.g. GTM, AI)"
                value={newTopic}
                onChange={e => setNewTopic(e.target.value)}
                className="px-3 py-1.5 text-xs bg-white border border-[#cbc4d2]/40 rounded-xl w-44 focus:outline-none focus:ring-2 focus:ring-[#8466c2]"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#8466c2] hover:bg-[#6b4da7] text-white text-xs font-bold rounded-full transition-all cursor-pointer shadow-xs"
              >
                Save Quote
              </button>
            </div>
          </form>
        )}

        {/* Quotes List */}
        <div className="p-5 overflow-y-auto flex flex-col gap-3 flex-1 bg-[#f9f9ff]">
          {filteredQuotes.map((item) => (
            <div
              key={item.id}
              className="p-3.5 bg-white rounded-xl border border-[#cbc4d2]/30 shadow-xs flex flex-col gap-2 hover:border-[#8466c2]/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#141b2b]">{item.speaker}</span>
                  <span className="text-[11px] text-[#494551]">• {item.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#f1f3ff] text-[#6b4da7] text-[10px] font-bold">
                    {item.topic}
                  </span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-[#494551] hover:text-[#ba1a1a] transition-colors p-0.5 cursor-pointer"
                    title="Delete quote"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </div>

              {editingId === item.id ? (
                <div className="flex flex-col gap-1.5">
                  <textarea
                    rows={2}
                    value={item.quote}
                    onChange={(e) => handleUpdateQuote(item.id, e.target.value)}
                    className="p-2 text-xs border border-[#8466c2] rounded-lg focus:outline-none"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1 bg-[#8466c2] text-white text-xs font-bold rounded-full"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <p
                  onClick={() => setEditingId(item.id)}
                  className="text-xs text-[#141b2b] italic leading-relaxed cursor-pointer hover:text-[#6b4da7] transition-colors"
                  title="Click to inline edit"
                >
                  "{item.quote}"
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#e9edff] flex items-center justify-between">
          <span className="text-xs text-[#494551]">
            Changes synchronize across the attendee prompt engine instantly.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#494551] hover:text-[#141b2b] cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAll}
              className="px-5 py-2 rounded-full bg-[#8466c2] hover:bg-[#6b4da7] text-white text-xs font-bold shadow-xs cursor-pointer transition-all active:scale-95"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
