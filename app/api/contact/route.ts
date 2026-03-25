import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // In production, store in Supabase database
    // For now, we'll simulate successful submission
    const supabase = createSupabaseAdminClient();

    // Commented out for now since we don't have the table schema
    /*
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name,
          email,
          subject: subject || 'No subject',
          message,
          read: false,
          replied: false,
        },
      ]);

    if (error) {
      console.error('Error saving contact message:', error);
      return NextResponse.json(
        { error: 'Failed to save message' },
        { status: 500 }
      );
    }
    */

    // For demo purposes, we'll log to console
    console.log('Contact form submission:', {
      name,
      email,
      subject: subject || 'No subject',
      message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Send email notification
    // In production, integrate with email service like Resend

    return NextResponse.json({
      success: true,
      message: 'Message received successfully. I\'ll get back to you soon!',
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// For development/testing
export async function GET() {
  return NextResponse.json({
    message: 'Contact API is working',
    endpoints: {
      POST: 'Submit contact form',
    },
  });
}