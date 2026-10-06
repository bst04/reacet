import { UserProfile } from '../types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-001',
    username: 'bruno',
    display_name: 'Bruno Salvatella',
    role: 'Pentester',
    bio: 'Cybersecurity creator & builder. Specialized in external attack surface discovery and infrastructure assessment.',
    website: 'https://cybersources.site',
    github: 'https://github.com/bruno-salvatella',
    twitter: 'https://twitter.com/brunosalvatella',
    joined_date: 'Jan 2026',
    saved_sources: ['nmap', 'subfinder', 'httpx', 'nuclei', 'burp-suite'],
    followed_stacks: ['stack-002', 'stack-003'],
    followed_profiles: ['alexchen', 'elena-soc']
  },
  {
    id: 'user-002',
    username: 'alexchen',
    display_name: 'Alex Chen',
    role: 'Bug Bounty Hunter',
    bio: 'Full-time application security researcher and bug bounty hunter. Focused on automated asset discovery and web vulnerability chains.',
    github: 'https://github.com/alexchen-sec',
    joined_date: 'Feb 2026',
    saved_sources: ['subfinder', 'ffuf', 'nuclei', 'burp-suite'],
    followed_stacks: ['stack-001'],
    followed_profiles: ['bruno']
  },
  {
    id: 'user-003',
    username: 'elena-soc',
    display_name: 'Elena Rostova',
    role: 'SOC Analyst',
    bio: 'Lead detection engineer and SOC analyst. Passionate about Sigma rules, behavioral telemetry with Zeek, and proactive threat hunting.',
    website: 'https://rostova-defense.io',
    joined_date: 'Feb 2026',
    saved_sources: ['wazuh', 'velociraptor', 'sigma', 'zeek', 'suricata', 'cyberchef'],
    followed_stacks: ['stack-004'],
    followed_profiles: ['bruno', 'marcus-red']
  },
  {
    id: 'user-004',
    username: 'marcus-red',
    display_name: 'Marcus Vance',
    role: 'Red Team',
    bio: 'Adversary simulation specialist. Active Directory attack paths, Kerberos abuse, and defense evasion research.',
    joined_date: 'Mar 2026',
    saved_sources: ['bloodhound', 'impacket', 'mimikatz', 'metasploit', 'nmap'],
    followed_stacks: ['stack-001', 'stack-002'],
    followed_profiles: ['bruno']
  },
  {
    id: 'user-005',
    username: 'sarah-osint',
    display_name: 'Sarah Lindqvist',
    role: 'OSINT Investigator',
    bio: 'Investigative intelligence analyst. Specializing in digital footprint analysis, asset correlation, and supply chain tracking.',
    website: 'https://lindqvist-intel.org',
    joined_date: 'Mar 2026',
    saved_sources: ['maltego', 'shodan', 'theharvester', 'sherlock', 'subfinder'],
    followed_stacks: ['stack-001'],
    followed_profiles: ['bruno', 'alexchen']
  },
  {
    id: 'user-006',
    username: 'devsec-dave',
    display_name: 'Dave Miller',
    role: 'DevSecOps',
    bio: 'Shifting security left in cloud-native pipelines. Kubernetes, IaC policy enforcement, and developer-friendly SAST.',
    joined_date: 'Apr 2026',
    saved_sources: ['semgrep', 'trivy', 'wazuh'],
    followed_stacks: ['stack-003'],
    followed_profiles: ['elena-soc']
  }
];
