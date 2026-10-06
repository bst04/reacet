import { Discussion } from '../types';

export const INITIAL_DISCUSSIONS: Discussion[] = [
  {
    id: 'disc-001',
    slug: 'nmap-vs-rustscan-workflow',
    title: 'Nmap vs RustScan — what do you actually use for initial sweeps?',
    body: 'RustScan claims to finish full-port sweeps in 3 seconds before handing off to Nmap, but in production enterprise environments with rate limiting or fragile IoT gear, how reliable do you find it compared to conservative Nmap timing templates (-T3 / -T2)? What is your real-world rule of thumb?',
    type: 'Tool Comparison',
    category: 'Recon',
    source_slug: 'nmap',
    user: {
      username: 'bruno',
      display_name: 'Bruno Salvatella',
      role: 'Pentester'
    },
    upvotes: 42,
    upvoted_by: ['alexchen', 'marcus-red', 'sarah-osint'],
    replies_count: 3,
    replies: [
      {
        id: 'rep-001',
        user: {
          username: 'marcus-red',
          display_name: 'Marcus Vance',
          role: 'Red Team'
        },
        body: 'On external scoped engagements with high-bandwidth targets, RustScan is incredible to prune 65k down to 40 ports in seconds. But on internal segmented OT networks or legacy Windows Domain Controllers, I stick strictly with Nmap -sS -T3 to avoid tripping sensor thresholds or knocking fragile RPC listeners offline.',
        created_at: '2026-03-12'
      },
      {
        id: 'rep-002',
        user: {
          username: 'alexchen',
          display_name: 'Alex Chen',
          role: 'Bug Bounty Hunter'
        },
        body: 'In bug bounty programs where target scope spans full ASN CIDRs, I use Naabu or Masscan for initial discovery, and then RustScan on specific suspect IP blocks. RustScan piped into Nmap `-sV -sC` saves hours.',
        created_at: '2026-03-14'
      },
      {
        id: 'rep-003',
        user: {
          username: 'elena-soc',
          display_name: 'Elena Rostova',
          role: 'SOC Analyst'
        },
        body: 'From a Blue Team perspective: RustScan generates an unmistakable burst of SYN packets with consistent socket creation rates that immediately triggers our Suricata flow heuristics. If you are doing stealth red teaming, it will light up the SOC dashboard instantly.',
        created_at: '2026-03-18'
      }
    ],
    created_at: '2026-03-10'
  },
  {
    id: 'disc-002',
    slug: 'essential-nuclei-templates-asm',
    title: 'What Nuclei templates do you run first against newly discovered assets?',
    body: 'With thousands of community templates in the official ProjectDiscovery repository, running everything indiscriminately often leads to WAF bans or excessive noise. What is your curated template filter strategy for external attack surface management?',
    type: 'Guide',
    category: 'Vulnerability Management',
    source_slug: 'nuclei',
    user: {
      username: 'alexchen',
      display_name: 'Alex Chen',
      role: 'Bug Bounty Hunter'
    },
    upvotes: 38,
    upvoted_by: ['bruno', 'devsec-dave'],
    replies_count: 2,
    replies: [
      {
        id: 'rep-004',
        user: {
          username: 'bruno',
          display_name: 'Bruno Salvatella',
          role: 'Pentester'
        },
        body: 'I always start with `-tags exposure,misconfig,tokens,default-login` and `-severity critical,high`. This catches exposed Git directories, unauthenticated Spring Boot actuators, and Jenkins dashboards without sending intrusive exploitation payloads.',
        created_at: '2026-03-16'
      },
      {
        id: 'rep-005',
        user: {
          username: 'devsec-dave',
          display_name: 'Dave Miller',
          role: 'DevSecOps'
        },
        body: 'In our CI/CD staging validation, we tag our own custom internal templates with `-tags internal-compliance` to test whether staging APIs properly implement OAuth token introspection before code reaches production.',
        created_at: '2026-03-21'
      }
    ],
    created_at: '2026-03-15'
  },
  {
    id: 'disc-003',
    slug: 'velociraptor-vs-osquery-endpoint-triage',
    title: 'Velociraptor vs OSQuery for rapid live endpoint triage',
    body: 'Both tools offer SQL-like querying of endpoint state, but their operational philosophy differs. How do your teams evaluate deployability, real-time artifact collection, and incident triage velocity between the two?',
    type: 'Tool Comparison',
    category: 'DFIR',
    source_slug: 'velociraptor',
    user: {
      username: 'elena-soc',
      display_name: 'Elena Rostova',
      role: 'SOC Analyst'
    },
    upvotes: 29,
    upvoted_by: ['bruno', 'marcus-red'],
    replies_count: 1,
    replies: [
      {
        id: 'rep-006',
        user: {
          username: 'marcus-red',
          display_name: 'Marcus Vance',
          role: 'Red Team'
        },
        body: 'Velociraptor’s VQL is far more specialized for deep forensic acquisition (MFT carving, memory dump pull, raw NTFS access) on Windows. OSQuery is great for routine compliance posture and fleet inventory, but when a ransomware incident is active, Velociraptor gives you the surgical knife.',
        created_at: '2026-03-23'
      }
    ],
    created_at: '2026-03-20'
  },
  {
    id: 'disc-004',
    slug: 'subfinder-passive-source-configuration',
    title: 'Which API keys yield the highest yield in Subfinder?',
    body: 'Subfinder works great out of the box with free passive sources, but adding provider API keys drastically boosts coverage. Which services (Chaos, SecurityTrails, VirusTotal, Shodan, Censys, WhoisXML) provide the biggest delta in your experience?',
    type: 'Question',
    category: 'Recon',
    source_slug: 'subfinder',
    user: {
      username: 'sarah-osint',
      display_name: 'Sarah Lindqvist',
      role: 'OSINT Investigator'
    },
    upvotes: 24,
    upvoted_by: ['alexchen', 'bruno'],
    replies_count: 2,
    replies: [
      {
        id: 'rep-007',
        user: {
          username: 'alexchen',
          display_name: 'Alex Chen',
          role: 'Bug Bounty Hunter'
        },
        body: 'Hands down: Chaos (ProjectDiscovery), SecurityTrails, and Shodan. Chaos gives you instant pre-indexed subdomains that would take hours to enumerate. Censys is also fantastic for finding certificate SAN matches.',
        created_at: '2026-03-24'
      },
      {
        id: 'rep-008',
        user: {
          username: 'bruno',
          display_name: 'Bruno Salvatella',
          role: 'Pentester'
        },
        body: 'Seconding Chaos and SecurityTrails. Also don’t sleep on GitHub token integration for Subfinder—a lot of development subdomains leak in repository commits and documentation before they are indexed by search engines.',
        created_at: '2026-03-26'
      }
    ],
    created_at: '2026-03-22'
  },
  {
    id: 'disc-005',
    slug: 'burp-suite-extensions-2026',
    title: 'Burp Suite Pro extensions you cannot live without',
    body: 'When setting up a clean test workstation, what are the first 3 extensions you pull from the BApp Store or GitHub? Looking for extensions that fundamentally improve workflow rather than simple vanity plugins.',
    type: 'Discussion',
    category: 'Web Security',
    source_slug: 'burp-suite',
    user: {
      username: 'alexchen',
      display_name: 'Alex Chen',
      role: 'Bug Bounty Hunter'
    },
    upvotes: 35,
    upvoted_by: ['bruno', 'devsec-dave'],
    replies_count: 1,
    replies: [
      {
        id: 'rep-009',
        user: {
          username: 'bruno',
          display_name: 'Bruno Salvatella',
          role: 'Pentester'
        },
        body: '1. Autorize (essential for IDOR and privilege escalation matrices across different authorization roles). 2. Param Miner (uncovering hidden headers, parameters, and cache poisoning vectors). 3. Turbo Intruder (for precise HTTP request smuggling and high-speed concurrency race condition verification).',
        created_at: '2026-03-27'
      }
    ],
    created_at: '2026-03-25'
  }
];
