# EcoGreen Tree Service LLC website

Next.js App Router, TypeScript, Tailwind CSS and MongoDB/Mongoose.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in the values.
3. Create the admin password hash: `npm run admin:hash -- "your-password"`
4. `npm run dev`, then open http://localhost:3000 and http://localhost:3000/admin

The first connection to an empty database adds the starter services, team, reviews and FAQs.
Without `MONGODB_URI` the public site still renders from those defaults, but forms and admin need the database.

## Deploying to Vercel

Add every variable from `.env.example` in the project settings. Paste `ADMIN_PASSWORD_HASH` unescaped there;
only a local `.env` needs `\$`. In MongoDB Atlas, allow access from Vercel under Network Access.

## How it fits together

- Editable page text lives in `lib/content-schema.ts`, which defines both the defaults and the admin form.
- Collection forms and their server validation come from `lib/resources.ts`.
- Images are stored in the `StoredUpload` collection and served from `/api/uploads/...`. Other documents store only the URL.
- Vercel limits request bodies to about 4.5MB, so the admin uploader resizes larger photos in the browser. The server limit stays at 8MB.
- Customer booking photos use a private `bookings` folder that only a logged-in admin can view.
