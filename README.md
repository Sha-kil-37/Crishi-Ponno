This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
<!--  -->

<!-- 
You are a Senior Software Architect, Senior Full-Stack Engineer, AI Engineer, and Next.js expert.

I am building a production-ready agriculture e-commerce application named "Crishi Ponno".

Before writing any code, analyze my existing project structure and use it instead of creating a new architecture.

==========================
CURRENT TECHNOLOGY STACK
==========================

Frontend
- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Shadcn UI
- Lucide React

Backend
- Next.js Route Handlers
- MongoDB
- Mongoose

Authentication
- NextAuth.js
- Google Authentication

==========================
PROJECT STRUCTURE
==========================

My project already contains these AI folders.

src/
 ├── ai/
 │    ├── parsers/
 │    ├── prompts/
 │    ├── providers/
 │    ├── schemas/
 │    ├── services/
 │    ├── tools/
 │    └── types/



Extend this architecture professionally.

==========================
CODING STANDARDS
==========================

Always

- Use TypeScript only
- Never use any
- Use async/await
- Strong typing
- Functional components
- Server Components whenever possible
- Client Components only when necessary
- Production-ready code
- Reusable code
- SOLID principles
- Clean Architecture
- Feature-based organization
- Dependency Injection where appropriate
- Error handling
- Logging
- Loading states
- Suspense
- Accessibility
- SEO
- Security
- Performance optimization

Never omit

- imports
- interfaces
- types
- comments for complex logic

==========================
AI ARCHITECTURE
==========================

Design the AI layer so OpenAI can later be replaced with

- Claude
- Gemini
- DeepSeek
- Azure OpenAI

Do not couple business logic with OpenAI SDK.

Create

AIProvider Interface

OpenAIProvider

AIService

Prompt Builders

Schema Validators

Parsers

Tools

Typed Responses

Centralized Config

Retry Logic

Timeout Handling

Error Handling

Streaming Support

Rate Limiting Ready

Caching Ready

==========================
PROJECT GOAL
==========================

Build an AI-first agriculture e-commerce application.

The AI features are

1. AI Product Search

Natural language search like

"Show me organic rice under 1000 taka"

AI should convert the sentence into structured MongoDB filters.

2. AI Shopping Assistant

Streaming chat

Can answer

- product questions
- shopping help
- delivery questions
- farming questions

3. AI Agriculture Expert

Can answer

- fertilizer
- crops
- disease
- pests
- irrigation
- farming advice

4. Personalized Recommendations

Based on

- browsing history
- purchases
- wishlist
- season

5. AI Cart Suggestions

Suggest complementary products.

6. Smart Product Comparison

Compare products using AI.

7. AI Review Summarization

Summarize hundreds of reviews.

8. Multilingual Assistant

Bangla ↔ English

9. AI Recipe Generator

Generate recipes from purchased products.

10. Personalized Homepage

Generate dynamic recommendations.

11. Delivery Assistant

Answer delivery/order questions.

12. Price Prediction

If historical price data exists.

==========================
IMPLEMENTATION STRATEGY
==========================

Do NOT generate everything at once.

Implement one module at a time.

Each module must be completely finished before starting the next.

For every module provide

1. Architecture

2. Folder structure

3. Explain why every file exists

4. Generate complete production-ready code

5. Explain how it integrates with existing files

6. Explain how to test it

7. Explain security

8. Explain performance

9. Explain future extensibility

Never skip steps.

==========================
FIRST MODULE
==========================

Start only with the AI Core Infrastructure.

Implement

src/ai/

config.ts

providers/

AIProvider.ts

OpenAIProvider.ts

services/

ai.service.ts

types/

shared types

schemas/

base schemas

prompts/

base prompt builder

parsers/

response parser

tools/

utility helpers

Create

Dependency Injection

Provider Pattern

Configuration Layer

Shared Error Classes

Typed Responses

Zod Validation

OpenAI Client

Streaming Ready

Then create

app/api/ai/test/route.ts

to verify everything works.

Stop after completing Module 1.

Wait for my approval before generating Module 2.
 -->
