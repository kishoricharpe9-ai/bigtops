'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { PageHero } from '@/components/layout/PageHero';

const industryArchetypes = [
  { id: 'Real Estate', label: 'Real Estate', icon: '🏡', defaultProblem: 'Lead Generation' },
  { id: 'Hospitality', label: 'Hospitality', icon: '🏨', defaultProblem: 'Brand Awareness' },
  { id: 'Education', label: 'Education', icon: '🎓', defaultProblem: 'Sales' },
  { id: 'E-Commerce', label: 'E-Commerce', icon: '🛒', defaultProblem: 'Website' },
  { id: 'B2B Tech', label: 'B2B & Tech', icon: '💻', defaultProblem: 'Lead Generation' },
];

const baseSteps = [
  {
    key: 'industry',
    questionEn: 'First up — which world do you operate in?',
    questionHi: 'Sabse pehle — aapki company kis industry me operate karti hai?',
    options: [
      { label: 'Real Estate 🏡', value: 'Real Estate' },
      { label: 'Hospitality 🏨', value: 'Hospitality' },
      { label: 'Education 🎓', value: 'Education' },
      { label: 'E-Commerce 🛒', value: 'E-Commerce' },
      { label: 'B2B & Tech 💻', value: 'B2B Tech' },
      { label: 'Other ✨', value: 'Other' },
    ],
  },
  {
    key: 'problem',
    questionEn: "Got it. What's the biggest thing holding you back right now?",
    questionHi: 'Samajh gaya! Abhi aapke business growth me sabse badi rukawat kya hai?',
    options: [
      { label: 'Brand Awareness 📣', value: 'Brand Awareness' },
      { label: 'Lead Generation 🎯', value: 'Lead Generation' },
      { label: 'Content System 📹', value: 'Content' },
      { label: 'Website Redesign ⚡', value: 'Website' },
      { label: 'Sales & Revenue 🚀', value: 'Sales' },
    ],
  },
  {
    key: 'budget',
    questionEn: 'Makes sense. What kind of monthly budget are you working with?',
    questionHi: 'Got it. Aapka approximate monthly marketing budget kitna hai?',
  },
  {
    key: 'timeline',
    questionEn: 'Last one — how soon are you looking to get moving?',
    questionHi: 'Final question — aap kitni jaldi project start karna chahte hain?',
    options: [
      { label: 'Immediate ⚡', value: 'Immediate' },
      { label: '1 – 3 months 📅', value: '1 – 3 months' },
      { label: 'Flexible 🌊', value: 'Flexible' },
    ],
  },
];

const budgetByCurrency = {
  USD: [
    { label: 'Under $1k', value: 'Under $1,000 / mo' },
    { label: '$1k – $5k', value: '$1,000 – $5,000 / mo' },
    { label: '$5k – $15k', value: '$5,000 – $15,000 / mo' },
    { label: '$15k+', value: '$15,000+ / mo' },
  ],
  INR: [
    { label: 'Under ₹50k', value: 'Under ₹50,000 / mo' },
    { label: '₹50k – ₹2 Lakhs', value: '₹50,000 – ₹2,000,000 / mo' },
    { label: '₹2 Lakhs – ₹10 Lakhs', value: '₹200,000 – ₹1,000,000 / mo' },
    { label: '₹10 Lakhs+', value: '₹1,000,000+ / mo' },
  ],
};

const availableServicesList = [
  { id: 'Performance Marketing', name: 'Performance Marketing (Ads)', icon: '🚀', impact: '+150 Leads/mo' },
  { id: 'Web Development', name: 'Next.js High-Speed Website', icon: '⚡', impact: '0.6s Load Time' },
  { id: 'SEO', name: 'Search Engine Optimization', icon: '📈', impact: '#1 Google Rank' },
  { id: 'Branding', name: 'Brand Identity & Visuals', icon: '🎨', impact: 'Premium Identity' },
  { id: 'Influencer Marketing', name: 'Creator & Influencer Campaigns', icon: '📹', impact: '3.5x Viral Reach' },
  { id: 'CRM Automation', name: 'WhatsApp & Email Lead Funnel', icon: '💬', impact: '24/7 Conversion' },
];

const quickPromptsEn = [
  '📈 Scale Real Estate Leads',
  '⚡ Next.js Web Redesign',
  '🚀 Paid Ads & High-Converting Funnels',
  '🎨 Rebrand & Content Strategy',
];

const quickPromptsHi = [
  '📈 Real Estate leads kaise badhayein?',
  '⚡ High-speed Next.js website redesign',
  '🚀 Paid ads se sales 3x kaise karein?',
  '🎨 Content & Brand awareness strategy',
];

function recommend(answers, language = 'English') {
  const problem = answers.problem ?? 'Other';
  const industry = answers.industry ?? 'your industry';
  const isHi = language === 'Hinglish';

  const byProblem = {
    'Brand Awareness': {
      headline: 'The Visibility Package',
      services: ['Branding', 'Digital Marketing', 'Influencer Marketing'],
      pitch: isHi
        ? `Hum aapke brand identity ko sharp karenge aur ${industry} me target audience tak consistently pahunchayenge.`
        : `We'll sharpen your identity and put it in front of the right audience consistently in ${industry}.`,
      confidence: '96% Fit',
      keyLevers: ['Omnichannel Reach', 'Identity Refresh', 'Influencer Amplification'],
      beforeAfter: {
        before: ['Low social media reach', 'Generic visual identity', 'Inconsistent content'],
        after: ['3.5x viral engagement', 'Luxury brand positioning', 'Automated content engine'],
      },
    },
    'Lead Generation': {
      headline: 'The Growth Engine Package',
      services: ['Performance Marketing', 'SEO'],
      pitch: isHi
        ? `Paid + Organic funnel se ${industry} buyers ko capture karke qualified leads convert karenge.`
        : `A paid + organic funnel built to turn attention into qualified leads — tuned for ${industry} buyers.`,
      confidence: '98% Fit',
      keyLevers: ['Meta & Google Ads', 'Lead Magnet Funnel', 'Local SEO Dominance'],
      beforeAfter: {
        before: ['High cost per lead', 'Unqualified junk inquiries', 'No automated CRM'],
        after: ['65% lower CPL', '100% pre-qualified buyer leads', 'Instant WhatsApp automation'],
      },
    },
    Content: {
      headline: 'The Content Studio Package',
      services: ['Digital Marketing', 'Branding'],
      pitch: isHi
        ? 'High-quality on-brand video reels aur continuous publishing system se channels humesha active rahenge.'
        : 'A steady stream of on-brand content and a system to publish it, so your channels never go quiet.',
      confidence: '95% Fit',
      keyLevers: ['Short-Form Video Reels', 'Social Systemization', 'Visual Brand Assets'],
      beforeAfter: {
        before: ['Quiet social channels', 'Inconsistent videos', 'Zero organic reach'],
        after: ['30+ custom reels/mo', 'High follower retention', 'Viral content system'],
      },
    },
    Website: {
      headline: 'The Digital Presence Package',
      services: ['Web Development', 'SEO'],
      pitch: isHi
        ? 'Fast, high-converting Next.js site jo Google par rank karegi aur pehli baar me strong impression banayegi.'
        : 'A fast, conversion-focused site that ranks — built to make a strong first impression.',
      confidence: '99% Fit',
      keyLevers: ['Next.js Performance', 'Conversion Rate Optimization', 'Core Web Vitals'],
      beforeAfter: {
        before: ['4s slow load time', 'Outdated design', 'High bounce rate'],
        after: ['0.6s Next.js load speed', 'Sleek dark glassmorphism', 'Top Google rankings'],
      },
    },
    Sales: {
      headline: 'The Revenue Package',
      services: ['Performance Marketing', 'Web Development'],
      pitch: isHi
        ? 'High-converting website ko target paid campaigns se connect karke sales goals match karenge.'
        : 'We connect a high-converting site to paid campaigns engineered around your sales goals.',
      confidence: '97% Fit',
      keyLevers: ['Full-Funnel Tracking', 'High-Ticket CRM Integration', 'Scalable Paid Media'],
      beforeAfter: {
        before: ['Inconsistent monthly sales', 'Ad budget wasted', 'No retargeting'],
        after: ['Predictable 4.2x ROAS', '24/7 Automated lead funnel', 'Scalable revenue engine'],
      },
    },
    Other: {
      headline: 'The Custom Strategy Package',
      services: ['Digital Marketing', 'Branding'],
      pitch: isHi
        ? 'Tailored service mix ke sath start karke strategy call par refinement karenge.'
        : "We'll start with a tailored mix and refine it with you on the call.",
      confidence: '94% Fit',
      keyLevers: ['Tailored Growth Audit', 'Custom Service Mix', 'Dedicated Strategist'],
      beforeAfter: {
        before: ['Unclear growth strategy', 'Disconnected tactics', 'No ROI tracking'],
        after: ['Custom growth blueprint', 'Unified marketing mix', 'Dedicated growth manager'],
      },
    },
  };

  return byProblem[problem] ?? byProblem.Other;
}

export default function HowWeCanHelpPage() {
  const router = useRouter();
  const reduce = useReducedMotion();

  // Settings state
  const [mode, setMode] = useState('guided'); // 'guided' | 'freeform' | 'audit' | 'stack'
  const [currency, setCurrency] = useState('USD'); // 'USD' | 'INR'
  const [language, setLanguage] = useState('English'); // 'English' | 'Hinglish'

  // Guided state
  const [answers, setAnswers] = useState({});
  const [stepIndex, setStepIndex] = useState(0);
  const [typing, setTyping] = useState(false);
  const [finished, setFinished] = useState(false);

  // Freeform Chat state
  const [freeformMessages, setFreeformMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I'm BigTop AI Assistant ✨. Tell me about your business, revenue goals, or challenges, and I'll generate a custom growth strategy & service bundle for you.",
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [aiResult, setAiResult] = useState(null);

  // Website Audit Tool state
  const [auditDomain, setAuditDomain] = useState('');
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditResultData, setAuditResultData] = useState(null);

  // Growth Stack Builder state
  const [selectedStackServices, setSelectedStackServices] = useState([
    'Performance Marketing',
    'Web Development',
  ]);
  const [sliderBudgetVal, setSliderBudgetVal] = useState(3000); // USD
  const [sliderTimelineVal, setSliderTimelineVal] = useState(30); // Days

  const scrollRef = useRef(null);

  // Dynamically resolve steps based on currency
  const steps = baseSteps.map(step => {
    if (step.key === 'budget') {
      return {
        ...step,
        options: budgetByCurrency[currency],
      };
    }
    return step;
  });

  const currentStep = steps[stepIndex];

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: reduce ? 'auto' : 'smooth',
    });
  }, [stepIndex, typing, finished, freeformMessages, reduce]);

  function handleSelect(value) {
    if (typing || finished) return;
    const key = currentStep.key;
    setAnswers(a => ({ ...a, [key]: value }));

    const isLast = stepIndex === steps.length - 1;
    setTyping(true);
    window.setTimeout(
      () => {
        setTyping(false);
        if (isLast) {
          setFinished(true);
        } else {
          setStepIndex(i => i + 1);
        }
      },
      reduce ? 0 : 850,
    );
  }

  function handleSelectArchetype(arch) {
    setAnswers(a => ({ ...a, industry: arch.id, problem: arch.defaultProblem }));
    if (mode !== 'guided') setMode('guided');
    setStepIndex(2); // Jump to budget step
  }

  async function handleSendFreeform(queryText) {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || typing) return;

    const userMsg = { sender: 'user', text: textToSend };
    setFreeformMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setTyping(true);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToSend, currency, language }),
      });
      const json = await res.json();
      setTyping(false);

      if (json.success && json.data) {
        const data = json.data;
        setFreeformMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: data.message,
            recommendation: data,
          },
        ]);
        setAiResult(data);
      } else {
        const fallback = recommend({ problem: 'Sales' }, language);
        setFreeformMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: language === 'Hinglish'
              ? "Aapki requirement analyze ho gayi hai! Ye raha recommended growth package:"
              : "I've analyzed your requirement! Here is your recommended growth package:",
            recommendation: fallback,
          },
        ]);
      }
    } catch (err) {
      setTyping(false);
      const fallback = recommend({ problem: 'Sales' }, language);
      setFreeformMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: "Strategy created for your business goals!",
          recommendation: fallback,
        },
      ]);
    }
  }

  async function handleRunAudit(e) {
    if (e) e.preventDefault();
    if (!auditDomain.trim() || auditLoading) return;

    setAuditLoading(true);
    setAuditResultData(null);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'audit', websiteUrl: auditDomain, currency, language }),
      });
      const json = await res.json();
      setAuditLoading(false);

      if (json.success && json.data) {
        setAuditResultData(json.data);
      }
    } catch (err) {
      setAuditLoading(false);
    }
  }

  function toggleStackService(serviceId) {
    if (selectedStackServices.includes(serviceId)) {
      if (selectedStackServices.length === 1) return; // Keep at least one
      setSelectedStackServices(prev => prev.filter(s => s !== serviceId));
    } else {
      setSelectedStackServices(prev => [...prev, serviceId]);
    }
  }

  function goToQuote(customData) {
    const activeRec = customData || (finished ? recommend(answers, language) : aiResult);
    const params = new URLSearchParams({
      industry: answers.industry || customData?.industry || 'Custom',
      problem: answers.problem || customData?.problem || 'Growth',
      budget: answers.budget || `${sliderBudgetVal} (${currency})`,
      currency: currency,
      language: language,
      timeline: answers.timeline || `${sliderTimelineVal} Days`,
      package: activeRec?.headline || 'Custom Growth Stack',
      services: Array.isArray(activeRec?.services)
        ? activeRec.services.join(', ')
        : selectedStackServices.join(', '),
    });
    router.push(`/contact?${params.toString()}`);
  }

  function restart() {
    setAnswers({});
    setStepIndex(0);
    setTyping(false);
    setFinished(false);
    setFreeformMessages([
      {
        sender: 'ai',
        text: "Hello! I'm BigTop AI Assistant ✨. Tell me about your business, revenue goals, or challenges, and I'll generate a custom growth strategy & service bundle for you.",
      },
    ]);
    setAiResult(null);
    setAuditResultData(null);
    setAuditDomain('');
  }

  const rec = finished ? recommend(answers, language) : null;

  const bubbleIn = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12, filter: 'blur(6px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <>
      <PageHero
        badge="AI Growth Hub"
        titleLine1="How We Can Help You"
        description="Interact with our AI Assistant, run instant website audits, or build your custom growth stack in real-time."
      />

      <section className="relative z-10 pb-24">
        <Container className="max-w-4xl">
          {/* Top Bar: Language & Currency Controls */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/60 p-3.5 backdrop-blur-xl">
            {/* Industry Archetype Quick Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted pr-1">Industry:</span>
              {industryArchetypes.map(arch => (
                <button
                  key={arch.id}
                  onClick={() => handleSelectArchetype(arch)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
                    answers.industry === arch.id
                      ? 'bg-[#12ced6] text-black shadow-md'
                      : 'border border-white/10 bg-white/[0.05] text-gray-300 hover:border-[#12ced6]/50 hover:text-white'
                  }`}
                >
                  <span>{arch.icon}</span> {arch.label}
                </button>
              ))}
            </div>

            {/* Language & Currency Toggles */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] p-1">
                <button
                  onClick={() => setLanguage('English')}
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold transition ${
                    language === 'English' ? 'bg-[#12ced6] text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  🇺🇸 EN
                </button>
                <button
                  onClick={() => setLanguage('Hinglish')}
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold transition ${
                    language === 'Hinglish' ? 'bg-[#12ced6] text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  🇮🇳 Hinglish
                </button>
              </div>

              {/* Currency Switcher */}
              <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] p-1">
                <button
                  onClick={() => setCurrency('USD')}
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold transition ${
                    currency === 'USD' ? 'bg-[#12ced6] text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  USD ($)
                </button>
                <button
                  onClick={() => setCurrency('INR')}
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold transition ${
                    currency === 'INR' ? 'bg-[#12ced6] text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  INR (₹)
                </button>
              </div>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="mb-6 flex justify-center">
            <div className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-white/10 bg-black/60 p-1.5 backdrop-blur-xl">
              <button
                onClick={() => setMode('guided')}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  mode === 'guided'
                    ? 'bg-gradient-to-r from-[#12ced6] to-[#0a8e94] text-black shadow-lg shadow-[#12ced6]/20'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                <span>✨</span> Guided AI
              </button>
              <button
                onClick={() => setMode('freeform')}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  mode === 'freeform'
                    ? 'bg-gradient-to-r from-[#12ced6] to-[#0a8e94] text-black shadow-lg shadow-[#12ced6]/20'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                <span>💬</span> Freeform AI
              </button>
              <button
                onClick={() => setMode('audit')}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  mode === 'audit'
                    ? 'bg-gradient-to-r from-[#12ced6] to-[#0a8e94] text-black shadow-lg shadow-[#12ced6]/20'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                <span>🔍</span> AI Site Audit
              </button>
              <button
                onClick={() => setMode('stack')}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  mode === 'stack'
                    ? 'bg-gradient-to-r from-[#12ced6] to-[#0a8e94] text-black shadow-lg shadow-[#12ced6]/20'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                <span>🏗️</span> Growth Stack Builder
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-white/[0.1] bg-black/40 shadow-2xl backdrop-blur-2xl">
            {/* Progress bar for Guided mode */}
            {mode === 'guided' && (
              <div className="h-1.5 w-full bg-white/[0.06]">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#12ced6] via-cyan-300 to-white/90"
                  initial={false}
                  animate={{
                    width: `${((finished ? steps.length : stepIndex) / steps.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            )}

            {/* Main Content Area based on active mode */}
            <div ref={scrollRef} className="max-h-[65vh] space-y-6 overflow-y-auto px-5 py-7 sm:px-8">
              {mode === 'guided' && (
                <>
                  {/* Guided Mode Content */}
                  <BotBubble {...bubbleIn}>
                    {language === 'Hinglish' ? (
                      <>Hey 👋 main aapka <strong>BigTop AI Assistant</strong> hoon. Main aapke business growth ke liye sabse best strategy figure out karunga!</>
                    ) : (
                      <>Hey 👋 I&apos;m your <strong>BigTop AI Assistant</strong>. Let&apos;s figure out the optimal strategy for your business growth!</>
                    )}
                  </BotBubble>

                  {steps.map((step, i) => {
                    if (i > stepIndex) return null;
                    const answered = answers[step.key];
                    const showQuestion = i < stepIndex || (i === stepIndex && !finished) || finished;
                    const questionText = language === 'Hinglish' ? step.questionHi : step.questionEn;
                    return (
                      <div key={step.key} className="space-y-5">
                        {showQuestion && <BotBubble {...bubbleIn}>{questionText}</BotBubble>}
                        {answered && <UserBubble reduce={reduce}>{answered}</UserBubble>}
                      </div>
                    );
                  })}

                  {finished && rec && !typing && (
                    <BotBubble {...bubbleIn}>
                      <p className="text-foreground font-medium">
                        {language === 'Hinglish'
                          ? 'Aapke responses ke basis par ye hai aapka custom AI growth roadmap:'
                          : 'Based on AI analysis of your inputs, here is your customized growth roadmap:'}
                      </p>
                      <RecommendationCard
                        rec={rec}
                        onQuote={() => goToQuote(rec)}
                        currency={currency}
                        language={language}
                      />
                    </BotBubble>
                  )}
                </>
              )}

              {mode === 'freeform' && (
                <>
                  {/* Freeform AI Chat Mode Content */}
                  {freeformMessages.map((msg, idx) => (
                    <div key={idx} className="space-y-4">
                      {msg.sender === 'ai' ? (
                        <BotBubble {...bubbleIn}>
                          <div>{msg.text}</div>
                          {msg.recommendation && (
                            <RecommendationCard
                              rec={msg.recommendation}
                              onQuote={() => goToQuote(msg.recommendation)}
                              currency={currency}
                              language={language}
                            />
                          )}
                        </BotBubble>
                      ) : (
                        <UserBubble reduce={reduce}>{msg.text}</UserBubble>
                      )}
                    </div>
                  ))}
                </>
              )}

              {mode === 'audit' && (
                <div className="space-y-6">
                  {/* AI Site Audit Tool Interface */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
                    <span className="text-3xl">🔍</span>
                    <h3 className="mt-2 text-xl font-bold text-white">Instant AI Website & Growth Audit</h3>
                    <p className="mt-1 text-sm text-gray-300">
                      {language === 'Hinglish'
                        ? 'Apni company ya competitor ki website URL dalkar instant conversion gap analysis report paayein.'
                        : 'Enter your website or competitor domain URL to analyze performance, mobile speed, and conversion gaps.'}
                    </p>

                    <form onSubmit={handleRunAudit} className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <input
                        type="text"
                        value={auditDomain}
                        onChange={e => setAuditDomain(e.target.value)}
                        placeholder="e.g. mycompany.com or brandname.in"
                        className="flex-1 rounded-full border border-white/15 bg-black/60 px-5 py-3.5 text-sm text-white placeholder-gray-500 focus:border-[#12ced6] focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={!auditDomain.trim() || auditLoading}
                        className="rounded-full bg-gradient-to-r from-[#12ced6] to-[#0a8e94] px-7 py-3.5 text-sm font-bold text-black transition hover:brightness-110 disabled:opacity-50"
                      >
                        {auditLoading ? 'Analyzing...' : 'Run Audit ⚡'}
                      </button>
                    </form>
                  </div>

                  {/* Audit Results Presentation */}
                  {auditResultData && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl border border-[#12ced6]/40 bg-gradient-to-br from-[#12ced6]/[0.08] to-transparent p-6 shadow-xl space-y-5"
                    >
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <h4 className="text-lg font-bold text-white">
                          Audit Report for <span className="text-[#12ced6]">{auditResultData.domain}</span>
                        </h4>
                        <span className="rounded-full bg-[#12ced6]/20 px-3 py-1 text-xs font-bold text-[#12ced6]">
                          {auditResultData.confidence}
                        </span>
                      </div>

                      {/* Performance Gauges */}
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                          <p className="text-2xl font-extrabold text-amber-400">{auditResultData.speedScore}/100</p>
                          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mt-1">Mobile Speed</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                          <p className="text-2xl font-extrabold text-amber-400">{auditResultData.mobileScore}/100</p>
                          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mt-1">UX & Conversion</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                          <p className="text-2xl font-extrabold text-emerald-400">{auditResultData.seoScore}/100</p>
                          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mt-1">SEO Health</p>
                        </div>
                      </div>

                      {/* Conversion Gaps */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-rose-400">Critical Growth Gaps Found:</p>
                        <ul className="mt-2 space-y-1.5 text-xs text-gray-300">
                          {auditResultData.conversionGaps.map((gap, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-rose-400">❌</span>
                              {gap}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Recommended Fixes */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#12ced6]">Recommended AI Action Plan:</p>
                        <ul className="mt-2 space-y-1.5 text-xs text-gray-200">
                          {auditResultData.aiFixes.map((fix, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#12ced6]">✅</span>
                              {fix}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => goToQuote(auditResultData)}
                        className="w-full rounded-full bg-gradient-to-r from-[#12ced6] to-[#0a8e94] py-3.5 text-sm font-bold text-black transition hover:brightness-110 shadow-lg shadow-[#12ced6]/25"
                      >
                        Fix Growth Gaps & Get Quote →
                      </button>
                    </motion.div>
                  )}
                </div>
              )}

              {mode === 'stack' && (
                <div className="space-y-6">
                  {/* Growth Stack Builder Canvas */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span>🏗️</span> Build Your Custom Growth Stack
                      </h3>
                      <p className="mt-1 text-sm text-gray-300">
                        {language === 'Hinglish'
                          ? 'Services select karke monthly budget & timeline slider adjust karein to calculate real-time impact.'
                          : 'Select service modules and adjust budget & timeline sliders to view real-time strategy match scores.'}
                      </p>
                    </div>

                    {/* Service Module Selector Grid */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {availableServicesList.map(srv => {
                        const isSelected = selectedStackServices.includes(srv.id);
                        return (
                          <div
                            key={srv.id}
                            onClick={() => toggleStackService(srv.id)}
                            className={`cursor-pointer rounded-xl border p-3.5 transition flex items-center justify-between ${
                              isSelected
                                ? 'border-[#12ced6] bg-[#12ced6]/[0.1] text-white'
                                : 'border-white/10 bg-black/40 text-gray-400 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{srv.icon}</span>
                              <div>
                                <p className="text-xs font-bold text-white">{srv.name}</p>
                                <p className="text-[11px] text-[#12ced6]">{srv.impact}</p>
                              </div>
                            </div>
                            <span className="text-lg">{isSelected ? '✅' : '➕'}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Interactive Matrix Sliders */}
                    <div className="space-y-4 border-t border-white/10 pt-4">
                      {/* Budget Slider */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-gray-300">
                          <span>Target Monthly Budget ({currency}):</span>
                          <span className="text-[#12ced6] font-bold text-sm">
                            {currency === 'INR'
                              ? `₹${(sliderBudgetVal * 80).toLocaleString('en-IN')}`
                              : `$${sliderBudgetVal.toLocaleString()} / mo`}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1000"
                          max="15000"
                          step="500"
                          value={sliderBudgetVal}
                          onChange={e => setSliderBudgetVal(Number(e.target.value))}
                          className="mt-2 h-2 w-full accent-[#12ced6] cursor-pointer"
                        />
                      </div>

                      {/* Timeline Slider */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-gray-300">
                          <span>Target Launch Speed:</span>
                          <span className="text-[#12ced6] font-bold text-sm">{sliderTimelineVal} Days</span>
                        </div>
                        <input
                          type="range"
                          min="7"
                          max="90"
                          step="7"
                          value={sliderTimelineVal}
                          onChange={e => setSliderTimelineVal(Number(e.target.value))}
                          className="mt-2 h-2 w-full accent-[#12ced6] cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Live Stack Calculation Summary */}
                    <div className="rounded-xl border border-[#12ced6]/40 bg-[#12ced6]/[0.06] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#12ced6]">Calculated Stack Score</p>
                        <p className="text-lg font-extrabold text-white">
                          {selectedStackServices.length * 18 + 15}% High-Growth Alignment
                        </p>
                        <p className="text-xs text-gray-300">
                          Est. Leads: {selectedStackServices.length * 40} – {selectedStackServices.length * 90} qualified leads/mo
                        </p>
                      </div>

                      <button
                        onClick={() => goToQuote({ headline: 'Custom Growth Stack', services: selectedStackServices })}
                        className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#12ced6] to-[#0a8e94] px-6 py-3 text-xs font-bold text-black transition hover:brightness-110 shadow-lg shadow-[#12ced6]/25"
                      >
                        Deploy This Stack →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <TypingBubble />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Area for Guided & Freeform Modes */}
            {(mode === 'guided' || mode === 'freeform') && (
              <div className="border-t border-white/10 bg-black/60 px-5 py-5 sm:px-8">
                {mode === 'guided' ? (
                  !finished ? (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2.5">
                        <AnimatePresence mode="wait">
                          {!typing && (
                            <motion.div
                              key={`${currentStep.key}-${currency}`}
                              initial={reduce ? false : { opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={reduce ? undefined : { opacity: 0, y: -8 }}
                              transition={{ duration: 0.3 }}
                              className="flex flex-wrap gap-2.5"
                            >
                              {currentStep.options.map(opt => (
                                <button
                                  key={opt.value}
                                  onClick={() => handleSelect(opt.value)}
                                  className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-[#12ced6]/60 hover:bg-[#12ced6]/10 hover:text-white"
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        onClick={() => goToQuote(rec)}
                        className="flex-1 rounded-full bg-gradient-to-r from-[#12ced6] to-[#0a8e94] py-3.5 text-sm font-semibold text-black transition hover:brightness-110 shadow-lg shadow-[#12ced6]/25"
                      >
                        Get My Custom Quote →
                      </button>
                      <button
                        onClick={restart}
                        className="rounded-full border border-white/15 bg-white/[0.06] px-6 py-3.5 text-sm font-medium text-foreground transition hover:bg-white/[0.12]"
                      >
                        Start over
                      </button>
                    </div>
                  )
                ) : (
                  /* Freeform Chat Input Area */
                  <div className="space-y-4">
                    {/* Quick Prompts */}
                    <div className="flex flex-wrap gap-2">
                      {(language === 'Hinglish' ? quickPromptsHi : quickPromptsEn).map((qp, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendFreeform(qp)}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-muted transition hover:border-[#12ced6]/40 hover:bg-white/[0.08] hover:text-foreground"
                        >
                          {qp}
                        </button>
                      ))}
                    </div>

                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        handleSendFreeform();
                      }}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={inputQuery}
                        onChange={e => setInputQuery(e.target.value)}
                        placeholder={
                          language === 'Hinglish'
                            ? 'Poochhiye BigTop AI se kuch bhi apne business ya growth goals ke baare me...'
                            : 'Ask BigTop AI anything about your business or goals...'
                        }
                        className="flex-1 rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm text-foreground placeholder-white/40 focus:border-[#12ced6] focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={!inputQuery.trim() || typing}
                        className="rounded-full bg-gradient-to-r from-[#12ced6] to-[#0a8e94] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-50"
                      >
                        Send ✨
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}

function BotBubble({ children, ...motionProps }) {
  return (
    <motion.div {...motionProps} className="flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#12ced6] via-[#0a8e94] to-[#05484b] text-xs font-bold text-black shadow-md shadow-[#12ced6]/30 border border-white/20">
        ✨ BT
      </div>
      <div className="max-w-[85%] space-y-2 rounded-2xl rounded-tl-xs border border-white/10 bg-white/[0.07] px-4 py-3.5 text-sm leading-relaxed text-foreground shadow-lg backdrop-blur-md">
        {children}
      </div>
    </motion.div>
  );
}

function UserBubble({ children, reduce }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10, x: 10 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex justify-end"
    >
      <div className="max-w-[80%] rounded-2xl rounded-tr-xs bg-gradient-to-r from-white to-gray-100 px-4 py-3 text-sm font-semibold text-black shadow-md">
        {children}
      </div>
    </motion.div>
  );
}

function TypingBubble() {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#12ced6] to-[#0a8e94] text-xs font-bold text-black shadow-md shadow-[#12ced6]/30">
        ✨ BT
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-xs border border-white/10 bg-white/[0.07] px-5 py-4">
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-[#12ced6]"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function RecommendationCard({ rec, onQuote, currency, language }) {
  if (!rec) return null;
  return (
    <div className="mt-3 rounded-2xl border border-[#12ced6]/40 bg-gradient-to-br from-[#12ced6]/[0.08] to-transparent p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[#12ced6]/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#12ced6] border border-[#12ced6]/30">
          AI Recommendation Match • {rec.confidence || '98% Fit'}
        </span>
        <span className="text-xs font-semibold text-gray-400">
          {currency === 'INR' ? '🇮🇳 INR (₹)' : '🇺🇸 USD ($)'}
        </span>
      </div>

      <h4 className="text-xl font-bold text-white">{rec.headline}</h4>

      <div className="flex flex-wrap gap-2">
        {rec.services?.map(s => (
          <span
            key={s}
            className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white shadow-sm"
          >
            {s}
          </span>
        ))}
      </div>

      <p className="text-sm leading-relaxed text-gray-300">{rec.pitch}</p>

      {/* Before vs After Benchmark Card */}
      {rec.beforeAfter && (
        <div className="rounded-xl border border-white/10 bg-black/40 p-3.5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
            ⚡ Expected Transformation Benchmark:
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs">
            <div className="rounded-lg bg-rose-500/[0.1] border border-rose-500/20 p-2.5">
              <p className="font-bold text-rose-400 mb-1">❌ Before BigTop</p>
              <ul className="space-y-1 text-gray-300">
                {rec.beforeAfter.before.map((b, i) => (
                  <li key={i}>• {b}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg bg-emerald-500/[0.1] border border-emerald-500/20 p-2.5">
              <p className="font-bold text-emerald-400 mb-1">🚀 After BigTop</p>
              <ul className="space-y-1 text-gray-200">
                {rec.beforeAfter.after.map((a, i) => (
                  <li key={i}>• {a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {rec.keyLevers && (
        <div className="border-t border-white/10 pt-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#12ced6]">
            Key AI Strategy Levers:
          </p>
          <ul className="mt-2 space-y-1 text-xs text-gray-300">
            {rec.keyLevers.map((lever, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#12ced6]" />
                {lever}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={onQuote}
        className="w-full rounded-full bg-gradient-to-r from-[#12ced6] to-[#0a8e94] py-3 text-sm font-bold text-black transition hover:brightness-110 shadow-lg shadow-[#12ced6]/20"
      >
        Lock In Strategy & Get Quote →
      </button>
    </div>
  );
}
