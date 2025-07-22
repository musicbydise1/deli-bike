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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## State Management

This project uses **Redux Toolkit Query** for API interactions. The store is initialized in `src/shared/store/store.js` and provided in `src/app/layout.jsx`.

## Project Structure

The frontend now follows the [Feature‑Sliced Design](https://feature-sliced.design/) methodology. Key layers reside in the `src` directory:

- `src/app` – Next.js entry points.
- `src/shared` – reusable components, context, data, store and utilities.
- `src/entities` – domain entities (currently empty).
- `src/features` – feature level modules (currently empty).
- `src/widgets` – page-level widgets (currently empty).

Existing imports continue to resolve through the `@` alias that points to `src/`.

## UI Library

The application now integrates [Mantine](https://mantine.dev/) as the main UI
framework. `MantineProvider` is configured in `src/app/layout.jsx` with Roboto as
the default font family.
