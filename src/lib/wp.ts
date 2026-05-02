export interface WPPost {
  id: number
  date: string
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  _embedded?: any
}

// Using Secure Hostinger Preview URL to bypass domain conflicts and redirect loops
const API_URL = 'https://paleturquoise-butterfly-387959.hostingersite.com/wp-json/wp/v2'

export async function getAllPosts(): Promise<WPPost[]> {
  try {
    const res = await fetch(`${API_URL}/posts?_embed`, {
      next: { revalidate: 3600 }
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch WP posts: ${res.statusText}`)
    }
    
    const posts = await res.json()
    return posts
  } catch (error) {
    console.error('Error fetching all WP posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(`${API_URL}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 3600 }
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch WP post by slug: ${res.statusText}`)
    }
    
    const posts = await res.json()
    return posts.length > 0 ? posts[0] : null
  } catch (error) {
    console.error(`Error fetching WP post by slug (${slug}):`, error)
    return null
  }
}
