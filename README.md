# Mealmaster
Food planner for a healthier lifestyle powered by AI

## Tech Stack
- Programming Language: [Typescript](https://www.typescriptlang.org/)
- Framework: [Next JS](https://nextjs.org) + App Router
- Database: Postgres SQL. [Supabase](https://supabase.com/) is recommended
- ORM: [Prisma](https://prisma.io)
- Authentication: [Clerk](https://clerk.com)
- CSS: [Tailwind CSS](https://tailwindcss.com/) & (Daisy UI)[https://daisyui.com]

## Running the project locally

### Step 1 - Clone the project
Clone the project repository to your local machine

### Step 2 - Install all project dependencies
Run the following command to ensure all of the project dependencies are installed
```sh 
npm install 
```

### Step 3 - Prisma init
Run the following command to ensure all of the Prisma is successfully initialised
```sh 
npx prisma generate
```

## For Agile Software Projects Final Project Examiner: To skip step 4 to 7, please follow the steps:
- Create a <code>.env</code> file in the root of the project.
- Copy and paste the <code>.env</code> file code from the report, it is located under the section "System Development", Env file on page 44.

### Step 4 - Open AI API Key
Go to https://platform.openai.com/ and obtain a developer API Key.

### Step 5 - Clerk API Key
Go to https://clerk.com/ and obtain a Clerk Publishable Key and Clerk Secret Key.

### Step 6 - PostgreSQL setup
Go to PostgreSQL database service provider and copy the database connection URL. We recommend
https://neon.tech or https://vercel.com/docs/storage/vercel-postgres. 

### Step 7 - .env setup
Copy the <code>.env.sample</code> and create a <code>.env</code> file in the root of the project.
Paste in the missing values (DATABASE_URL, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY and OPEN_AI_API_KEY)
```
DATABASE_URL=""

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
OPEN_AI_API_KEY=
```

### Step 8 - Preview in browser
Run the following command preview the Next.JS App in a web browser
```sh 
npm run dev
```

## Credits
These project has been design, created and developed by the following developers:
- [@Brandonkjh](https://github.com/Brandonkjh)
- [@kieben](https://github.com/kieben)
- [@kjingtat](https://github.com/kjingtat)
- [@kltr123](https://github.com/kltr123)
- [@kevinh246](https://github.com/kevinh246)