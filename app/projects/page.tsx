import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// Icons removed for build

export default function ProjectsPage() {
  const projects = [
    {
      title: "Real-Time Analytics Dashboard",
      description: "A comprehensive dashboard for monitoring real-time metrics with interactive visualizations and live data updates.",
      technologies: ["Next.js", "Supabase", "Recharts", "Tailwind CSS"],
      github: "https://github.com/username/dashboard",
      live: "https://dashboard.example.com",
      featured: true,
    },
    {
      title: "AI-Powered Content Assistant",
      description: "Web application that uses Claude API to generate, refine, and optimize content for marketers and writers.",
      technologies: ["React", "Claude API", "Node.js", "Express"],
      github: "https://github.com/username/ai-assistant",
      live: "https://ai-assistant.example.com",
      featured: true,
    },
    {
      title: "3D Portfolio Experience",
      description: "Immersive portfolio website with interactive 3D elements, animations, and particle effects using Three.js.",
      technologies: ["Three.js", "React Three Fiber", "Framer Motion"],
      github: "https://github.com/3d-portfolio",
      live: "https://3d-portfolio.example.com",
      featured: true,
    },
    {
      title: "E-Commerce Platform",
      description: "Full-featured online store with product management, cart, checkout, and payment integration.",
      technologies: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
      github: "https://github.com/username/ecommerce",
      live: "https://store.example.com",
      featured: false,
    },
    {
      title: "DevOps Monitoring Tool",
      description: "Tool for monitoring server performance, application logs, and deployment status across multiple environments.",
      technologies: ["Python", "FastAPI", "Docker", "Prometheus"],
      github: "https://github.com/username/devops-tool",
      live: "https://monitor.example.com",
      featured: false,
    },
    {
      title: "Collaborative Code Editor",
      description: "Real-time collaborative code editor with syntax highlighting, live cursors, and video chat integration.",
      technologies: ["React", "WebSockets", "CodeMirror", "WebRTC"],
      github: "https://github.com/username/code-editor",
      live: "https://collab-code.example.com",
      featured: false,
    },
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <Badge className="mb-4">Portfolio</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          My <span className="gradient-text">Projects</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          A collection of my work spanning full-stack web applications, AI integrations,
          DevOps tools, and experimental interfaces. Each project represents a unique
          challenge and learning opportunity.
        </p>
      </div>

      {/* Featured Projects */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <Card key={project.title} className="hover-lift overflow-hidden">
              <CardContent className="p-6">
                <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-5xl">✨</div>
                </div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <Badge>Featured</Badge>
                </div>
                <p className="text-muted-foreground mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      Code
                    </a>
                  </Button>
                  <Button size="sm" >
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Other Projects */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Other Notable Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherProjects.map((project) => (
            <Card key={project.title}>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="ghost" size="sm" >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" >
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16">
        <Card className="border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Interested in Collaboration?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Have a project in mind or want to discuss potential opportunities?
              I'm always open to exploring new ideas and challenges.
            </p>
            <Button size="lg" >
              <a href="/contact">Get in Touch</a>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}