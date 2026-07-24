import { notFound } from 'next/navigation';
import { CaseStudyView } from '@/components/project/CaseStudyView';
import { getAllProjects, getProjectBySlug } from '@/lib/content/projects';

export function generateStaticParams() {
  return getAllProjects().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <CaseStudyView project={project} />;
}
