import fs from 'fs';
import path from 'path';

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

async function testAuth() {
  console.log(`Testing Basic Auth with email: ${EMAIL}`);
  const base64Credentials = Buffer.from(`${EMAIL}:${PASSWORD}`).toString('base64');
  try {
    const res = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${base64Credentials}`
      }
    });
    const data = await res.json();
    console.log(`Test Status:`, res.status);
    if (res.status === 200) {
      console.log('SUCCESS! Logged in as:', data.name || data.slug);
    } else {
      console.log('Error Data:', data);
    }
  } catch (e) {
    console.error(e);
  }
}

testAuth();
