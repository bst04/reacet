import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CategoryName } from '../types';
import { ArrowLeft, CheckCircle2, Shield, Plus, ExternalLink } from 'lucide-react';

const CATEGORIES: CategoryName[] = [
  'Recon',
  'OSINT',
  'Pentesting',
  'Web Security',
  'Network Security',
  'Red Team',
  'Blue Team',
  'SOC',
  'DFIR',
  'Malware Analysis',
  'Cloud Security',
  'DevSecOps',
  'Privacy',
  'Bug Bounty',
  'CTF',
  'Security Research',
  'Automation',
  'Cryptography',
  'Forensics',
  'Vulnerability Management'
];

export const SubmitPage: React.FC = () => {
  const { submitSource, submissions, navigateTo, showToast } = useApp();

  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [category, setCategory] = useState<CategoryName>('Recon');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [pricing, setPricing] = useState<'Free / Open Source' | 'Freemium' | 'Commercial'>('Free / Open Source');
  const [license, setLicense] = useState('MIT');
  const [submitterNote, setSubmitterNote] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim() || !description.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase().replace(/[^a-z0-9-]/g, ''))
      .filter(Boolean);

    submitSource({
      name: name.trim(),
      url: url.trim(),
      github_url: githubUrl.trim() || undefined,
      category,
      description: description.trim(),
      tags: tags.length > 0 ? tags : ['tool', category.toLowerCase()],
      pricing,
      license: license.trim() || 'Open Source',
      submitter_note: submitterNote.trim() || undefined
    });

    setSubmittedSuccess(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back button */}
      <button
        onClick={() => navigateTo('/sources')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#686B73] dark:text-[#9BA1AC] hover:text-[#111318] dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK TO SOURCES</span>
      </button>

      {/* Header Dossier */}
      <div className="pb-6 border-b border-[#D5D1C4] dark:border-[#2C3142] space-y-2">
        <div className="text-xs font-mono uppercase tracking-widest text-[#B855F6]">
          ARCHIVE CONTRIBUTIONS
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111318] dark:text-white tracking-tight">
          Submit a Cybersecurity Source
        </h1>
        <p className="text-sm text-[#5E626E] dark:text-[#9BA1AC] leading-relaxed">
          Help expand the archive with high-utility tools, research resources, or services. Submissions are curated and reviewed against our quality standard: <span className="font-semibold text-[#111318] dark:text-white">Less information. Better filtered information.</span>
        </p>
      </div>

      {submittedSuccess ? (
        <div className="p-8 sm:p-12 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#1D9A6C]/10 text-[#1D9A6C] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#111318] dark:text-white">
            Source Submitted for Review
          </h2>
          <p className="text-sm text-[#5E626E] dark:text-[#9BA1AC] max-w-md mx-auto leading-relaxed">
            Thank you for contributing to CyberSources. Our editorial review team inspects repository health, license compliance, and utility before cataloging.
          </p>
          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setSubmittedSuccess(false);
                setName('');
                setUrl('');
                setGithubUrl('');
                setDescription('');
                setTagsInput('');
                setSubmitterNote('');
              }}
              className="px-4 py-2 text-xs font-semibold text-[#111318] dark:text-white bg-[#E7E5DE] dark:bg-[#252937] hover:bg-[#DDD9CE] dark:hover:bg-[#2D3243] rounded-md transition-colors cursor-pointer"
            >
              Submit Another Tool
            </button>
            <button
              onClick={() => navigateTo('/sources')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#B855F6] hover:bg-[#A23BE9] rounded-md transition-colors shadow-md shadow-[#B855F6]/20 cursor-pointer"
            >
              Back to Archive →
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] space-y-6">
          
          {/* Tool Name */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC] mb-1">
              Tool / Resource Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Caido, Gowitness, LinPEAS"
              className="w-full px-3.5 py-2.5 bg-[#E7E5DE] dark:bg-[#181A24] text-sm text-[#111318] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6]"
            />
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC] mb-1">
                Official Website URL *
              </label>
              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3.5 py-2.5 bg-[#E7E5DE] dark:bg-[#181A24] text-sm text-[#111318] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC] mb-1">
                GitHub Repository (if open source)
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/org/repo"
                className="w-full px-3.5 py-2.5 bg-[#E7E5DE] dark:bg-[#181A24] text-sm text-[#111318] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6]"
              />
            </div>
          </div>

          {/* Category & Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC] mb-1">
                Primary Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryName)}
                className="w-full px-3.5 py-2.5 bg-[#E7E5DE] dark:bg-[#181A24] text-sm text-[#111318] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC] mb-1">
                Pricing Model *
              </label>
              <select
                value={pricing}
                onChange={(e) => setPricing(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-[#E7E5DE] dark:bg-[#181A24] text-sm text-[#111318] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6]"
              >
                <option value="Free / Open Source">Free / Open Source</option>
                <option value="Freemium">Freemium</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
          </div>

          {/* License & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC] mb-1">
                Software License
              </label>
              <input
                type="text"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                placeholder="e.g. MIT, GPL-3.0, Apache-2.0, Commercial"
                className="w-full px-3.5 py-2.5 bg-[#E7E5DE] dark:bg-[#181A24] text-sm text-[#111318] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC] mb-1">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="proxy, cli, recon, web"
                className="w-full px-3.5 py-2.5 bg-[#E7E5DE] dark:bg-[#181A24] text-sm text-[#111318] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6]"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC] mb-1">
              Short Description * (one sentence, editorial style)
            </label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Lightweight, modern web security auditing proxy written in Rust."
              className="w-full px-3.5 py-2.5 bg-[#E7E5DE] dark:bg-[#181A24] text-sm text-[#111318] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6]"
            />
          </div>

          {/* Submitter note */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC] mb-1">
              What do practitioners use this tool for? (Optional)
            </label>
            <textarea
              rows={3}
              value={submitterNote}
              onChange={(e) => setSubmitterNote(e.target.value)}
              placeholder="Provide context on real-world use cases or workflows where this tool excels..."
              className="w-full px-3.5 py-2.5 bg-[#E7E5DE] dark:bg-[#181A24] text-sm text-[#111318] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6] resize-none"
            />
          </div>

          {/* Action */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigateTo('/sources')}
              className="px-4 py-2 text-xs font-semibold text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#111318] dark:hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#B855F6] hover:bg-[#A23BE9] rounded-md transition-colors shadow-md shadow-[#B855F6]/20 cursor-pointer"
            >
              Submit for Verification
            </button>
          </div>

        </form>
      )}

      {/* Existing Submissions List if any */}
      {submissions.length > 0 && (
        <div className="space-y-3 pt-6 border-t border-[#E2DFD6] dark:border-[#22262E]">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#8C8F99] dark:text-[#7B8190]">
            Recent Community Submissions ({submissions.length})
          </h3>
          <div className="space-y-2">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="p-4 bg-white dark:bg-[#14161C] rounded-lg border border-[#E2DFD6] dark:border-[#22262E] flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-[#111318] dark:text-white">{sub.name}</div>
                  <div className="text-[#686B73] dark:text-[#9BA1AC]">{sub.category} · {sub.description}</div>
                </div>
                <span className="font-mono text-[11px] text-[#D89B24] bg-[#D89B24]/10 px-2 py-0.5 rounded">
                  {sub.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
