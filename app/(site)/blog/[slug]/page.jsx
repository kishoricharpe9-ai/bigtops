import { notFound } from 'next/navigation';
import { BlogArticleView } from '@/components/blog/BlogArticleView';
import { getAllBlogPosts, getBlogBySlug } from '@/lib/content/blog';

export function generateStaticParams() {
  return getAllBlogPosts().map(b => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};
  return { title: post.title };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();
  return <BlogArticleView post={post} />;
}
