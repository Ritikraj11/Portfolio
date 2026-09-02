# Portfolio Data Knowledge Base

This folder contains RAG-ready knowledge base files for Ritik Raj's portfolio.

## Files

- `about.md`: Personal profile, education, interests, current learning areas, and work style.
- `projects.md`: Project descriptions, categories, technology stacks, links, and status notes.
- `skills.md`: Technical skills, frontend/backend/AI skills, tools, learning areas, and soft skills.
- `experience.md`: Experience, achievements, certifications, hackathons, and academic details.
- `resume.pdf`: Resume PDF copied from the portfolio public assets.

## Suggested RAG Usage

Use these documents as source files for a portfolio chatbot or personal assistant. The markdown files are written with direct headings, factual bullets, and short paragraphs so they can be chunked cleanly for retrieval.

## Recommended Chunking

- Chunk by markdown heading.
- Keep project sections together when possible.
- Preserve links inside the same chunk as the project or profile information they describe.
- Use `resume.pdf` as an additional resume source if your ingestion pipeline supports PDF parsing.

## Source

The markdown documents were created from the existing portfolio repository content, especially the React components for About, Projects, Tech Stack, Services, Achievements, Contact, and Footer.
