import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { postId, rating } = await request.json()

    if (!postId || !rating) {
      return NextResponse.json({ error: 'Post ID and rating are required' }, { status: 400 })
    }

    const supabase = await createClient()
    const { error } = await supabase
      .from('blog_ratings')
      .insert([{ post_id: postId, rating }])

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Blog rating error:', error)
    return NextResponse.json(
      { error: 'Failed to submit rating' },
      { status: 500 }
    )
  }
}
