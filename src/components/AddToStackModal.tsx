import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Layers, Plus, Check, ArrowRight } from 'lucide-react';
import { PractitionerRole } from '../types';

export const AddToStackModal: React.FC = () => {
  const {
    isAddToStackOpen,
    setIsAddToStackOpen,
    sourceForStack,
    currentUser,
    stacks,
    addSourceToStack,
    createStack,
    showToast
  } = useApp();

  const [mode, setMode] = useState<'existing' | 'new'>('existing');
  const [selectedStackId, setSelectedStackId] = useState<string>('');
  const [notes, setNotes] = useState('');
  
  // New stack fields
  const [newStackName, setNewStackName] = useState('');
  const [newStackDesc, setNewStackDesc] = useState('');
  const [newStackRole, setNewStackRole] = useState<PractitionerRole>('Pentester');

  if (!isAddToStackOpen || !sourceForStack || !currentUser) return null;

  // Stacks owned by current user
  const userStacks = stacks.filter((s) => s.author.username === currentUser.username);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'existing') {
      if (!selectedStackId) {
        showToast('Please select a stack to add this source to');
        return;
      }
      addSourceToStack(selectedStackId, sourceForStack.slug, notes.trim());
    } else {
      if (!newStackName.trim()) {
        showToast('Please enter a stack name');
        return;
      }
      const slug = newStackName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const created = createStack({
        slug,
        name: newStackName.trim(),
        description: newStackDesc.trim() || `My curated toolkit for ${newStackRole} workflows.`,
        role: newStackRole,
        is_public: true,
        author: {
          id: currentUser.id,
          username: currentUser.username,
          display_name: currentUser.display_name,
          role: currentUser.role,
          bio: currentUser.bio
        },
        sources: [
          {
            source_slug: sourceForStack.slug,
            notes: notes.trim(),
            position: 1
          }
        ]
      });

      setIsAddToStackOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="w-full max-w-lg bg-[#E7E5DE] dark:bg-[#1A1D27] rounded-xl shadow-2xl border border-[#D5D1C4] dark:border-[#2C3142] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#F2F0E8] dark:bg-[#1E212D] border-b border-[#D5D1C4] dark:border-[#2C3142] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B855F6]" />
            <h3 className="text-sm font-semibold text-[#12141A] dark:text-white">
              Add to Stack
            </h3>
          </div>
          <button
            onClick={() => setIsAddToStackOpen(false)}
            className="p-1 text-[#686B73] dark:text-[#8C92A0] hover:text-[#12141A] dark:hover:text-white rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Source Banner */}
        <div className="px-5 py-3 bg-[#DDD9CE]/60 dark:bg-[#161822] border-b border-[#D5D1C4] dark:border-[#2C3142] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#B855F6]">
              SOURCE / {sourceForStack.source_number}
            </div>
            <div className="text-base font-bold text-[#12141A] dark:text-white">
              {sourceForStack.name}
            </div>
          </div>
          <div className="text-xs font-mono text-[#686B73] dark:text-[#8C92A0] bg-[#F2F0E8] dark:bg-[#25293A] px-2 py-1 rounded border border-[#D5D1C4] dark:border-[#2C3142]">
            {sourceForStack.category}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          {/* Mode Switcher */}
          <div className="flex rounded-md p-1 bg-[#DDD9CE] dark:bg-[#161822] text-xs font-medium">
            <button
              type="button"
              onClick={() => setMode('existing')}
              className={`flex-1 py-1.5 rounded transition-colors ${
                mode === 'existing'
                  ? 'bg-[#F2F0E8] dark:bg-[#25293A] text-[#12141A] dark:text-white shadow-xs'
                  : 'text-[#686B73] dark:text-[#8C92A0] hover:text-[#12141A] dark:hover:text-white'
              }`}
            >
              Choose Existing Stack ({userStacks.length})
            </button>
            <button
              type="button"
              onClick={() => setMode('new')}
              className={`flex-1 py-1.5 rounded transition-colors ${
                mode === 'new'
                  ? 'bg-[#F2F0E8] dark:bg-[#25293A] text-[#12141A] dark:text-white shadow-xs'
                  : 'text-[#686B73] dark:text-[#8C92A0] hover:text-[#12141A] dark:hover:text-white'
              }`}
            >
              + Create New Stack
            </button>
          </div>

          {mode === 'existing' ? (
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#686B73] dark:text-[#8C92A0]">
                Select Stack
              </label>
              {userStacks.length === 0 ? (
                <div className="p-4 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-lg border border-dashed border-[#D5D1C4] dark:border-[#2C3142] text-center text-xs text-[#686B73] dark:text-[#8C92A0]">
                  You have not created any stacks yet.
                  <button
                    type="button"
                    onClick={() => setMode('new')}
                    className="block mx-auto mt-2 text-[#B855F6] font-semibold hover:underline"
                  >
                    Create your first stack →
                  </button>
                </div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {userStacks.map((stk) => {
                    const isSelected = selectedStackId === stk.id;
                    const alreadyHas = stk.sources.some(
                      (s) => s.source_slug === sourceForStack.slug
                    );
                    return (
                      <div
                        key={stk.id}
                        onClick={() => setSelectedStackId(stk.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#F2F0E8] dark:bg-[#25293A] border-[#B855F6] ring-1 ring-[#B855F6]'
                            : 'bg-[#F2F0E8]/70 dark:bg-[#1E212D] border-[#D5D1C4] dark:border-[#2C3142] hover:bg-[#F2F0E8] dark:hover:bg-[#25293A]'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-semibold text-[#12141A] dark:text-white">
                            {stk.name}
                          </div>
                          <div className="text-xs text-[#686B73] dark:text-[#8C92A0]">
                            {stk.role} · {stk.sources.length} sources
                          </div>
                        </div>
                        {alreadyHas ? (
                          <span className="text-[11px] font-mono text-[#1D9A6C] bg-[#1D9A6C]/10 px-2 py-0.5 rounded">
                            Already in stack
                          </span>
                        ) : isSelected ? (
                          <Check className="w-4 h-4 text-[#B855F6]" />
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#686B73] dark:text-[#8C92A0] mb-1">
                  Stack Name
                </label>
                <input
                  type="text"
                  required
                  value={newStackName}
                  onChange={(e) => setNewStackName(e.target.value)}
                  placeholder="e.g. My Recon Stack, Active Directory Arsenal"
                  className="w-full px-3 py-2 bg-[#F2F0E8] dark:bg-[#1E212D] text-sm text-[#12141A] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#686B73] dark:text-[#8C92A0] mb-1">
                  Primary Role
                </label>
                <select
                  value={newStackRole}
                  onChange={(e) => setNewStackRole(e.target.value as PractitionerRole)}
                  className="w-full px-3 py-2 bg-[#F2F0E8] dark:bg-[#1E212D] text-sm text-[#12141A] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6]"
                >
                  <option value="Pentester">Pentester</option>
                  <option value="Bug Bounty Hunter">Bug Bounty Hunter</option>
                  <option value="Red Team">Red Team</option>
                  <option value="Blue Team">Blue Team</option>
                  <option value="SOC Analyst">SOC Analyst</option>
                  <option value="OSINT Investigator">OSINT Investigator</option>
                  <option value="DevSecOps">DevSecOps</option>
                  <option value="Security Researcher">Security Researcher</option>
                  <option value="CTF Player">CTF Player</option>
                  <option value="Privacy Researcher">Privacy Researcher</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#686B73] dark:text-[#8C92A0] mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={newStackDesc}
                  onChange={(e) => setNewStackDesc(e.target.value)}
                  placeholder="Brief description of the workflow..."
                  className="w-full px-3 py-2 bg-[#F2F0E8] dark:bg-[#1E212D] text-sm text-[#12141A] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6]"
                />
              </div>
            </div>
          )}

          {/* Practitioner Note */}
          <div className="pt-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#686B73] dark:text-[#8C92A0] mb-1">
              What do you use this source for? <span className="text-[#8C8F99] dark:text-[#6C717E] normal-case">(optional, makes stack more useful)</span>
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Initial network discovery during pentests, fast passive recon..."
              className="w-full px-3 py-2 bg-[#F2F0E8] dark:bg-[#1E212D] text-sm text-[#12141A] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6] resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#D5D1C4] dark:border-[#2C3142]">
            <button
              type="button"
              onClick={() => setIsAddToStackOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-[#686B73] dark:text-[#8C92A0] hover:text-[#12141A] dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#181A22] hover:bg-[#B855F6] dark:bg-[#25293A] dark:hover:bg-[#B855F6] rounded-md transition-colors"
            >
              {mode === 'existing' ? 'Add to Stack' : 'Create & Add Source'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
