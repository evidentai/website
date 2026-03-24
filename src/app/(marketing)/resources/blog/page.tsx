import { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { BeamsHero } from "@/components/marketing/beams-hero";

export const metadata: Metadata = {
  title: "Blog — evident.ai",
  description:
    "Articles, guides, and insights on compliance automation, SOC 2, ISO 27001, and more.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <>
      <BeamsHero size="medium">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Blog
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Insights and guides on compliance automation from the evident.ai
              team.
            </p>
          </div>

          {tags.length > 0 && (
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </BeamsHero>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="mt-16 text-center text-muted-foreground">
              No posts yet. Check back soon!
            </p>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              {posts.map((post) => (
                <Link key={post.slug} href={`/resources/blog/${post.slug}`}>
                  <Card className="h-full transition-shadow hover:shadow-lg">
                    <CardHeader>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="mt-2 text-xl leading-tight">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="mt-1 line-clamp-2">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5" />
                          {post.author}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {post.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
