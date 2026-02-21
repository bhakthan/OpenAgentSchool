import React from 'react';
import { Scales, Warning, ShieldCheck, Gavel, Prohibit, CurrencyDollar, HandHeart, ArrowLeft } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

/**
 * Terms of Use & Legal Disclaimer
 * Comprehensive legal notice covering permitted use, prohibited activities,
 * intellectual property, liability limitations, and compliance requirements.
 */
const TermsOfUsePage: React.FC = () => {
  const effectiveDate = 'February 21, 2026';
  const lastUpdated = 'February 21, 2026';

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">
      {/* Back link */}
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft size={14} /> Back to Home
      </Link>

      {/* Page Header */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Scales size={28} weight="duotone" className="text-primary" />
          Terms of Use &amp; Legal Disclaimer
        </h1>
        <p className="text-sm text-muted-foreground">
          Effective Date: {effectiveDate} &nbsp;|&nbsp; Last Updated: {lastUpdated}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Please read these Terms of Use ("Terms") carefully before using Open Agent School ("the Platform," "we," "us," or "our") located at{' '}
          <a href="https://openagentschool.org" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">
            openagentschool.org
          </a>. By accessing or using the Platform, you ("User," "you," or "your") acknowledge that you have read, understood, and agree to be bound by these Terms in their entirety. If you do not agree, you must immediately cease all use of the Platform.
        </p>
      </header>

      <hr className="border-border" />

      {/* Section 1 – Nature of the Platform */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <HandHeart size={20} weight="duotone" className="text-blue-600 dark:text-blue-400" />
          1. Nature of the Platform &amp; Educational Purpose
        </h2>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
          <p>
            Open Agent School is a <strong>free, open-source educational resource</strong> designed exclusively for non-commercial learning, skill development, and academic exploration of artificial intelligence, agentic AI architectures, and related technologies.
          </p>
          <p>
            All content — including but not limited to tutorials, interactive exercises, code samples, visualizations, quiz materials, study modes, AI-generated insights, and documentation — is provided <strong>solely for educational and informational purposes</strong>. Nothing on the Platform constitutes professional advice, consulting services, commercial software, or a production-ready product offering.
          </p>
          <p>
            The Platform operates under the principle of <strong>"Bring Your Own Keys" (BYOK)</strong>. Users who configure third-party API keys do so at their own discretion, expense, and risk. Open Agent School does not provision, manage, or assume liability for third-party services accessed through the Platform.
          </p>
        </div>
      </section>

      {/* Section 2 – Prohibited Uses */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Prohibit size={20} weight="duotone" className="text-red-600 dark:text-red-400" />
          2. Prohibited Uses
        </h2>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
          <p>
            You expressly agree that you shall <strong>NOT</strong> use the Platform, its content, code, data, designs, or any derivative works for any of the following purposes:
          </p>
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 space-y-2">
            <h3 className="text-sm font-semibold text-destructive flex items-center gap-2">
              <Warning size={16} weight="fill" /> Strictly Prohibited Activities
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-foreground/80">
              <li>
                <strong>Commercial Exploitation:</strong> Selling, licensing, sublicensing, monetizing, or otherwise commercially distributing the Platform's content, learning materials, AI-generated outputs, study content, quizzes, or any other intellectual property — whether in original or modified form — as a paid product, service, or offering.
              </li>
              <li>
                <strong>Business Formation Based on Platform Content:</strong> Using the Platform's proprietary educational content, curriculum structure, study methodologies, assessment frameworks, branding, visual designs, or unique pedagogical approaches as the foundation for a competing business, consultancy, training company, course, or commercial educational service.
              </li>
              <li>
                <strong>Revenue-Generating Services:</strong> Incorporating the Platform's content, code, or AI-generated outputs into any product, service, SaaS application, API, tool, or offering that directly or indirectly generates revenue, including but not limited to: paid courses, certification programs, consulting deliverables, training workshops sold for profit, or subscription-based services.
              </li>
              <li>
                <strong>Misrepresentation &amp; Passing Off:</strong> Representing the Platform's content, AI-generated responses, educational materials, or code samples as your own original work for commercial gain, academic fraud, professional misrepresentation, or credential falsification.
              </li>
              <li>
                <strong>Unauthorized Data Collection:</strong> Scraping, harvesting, data-mining, or systematically downloading the Platform's content for the purpose of building competing datasets, training commercial AI/ML models, populating databases for resale, or creating derivative content libraries for commercial distribution.
              </li>
              <li>
                <strong>Illegal Activities:</strong> Using the Platform or any of its content, tools, AI capabilities, or code samples to facilitate, support, plan, or execute any activity that violates applicable local, state, national, or international laws or regulations, including but not limited to: fraud, identity theft, unauthorized access to systems, creation of malicious software, harassment, discrimination, or any activity that infringes upon the rights of third parties.
              </li>
              <li>
                <strong>Weaponization &amp; Harmful Applications:</strong> Applying knowledge, patterns, or code gained from the Platform to develop systems intended to cause harm, including but not limited to: autonomous weapons systems, mass surveillance tools that violate human rights, systems designed to deceive or manipulate individuals at scale, deepfake generation for malicious purposes, or any AI system that poses a clear and present danger to public safety.
              </li>
              <li>
                <strong>Evasion of Terms:</strong> Using technical measures, intermediaries, shell entities, or any other indirect means to circumvent or evade the restrictions set forth in these Terms.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Section 3 – Permitted Uses */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ShieldCheck size={20} weight="duotone" className="text-green-600 dark:text-green-400" />
          3. Permitted Uses
        </h2>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
          <p>Subject to compliance with these Terms, you are permitted to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Access and use the Platform for personal learning, self-study, and educational enrichment.</li>
            <li>Use the Platform's open-source code components in accordance with the applicable open-source license (MIT License) for personal, academic, or non-commercial projects.</li>
            <li>Share links to the Platform with peers, colleagues, or students for educational purposes.</li>
            <li>Reference or cite the Platform's content in academic papers, blog posts, or educational presentations with proper attribution to "Open Agent School — openagentschool.org."</li>
            <li>Contribute to the Platform's open-source codebase through community contributions, bug reports, and pull requests in accordance with the project's contribution guidelines.</li>
            <li>Use knowledge and concepts learned from the Platform to advance your professional skills and apply them in your work, provided you do not redistribute the Platform's proprietary content itself.</li>
          </ul>
        </div>
      </section>

      {/* Section 4 – Intellectual Property */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Gavel size={20} weight="duotone" className="text-amber-600 dark:text-amber-400" />
          4. Intellectual Property
        </h2>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
          <p>
            <strong>4.1 Platform Code:</strong> The Platform's source code is released under the MIT License. The MIT License governs use, modification, and distribution of the code only. It does not extend to the Platform's curated educational content, curriculum design, proprietary study methodologies, visual branding, or AI-generated outputs.
          </p>
          <p>
            <strong>4.2 Educational Content:</strong> All educational materials, including but not limited to: curriculum structure, learning progressions, study mode questions, Socratic questioning frameworks, interactive scenarios, debug challenges, quiz content, concept descriptions, assessment rubrics, and pedagogical methodologies are the proprietary intellectual property of Open Agent School and its contributors. These materials are licensed for personal educational use only and may not be reproduced, distributed, or commercially exploited without prior written consent.
          </p>
          <p>
            <strong>4.3 AI-Generated Output:</strong> Responses generated by AI features (including "Ask AI," study mode evaluations, and critical thinking assessments) are generated using third-party large language models via your API keys. Open Agent School makes no claim of ownership over AI-generated outputs but disclaims all liability for their accuracy, completeness, or fitness for any purpose. You may not represent AI-generated outputs as professional advice or authoritative guidance.
          </p>
          <p>
            <strong>4.4 Trademarks:</strong> "Open Agent School," the Open Agent School logo, and associated branding are the intellectual property of the project maintainers. You may not use these marks in connection with any commercial product, service, or offering without prior written permission.
          </p>
        </div>
      </section>

      {/* Section 5 – Disclaimer of Warranties */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Warning size={20} weight="duotone" className="text-orange-600 dark:text-orange-400" />
          5. Disclaimer of Warranties
        </h2>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-2 uppercase tracking-wide" style={{ fontSize: '11px' }}>
          <p>
            THE PLATFORM AND ALL CONTENT, MATERIALS, INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES PROVIDED ON THE PLATFORM ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, OPEN AGENT SCHOOL AND ITS CONTRIBUTORS DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
          </p>
          <p>
            OPEN AGENT SCHOOL DOES NOT WARRANT THAT: (A) THE PLATFORM WILL MEET YOUR REQUIREMENTS; (B) THE PLATFORM WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE; (C) THE RESULTS OBTAINED FROM USE OF THE PLATFORM WILL BE ACCURATE, RELIABLE, OR COMPLETE; (D) THE QUALITY OF ANY CONTENT, INFORMATION, OR OTHER MATERIAL OBTAINED THROUGH THE PLATFORM WILL MEET YOUR EXPECTATIONS; OR (E) ANY ERRORS IN THE PLATFORM WILL BE CORRECTED.
          </p>
          <p>
            AI-GENERATED CONTENT IS PRODUCED BY THIRD-PARTY MODELS AND MAY CONTAIN INACCURACIES, HALLUCINATIONS, OUTDATED INFORMATION, OR ERRORS. IT SHOULD NOT BE RELIED UPON AS A SUBSTITUTE FOR PROFESSIONAL JUDGMENT, LEGAL ADVICE, MEDICAL ADVICE, FINANCIAL ADVICE, OR ANY OTHER FORM OF PROFESSIONAL COUNSEL.
          </p>
        </div>
      </section>

      {/* Section 6 – Limitation of Liability */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CurrencyDollar size={20} weight="duotone" className="text-purple-600 dark:text-purple-400" />
          6. Limitation of Liability
        </h2>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-2 uppercase tracking-wide" style={{ fontSize: '11px' }}>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL OPEN AGENT SCHOOL, ITS MAINTAINERS, CONTRIBUTORS, AFFILIATES, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES (EVEN IF OPEN AGENT SCHOOL HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES), ARISING OUT OF OR IN CONNECTION WITH: (A) YOUR USE OF OR INABILITY TO USE THE PLATFORM; (B) ANY CONTENT OBTAINED FROM THE PLATFORM; (C) UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR TRANSMISSIONS OR DATA; (D) STATEMENTS OR CONDUCT OF ANY THIRD PARTY ON THE PLATFORM; (E) AI-GENERATED OUTPUTS OR RECOMMENDATIONS; OR (F) ANY OTHER MATTER RELATING TO THE PLATFORM.
          </p>
          <p>
            IN NO EVENT SHALL THE AGGREGATE LIABILITY OF OPEN AGENT SCHOOL AND ITS CONTRIBUTORS FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE PLATFORM EXCEED THE AMOUNT YOU HAVE PAID TO ACCESS THE PLATFORM IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR ZERO DOLLARS ($0.00 USD), WHICHEVER IS GREATER.
          </p>
        </div>
      </section>

      {/* Section 7 – Indemnification */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">7. Indemnification</h2>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
          <p>
            You agree to defend, indemnify, and hold harmless Open Agent School, its maintainers, contributors, affiliates, and their respective officers, directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from: (a) your use of the Platform; (b) your violation of these Terms; (c) your violation of any third-party right, including any intellectual property, property, or privacy right; (d) any claim that your use of the Platform caused damage to a third party; or (e) any unauthorized or prohibited use as described in Section 2.
          </p>
          <p>
            This defense and indemnification obligation shall survive the termination of these Terms and your use of the Platform.
          </p>
        </div>
      </section>

      {/* Section 8 – Third-Party Services */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">8. Third-Party Services &amp; API Keys</h2>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
          <p>
            The Platform integrates with third-party services (including but not limited to OpenAI, Azure, Google Cloud, AWS, Deepgram, and ElevenLabs) via API keys that you provide. You acknowledge that:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>You are solely responsible for complying with the terms of service of any third-party provider whose API keys you configure on the Platform.</li>
            <li>Open Agent School does not store, transmit, or have access to your API keys beyond your local browser storage.</li>
            <li>Any costs, charges, or liabilities incurred through third-party services are your sole responsibility.</li>
            <li>Open Agent School bears no liability for third-party service outages, data breaches, or policy changes.</li>
          </ul>
        </div>
      </section>

      {/* Section 9 – Data Privacy */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">9. Data Privacy &amp; Local Storage</h2>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
          <p>
            The Platform stores user preferences, API keys, and progress data in your browser's <code className="bg-muted px-1 rounded text-xs">localStorage</code>. This data does not leave your device unless you explicitly interact with third-party APIs or backend services. Open Agent School collects minimal analytics data (page views via privacy-respecting analytics) and does not sell, share, or monetize any user data.
          </p>
          <p>
            For shared or public devices, you are responsible for clearing your browser data and settings after each session.
          </p>
        </div>
      </section>

      {/* Section 10 – Modifications */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">10. Modifications to Terms</h2>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
          <p>
            Open Agent School reserves the right to modify these Terms at any time. Changes will be effective immediately upon posting the revised Terms on the Platform with an updated "Last Updated" date. Your continued use of the Platform after the posting of revised Terms constitutes your acceptance of such changes. It is your responsibility to review these Terms periodically.
          </p>
        </div>
      </section>

      {/* Section 11 – Termination */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">11. Termination &amp; Enforcement</h2>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
          <p>
            Open Agent School reserves the right to, at its sole discretion and without notice: (a) restrict, suspend, or terminate your access to the Platform; (b) pursue any available legal remedy for violations of these Terms; and (c) cooperate with law enforcement authorities in investigating suspected illegal activity conducted through or facilitated by the Platform.
          </p>
          <p>
            Sections 2 (Prohibited Uses), 4 (Intellectual Property), 5 (Disclaimer of Warranties), 6 (Limitation of Liability), 7 (Indemnification), and this Section 11 shall survive termination.
          </p>
        </div>
      </section>

      {/* Section 12 – Governing Law */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">12. Governing Law &amp; Dispute Resolution</h2>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of Texas, United States, without regard to its conflict of law provisions. Any dispute arising under or in connection with these Terms shall be resolved through binding arbitration administered by a mutually agreed-upon arbitration body, with the arbitration to take place in Texas, United States. You agree to waive any right to a jury trial.
          </p>
          <p>
            Notwithstanding the foregoing, Open Agent School retains the right to seek injunctive or other equitable relief in any court of competent jurisdiction to prevent the actual or threatened infringement, misappropriation, or violation of its intellectual property rights.
          </p>
        </div>
      </section>

      {/* Section 13 – Severability */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">13. Severability &amp; Entire Agreement</h2>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
          <p>
            If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, such provision shall be modified to the minimum extent necessary to make it valid and enforceable, and the remaining provisions shall continue in full force and effect.
          </p>
          <p>
            These Terms, together with the MIT License governing the source code, constitute the entire agreement between you and Open Agent School with respect to the Platform and supersede all prior or contemporaneous communications and proposals, whether oral or written, between you and Open Agent School.
          </p>
        </div>
      </section>

      {/* Section 14 – Contact */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">14. Contact Information</h2>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
          <p>
            For questions about these Terms, to report misuse, or to request permissions not expressly granted herein, please contact the project maintainers through the official repository at{' '}
            <a href="https://github.com/OpenAgentSchool" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">
              github.com/OpenAgentSchool
            </a>{' '}
            or via LinkedIn at{' '}
            <a href="https://www.linkedin.com/in/bhakthan/" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/bhakthan
            </a>.
          </p>
        </div>
      </section>

      <hr className="border-border" />

      {/* Closing acknowledgment */}
      <div className="bg-muted/50 border border-border rounded-lg p-5 text-center space-y-2">
        <Scales size={24} className="mx-auto text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">
          By continuing to use Open Agent School, you acknowledge that you have read, understood, and agreed to these Terms of Use.
        </p>
        <p className="text-xs text-muted-foreground">
          Open Agent School is a community-driven, non-commercial educational initiative. Thank you for using it responsibly.
        </p>
      </div>
    </div>
  );
};

export default TermsOfUsePage;
