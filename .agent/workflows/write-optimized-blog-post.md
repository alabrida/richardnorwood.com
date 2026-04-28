---
name: Write Optimized Blog Post
description: Workflow for writing SEO and LLM-optimized blog posts that rank on traditional search engines and get cited by AI models like ChatGPT, Perplexity, and Claude.
---

# Write Optimized Blog Post Workflow

This workflow outlines the step-by-step process for creating content optimized for both traditional Search Engine Optimization (SEO) and Large Language Model Optimization (LLMO / AEO / GEO). In the AI era, search is about being the trusted answer AI chooses to cite and recommend.

## Phase 1: Research & Intent Matching

### 1. Gather Additional Context
- **Action**: **Always ask the user** to provide any other relevant context, personal thoughts, notes, or specific angles they want to include in the post *before* writing. This custom context is crucial to optimize the post and ensure it aligns with the author's unique voice and strategic goals.

### 2. Target Fan-Out Queries
When users ask AI complex questions, the model breaks them into smaller sub-queries (fan-out queries). 
- **Action**: Brainstorm and target the specific fragments or sub-topics an AI would search for to answer a broad question. Address each clearly.

### 3. Find the Reader's Questions
- **Action**: Look beyond basic keywords to uncover *why* users are searching. Use "People also ask" sections, AI overviews, or tools like Semrush to find specific questions.
- **Action**: Optimize for conversational, long-tail queries ("how to", "what is", "best way to").

## Phase 2: Content Creation & Depth

### 4. Inject Human Experience and Anecdotes
- **Action**: To separate this post from purely AI-written content, you must inject real-world experience and human elements. **You must always reference the author's LinkedIn profile in `d:\richardnorwood.com\docs\blog\linkedin-profile.pdf`**. 
- **Action**: Find relevant experiences, past roles (e.g., Continuous Improvement Manager, PMP methodology), or metrics, and weave them naturally into the narrative to ground theoretical concepts in practical reality.

### 5. Write Original, Human-Authored Content
- **Action**: LLMs prioritize genuinely novel content, original research, first-party data, and unique expert analysis to avoid "model collapse." Use the context provided by the user and the author profile to create something novel.

### 6. Prioritize Content Depth (E-E-A-T)
- **Action**: Aim for comprehensive coverage (often 1,500 - 2,000+ words if the topic demands it) rather than keyword density.
- **Action**: Include specific examples, data points, and case studies to demonstrate real-world Experience, Expertise, Authoritativeness, and Trustworthiness.

### 7. Focus on Readability and Inclusivity
- **Action**: Keep sentences and paragraphs short (2-4 sentences max). Use active voice and transition words.
- **Action**: Use inclusive, clear language to ensure the content is easily interpreted by both humans and AI.

## Phase 3: Structure for Machine Readability

### 6. Bottom Line Up Front (BLUF) Structure
- **Action**: Do not bury the answer. Lead with the most important insight or direct answer immediately after a heading, then elaborate.

### 7. Hierarchical and Self-Contained Formatting
- **Action**: Use a strict heading hierarchy (H1 for title, H2 for main sections, H3 for sub-sections). Make headings descriptive, not vague.
- **Action**: Write self-contained paragraphs so that if an AI extracts a single chunk, it makes sense out of context.
- **Action**: Use bulleted lists, numbered steps, and tables—structured formats are much easier for LLMs to parse than dense prose.

### 8. Add TL;DR and FAQ Sections
- **Action**: Include a "Key Takeaways" or "TL;DR" section at the top.
- **Action**: Add an FAQ section at the bottom with direct answers to common questions.

## Phase 4: Technical LLM Optimization

### 9. Ensure Raw HTML Accessibility
- **Action**: AI crawlers (like `GPTBot`, `PerplexityBot`, `ClaudeBot`) only read raw HTML and do not execute JavaScript. Ensure crucial content is not hidden behind JS-rendered tabs, accordions, or sliders.
- **Action**: Verify `robots.txt` and CDN (e.g., Cloudflare) settings do not inadvertently block AI crawlers.

### 10. Implement Comprehensive Schema Markup
- **Action**: Use JSON-LD structured data to provide context. Essential schemas include `Article`, `FAQPage`, `HowTo`, `Person` (author), and `Organization`.

### 11. Create an `llms.txt` File
- **Action**: Maintain an `llms.txt` file in the site's root directory to provide a clear, markdown-based summary of your brand, services, and key content for AI systems.

## Phase 5: Distribution & Maintenance

### 12. Optimize for Bing
- **Action**: Ensure the site is submitted and ranking well on Bing Webmaster Tools, as Bing powers live web searches for tools like ChatGPT.

### 13. Build Brand Mentions
- **Action**: LLMs give heavy weight to unlinked brand mentions. Distribute content and build a presence on high-signal platforms (Reddit, GitHub, YouTube, Wikipedia, industry publications). 

### 14. Keep Content Fresh
- **Action**: AI systems have a strong recency bias (citations drop sharply for content older than 3 months). Refresh evergreen content quarterly, update statistics, and ensure the `dateModified` schema field and visible "Last Updated" dates are current.
