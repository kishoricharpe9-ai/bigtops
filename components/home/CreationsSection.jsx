'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { BlurTextReveal } from '@/components/motion/BlurTextReveal';
import { Reveal } from '@/components/motion/Reveal';
import { MobileContentReel } from '@/components/home/MobileContentReel';

// ─── Complete SEO-Optimized Creations Dataset (29 Images + 9 Reels = 38 Total) ───────────

const ALL_CREATIONS = [
  // Real Estate Architectural Poster (29)
  {
    id: 'img-29',
    type: 'image',
    category: 'Real Estate Design',
    title: 'Atharva Oceana - Building Dreams',
    subtitle: 'Floor by Floor precision design',
    description: 'Real estate architectural visualization poster for Atharva Oceana building construction and blueprint design.',
    alt: 'Atharva Oceana Building Dreams Floor by Floor Architectural Blueprint Design',
    src: '/post contents/29.jpg',
  },

  // Educational & Real Estate Posters (24-28)
  {
    id: 'img-24',
    type: 'image',
    category: 'Educational Post',
    title: 'Surabhi Academy - Magic of Revision',
    subtitle: 'Study memory & exam confidence guide',
    description: 'Educational infographic poster highlighting 4 benefits of systematic exam revision.',
    alt: 'Surabhi Academy Magic of Revision Study Memory Exam Confidence Infographic Design',
    src: '/post contents/24.jpg',
  },
  {
    id: 'img-25',
    type: 'image',
    category: 'Real Estate',
    title: 'Aarav Infra - Residential Plots',
    subtitle: 'RERA approved Karli Nagpur plots',
    description: 'Real estate investment campaign poster for Aarav Infra premium residential plots in Nagpur.',
    alt: 'Aarav Infra RERA Approved Premium Residential Plots Karli Nagpur Investment Poster',
    src: '/post contents/25.jpg',
  },
  {
    id: 'img-26',
    type: 'image',
    category: 'Real Estate',
    title: 'Atharva Oceana - Elevated Living',
    subtitle: 'Luxury residences for modern families',
    description: 'Architectural residential tower poster showcasing luxury 3 BHK homes at Atharva Oceana.',
    alt: 'Atharva Oceana Luxury Residences Elevated Living Modern Families Architecture Design',
    src: '/post contents/26.jpg',
  },
  {
    id: 'img-27',
    type: 'image',
    category: 'Real Estate Ad',
    title: 'Atharva Oceana - 40% Sold Out',
    subtitle: 'Starting from 50 Lakhs in Beltarodi',
    description: 'High-converting real estate promotional campaign poster for Atharva Oceana in Nagpur.',
    alt: 'Atharva Oceana 40 Percent Sold Out Beltarodi Nagpur Starting 50 Lakhs Campaign Poster',
    src: '/post contents/27.jpg',
  },
  {
    id: 'img-28',
    type: 'image',
    category: 'Architectural Plan',
    title: 'Atharva Oceana - 3 BHK Floor Plan',
    subtitle: 'Luxury 3D residence layout',
    description: 'Detailed 3D architectural floor plan layout for 3 BHK luxury residences.',
    alt: 'Atharva Oceana 3 BHK Luxury Living Redefined 3D Architectural Floor Plan Layout',
    src: '/post contents/28.jpg',
  },

  // Educational, Athletic & Branding Posters (19-23)
  {
    id: 'img-19',
    type: 'image',
    category: 'Educational Post',
    title: '4 Ways to Solve Case Competitions',
    subtitle: 'KAT Expert - The IIM Ahmedabad Way',
    description: 'Educational guide breaking down 4 strategic steps to solve MBA case competitions.',
    alt: 'KAT Expert 4 Easy Ways to Solve Case Competitions IIM Ahmedabad Way Design',
    src: '/post contents/19.jpg',
  },
  {
    id: 'img-20',
    type: 'image',
    category: 'Ad Campaign',
    title: 'Crack Your Dream MBA Entrance',
    subtitle: 'KAT Expert Admissions Open',
    description: 'High-converting entrance prep campaign for CAT, IPMAT, and MBA CET coaching.',
    alt: 'KAT Expert Crack Your Dream MBA Entrance Admissions Open Campaign Graphic',
    src: '/post contents/20.jpg',
  },
  {
    id: 'img-21',
    type: 'image',
    category: 'Athlete Proof',
    title: 'NTSW Athlete Feedback - Ayush Rahate',
    subtitle: 'Fastest skater testimonial',
    description: 'Athlete feedback testimonial highlighting transformation at Nikhilesh Tabhane Skates World.',
    alt: 'NTSW Athlete Feedback Testimonial Ayush Rahate Fastest Skater in Nagpur',
    src: '/post contents/21.jpg',
  },
  {
    id: 'img-22',
    type: 'image',
    category: 'Community CSR',
    title: 'Donate Your Old Skate Equipment',
    subtitle: 'NTSW Non-Commercial Initiative',
    description: 'Transparent community initiative helping needy skaters by recycling skate gear.',
    alt: 'NTSW Donate Your Old Skate Equipment Community CSR Initiative Poster',
    src: '/post contents/22.jpg',
  },
  {
    id: 'img-23',
    type: 'image',
    category: 'Academy Ad',
    title: 'Surabhi Academy JEE / NEET Success',
    subtitle: 'Personalized guidance coaching',
    description: 'Education academy campaign for JEE & NEET entrance preparation.',
    alt: 'Surabhi Academy Success in JEE NEET Prep Coaching Campaign Graphic',
    src: '/post contents/23.jpg',
  },

  // Marketing & Real Estate Campaign Posters (14-18)
  {
    id: 'img-14',
    type: 'image',
    category: 'Case Study',
    title: 'How Coke Took Over Christmas',
    subtitle: 'Marketing case study post',
    description: 'Iconic marketing campaign breakdown detailing how Coca-Cola shaped modern Christmas branding.',
    alt: 'How Coke Took Over Christmas Marketing Case Study Poster Design',
    src: '/post contents/14.jpg',
  },
  {
    id: 'img-15',
    type: 'image',
    category: 'Branding Guide',
    title: "What's Hot In Branding Today?",
    subtitle: 'Branding trend editorial',
    description: 'Contemporary branding trends and visual identity guide featuring high-impact graphic design.',
    alt: 'Whats Hot In Branding Today Editorial Marketing Poster Graphic',
    src: '/post contents/15.jpg',
  },
  {
    id: 'img-16',
    type: 'image',
    category: 'Real Estate',
    title: 'HIDC Limited - Key To Better Life',
    subtitle: 'Affordable modern living campaign',
    description: 'Real estate marketing campaign for HIDC Limited showcasing modern affordable luxury homes.',
    alt: 'HIDC Limited Real Estate Affordable Luxury Homes Marketing Design',
    src: '/post contents/16.jpg',
  },
  {
    id: 'img-17',
    type: 'image',
    category: 'Real Estate',
    title: 'Apartment Hunting Checklist',
    subtitle: 'HIDC Badiyani Venture guide',
    description: 'Informative checklist design for homebuyers evaluating apartment location, project quality & future security.',
    alt: 'Apartment Hunting Checklist HIDC Badiyani Venture Homebuyer Guide',
    src: '/post contents/17.jpg',
  },
  {
    id: 'img-18',
    type: 'image',
    category: 'Finance Webinar',
    title: 'Free Stock Trading Webinar',
    subtitle: 'Trade Smart Trade Better poster',
    description: 'Live webinar marketing poster for RSI-based stock trading strategies and financial education.',
    alt: 'Free Stock Trading Webinar Learn Smart RSI Based Trading Strategies Poster',
    src: '/post contents/18.jpg',
  },

  // NTX Product Visuals (9-13)
  {
    id: 'img-9',
    type: 'image',
    category: 'Product Visual',
    title: 'NTX Skate Straps',
    subtitle: 'Premium skate carrying accessory',
    description: 'High-durability carrying straps designed for skateboarders and roller skaters.',
    alt: 'NTX Skate Straps - Premium Skateboarding Accessories on Skatepark Track',
    src: '/post contents/9.jpg',
  },
  {
    id: 'img-10',
    type: 'image',
    category: 'Product Visual',
    title: 'NTX FIRE Bearings',
    subtitle: 'Hybrid steel ball bearings',
    description: 'Precision-engineered hybrid steel ball bearings with fire spark resistance.',
    alt: 'NTX FIRE Skate Bearings - Hybrid Steel Ball Bearings Box Set',
    src: '/post contents/10.jpg',
  },
  {
    id: 'img-11',
    type: 'image',
    category: 'Product Visual',
    title: 'NTX STORM Bearings',
    subtitle: 'Hybrid black ceramic bearings',
    description: 'Ultra-low friction hybrid black ceramic bearings for extreme speed performance.',
    alt: 'NTX STORM Bearings - Hybrid Black Ceramic Skate Bearings',
    src: '/post contents/11.jpg',
  },
  {
    id: 'img-12',
    type: 'image',
    category: 'Product Visual',
    title: 'NTX Skate Bearing Oil',
    subtitle: 'High performance lubricant',
    description: 'Specialized synthetic lubricant oil for roller skate and skateboard bearings.',
    alt: 'NTX Premium Skate Bearing Oil Bottle for High Speed Friction Reduction',
    src: '/post contents/12.jpg',
  },
  {
    id: 'img-13',
    type: 'image',
    category: 'Product Visual',
    title: 'NTX Bearing Case Set',
    subtitle: '16-piece complete bearing kit',
    description: 'Full bearing kit with 16 bearings, 8 aluminum spacers, and 8 aluminum axles.',
    alt: 'NTX 16-Piece Premium Bearing Box Set Content with Aluminum Spacers',
    src: '/post contents/13.jpg',
  },

  // Social & Editorial Post Graphics (1-8)
  {
    id: 'img-1',
    type: 'image',
    category: 'Brand Post',
    title: 'Brand Reveal Design',
    subtitle: 'Bold identity social post',
    description: 'High-impact social media graphic revealing brand visual identity.',
    alt: 'Brand Reveal Social Media Content Design Graphic',
    src: '/post contents/1.png',
  },
  {
    id: 'img-2',
    type: 'image',
    category: 'Campaign Visual',
    title: 'Campaign Highlight',
    subtitle: 'Editorial social visual',
    description: 'Scroll-stopping editorial visual crafted for digital marketing campaigns.',
    alt: 'Editorial Campaign Highlight Social Media Graphic',
    src: '/post contents/2.png',
  },
  {
    id: 'img-3',
    type: 'image',
    category: 'Product Post',
    title: 'Product Breakdown',
    subtitle: 'Feature spotlight carousel',
    description: 'Detailed feature breakdown infographic carousel for social feeds.',
    alt: 'Product Feature Breakdown Social Carousel Post',
    src: '/post contents/3.png',
  },
  {
    id: 'img-4',
    type: 'image',
    category: 'Social Proof',
    title: 'Client Testimonial Graphic',
    subtitle: 'High-converting social proof',
    description: 'Social proof testimonial card designed to build brand trust.',
    alt: 'Client Testimonial Social Proof Graphic Design',
    src: '/post contents/4.png',
  },
  {
    id: 'img-5',
    type: 'image',
    category: 'Creative Process',
    title: 'Behind The Scenes',
    subtitle: 'Studio workflow content',
    description: 'Behind the scenes creative workflow showcase post.',
    alt: 'Behind The Scenes Studio Creative Workflow Social Post',
    src: '/post contents/5.png',
  },
  {
    id: 'img-6',
    type: 'image',
    category: 'Founder Story',
    title: 'Founder Vision Post',
    subtitle: 'Story-driven messaging',
    description: 'Story-driven founder vision content for brand authority.',
    alt: 'Founder Vision Storytelling Social Media Post Design',
    src: '/post contents/6.png',
  },
  {
    id: 'img-7',
    type: 'image',
    category: 'Feature Post',
    title: 'Feature Showcase Graphic',
    subtitle: 'Visual feature spotlight',
    description: 'Sleek product feature spotlight social graphic.',
    alt: 'Product Feature Showcase Social Media Design',
    src: '/post contents/7.png',
  },
  {
    id: 'img-8',
    type: 'image',
    category: 'Community Post',
    title: 'Community Highlight',
    subtitle: 'Audience engagement post',
    description: 'Community-driven audience highlight social post graphic.',
    alt: 'Audience Community Highlight Social Post Design',
    src: '/post contents/8.png',
  },

  // Video Reels (Cloudinary MP4s)
  {
    id: 'reel-1',
    type: 'reel',
    category: 'Reel',
    title: 'Weekend Escapes',
    subtitle: 'Editorial campaign reel',
    description: 'Cinematic reel capturing scenic resort getaways near Nagpur.',
    alt: 'Weekend Escapes Travel & Resort Reel Campaign Video',
    src: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,f_auto/v1779956593/Bored_of_the_same_old_weekend_routines_in_Nagpur_Leave_the_city_noise_behind_Just_a_1-hour_sc_ljs15v.mp4',
    poster: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,so_0/v1779956593/Bored_of_the_same_old_weekend_routines_in_Nagpur_Leave_the_city_noise_behind_Just_a_1-hour_sc_ljs15v.jpg',
  },
  {
    id: 'reel-2',
    type: 'reel',
    category: 'Reel',
    title: 'Nisarga Resort Tour',
    subtitle: 'Serene video tour',
    description: 'Serene lake-touch farmhouse video tour highlighting luxury nature stays.',
    alt: 'Nisarga Lake View Resort Scenic Nature Tour Reel',
    src: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,f_auto/v1779956581/Nisarga_Lake_View_Resort_A_serene_lake-touch_farmhouse_near_Dhamangaon_Lake_Where_nature_uxfqza.mp4',
    poster: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,so_0/v1779956581/Nisarga_Lake_View_Resort_A_serene_lake-touch_farmhouse_near_Dhamangaon_Lake_Where_nature_uxfqza.jpg',
  },
  {
    id: 'reel-3',
    type: 'reel',
    category: 'Reel',
    title: 'CAT Exam Prep Strategy',
    subtitle: 'High-converting educational reel',
    description: 'Educational strategy reel decoding CAT exam preparation techniques.',
    alt: 'CAT Exam Prep Strategy Educational Marketing Reel',
    src: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,f_auto/v1779956578/Most_students_think_cracking_the_CAT_exam_is_all_about_mastering_complex_math_equations._But_her_halywl.mp4',
    poster: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,so_0/v1779956578/Most_students_think_cracking_the_CAT_exam_is_all_about_mastering_complex_math_equations._But_her_halywl.jpg',
  },
  {
    id: 'reel-4',
    type: 'reel',
    category: 'Reel',
    title: 'NTX Edge Control',
    subtitle: 'Action-packed promo reel',
    description: 'High-energy action video promo for NTX crossover skate control.',
    alt: 'NTX Crossover Edge Control Skating Promo Reel',
    src: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,f_auto/v1779956575/Lock_your_center_dominate_every_turn_grip_harder_exit_stronger._NTXCrossover_EdgeControl_Ska_ploefd.mp4',
    poster: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,so_0/v1779956575/Lock_your_center_dominate_every_turn_grip_harder_exit_stronger._NTXCrossover_EdgeControl_Ska_ploefd.jpg',
  },
  {
    id: 'reel-5',
    type: 'reel',
    category: 'Reel',
    title: 'Nationwide Delivery',
    subtitle: 'Brand commitment reel',
    description: 'Logistics and nationwide delivery commitment brand video.',
    alt: 'Nationwide Product Delivery Logistics Brand Reel',
    src: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,f_auto/v1779956576/We_don_t_just_ship_products_we_deliver_commitment_nationwide_every_single_day._AllOverIndia_rmoza5.mp4',
    poster: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,so_0/v1779956576/We_don_t_just_ship_products_we_deliver_commitment_nationwide_every_single_day._AllOverIndia_rmoza5.jpg',
  },
  {
    id: 'reel-6',
    type: 'reel',
    category: 'Reel',
    title: 'Nag River Lifeline',
    subtitle: 'Documentary awareness reel',
    description: 'Social awareness documentary reel on Nag river environmental preservation.',
    alt: 'Nag River Preservation Environmental Documentary Reel',
    src: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,f_auto/v1779956573/A_river_that_once_flowed_like_the_lifeline_of_a_city_today_carries_the_weight_of_its_neglect.For_cux7z8.mp4',
    poster: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,so_0/v1779956573/A_river_that_once_flowed_like_the_lifeline_of_a_city_today_carries_the_weight_of_its_neglect.For_cux7z8.jpg',
  },
  {
    id: 'reel-7',
    type: 'reel',
    category: 'Reel',
    title: 'The Hitavada Decode',
    subtitle: 'News & geopolitics reel',
    description: 'Geopolitical news analysis reel created for The Hitavada media outlet.',
    alt: 'The Hitavada Geopolitical Analysis News Video Reel',
    src: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,f_auto/v1779956572/Why_is_India_maintaining_silence_on_the_ongoing_war_This_reel_of_The_Hitavada_decoding_the_confl_by7asc.mp4',
    poster: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,so_0/v1779956572/Why_is_India_maintaining_silence_on_the_ongoing_war_This_reel_of_The_Hitavada_decoding_the_confl_by7asc.jpg',
  },
  {
    id: 'reel-8',
    type: 'reel',
    category: 'Reel',
    title: 'NTX FIRE Bearings Promo',
    subtitle: 'Product action reel',
    description: 'High-speed bearing roll promo showcasing speed and control.',
    alt: 'NTX FIRE Skate Bearings Speed Roll Video Reel',
    src: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,f_auto/v1779956569/NTX_FIRE_Bearings_Built_for_speed_control_durability.Designed_to_roll_smoother_faster_vybmiu.mp4',
    poster: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,so_0/v1779956569/NTX_FIRE_Bearings_Built_for_speed_control_durability.Designed_to_roll_smoother_faster_vybmiu.jpg',
  },
  {
    id: 'reel-9',
    type: 'reel',
    category: 'Reel',
    title: 'Artynex Brass Sun Idol',
    subtitle: 'E-commerce showcase reel',
    description: 'E-commerce product visual showcasing handcrafted brass sun idol.',
    alt: 'Artynex Brass Sun Idol Home Decor Showcase Video Reel',
    src: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,f_auto/v1779956568/Bring_the_power_of_the_sun_right_into_your_living_space_This_Artynex_Brass_Sun_Idol_is_more_than_f7zchs.mp4',
    poster: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,so_0/v1779956568/Bring_the_power_of_the_sun_right_into_your_living_space_This_Artynex_Brass_Sun_Idol_is_more_than_f7zchs.jpg',
  },
];

// Desktop Featured Grid Data
const creationsData = {
  col1: {
    top: ALL_CREATIONS.find(c => c.id === 'reel-1'),
    bottom: ALL_CREATIONS.find(c => c.id === 'img-29'),
  },
  col2: {
    top: ALL_CREATIONS.find(c => c.id === 'img-25'),
    bottom: ALL_CREATIONS.find(c => c.id === 'reel-2'),
  },
  col3: {
    top: ALL_CREATIONS.find(c => c.id === 'reel-3'),
    bottom: ALL_CREATIONS.find(c => c.id === 'img-26'),
  },
  col4: {
    top: ALL_CREATIONS.find(c => c.id === 'img-27'),
    bottom: ALL_CREATIONS.find(c => c.id === 'reel-4'),
  },
};

function CreationCard({ item, onSelect, heightClass = 'h-[380px]' }) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (item.type === 'reel' && videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  }, [item.type]);

  const isReel = item.type === 'reel';

  return (
    <motion.article
      itemScope
      itemType={isReel ? 'http://schema.org/VideoObject' : 'http://schema.org/ImageObject'}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(item)}
      aria-label={`View creation: ${item.title}`}
      className={`group relative w-full ${heightClass} overflow-hidden rounded-[20px] sm:rounded-[24px] bg-[#141416] border border-white/10 shadow-lg cursor-pointer transition-all duration-500`}
      style={{
        boxShadow: isHovered
          ? '0 16px 40px -10px rgba(18, 206, 214, 0.35), 0 0 20px rgba(18, 206, 214, 0.2)'
          : 'none',
        borderColor: isHovered ? '#12ced6' : 'rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Top Glowing Blue Border Bar on Hover */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(to right, transparent, #12ced6, #38bdf8, transparent)',
        }}
      />

      {/* Light Sweep Animation Effect */}
      <div className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
        <div className="absolute top-0 -left-[100%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-25deg] transition-all duration-1000 group-hover:left-[200%]" />
      </div>

      {/* Card Content (Video or Image) */}
      {isReel ? (
        <figure className="relative h-full w-full bg-black m-0">
          <video
            ref={videoRef}
            src={item.src}
            poster={item.poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={item.alt}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </figure>
      ) : (
        <figure className="relative h-full w-full bg-[#0c0c0e] m-0 overflow-hidden">
          {/* Ambient blurred backdrop so the card looks rich and seamless */}
          <Image
            src={item.src}
            alt=""
            fill
            className="object-cover blur-xl opacity-40 scale-125 pointer-events-none"
            aria-hidden
          />
          {/* Main image */}
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-contain transition-transform duration-700 ease-out group-hover:scale-105 relative z-10"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </figure>
      )}

      {/* Gradient Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />

      {/* Bottom Content Area: Title & Subtitle on Left + Shifted Tag Badge on Bottom Right (Yellow circle position) */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-3.5 sm:p-5 flex items-end justify-between transition-transform duration-300 group-hover:-translate-y-1">
        <div className="pr-2 min-w-0">
          <h3 className="text-sm sm:text-lg font-semibold text-white transition-colors line-clamp-1" itemProp="name">
            {item.title}
          </h3>
          <p className="mt-0.5 text-[11px] sm:text-xs text-white/60 line-clamp-1" itemProp="description">{item.subtitle}</p>
        </div>

        {/* Shifted Badge to Bottom Right (Yellow Circle position) */}
        <div className="flex items-center gap-1.5 rounded-full bg-black/80 px-2.5 py-1 text-[10px] sm:text-[11px] font-medium text-white/90 backdrop-blur-md border border-white/20 shrink-0 shadow-md transition-transform duration-300 group-hover:scale-105">
          {isReel ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#12ced6] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#12ced6]" />
              </span>
              <svg className="h-3 w-3 fill-current text-[#12ced6]" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Reel
            </>
          ) : (
            <>
              <svg className="h-3 w-3 text-[#12ced6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              Image
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Main Creations Section Component ─────────────────────────────────────────

export function CreationsSection() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAllModal, setShowAllModal] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all' | 'reel' | 'image'
  const modalVideoRef = useRef(null);

  useEffect(() => {
    if (selectedItem?.type === 'reel' && modalVideoRef.current) {
      modalVideoRef.current.play().catch(() => { });
    }
  }, [selectedItem]);

  const filteredCreations = ALL_CREATIONS.filter(item => {
    if (filter === 'reel') return item.type === 'reel';
    if (filter === 'image') return item.type === 'image';
    return true;
  });

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-black" aria-label="Creations Showcase Section">
      <Container>
        {/* Section Centered Header */}
        <header className="mb-10 sm:mb-14 flex flex-col items-center text-center">
          {/* Signature Website Badge Style */}
          <div className="mb-6 relative inline-flex overflow-hidden rounded-full border border-white/10 bg-black/70 px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7dd3fc] backdrop-blur-md transition hover:border-[#12ced6]/50 hover:bg-black/80 before:absolute before:left-[12%] before:right-[12%] before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#12ced6]/80 before:to-transparent before:content-['']">
            Creations Gallery
          </div>

          {/* Title */}
          <BlurTextReveal
            as="h2"
            text="Posts that stop the scroll"
            className="max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
          />

          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-white/60">
            A curated portfolio of high-converting social media reels, editorial product graphics, and scroll-stopping video campaigns.
          </p>
        </header>

        {/* DESKTOP VIEW: 4-Column Grid (hidden on mobile, visible lg:block) */}
        <div className="hidden lg:block relative mx-auto max-w-6xl rounded-[36px] border border-white/10 bg-[#0c0c0e] p-8 lg:p-10 shadow-2xl backdrop-blur-xl overflow-hidden">
          {/* Ambient Blue Glow Background Accents */}
          <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-[#12ced6]/15 blur-[130px]" />
          <div className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-[#38bdf8]/15 blur-[130px]" />

          {/* Header Label at Top Left */}
          <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-8 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#12ced6]" />
            Featured Showcase
          </div>

          {/* 4-Column Grid Layout: ALL 4 COLUMNS END AT EXACT SAME HORIZONTAL LINE (600px)! */}
          <div className="grid grid-cols-4 gap-6">
            {/* COLUMN 1 */}
            <div className="flex flex-col gap-6">
              <CreationCard item={creationsData.col1.top} onSelect={setSelectedItem} heightClass="aspect-[9/16]" />
              <CreationCard item={creationsData.col1.bottom} onSelect={setSelectedItem} heightClass="aspect-[4/5]" />
            </div>

            {/* COLUMN 2 */}
            <div className="flex flex-col gap-6">
              <CreationCard item={creationsData.col2.top} onSelect={setSelectedItem} heightClass="aspect-[4/5]" />
              <CreationCard item={creationsData.col2.bottom} onSelect={setSelectedItem} heightClass="aspect-[9/16]" />
            </div>

            {/* COLUMN 3 */}
            <div className="flex flex-col gap-6">
              <CreationCard item={creationsData.col3.top} onSelect={setSelectedItem} heightClass="aspect-[9/16]" />
              <CreationCard item={creationsData.col3.bottom} onSelect={setSelectedItem} heightClass="aspect-[4/5]" />
            </div>

            {/* COLUMN 4 */}
            <div className="flex flex-col gap-6">
              <CreationCard item={creationsData.col4.top} onSelect={setSelectedItem} heightClass="aspect-[4/5]" />
              <CreationCard item={creationsData.col4.bottom} onSelect={setSelectedItem} heightClass="aspect-[9/16]" />
            </div>
          </div>

          {/* Centered CTA Button - MATCHED TO WEBSITE PRIMARY DESIGN SYSTEM */}
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setShowAllModal(true)}
              aria-label="Explore All Creations Gallery"
              className="group relative inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-black/80 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 before:absolute before:left-[12%] before:right-[12%] before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#12ced6]/80 before:to-transparent before:content-[''] hover:border-[#12ced6] hover:bg-[#12ced6] hover:text-black hover:shadow-[0_0_30px_rgba(18,206,214,0.45)]"
            >
              <span>Explore All Creations ({ALL_CREATIONS.length})</span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* MOBILE VIEW: 3D Coverflow Carousels for REELS and POSTS (hidden on desktop, visible lg:hidden) */}
      <div className="block lg:hidden mt-2">
        <MobileContentReel />

        {/* Mobile Explore All Button - MATCHED TO WEBSITE PRIMARY DESIGN SYSTEM */}
        <div className="mt-8 flex justify-center px-4">
          <button
            onClick={() => setShowAllModal(true)}
            aria-label="Explore All Creations Mobile Gallery"
            className="w-full max-w-sm group relative inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-black/80 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 before:absolute before:left-[12%] before:right-[12%] before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#12ced6]/80 before:to-transparent before:content-[''] hover:border-[#12ced6] hover:bg-[#12ced6] hover:text-black hover:shadow-[0_0_30px_rgba(18,206,214,0.45)]"
          >
            <span>Explore All Creations ({ALL_CREATIONS.length})</span>
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* ─── FULL "EXPLORE ALL CREATIONS" 100% MOBILE-FRIENDLY SEO GALLERY MODAL ───── */}
      <AnimatePresence>
        {showAllModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-2 sm:p-6 lg:p-8 backdrop-blur-xl overflow-y-auto"
            onClick={() => setShowAllModal(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Explore All Creations Full Gallery"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-full max-w-7xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto rounded-[24px] sm:rounded-[32px] border border-white/15 bg-[#0e0e11] p-4 sm:p-8 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Sticky Top Header on Mobile & Desktop for Easy Close & Filters */}
              <div className="sticky top-0 z-40 bg-[#0e0e11]/95 backdrop-blur-md pb-4 pt-2 -mx-4 px-4 sm:-mx-8 sm:px-8 border-b border-white/10 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[#7dd3fc] bg-[#12ced6]/20 border border-[#12ced6]/40">
                      Creations Archive ({ALL_CREATIONS.length})
                    </span>
                    <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                      All Creations
                    </h2>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => setShowAllModal(false)}
                    className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-black shrink-0"
                    aria-label="Close All Creations Gallery"
                  >
                    ✕
                  </button>
                </div>

                {/* Filter Tabs - Mobile Horizontal Scrollable */}
                <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-1">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${filter === 'all'
                      ? 'bg-[#12ced6] text-black shadow-md'
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                      }`}
                  >
                    All ({ALL_CREATIONS.length})
                  </button>
                  <button
                    onClick={() => setFilter('reel')}
                    className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${filter === 'reel'
                      ? 'bg-[#12ced6] text-black shadow-md'
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                      }`}
                  >
                    Reels ({ALL_CREATIONS.filter(c => c.type === 'reel').length})
                  </button>
                  <button
                    onClick={() => setFilter('image')}
                    className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${filter === 'image'
                      ? 'bg-[#12ced6] text-black shadow-md'
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                      }`}
                  >
                    Visual Posts ({ALL_CREATIONS.filter(c => c.type === 'image').length})
                  </button>
                </div>
              </div>

              {/* Full Gallery Grid: 2 Columns on Mobile, 3 on Tablet, 4 on Desktop! */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                {filteredCreations.map(item => (
                  <CreationCard
                    key={item.id}
                    item={item}
                    onSelect={selected => {
                      setSelectedItem(selected);
                    }}
                    heightClass="h-[230px] sm:h-[300px]"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Single Media Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-3 sm:p-4 backdrop-blur-lg"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full max-h-[88vh] overflow-y-auto sm:overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-[#121214] p-4 sm:p-6 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-white hover:text-black"
                aria-label="Close creation preview"
              >
                ✕
              </button>

              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center">
                {/* Media view */}
                <div className="w-full lg:w-2/3 h-[42vh] sm:h-[60vh] relative rounded-xl sm:rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                  {selectedItem.type === 'reel' ? (
                    <video
                      ref={modalVideoRef}
                      src={selectedItem.src}
                      controls
                      autoPlay
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <Image
                      src={selectedItem.src}
                      alt={selectedItem.alt || selectedItem.title}
                      fill
                      className="object-contain"
                    />
                  )}
                </div>

                {/* Details info */}
                <div className="w-full lg:w-1/3 flex flex-col justify-center text-left">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider w-fit mb-2 border bg-[#12ced6]/20 border-[#12ced6]/40 text-[#7dd3fc]">
                    {selectedItem.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5">{selectedItem.title}</h3>
                  <p className="text-xs sm:text-sm text-white/70 mb-3">{selectedItem.subtitle}</p>
                  <p className="text-[11px] sm:text-xs text-white/50 leading-relaxed mb-5">
                    {selectedItem.description}
                  </p>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="w-full py-2.5 sm:py-3 rounded-full bg-white/10 text-white text-xs sm:text-sm font-medium hover:bg-white hover:text-black transition"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
