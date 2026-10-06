import { Stack } from '../types';

export const INITIAL_STACKS: Stack[] = [
  {
    id: 'stack-001',
    slug: 'brunos-recon-stack',
    name: "Bruno's Recon Stack",
    description: 'My primary toolkit for external reconnaissance, asset mapping, and attack surface discovery during pentests.',
    role: 'Pentester',
    is_public: true,
    author: {
      id: 'user-001',
      username: 'bruno',
      display_name: 'Bruno Salvatella',
      role: 'Pentester',
      bio: 'Cybersecurity creator & builder. Specialized in external attack surface discovery and infrastructure assessment.'
    },
    sources: [
      {
        source_slug: 'nmap',
        notes: 'Initial network discovery, open port verification and service version fingerprinting.',
        position: 1
      },
      {
        source_slug: 'subfinder',
        notes: 'Passive subdomain enumeration without touching client networks or raising alarms.',
        position: 2
      },
      {
        source_slug: 'amass',
        notes: 'Deep ASN, CIDR mapping and recursive DNS graph visualization.',
        position: 3
      },
      {
        source_slug: 'httpx',
        notes: 'Bulk probing discovered hosts for live web services, SSL certs, and tech stack.',
        position: 4
      },
      {
        source_slug: 'nuclei',
        notes: 'Rapid baseline checks for exposed control panels, default credentials, and critical CVEs.',
        position: 5
      }
    ],
    created_at: '2026-02-10',
    updated_at: '2026-03-20'
  },
  {
    id: 'stack-002',
    slug: 'alex-bug-bounty-arsenal',
    name: "Alex's Bug Bounty Arsenal",
    description: 'High-velocity automated and manual testing chain for finding high-impact web vulnerabilities.',
    role: 'Bug Bounty Hunter',
    is_public: true,
    author: {
      id: 'user-002',
      username: 'alexchen',
      display_name: 'Alex Chen',
      role: 'Bug Bounty Hunter',
      bio: 'Full-time application security researcher and bug bounty hunter.'
    },
    sources: [
      {
        source_slug: 'subfinder',
        notes: 'Fast passive enumeration run across wildcard scopes on program launches.',
        position: 1
      },
      {
        source_slug: 'httpx',
        notes: 'Extracting response codes, titles, and filtering for unusual application servers.',
        position: 2
      },
      {
        source_slug: 'ffuf',
        notes: 'High-speed directory, backup file, and virtual host fuzzing with custom wordlists.',
        position: 3
      },
      {
        source_slug: 'nuclei',
        notes: 'Running custom private templates right after new releases or disclosure threads.',
        position: 4
      },
      {
        source_slug: 'burp-suite',
        notes: 'Deep manual exploration, authorization testing, race condition checks, and payload crafting.',
        position: 5
      }
    ],
    created_at: '2026-02-15',
    updated_at: '2026-03-25'
  },
  {
    id: 'stack-003',
    slug: 'soc-detection-response',
    name: 'SOC Detection & Response Workbench',
    description: 'End-to-end blue team workstation for log correlation, forensic artifact inspection, and rule validation.',
    role: 'SOC Analyst',
    is_public: true,
    author: {
      id: 'user-003',
      username: 'elena-soc',
      display_name: 'Elena Rostova',
      role: 'SOC Analyst',
      bio: 'Lead detection engineer and SOC analyst.'
    },
    sources: [
      {
        source_slug: 'wazuh',
        notes: 'Central agent fleet management, FIM alerts, and primary compliance telemetry.',
        position: 1
      },
      {
        source_slug: 'velociraptor',
        notes: 'Direct endpoint live response when high-severity anomalies trigger.',
        position: 2
      },
      {
        source_slug: 'sigma',
        notes: 'Standardized rule repository for threat detection across SIEM instances.',
        position: 3
      },
      {
        source_slug: 'zeek',
        notes: 'Network behavioral metadata and TLS transaction extraction.',
        position: 4
      },
      {
        source_slug: 'cyberchef',
        notes: 'Fast payload decoding, timestamp parsing, and regex string manipulation during triage.',
        position: 5
      }
    ],
    created_at: '2026-02-18',
    updated_at: '2026-03-15'
  },
  {
    id: 'stack-004',
    slug: 'red-team-active-directory',
    name: 'Red Team Active Directory Toolkit',
    description: 'Internal network penetration testing and enterprise adversary emulation workflow.',
    role: 'Red Team',
    is_public: true,
    author: {
      id: 'user-004',
      username: 'marcus-red',
      display_name: 'Marcus Vance',
      role: 'Red Team',
      bio: 'Adversary simulation specialist.'
    },
    sources: [
      {
        source_slug: 'bloodhound',
        notes: 'Mapping non-obvious ACL and group membership paths to Domain Admin.',
        position: 1
      },
      {
        source_slug: 'impacket',
        notes: 'Kerberoasting, DCSync via secretsdump, and SMB execution during lateral movement.',
        position: 2
      },
      {
        source_slug: 'mimikatz',
        notes: 'LSASS credential dumping on compromised jump boxes and ticket extraction.',
        position: 3
      },
      {
        source_slug: 'nmap',
        notes: 'Targeted port discovery against internal subnet segments.',
        position: 4
      },
      {
        source_slug: 'metasploit',
        notes: 'Pivoting traffic through compromised hosts via autoroute and socks proxy.',
        position: 5
      }
    ],
    created_at: '2026-02-22',
    updated_at: '2026-03-28'
  },
  {
    id: 'stack-005',
    slug: 'osint-investigation-suite',
    name: 'OSINT Investigation Suite',
    description: 'Digital identity attribution, domain infrastructure tracing, and opensource intelligence gathering.',
    role: 'OSINT Investigator',
    is_public: true,
    author: {
      id: 'user-005',
      username: 'sarah-osint',
      display_name: 'Sarah Lindqvist',
      role: 'OSINT Investigator',
      bio: 'Investigative intelligence analyst.'
    },
    sources: [
      {
        source_slug: 'maltego',
        notes: 'Visual graph synthesis for combining entity transforms and social traces.',
        position: 1
      },
      {
        source_slug: 'shodan',
        notes: 'Correlating IP blocks, exposed devices, and open ports to target organizations.',
        position: 2
      },
      {
        source_slug: 'theharvester',
        notes: 'Public search engine scraping for corporate email domains and personnel names.',
        position: 3
      },
      {
        source_slug: 'sherlock',
        notes: 'Username discovery across platforms to identify reused adversary aliases.',
        position: 4
      },
      {
        source_slug: 'tor-browser',
        notes: 'Ensuring investigator anonymity when visiting suspicious or foreign nodes.',
        position: 5
      }
    ],
    created_at: '2026-03-01',
    updated_at: '2026-03-22'
  },
  {
    id: 'stack-006',
    slug: 'devsecops-pipeline-guard',
    name: 'DevSecOps Pipeline Guard',
    description: 'Shift-left security automation for containerized software development pipelines.',
    role: 'DevSecOps',
    is_public: true,
    author: {
      id: 'user-006',
      username: 'devsec-dave',
      display_name: 'Dave Miller',
      role: 'DevSecOps',
      bio: 'Shifting security left in cloud-native pipelines.'
    },
    sources: [
      {
        source_slug: 'semgrep',
        notes: 'Fast PR-blocking SAST for catching injection, insecure deserialization, and hardcoded secrets.',
        position: 1
      },
      {
        source_slug: 'trivy',
        notes: 'Scanning Docker images and Terraform definitions in GitHub Actions runners.',
        position: 2
      },
      {
        source_slug: 'nuclei',
        notes: 'Post-deploy dynamic health and configuration verification in staging clusters.',
        position: 3
      },
      {
        source_slug: 'wazuh',
        notes: 'Production runtime monitoring for abnormal container behavior.',
        position: 4
      }
    ],
    created_at: '2026-03-05',
    updated_at: '2026-03-24'
  }
];
