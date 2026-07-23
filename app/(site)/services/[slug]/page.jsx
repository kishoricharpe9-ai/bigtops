import { notFound } from 'next/navigation';
import { ServiceDetailView } from '@/components/services/ServiceDetailView';
import { getAllServices, getServiceBySlug } from '@/lib/content/services';

export function generateStaticParams() {
  return getAllServices().map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return { title: service.title, description: service.tagline };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const others = getAllServices()
    .filter(s => s.slug !== service.slug)
    .map(s => ({ slug: s.slug, title: s.title }));

  return <ServiceDetailView service={service} others={others} />;
}
