import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const blogPosts = [
    {
      slug: "nextjs-14-app-router",
      title: "Mastering Next.js 14 App Router",
      excerpt: "A comprehensive guide to the latest App Router features, patterns, and best practices for building modern web applications.",
      date: "2024-03-15",
      author: "Alex Chen",
      readTime: "8 min",
      tags: ["Next.js", "React", "TypeScript"],
    },
    {
      slug: "ai-integration-patterns",
      title: "AI Integration Patterns for Web Applications",
      excerpt: "Exploring practical approaches to integrate AI APIs like Claude and GPT into production web applications.",
      date: "2024-03-10",
      author: "Alex Chen",
      readTime: "12 min",
      tags: ["AI", "Claude API", "Web Development"],
    },
    {
      slug: "threejs-web-experiences",
      title: "Creating Immersive 3D Web Experiences with Three.js",
      excerpt: "How to build performant and accessible 3D interfaces that enhance user engagement without sacrificing usability.",
      date: "2024-03-05",
      author: "Alex Chen",
      readTime: "10 min",
      tags: ["Three.js", "3D", "WebGL"],
    },
    {
      slug: "supabase-real-time",
      title: "Building Real-Time Applications with Supabase",
      excerpt: "Leveraging Supabase Realtime and PostgreSQL to create collaborative features and live updates.",
      date: "2024-02-28",
      author: "Alex Chen",
      readTime: "6 min",
      tags: ["Supabase", "PostgreSQL", "Real-time"],
    },
    {
      slug: "tailwind-v4",
      title: "What's New in Tailwind CSS v4",
      excerpt: "Exploring the major changes, new features, and migration strategies for the latest Tailwind CSS release.",
      date: "2024-02-20",
      author: "Alex Chen",
      readTime: "5 min",
      tags: ["Tailwind CSS", "CSS", "Frontend"],
    },
    {
      slug: "web-performance-optimization",
      title: "Advanced Web Performance Optimization Techniques",
      excerpt: "Beyond the basics: advanced strategies for achieving sub-second load times and smooth interactions.",
      date: "2024-02-15",
      author: "Alex Chen",
      readTime: "15 min",
      tags: ["Performance", "Optimization", "Core Web Vitals"],
    },
  ];

  const categories = [
    "All",
    "Web Development",
    "AI & Machine Learning",
    "Design",
    "DevOps",
    "Tutorials",
    "Opinion",
  ];

  const featuredPost = blogPosts[0];

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <Badge className="mb-4">Blog</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Thoughts & <span className="gradient-text">Insights</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Sharing knowledge, experiences, and perspectives on web development,
          technology trends, and creative problem-solving.
        </p>
      </div>

      {/* Featured Post */}
      <section className="mb-16">
        <Card className="overflow-hidden border-primary/20">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-64 lg:h-auto bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <div className="text-6xl">📝</div>
              </div>
              <div className="p-8">
                <Badge className="mb-4">Featured</Badge>
                <h2 className="text-2xl font-bold mb-4">{featuredPost.title}</h2>
                <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{featuredPost.readTime} read</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredPost.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center text-primary hover:underline"
                >
                  Read full article <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Categories */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10"
            >
              {category}
            </Badge>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.slug} className="hover-lift">
              <CardContent className="p-6">
                <div className="h-40 bg-muted rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-4xl">📄</div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">{post.readTime}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-sm text-primary hover:underline"
                >
                  Read more <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="mt-16">
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Subscribe to receive notifications about new posts, project updates,
              and occasional insights directly to your inbox.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 rounded-lg border bg-background"
              />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}