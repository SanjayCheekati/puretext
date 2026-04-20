import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Lock, Shield } from 'lucide-react';

const toolGroups = [
  {
    title: 'VPN Tools',
    description: 'Protect network metadata and reduce passive surveillance risk when using public networks.',
    tools: [
      { name: 'Mullvad VPN', url: 'https://mullvad.net/en', note: 'Privacy-focused VPN with minimal account data requirements.' },
      { name: 'Proton VPN', url: 'https://protonvpn.com/', note: 'Strong privacy policy and audited applications.' },
      { name: 'IVPN', url: 'https://www.ivpn.net/', note: 'Transparent operations with security-first defaults.' },
    ],
  },
  {
    title: 'Password and Secret Managers',
    description: 'Use a dedicated password manager for credentials and pair it with PureText for private workflows and secure notes.',
    tools: [
      { name: 'Bitwarden', url: 'https://bitwarden.com/', note: 'Open-source password manager with broad platform support.' },
      { name: '1Password', url: 'https://1password.com/', note: 'Mature vault workflows for teams and individuals.' },
      { name: 'KeePassXC', url: 'https://keepassxc.org/', note: 'Offline-first local password vault option.' },
    ],
  },
  {
    title: 'Browser Privacy Stack',
    description: 'Reduce tracking and harden day-to-day browsing sessions around your private notes workflow.',
    tools: [
      { name: 'Firefox', url: 'https://www.mozilla.org/firefox/new/', note: 'Strong privacy controls with customization flexibility.' },
      { name: 'Brave', url: 'https://brave.com/', note: 'Aggressive tracker blocking and privacy defaults.' },
      { name: 'uBlock Origin', url: 'https://github.com/gorhill/uBlock', note: 'High-quality content blocker for reducing tracking scripts.' },
    ],
  },
  {
    title: 'Two-Factor and Device Security',
    description: 'Strengthen account recovery and access controls around your broader security setup.',
    tools: [
      { name: 'Aegis Authenticator', url: 'https://getaegis.app/', note: 'Open-source OTP app for Android with encrypted backups.' },
      { name: 'Ente Auth', url: 'https://ente.io/auth/', note: 'Cross-device authenticator with encrypted sync options.' },
      { name: 'Yubico Security Keys', url: 'https://www.yubico.com/', note: 'Hardware-backed phishing-resistant authentication.' },
    ],
  },
];

const PrivacyTools = () => {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'PureText Privacy Tools and Resources',
    itemListElement: toolGroups.flatMap((group) =>
      group.tools.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: tool.name,
        url: tool.url,
      }))
    ),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.puretext.me/' },
      { '@type': 'ListItem', position: 2, name: 'Privacy Tools', item: 'https://www.puretext.me/privacy-tools' },
    ],
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>Privacy Tools and Resources 2026 | Secure Add-ons for PureText</title>
        <meta
          name="description"
          content="Discover curated privacy tools: VPNs, password managers, secure browsers, and two-factor options to strengthen your encrypted note workflow on PureText."
        />
        <meta name="keywords" content="privacy tools, secure resources, VPN recommendations, password manager comparison, secure browsing stack" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://www.puretext.me/privacy-tools" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Privacy Tools and Resources 2026 | PureText" />
        <meta property="og:description" content="Recommended privacy add-ons and secure tools for better encrypted note workflows." />
        <meta property="og:url" content="https://www.puretext.me/privacy-tools" />
        <meta property="og:site_name" content="PureText" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Tools and Resources 2026 | PureText" />
        <meta name="twitter:description" content="Curated VPN, password manager, browser, and 2FA tools for privacy-focused users." />
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <header className="w-full py-6 px-6 border-b border-border/50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Lock className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">PureText</span>
          </Link>
          <Link to="/privacy-vault" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
            Privacy Vault <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        <section className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5">
            <Shield className="w-4 h-4" />
            Tools and Resources
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Privacy Tools Stack for Secure Note Workflows</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            PureText secures your notes with zero-knowledge encryption. This page helps you secure the rest of your stack: network, browser,
            credentials, and account protection.
          </p>
        </section>

        <p className="text-sm text-muted-foreground rounded-xl border border-border/60 bg-card p-4">
          These links are educational recommendations, not sponsored endorsements. Pick tools based on your threat model and region.
        </p>

        {toolGroups.map((group) => (
          <section key={group.title} className="rounded-2xl border border-border/60 bg-card p-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">{group.title}</h2>
            <p className="text-sm text-muted-foreground mb-5">{group.description}</p>
            <div className="grid md:grid-cols-3 gap-4">
              {group.tools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-border/60 bg-background p-4 hover:border-primary/40 transition-colors"
                >
                  <p className="font-semibold text-foreground inline-flex items-center gap-2 mb-1 group-hover:text-primary transition-colors">
                    {tool.name}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </p>
                  <p className="text-sm text-muted-foreground">{tool.note}</p>
                </a>
              ))}
            </div>
          </section>
        ))}

        <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <h2 className="text-2xl font-bold text-foreground mb-3">Combine This With PureText Pages</h2>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <Link to="/secure-api-key-manager" className="rounded-lg border border-border/60 bg-card px-4 py-3 hover:border-primary/40">Secure API Key Manager</Link>
            <Link to="/developer-secrets-manager" className="rounded-lg border border-border/60 bg-card px-4 py-3 hover:border-primary/40">Developer Secrets Manager</Link>
            <Link to="/private-medical-records-vault" className="rounded-lg border border-border/60 bg-card px-4 py-3 hover:border-primary/40">Private Medical Records Vault</Link>
            <Link to="/temporary-secure-sharing" className="rounded-lg border border-border/60 bg-card px-4 py-3 hover:border-primary/40">Temporary Secure Sharing</Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PrivacyTools;
