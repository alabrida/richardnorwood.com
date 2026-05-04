import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { normalizeInteger, normalizeText, readJsonObject } from '@/lib/api/security'

export async function POST(request: Request) {
  try {
    const body = await readJsonObject(request)
    if (!body) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const postId = normalizeText(body.postId, 200)
    const rating = normalizeInteger(body.rating, 1, 5)

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
