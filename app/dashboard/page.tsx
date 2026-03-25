'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  BarChart3,
  BookOpen,
  FileText,
  Settings,
  Users,
  Eye,
  Edit,
  Trash2,
  Plus,
  LogOut,
  Home,
} from 'lucide-react';
import Link from 'next/link';

interface User {
  name: string;
  email: string;
  role: string;
}

interface BlogPost {
  id: number;
  title: string;
  status: 'published' | 'draft';
  views: number;
  date: string;
}

interface Project {
  id: number;
  title: string;
  status: 'active' | 'completed' | 'planned';
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    { id: 1, title: 'Mastering Next.js 14 App Router', status: 'published', views: 1245, date: '2024-03-15' },
    { id: 2, title: 'AI Integration Patterns', status: 'published', views: 892, date: '2024-03-10' },
    { id: 3, title: '3D Web Experiences', status: 'draft', views: 0, date: '2024-03-05' },
  ]);
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, title: 'Real-Time Dashboard', status: 'active' },
    { id: 2, title: 'AI Content Assistant', status: 'completed' },
    { id: 3, title: '3D Portfolio', status: 'completed' },
    { id: 4, title: 'E-Commerce Platform', status: 'planned' },
  ]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [activeTab, setActiveTab] = useState<'overview' | 'blog' | 'projects' | 'settings'>('overview');

  useEffect(() => {
    // Check authentication
    const session = localStorage.getItem('demo_session');
    if (!session) {
      router.push('/login');
      return;
    }

    try {
      const sessionData = JSON.parse(session);
      if (new Date(sessionData.expires) < new Date()) {
        localStorage.removeItem('demo_session');
        router.push('/login');
        return;
      }
      setUser(sessionData.user);
    } catch {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('demo_session');
    router.push('/login');
  };

  const handleAddPost = () => {
    if (!newPost.title.trim()) return;

    const newBlogPost: BlogPost = {
      id: blogPosts.length + 1,
      title: newPost.title,
      status: 'draft',
      views: 0,
      date: new Date().toISOString().split('T')[0],
    };

    setBlogPosts([...blogPosts, newBlogPost]);
    setNewPost({ title: '', content: '' });
  };

  const handleDeletePost = (id: number) => {
    setBlogPosts(blogPosts.filter(post => post.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
      case 'active':
      case 'completed':
        return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'draft':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
      case 'planned':
        return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = {
    totalPosts: blogPosts.length,
    publishedPosts: blogPosts.filter(p => p.status === 'published').length,
    totalViews: blogPosts.reduce((sum, post) => sum + post.views, 0),
    activeProjects: projects.filter(p => p.status === 'active').length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <Home className="h-6 w-6" />
              Dashboard
            </Link>
            <Badge variant="outline" className="hidden md:flex">
              {user.role === 'admin' ? 'Administrator' : 'User'}
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block text-sm">
              <p className="font-medium">{user.name}</p>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <nav className="space-y-2">
                  <Button
                    variant={activeTab === 'overview' ? 'default' : 'ghost'}
                    className="w-full justify-start gap-3"
                    onClick={() => setActiveTab('overview')}
                  >
                    <BarChart3 className="h-4 w-4" />
                    Overview
                  </Button>
                  <Button
                    variant={activeTab === 'blog' ? 'default' : 'ghost'}
                    className="w-full justify-start gap-3"
                    onClick={() => setActiveTab('blog')}
                  >
                    <FileText className="h-4 w-4" />
                    Blog Posts
                  </Button>
                  <Button
                    variant={activeTab === 'projects' ? 'default' : 'ghost'}
                    className="w-full justify-start gap-3"
                    onClick={() => setActiveTab('projects')}
                  >
                    <BookOpen className="h-4 w-4" />
                    Projects
                  </Button>
                  <Button
                    variant={activeTab === 'settings' ? 'default' : 'ghost'}
                    className="w-full justify-start gap-3"
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                </nav>

                <div className="mt-8 pt-8 border-t">
                  <h3 className="font-semibold mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Plus className="h-3 w-3" />
                      New Post
                    </Button>
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Plus className="h-3 w-3" />
                      Add Project
                    </Button>
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Users className="h-3 w-3" />
                      View Analytics
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
                  <p className="text-muted-foreground">
                    Here's what's happening with your portfolio website.
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Posts</p>
                          <p className="text-2xl font-bold">{stats.totalPosts}</p>
                        </div>
                        <FileText className="h-8 w-8 text-primary/20" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Published</p>
                          <p className="text-2xl font-bold">{stats.publishedPosts}</p>
                        </div>
                        <Eye className="h-8 w-8 text-green-500/20" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Views</p>
                          <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
                        </div>
                        <BarChart3 className="h-8 w-8 text-blue-500/20" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Active Projects</p>
                          <p className="text-2xl font-bold">{stats.activeProjects}</p>
                        </div>
                        <BookOpen className="h-8 w-8 text-amber-500/20" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Posts */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Blog Posts</CardTitle>
                    <CardDescription>Your most recent articles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {blogPosts.slice(0, 3).map((post) => (
                        <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-semibold">{post.title}</h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span>{post.date}</span>
                              <span>{post.views.toLocaleString()} views</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(post.status)}>
                              {post.status}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'blog' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Blog Management</h1>
                    <p className="text-muted-foreground">Create and manage your blog posts</p>
                  </div>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Post
                  </Button>
                </div>

                {/* Create New Post */}
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Post</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="post-title">Title</Label>
                      <Input
                        id="post-title"
                        placeholder="Enter post title"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="post-content">Content</Label>
                      <Textarea
                        id="post-content"
                        placeholder="Start writing your post content..."
                        rows={6}
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={handleAddPost} disabled={!newPost.title.trim()}>
                        Save as Draft
                      </Button>
                      <Button variant="outline" onClick={() => setNewPost({ title: '', content: '' })}>
                        Clear
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Posts List */}
                <Card>
                  <CardHeader>
                    <CardTitle>All Posts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {blogPosts.map((post) => (
                        <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                          <div className="flex-1">
                            <h3 className="font-semibold">{post.title}</h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span>{post.date}</span>
                              <span>{post.views.toLocaleString()} views</span>
                              <Badge className={getStatusColor(post.status)}>
                                {post.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Project Management</h1>
                    <p className="text-muted-foreground">Manage your portfolio projects</p>
                  </div>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Project
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {projects.map((project) => (
                        <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-semibold">{project.title}</h3>
                            <div className="mt-1">
                              <Badge className={getStatusColor(project.status)}>
                                {project.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Settings</h1>
                  <p className="text-muted-foreground">Manage your website settings</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Website Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="site-title">Site Title</Label>
                        <Input id="site-title" defaultValue="My Portfolio" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="site-description">Site Description</Label>
                        <Textarea
                          id="site-description"
                          defaultValue="A personal portfolio website showcasing projects, blog posts, and professional journey."
                          rows={3}
                        />
                      </div>
                      <Button>Save Changes</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>User Account</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="user-name">Name</Label>
                        <Input id="user-name" defaultValue={user.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="user-email">Email</Label>
                        <Input id="user-email" defaultValue={user.email} type="email" />
                      </div>
                      <Button variant="outline">Change Password</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}