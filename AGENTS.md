# Gouripur-Junction - A railway junction train info web app

> Do not read the `.env` file. All environment variables are exported from `lib/env.ts`. Always import from there, never from `process.env` directly.

## Project Overview

This is a "railway junction train schedule,info web app". It follows industry-standard conventions for project structure, naming, and code style.

This is a fullstack Next.js application that provides the user interface where user can browse different pages and found trains schedules, info and a public feed where only admin can post directly and public can post but that needs admin approval.

## Tech Stack

- **Framework:** React-19 and Next.js 16 (App Router)
- **Runtime:** Node.js with TypeScript
- **Styling:** TailwindCSS & ShadCN
- **Animation:** Framer motion aka motion
- **Global State Management:** Zustand
- **HTTP Client:** Fetch API
- **Package Manager:** Bun (only)
- **Authentication:** admin credentials stored in `.env` file and check user input credentails on admin page against stored credentials. If credentials are valid, JWT is generated and stored access-token and refresh-token in cookies as httpOnly. USE 'jose' to verify jwt token from middleware (aka proxy.ts)

> generate JWT (access token, short-lived, e.g. 15min)
> generate JWT (refresh token, long-lived, e.g. 7days)
> perform refresh token from the middleware when accessToken missing or expired.

## Core Features

- user found schedule page (home page)
- train info
- post feed
- admin login

> -----> and these 4 page link contains the bottom tabbar

- on schedule page a search bar at top to search train with: code, name, route

- admin login via: username and password against stored default pass in .env file

## Folder Structure

> **Note:** read the folder tree for all present folders & files, only when you need to know what files present inside a specific folder.

## Rules

- Utilize react-19's new features when appropriate
- Don't use memo, useMemo, useCallback, forwardRef, etc
- Follow Next.js App Router conventions
- Implement proper error handling and loading states
- Use React Server Components where possible
- Handle authentication state consistently across the app
- Keep components small and focused
- Use proper SEO practices
- When need a pkg -> first check if it's already in `package.json` and if not, install it via `bun add` but ask permission before installing any pkg
- Use react19 & nextjs best practices. e.g: `custom hooks`, `api helper` etc.
- Im a perfectionist, but now trying to become minimalist and keep things simple and want to kill perfectionism and ship faster. So, don't make me confuse when answering questions.
- Do not over-engineer stuffs, keep it simple always by focusing only what matters most, and implement stufss in easy way when possible instead of over-engineering.
- Separate pkg import and custom file import by leaving a blank line between them
- When do linting/type check than only check on the changed files
- Do not write console.log() instead use custom logger that available at `src/lib/logger.ts`(if not create file)
- When to many code in a file write good `comment` for readability; especially for the large jsx code
- Don't use em-dash when you generate text instead use plain hyphen `(-)`

## Good to know

- Admin pages can be client-side rendered
- Prioritize modular architecture
- Make web search when you need additional info

---

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

Also refer to: [Nextjs 16 Pattern](.agents/skills/ui-design/references/nextjs-16-pattern.md)

<!-- END:nextjs-agent-rules -->

## Environment Variables

```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
```
