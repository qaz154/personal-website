import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase';
import { BlogPost } from '@/types/blog';

// Mock data for development
const mockBlogPosts: BlogPost[] = [
  {
    slug: 'nextjs-14-app-router',
    title: 'Mastering Next.js 14 App Router',
    excerpt: 'A comprehensive guide to the latest App Router features, patterns, and best practices for building modern web applications.',
    content: '# Mastering Next.js 14 App Router\n\nContent goes here...',
    date: '2024-03-15',
    author: 'Alex Chen',
    readTime: '8 min',
    tags: ['Next.js', 'React', 'TypeScript'],
    featured: true,
  },
  {
    slug: 'ai-integration-patterns',
    title: 'AI Integration Patterns for Web Applications',
    excerpt: 'Exploring practical approaches to integrate AI APIs like Claude and GPT into production web applications.',
    content: '# AI Integration Patterns for Web Applications\n\nContent goes here...',
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
    content: '# Creating Immersive 3D Web Experiences with Three.js\n\nContent goes here...',
    date: '2024-03-05',
    author: 'Alex Chen',
    readTime: '10 min',
    tags: ['Three.js', '3D', 'WebGL'],
    featured: true,
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const featured = searchParams.get('featured');

    // In production, query from Supabase
    // For now, use mock data with filtering
    let posts = [...mockBlogPosts];

    // Apply filters
    if (category) {
      // Filter by category logic would go here
    }

    if (tag) {
      posts = posts.filter(post => post.tags.includes(tag));
    }

    if (featured === 'true') {
      posts = posts.filter(post => post.featured);
    }

    // Apply pagination
    const paginatedPosts = posts.slice(offset, offset + limit);

    return NextResponse.json({
      posts: paginatedPosts,
      pagination: {
        total: posts.length,
        limit,
        offset,
        hasMore: offset + limit < posts.length,
      },
    });

  } catch (error) {
    console.error('Blog API GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Check authentication (would use NextAuth in production)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const postData = await request.json();

    // Validate required fields
    if (!postData.title || !postData.content || !postData.slug) {
      return NextResponse.json(
        { error: 'Title, content, and slug are required' },
        { status: 400 }
      );
    }

    // In production, save to Supabase
    const supabase = createSupabaseAdminClient();

    // Commented out for now since we don't have the table schema
    /*
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([
        {
          title: postData.title,
          slug: postData.slug,
          content: postData.content,
          excerpt: postData.excerpt || '',
          author: postData.author || 'Admin',
          tags: postData.tags || [],
          featured: postData.featured || false,
          published: postData.published || false,
        },
      ]);

    if (error) {
      console.error('Error creating blog post:', error);
      return NextResponse.json(
        { error: 'Failed to create blog post' },
        { status: 500 }
      );
    }
    */

    // For demo purposes
    console.log('New blog post created:', {
      title: postData.title,
      slug: postData.slug,
      author: postData.author || 'Admin',
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Blog post created successfully',
      post: {
        ...postData,
        id: Date.now(), // Mock ID
        createdAt: new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error('Blog API POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}