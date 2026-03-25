import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Palette, Sparkles, Terminal } from "lucide-react";
import Link from "next/link";
import ParticleBackground from "@/components/3d/ParticleBackground";

export default function Home() {
  const skills = [
    { icon: Code, label: "Full-Stack Development", level: 90 },
    { icon: Terminal, label: "DevOps & Cloud", level: 80 },
    { icon: Palette, label: "UI/UX Design", level: 85 },
    { icon: Sparkles, label: "AI Integration", level: 75 },
  ];

  const featuredProjects = [
    {
      title: "Real-Time Dashboard",
      description: "Interactive dashboard with live data visualization",
      tags: ["Next.js", "Supabase", "Recharts"],
    },
    {
      title: "AI Content Generator",
      description: "Web app using Claude API for content creation",
      tags: ["React", "Claude API", "Node.js"],
    },
    {
      title: "3D Portfolio Experience",
      description: "Immersive portfolio with Three.js animations",
      tags: ["Three.js", "React Three Fiber", "Framer Motion"],
    },
  ];

  return (
    <div className="flex flex-col">
      <ParticleBackground />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <Badge className="mb-6" variant="outline">
              Welcome to my digital space
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Building <span className="gradient-text">digital experiences</span> that
              <br />
              <span className="text-primary">inspire and innovate</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
              I'm a passionate developer crafting elegant solutions with modern
              technologies. This website showcases my journey, projects, and thoughts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" >
                <Link href="/projects">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" >
                <Link href="/about">
                  About Me
                </Link>
              </Button>
              <Button size="lg" variant="ghost" >
                <Link href="/contact">
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Background decorative elements */}
        <ParticleBackground />
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 border-t">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Technical Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A blend of frontend craftsmanship, backend engineering, and emerging technologies.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <Card key={skill.label} className="hover-lift">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{skill.label}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 border-t bg-muted/30">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
              <p className="text-muted-foreground">
                Selected works that highlight my technical capabilities
              </p>
            </div>
            <Button variant="outline" >
              <Link href="/projects">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Card key={project.title} className="hover-lift overflow-hidden">
                <CardContent className="p-6">
                  <div className="h-40 bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-4xl">✨</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <Card className="glass-effect border-primary/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Let's Build Something Amazing</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Whether you need a cutting-edge web application, AI integration,
                or just want to discuss technology, I'd love to connect.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" >
                  <Link href="/contact">
                    Start a Conversation
                  </Link>
                </Button>
                <Button size="lg" variant="outline" >
                  <Link href="/blog">
                    Read My Blog
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
