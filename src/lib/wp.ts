export interface WPPost {
  id: number
  date: string
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  _embedded?: any
}

// HARD-CODED ORIGIN: This ensures the blog renders even if Vercel has an old WP_API_URL environment variable.
// We are using the verified Hostinger Preview URL to break the redirect loop.
const API_URL = 'https://paleturquoise-butterfly-387959.hostingersite.com/wp-json/wp/v2'

export async function getAllPosts(): Promise<WPPost[]> {
  try {
    const res = await fetch(`${API_URL}/posts?_embed&per_page=100`, {
      next: { revalidate: 60 } // Reduce cache time for debugging to 1 minute
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch WP posts: ${res.statusText} from ${API_URL}`)
    }
    
    const posts = await res.json()
    return posts
  } catch (error) {
    console.error('Error in getAllPosts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(`${API_URL}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 60 }
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch WP post by slug: ${res.statusText} from ${API_URL}`)
    }
    
    const posts = await res.json()
    return posts.length > 0 ? posts[0] : null
  } catch (error) {
    console.error(`Error in getPostBySlug (${slug}):`, error)
    return null
  }
}
