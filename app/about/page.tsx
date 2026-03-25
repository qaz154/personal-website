import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Briefcase, GraduationCap } from "lucide-react";

export default function AboutPage() {
  const experiences = [
    {
      year: "2024 - Present",
      role: "Senior Full-Stack Developer",
      company: "Tech Innovations Inc.",
      description: "Leading development of cloud-native applications using Next.js, Node.js, and AWS.",
    },
    {
      year: "2022 - 2024",
      role: "Frontend Engineer",
      company: "Digital Solutions Co.",
      description: "Built responsive web applications with React and TypeScript, focusing on user experience.",
    },
    {
      year: "2020 - 2022",
      role: "Software Developer",
      company: "Startup Labs",
      description: "Developed MVP products and contributed to full-stack projects across the stack.",
    },
  ];

  const education = [
    {
      degree: "MSc in Computer Science",
      institution: "Stanford University",
      year: "2018 - 2020",
    },
    {
      degree: "BSc in Software Engineering",
      institution: "MIT",
      year: "2014 - 2018",
    },
  ];

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <Badge className="mb-4">About Me</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Passionate Developer &<br />
          <span className="gradient-text">Problem Solver</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          With over 6 years of experience in software development, I specialize in creating
          elegant solutions to complex problems. My expertise spans full-stack development,
          cloud architecture, and emerging technologies like AI and 3D web experiences.
        </p>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <span>San Francisco, CA</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            <span>6+ Years Experience</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span>Available for Opportunities</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Experience */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Professional Journey</h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{exp.role}</h3>
                        <p className="text-primary">{exp.company}</p>
                      </div>
                      <Badge variant="outline">{exp.year}</Badge>
                    </div>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Philosophy */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Development Philosophy</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-lg mb-4">
                  I believe that great software is born at the intersection of <strong>technical excellence</strong> and <strong>user-centric design</strong>. Every line of code should serve a purpose, and every interface should feel intuitive.
                </p>
                <p className="text-muted-foreground">
                  My approach combines modern engineering practices with continuous learning. I'm particularly passionate about performance optimization, accessibility, and creating immersive web experiences that push boundaries.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Education */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <GraduationCap className="h-6 w-6" />
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-primary">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">{edu.year}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Core Competencies</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Next.js", "React", "TypeScript", "Node.js",
                "PostgreSQL", "AWS", "Docker", "Three.js",
                "GraphQL", "Tailwind CSS", "Supabase", "Python",
                "CI/CD", "Framer Motion", "Jest", "Prisma"
              ].map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </section>

          {/* Fun Facts */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Beyond Code</h2>
            <Card>
              <CardContent className="p-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Avid photographer and digital artist</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Open source contributor</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Mentor for aspiring developers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Board game enthusiast</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}