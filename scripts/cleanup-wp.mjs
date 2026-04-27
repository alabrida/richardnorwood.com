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

async function cleanup() {
  console.log(`Cleaning up old blog-stub post from ${API_URL}\n`);
  
  try {
    const searchRes = await fetch(`${API_URL}/posts?slug=blog-stub`, {
      headers: authHeaders
    });
    const existing = await searchRes.json();

    if (existing && existing.length > 0) {
      console.log(`Deleting existing ID: ${existing[0].id}`);
      const res = await fetch(`${API_URL}/posts/${existing[0].id}?force=true`, {
        method: 'DELETE',
        headers: authHeaders
      });

      if (res.status === 200) {
        console.log(`  ✅ Successfully deleted blog-stub post.`);
      } else {
        const err = await res.json();
        console.error(`  ❌ Failed to delete: ${res.status}`, err);
      }
    } else {
      console.log(`  ℹ️ No blog-stub post found to delete.`);
    }
  } catch (error) {
    console.error(`  ❌ Error processing:`, error);
  }
}

cleanup();
