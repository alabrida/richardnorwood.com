import fs from 'fs';
import path from 'path';

// Load Credentials
const envFilePath = path.resolve(process.cwd(), 'credentials', '.env');
const envFile = fs.readFileSync(envFilePath, 'utf-8');
const env = {};
envFile.split(/\r?\n/).forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match && !match[1].startsWith('#')) {
    env[match[1].trim()] = match[2].trim();
  }
});

const API_URL = env['WP_API_URL'];
const EMAIL = env['WP_API_EMAIL'];
const PASSWORD = env['WP_API_PASSWORD'];
const base64Credentials = Buffer.from(`${EMAIL}:${PASSWORD}`).toString('base64');

const authHeaders = {
  'Authorization': `Basic ${base64Credentials}`,
  'Content-Type': 'application/json'
};

async function seed() {
  console.log(`Starting Blog Seeding to ${API_URL}\n`);
  
  const stubPath = path.resolve(process.cwd(), 'content', 'blog-stub.json');
  const rawData = fs.readFileSync(stubPath, 'utf-8');
  const posts = JSON.parse(rawData);

  for (const post of posts) {
    console.log(`Pushing post: ${post.title}...`);

    try {
      // First, check if a post with this slug already exists
      const searchRes = await fetch(`${API_URL}/posts?slug=${post.slug}`, {
        headers: authHeaders
      });
      const existing = await searchRes.json();

      let method = 'POST';
      let url = `${API_URL}/posts`;
      
      if (existing && existing.length > 0) {
        method = 'POST';
        url = `${API_URL}/posts/${existing[0].id}`;
        console.log(`  Updating existing ID: ${existing[0].id}`);
      } else {
        console.log(`  Creating new record...`);
      }

      const payload = {
        title: post.title,
        content: post.body,
        excerpt: post.excerpt,
        status: 'publish',
        slug: post.slug,
        date: post.date,
        // Categories and tags would require IDs, we will just push the raw data
        meta: {
            author_name: post.author,
            category_name: post.category
        }
      };

      const res = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify(payload)
      });

      if (res.status === 200 || res.status === 201) {
        const data = await res.json();
        console.log(`  ✅ Success: ${data.link}`);
      } else {
        const err = await res.json();
        console.error(`  ❌ Failed: ${res.status}`, err);
      }
    } catch (error) {
      console.error(`  ❌ Error processing ${post.title}:`, error);
    }
  }
  
  console.log('\nSeeding Complete.');
}

seed();
