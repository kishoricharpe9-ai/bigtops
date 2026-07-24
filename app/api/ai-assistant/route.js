import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, prompt, websiteUrl, industry, problem, budget, timeline, language, currency } = body;

    const isHinglish = language === 'Hinglish';
    const isINR = currency === 'INR';

    // 1. Handling Website Audit Action
    if (action === 'audit' && websiteUrl) {
      const cleanUrl = websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
      const auditResult = {
        domain: cleanUrl,
        speedScore: 64,
        mobileScore: 58,
        seoScore: 72,
        conversionGaps: [
          'Page load speed is over 3.2s on mobile devices.',
          'Missing high-converting call-to-action above the fold.',
          'No automated lead capture funnel or CRM sync.',
        ],
        aiFixes: [
          'Migrate frontend to Next.js for sub-second page loads & 99+ Core Web Vitals.',
          'Deploy high-ticket targeted Meta & Google ad campaigns.',
          'Implement automated lead capture CRM & instant WhatsApp/Email follow-up.',
        ],
        recommendedHeadline: 'Next-Gen Website & High-Converting Funnel',
        services: ['Web Development', 'SEO', 'Performance Marketing'],
        confidence: '99% Audit Match',
        pitch: isHinglish
          ? `Aapke domain ${cleanUrl} me mobile speed aur lead funnel conversion ke gaps hain. Next.js redesign aur performance marketing se hum leads ko 3x multiply kar sakte hain!`
          : `Audit shows significant conversion gaps on ${cleanUrl}. Redesigning with Next.js & performance ad funnels will 3x your lead conversion rate.`,
      };

      return NextResponse.json({ success: true, data: auditResult });
    }

    // 2. Handling Regular AI Strategy / Chat Queries
    const text = (prompt || `${industry || ''} ${problem || ''}`).toLowerCase();

    let responseData = {
      message: isHinglish
        ? "Aapke business goals ke basis par ye hai hamara AI-analyzed growth strategy roadmap:"
        : "Here's an AI-analyzed growth roadmap tailored for your business goals:",
      headline: 'The Custom Growth Engine',
      services: ['Performance Marketing', 'Web Development', 'SEO'],
      pitch: isHinglish
        ? 'Targeted performance ads ko high-converting website ke saath integrate karke max ROI achieve karenge.'
        : 'Integrating targeted performance ads with a high-converting web presence to maximize your ROI.',
      confidence: '96% Match',
      keyLevers: [
        isHinglish ? 'Lead Conversion Optimize Karna' : 'Lead Conversion Optimization',
        isHinglish ? 'High-Intent Customer Target' : 'Targeted Audience Acquisition',
        isHinglish ? 'Brand Value Double Karna' : 'Brand Positioning',
      ],
      beforeAfter: {
        before: isHinglish
          ? ['High Ad Costs & Low Leads', 'Slow Website Load Time (>4s)', 'Manual Follow-ups']
          : ['High Ad Costs & Low Leads', 'Slow Website Load Time (>4s)', 'Manual Follow-ups'],
        after: isHinglish
          ? ['3.4x Higher ROAS & Qualified Leads', 'Sub-second Next.js Load Speed', 'Automated Instant CRM Capture']
          : ['3.4x Higher ROAS & Qualified Leads', 'Sub-second Next.js Load Speed', 'Automated Instant CRM Capture'],
      },
    };

    if (text.includes('real estate') || text.includes('property') || text.includes('realtor')) {
      responseData = {
        message: isHinglish
          ? "Real Estate growth ke liye hyper-targeted localized ads + sleek listing landing pages se highest quality leads milti hain!"
          : "For real estate growth, hyper-targeted localized advertising coupled with high-impact visual landing pages drives the highest quality leads.",
        headline: 'Real Estate Authority & Lead Funnel',
        services: ['Performance Marketing', 'Web Development', 'Branding'],
        pitch: isHinglish
          ? 'Facebook & Instagram Meta ads se high-net-worth buyers target honge, jo direct sleek property landing pages par convert honge.'
          : 'We build targeted Meta ad campaigns integrated with sleek listing landing pages and automated CRM capture to convert prospective buyers quickly.',
        confidence: '98% Match',
        keyLevers: [
          isHinglish ? 'Geo-Targeted High-Ticket Meta Ads' : 'Geo-Targeted Meta Ads',
          isHinglish ? 'Fast Property Landing Pages' : 'High-Converting Property Pages',
          isHinglish ? 'Instant WhatsApp Lead Alerts' : 'Instant Lead Capture',
        ],
        beforeAfter: {
          before: ['₹500+ cost per lead with weak intent', 'No automated buyer qualification', 'Basic static site'],
          after: ['₹120 cost per highly qualified buyer lead', 'Automated CRM & instant WhatsApp connect', 'Next.js 3D Property Showcase'],
        },
      };
    } else if (text.includes('hospitality') || text.includes('restaurant') || text.includes('hotel') || text.includes('resort')) {
      responseData = {
        message: isHinglish
          ? 'Hospitality me visual storytelling, creator collaborations aur direct booking system se max revenue aata hai!'
          : 'Hospitality thrives on visual storytelling, social proof, and seamless direct booking systems.',
        headline: 'Hospitality Brand & Direct Booking Package',
        services: ['Influencer Marketing', 'Digital Marketing', 'Web Development'],
        pitch: isHinglish
          ? 'Influencer campaigns aur direct booking web design se OTA commission zero karke direct room/table bookings badhayenge.'
          : 'We leverage creator collaborations and visually immersive web design to boost direct bookings and lower reliance on third-party OTA commissions.',
        confidence: '97% Match',
        keyLevers: [
          isHinglish ? 'Top Creator Collaborations' : 'Influencer Campaign Engine',
          isHinglish ? 'Direct Booking Engine' : 'Direct Booking UX',
          isHinglish ? 'Viral Social Proof' : 'Social Proof Scaling',
        ],
        beforeAfter: {
          before: ['High commission paid to OTAs', 'Inconsistent social media content', 'Static photos'],
          after: ['70%+ Direct bookings via website', 'Viral video content system', '360 interactive property tour'],
        },
      };
    } else if (text.includes('web') || text.includes('site') || text.includes('redesign') || text.includes('app')) {
      responseData = {
        message: isHinglish
          ? 'Modern website aapka #1 sales asset hai. Next.js speed aur top SEO se traffic aur leads dono boost honge!'
          : 'A modern website is your #1 sales asset. We build high-speed, SEO-optimized digital platforms designed for conversion.',
        headline: 'Next-Gen Digital Presence Package',
        services: ['Web Development', 'SEO', 'Branding'],
        pitch: isHinglish
          ? 'Next.js aur Tailwind me bani site super fast load hogi, Google par top rank karegi aur visitors ko clients me convert karegi.'
          : 'Built with Next.js and Tailwind, your new digital platform will load fast, rank top on search engines, and deliver a memorable customer experience.',
        confidence: '99% Match',
        keyLevers: [
          isHinglish ? 'Superfast Load Speed (<0.8s)' : 'Lightning Fast Page Speed',
          isHinglish ? 'Top Google Search Ranking (SEO)' : 'Technical SEO Foundation',
          isHinglish ? 'High Lead Conversion Design' : 'Conversion Rate Optimization (CRO)',
        ],
        beforeAfter: {
          before: ['Slow 4.5s load time', 'Outdated layout & non-responsive UI', 'Low Google rankings'],
          after: ['0.6s Next.js load time', 'Sleek dark-mode glassmorphic design', '#1 Page Google ranking'],
        },
      };
    } else if (text.includes('lead') || text.includes('sales') || text.includes('ads') || text.includes('revenue')) {
      responseData = {
        message: isHinglish
          ? 'Revenue ko fast scale karne ke liye predictable paid ad acquisition funnel zaroori hai.'
          : 'To scale revenue rapidly, you need a predictable client acquisition funnel powered by data-driven paid advertising.',
        headline: 'Predictable Revenue Accelerator',
        services: ['Performance Marketing', 'SEO', 'Web Development'],
        pitch: isHinglish
          ? 'Google & Meta Ads funnels ko automated landing pages ke sath sync karke 24/7 continuous leads laayenge.'
          : 'We deploy automated ad funnels on Meta & Google Ads synced with custom landing pages to capture and qualify leads 24/7.',
        confidence: '97% Match',
        keyLevers: [
          isHinglish ? 'Multi-Channel Paid Ads' : 'Multi-Channel Ad Campaigns',
          isHinglish ? 'Retargeting Machine' : 'Retargeting Funnels',
          isHinglish ? 'Live ROI Dashboard' : 'Real-Time ROI Tracking',
        ],
        beforeAfter: {
          before: ['Wasted budget on random ads', 'Low lead qualification', 'No retargeting'],
          after: ['Validated 4.2x ROAS', 'Pre-qualified ready-to-buy leads', 'Automated 7-step retargeting'],
        },
      };
    } else if (text.includes('brand') || text.includes('content') || text.includes('awareness') || text.includes('social')) {
      responseData = {
        message: isHinglish
          ? 'Market me alag dikhne ke liye premium brand identity aur high-quality content system zaroori hai.'
          : 'Stand out in noisy markets with premium brand identity, high-volume content, and strategic digital PR.',
        headline: 'Brand Dominance & Content Studio',
        services: ['Branding', 'Digital Marketing', 'Influencer Marketing'],
        pitch: isHinglish
          ? 'Unique visual design, short-form video reels aur creator partnerships se aapka brand dominant banega.'
          : 'We craft a distinct visual language, narrative strategy, and ongoing social media content distribution plan to make your brand unforgettable.',
        confidence: '95% Match',
        keyLevers: [
          isHinglish ? 'Premium Brand Design' : 'Visual Identity System',
          isHinglish ? 'Daily Short-Form Video Reels' : 'Omnichannel Content Distribution',
          isHinglish ? 'Influencer Partnerships' : 'Strategic Creator Partnerships',
        ],
        beforeAfter: {
          before: ['Generic logo & design', 'Low social engagement', 'Irregular posting'],
          after: ['Luxury brand design guidelines', 'Viral social media reach', '30+ monthly custom videos'],
        },
      };
    }

    return NextResponse.json({ success: true, data: responseData });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process AI assistant query.' },
      { status: 500 }
    );
  }
}
