import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { JsonLd } from "@/components/shared/json-ld";
import { generateBlogPostSchema } from "@/lib/seo";
import { BeamsHero } from "@/components/marketing/beams-hero";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — evident.ai Blog`,
    description: post.description,
  };
}

function renderMarkdown(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  let key = 0;

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ").trim();
      if (text) {
        elements.push(
          <p key={key++} className="mb-6 leading-relaxed text-muted-foreground">
            {text}
          </p>
        );
      }
      currentParagraph = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith("### ")) {
      flushParagraph();
      elements.push(
        <h3
          key={key++}
          className="mb-3 mt-8 text-lg font-semibold text-foreground"
        >
          {line.replace("### ", "")}
        </h3>
      );
    } else if (line.startsWith("## ")) {
      flushParagraph();
      elements.push(
        <h2
          key={key++}
          className="mb-4 mt-10 text-2xl font-bold tracking-tight text-foreground"
        >
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.trim() === "") {
      flushParagraph();
    } else {
      currentParagraph.push(line);
    }
  }

  flushParagraph();
  return elements;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <JsonLd
        data={generateBlogPostSchema({
          title: post.title,
          description: post.description,
          date: post.date,
          author: post.author,
          slug: post.slug,
        })}
      />
      <BeamsHero size="compact">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" asChild className="mb-8">
            <Link href="/resources/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
              <span className="text-muted-foreground/60">
                &middot; {post.authorRole}
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <Badge variant="secondary">{post.readTime}</Badge>
          </div>

          <hr className="my-8 border-border" />

          <div className="prose-custom">{renderMarkdown(post.content)}</div>
        </div>
      </BeamsHero>

      <article className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="border-t py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight">
              Related posts
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/resources/blog/${related.slug}`}
                >
                  <Card className="h-full transition-shadow hover:shadow-lg">
                    <CardHeader>
                      <div className="flex flex-wrap gap-2">
                        {related.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="mt-2 text-lg leading-tight">
                        {related.title}
                      </CardTitle>
                      <CardDescription className="mt-1 line-clamp-2">
                        {related.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
