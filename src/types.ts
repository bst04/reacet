export type CategoryName =
  | 'All'
  | 'Recon'
  | 'OSINT'
  | 'Pentesting'
  | 'Web Security'
  | 'Network Security'
  | 'Red Team'
  | 'Blue Team'
  | 'SOC'
  | 'DFIR'
  | 'Malware Analysis'
  | 'Cloud Security'
  | 'DevSecOps'
  | 'Privacy'
  | 'Bug Bounty'
  | 'CTF'
  | 'Security Research'
  | 'Automation'
  | 'Cryptography'
  | 'Forensics'
  | 'Vulnerability Management';

export type PractitionerRole =
  | 'Red Team'
  | 'Blue Team'
  | 'SOC Analyst'
  | 'Pentester'
  | 'OSINT Investigator'
  | 'Bug Bounty Hunter'
  | 'Security Student'
  | 'Security Researcher'
  | 'DevSecOps'
  | 'CTF Player'
  | 'Privacy Researcher';

export type SourceKind = 'tool' | 'resource';

export type ResourceSubtype =
  | 'cheatsheet'
  | 'database'
  | 'wordlist'
  | 'framework'
  | 'playbook'
  | 'lab';

export interface Source {
  id: string;
  source_number: string; // e.g. "0001"
  slug: string;
  name: string;
  description: string;
  long_description: string;
  website_url: string;
  github_url?: string;
  category: CategoryName;
  secondary_categories?: CategoryName[];
  tags: string[];
  license: string;
  pricing: 'Free / Open Source' | 'Freemium' | 'Commercial' | 'Free';
  verified: boolean;
  featured?: boolean;
  kind?: SourceKind;
  resource_subtype?: ResourceSubtype;
  used_for: string[];
  often_used_with: string[]; // slugs
  created_at: string;
}

export interface StackSourceItem {
  source_slug: string;
  notes?: string;
  position: number;
}

export interface Stack {
  id: string;
  slug: string;
  name: string;
  description: string;
  role: PractitionerRole;
  is_public: boolean;
  author: {
    id: string;
    username: string;
    display_name: string;
    role: PractitionerRole;
    avatar_url?: string;
    bio?: string;
  };
  sources: StackSourceItem[];
  created_at: string;
  updated_at: string;
}

export type DiscussionType =
  | 'Question'
  | 'Discussion'
  | 'Tool Comparison'
  | 'Stack'
  | 'Guide'
  | 'Showcase';

export interface DiscussionReply {
  id: string;
  user: {
    username: string;
    display_name: string;
    role: string;
    avatar_url?: string;
  };
  body: string;
  created_at: string;
}

export interface Discussion {
  id: string;
  slug: string;
  title: string;
  body: string;
  type: DiscussionType;
  category: CategoryName;
  source_slug?: string;
  stack_slug?: string;
  user: {
    username: string;
    display_name: string;
    role: string;
    avatar_url?: string;
  };
  upvotes: number;
  upvoted_by: string[];
  replies_count: number;
  replies: DiscussionReply[];
  created_at: string;
}

export interface UserProfile {
  id: string;
  username: string;
  display_name: string;
  role: PractitionerRole;
  bio: string;
  website?: string;
  github?: string;
  twitter?: string;
  avatar_url?: string;
  joined_date: string;
  saved_sources: string[]; // slugs
  followed_stacks: string[]; // stack ids
  followed_profiles: string[]; // usernames
}

export interface SourceSubmission {
  id: string;
  name: string;
  url: string;
  github_url?: string;
  category: CategoryName;
  description: string;
  tags: string[];
  pricing: 'Free / Open Source' | 'Freemium' | 'Commercial' | 'Free';
  license: string;
  submitter_note?: string;
  status: 'Pending Review' | 'Approved' | 'Cataloged';
  created_at: string;
}
