import { Suspense } from 'react';
import { ServicesClient } from '@/components/services/ServicesClient';
import { getAllServices } from '@/lib/content/services';

export const metadata = {
  title: 'Our Services',
  description: 'A full-service offering — strategy, design, content, and paid media — engineered to make your brand visible, credible, and profitable.',
};

export default function ServicesIndexPage() {
  const services = getAllServices();

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#000003fe] flex items-center justify-center text-white/50 text-sm">Loading...</div>}>
      <ServicesClient services={services} />
    </Suspense>
  );
}
