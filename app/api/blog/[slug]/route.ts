import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase';

// Mock data for development
const mockBlogPosts = [
  {
    slug: 'nextjs-14-app-router',
    title: 'Mastering Next.js 14 App Router',
    content: '# Mastering Next.js 14 App Router\n\nContent goes here...',
    excerpt: 'A comprehensive guide to the latest App Router features, patterns, and best practices for building modern web applications.',
    date: '2024-03-15',
    author: 'Alex Chen',
    readTime: '8 min',
    tags: ['Next.js', 'React', 'TypeScript'],
    featured: true,
  },
  {
    slug: 'ai-integration-patterns',
    title: 'AI Integration Patterns for Web Applications',
    content: '# AI Integration Patterns for Web Applications\n\nContent goes here...',
    excerpt: 'Exploring practical approaches to integrate AI APIs like Claude and GPT into production web applications.',
    date: '2024-03-10',
    author: 'Alex Chen',
    readTime: '12 min',
    tags: ['AI', 'Claude API', 'Web Development'],
    featured: true,
  },
  {
    slug: 'threejs-web-experiences',
    title: 'Creating Immersive 3D Web Experiences with Three.js',
    content: '# Creating Immersive 3D Web Experiences with Three.js\n\nContent goes here...',
    excerpt: 'How to build performant and accessible 3D interfaces that enhance user engagement without sacrificing usability.',
    date: '2024-03-05',
    author: 'Alex Chen',
    readTime: '10 min',
    tags: ['Three.js', '3D', 'WebGL'],
    featured: true,
  },
];

interface RouteContext {
  params: {
    slug: string;
  };
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { slug } = context.params;

    // In production, query from Supabase
    // For now, use mock data
    const post = mockBlogPosts.find(p => p.slug === slug);

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Simulate view count increment (would update database in production)
    console.log(`Blog post viewed: ${slug}`);

    return NextResponse.json({
      success: true,
      post,
    });

  } catch (error) {
    console.error('Blog post API GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { slug } = context.params;

    // Check authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const updateData = await request.json();

    // In production, update in Supabase
    const supabase = createSupabaseAdminClient();

    // Commented out for now
    /*
    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('slug', slug);

    if (error) {
      console.error('Error updating blog post:', error);
      return NextResponse.json(
        { error: 'Failed to update blog post' },
        { status: 500 }
      );
    }
    */

    // For demo purposes
    console.log('Blog post updated:', {
      slug,
      updates: updateData,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Blog post updated successfully',
      slug,
      updates: updateData,
    });

  } catch (error) {
    console.error('Blog post API PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const { slug } = context.params;

    // Check authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // In production, delete from Supabase
    const supabase = createSupabaseAdminClient();

    // Commented out for now
    /*
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('slug', slug);

    if (error) {
      console.error('Error deleting blog post:', error);
      return NextResponse.json(
        { error: 'Failed to delete blog post' },
        { status: 500 }
      );
    }
    */

    // For demo purposes
    console.log('Blog post deleted:', {
      slug,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
      slug,
    });

  } catch (error) {
    console.error('Blog post API DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}