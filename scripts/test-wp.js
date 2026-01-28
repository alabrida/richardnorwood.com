const https = require('https');

const url = 'https://www.richardnorwood.com/wp-json/wp/v2/posts';

console.log(`Fetching from: ${url}`);

https.get(url, (res) => {
    console.log('Status Code:', res.statusCode);
    console.log('Headers:', res.headers);

    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const posts = JSON.parse(data);
            console.log(`Found ${posts.length} posts.`);
            if (posts.length > 0) {
                console.log('First post title:', posts[0].title.rendered);
            }
        } catch (e) {
            console.error('Error parsing JSON:', e.message);
            console.log('Raw response:', data.substring(0, 500)); // Log first 500 chars
        }
    });

}).on('error', (e) => {
    console.error('Error fetching URL:', e.message);
});
