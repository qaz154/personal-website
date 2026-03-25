import { notFound } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Tag, ArrowLeft, Share2, Bookmark, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

// Mock data - in production, this would come from Supabase
const blogPosts: BlogPost[] = [
  {
    slug: 'nextjs-14-app-router',
    title: 'Mastering Next.js 14 App Router',
    excerpt: 'A comprehensive guide to the latest App Router features, patterns, and best practices for building modern web applications.',
    content: `# Mastering Next.js 14 App Router

Next.js 14 introduces significant improvements to the App Router, making it more powerful and intuitive than ever before. In this comprehensive guide, we'll explore the latest features, patterns, and best practices for building modern web applications.

## Server Components by Default

The App Router now uses Server Components by default, which means your components are rendered on the server unless you explicitly mark them with "use client". This has several benefits:

- **Reduced bundle size**: Client bundles only include client components
- **Improved performance**: Server components can access data directly
- **Better SEO**: Content is rendered on the server

## Enhanced Data Fetching

Next.js 14 introduces new patterns for data fetching:

\`\`\`typescript
// App Router data fetching pattern
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // Revalidate every hour
  });
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{data}</div>;
}
\`\`\`

## Improved Caching Strategies

The caching system has been revamped with more granular control:

- **Request memoization**: Automatic deduplication of fetch requests
- **Data cache**: Persistent cache for fetched data
- **Full route cache**: Static optimization for static routes

## Practical Examples

Let's look at a practical example of building a blog with the App Router:

\`\`\`typescript
// app/blog/[slug]/page.tsx
interface BlogPost {
  title: string;
  content: string;
  date: string;
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <time>{post.date}</time>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
\`\`\`

## Migration Tips

If you're migrating from Pages Router to App Router:

1. Start with static pages
2. Gradually move dynamic routes
3. Test thoroughly at each step
4. Use the compatibility layer for shared components

## Conclusion

The Next.js 14 App Router represents a significant step forward in React framework architecture. By embracing server components, improving data fetching, and enhancing caching, it provides a solid foundation for building performant, scalable applications.

The learning curve is worth the investment, and the benefits in terms of performance, developer experience, and maintainability are substantial.`,
    date: '2024-03-15',
    author: 'Alex Chen',
    readTime: '8 min',
    tags: ['Next.js', 'React', 'TypeScript'],
    featured: true,
    coverImage: '/blog/nextjs-14.jpg',
  },
  {
    slug: 'ai-integration-patterns',
    title: 'AI Integration Patterns for Web Applications',
    excerpt: 'Exploring practical approaches to integrate AI APIs like Claude and GPT into production web applications.',
    content: `# AI Integration Patterns for Web Applications

Artificial Intelligence is transforming how we build web applications. From intelligent assistants to content generation, AI capabilities are becoming essential features.

## Pattern 1: Intelligent Assistant

Create AI-powered assistants that help users navigate your application:

\`\`\`typescript
// Example of an AI assistant component
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AIAssistant() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/api/ai/assistant', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setResponse(data.answer);
  };

  return (
    <div className="space-y-4">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask me anything..."
      />
      <Button onClick={handleSubmit}>Ask AI</Button>
      {response && (
        <div className="p-4 bg-muted rounded-lg">
          {response}
        </div>
      )}
    </div>
  );
}
\`\`\`

## Pattern 2: Content Generation

Use AI to generate dynamic content based on user input:

- Blog post summaries
- Product descriptions
- Personalized recommendations
- Code explanations

## Pattern 3: Smart Search

Enhance traditional search with semantic understanding:

\`\`\`typescript
// Semantic search implementation
export async function semanticSearch(query: string, documents: string[]) {
  // Generate embeddings for query and documents
  // Calculate cosine similarity
  // Return ranked results
}
\`\`\`

## Best Practices

1. **Always provide fallbacks**: AI features should enhance, not replace core functionality
2. **Handle errors gracefully**: AI APIs can fail or be slow
3. **Respect user privacy**: Never send sensitive data to third-party APIs
4. **Monitor costs**: AI API usage can become expensive quickly

## Implementation Example

Here's how to integrate Claude API into a Next.js application:

\`\`\`typescript
// app/api/claude/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.CLAUDE_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-opus-20240229',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const data = await response.json();
  return NextResponse.json({ response: data.content[0].text });
}
\`\`\`

## Future Trends

The future of AI in web development includes:

- **Personalized user experiences**: AI that adapts to individual preferences
- **Automated testing**: AI-generated test cases and bug detection
- **Real-time collaboration**: AI-assisted pair programming
- **Accessibility improvements**: AI-powered accessibility features

## Conclusion

AI integration is becoming essential for modern web applications. By starting with simple patterns and gradually adding more sophisticated features, you can create applications that feel intelligent and responsive.

Remember that the best AI features are those that solve real user problems, not just showcase technical capabilities.`,
    date: '2024-03-10',
    author: 'Alex Chen',
    readTime: '12 min',
    tags: ['AI', 'Claude API', 'Web Development'],
    featured: true,
  },
  {
    slug: 'threejs-web-experiences',
    title: 'Creating Immersive 3D Web Experiences with Three.js',
    excerpt: 'How to build performant and accessible 3D interfaces that enhance user engagement without sacrificing usability.',
    content: `# Creating Immersive 3D Web Experiences with Three.js

WebGL has opened up new possibilities for creating immersive 3D experiences directly in the browser. Three.js makes these capabilities accessible to web developers.

## Getting Started

Three.js provides a high-level API for WebGL:

\`\`\`javascript
import * as THREE from 'three';

// Basic scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

scene.background = new THREE.Color(0x000000);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
\`\`\`

## Performance Optimization

3D graphics can be resource-intensive. Key optimizations:

1. **Use instanced rendering** for multiple similar objects
2. **Implement LOD (Level of Detail)** for distant objects
3. **Compress textures** to reduce memory usage
4. **Use geometry simplification** where possible

## React Three Fiber

For React developers, React Three Fiber provides a declarative way to work with Three.js:

\`\`\`jsx
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function Box(props) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box position={[0, 0, 0]} />
    </Canvas>
  );
}
\`\`\`

## Accessibility Considerations

3D experiences must be accessible:

- **Provide keyboard navigation**
- **Include screen reader descriptions**
- **Offer motion reduction options**
- **Ensure sufficient color contrast**

## Real-World Example: Product Viewer

Here's a practical example of a 3D product viewer:

\`\`\`jsx
// components/ProductViewer.tsx
'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';

export default function ProductViewer() {
  return (
    <div className="h-[500px] w-full">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <Suspense fallback={<Html center>Loading 3D model...</Html>}>
          {/* 3D Model would go here */}
          <OrbitControls enableZoom={true} enablePan={true} />
          <Environment preset="studio" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
        </Suspense>
      </Canvas>
    </div>
  );
}
\`\`\`

## Best Practices

1. **Progressive enhancement**: Start with 2D, add 3D as enhancement
2. **Performance budgets**: Set strict performance targets
3. **Mobile optimization**: Test on mobile devices
4. **Error boundaries**: Handle WebGL context loss

## Tools and Resources

- **Blender**: Open-source 3D modeling
- **GLTF**: Standard format for 3D assets
- **Three.js Editor**: Visual scene editor
- **React Three Drei**: Helpers for React Three Fiber

## Conclusion

Three.js enables web developers to create stunning 3D experiences that were previously only possible in native applications. By following performance best practices and maintaining accessibility standards, we can create immersive experiences that work for everyone.

Remember to use 3D purposefully—not just because you can, but because it enhances the user experience.`,
    date: '2024-03-05',
    author: 'Alex Chen',
    readTime: '10 min',
    tags: ['Three.js', '3D', 'WebGL'],
    featured: true,
  },
];

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Calculate view count (mock - in production would come from analytics)
  const viewCount = Math.floor(Math.random() * 1000) + 500;

  return (
    <div className="container py-12">
      {/* Back navigation */}
      <div className="mb-8">
        <Button variant="ghost" >
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      {/* Article Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            Article
          </Badge>
          {post.featured && (
            <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/20">
              Featured
            </Badge>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 mb-8 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span>{post.readTime} read</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            <span>{viewCount.toLocaleString()} views</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              <Tag className="h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Bookmark className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden border-0 shadow-lg">
          {post.coverImage && (
            <div className="h-64 md:h-96 w-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="text-6xl opacity-50">📝</div>
            </div>
          )}
          <CardContent className="p-8">
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed">{post.content}</div>
            </article>
          </CardContent>
        </Card>

        {/* Author Bio */}
        <Card className="mt-8 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="h-10 w-10 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">About the Author</h3>
                <p className="text-muted-foreground mb-4">
                  {post.author} is a passionate developer and writer with expertise in modern web technologies.
                  With over 6 years of experience, they specialize in creating elegant solutions to complex
                  problems and sharing knowledge through technical writing.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm">
                    <Link href="/about">View Full Profile</Link>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Link href={`/blog?author=${post.author}`}>View All Articles</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Posts */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Continue Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts
              .filter(p => p.slug !== post.slug)
              .slice(0, 3)
              .map((relatedPost) => (
                <Card key={relatedPost.slug} className="hover-lift hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {relatedPost.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2">{relatedPost.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{relatedPost.date}</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full mt-4">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        Read Article
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <Card className="mt-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Enjoyed This Article?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Subscribe to my newsletter to receive notifications about new posts,
              project updates, and exclusive content directly in your inbox.
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 rounded-lg border bg-background"
              />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      creator: '@yourusername',
    },
  };
}