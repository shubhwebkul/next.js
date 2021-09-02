## Features
1. [Login]
2. [Add new note]
3. [List of all previous notes added by user]
3. [Delete an existing note]

**Test Credentials**:
email:- admin@example.com
password:- admin123

### Introduction

This is a test repository which is a SPA built using Next.js CLI. It uses bootstrap to make this repository much powerful.

**For Developers**:
This repository uses local-storage to store current user token

## Project setup
### Step 1. Get the connection string of your MongoDB server

In the case of MongoDB Atlas, it should be a string like this:

```
mongodb+srv://<username>:<password>@my-project-abc123.mongodb.net/test?retryWrites=true&w=majority
```

For more details, follow this [MongoDB Guide](https://docs.mongodb.com/guides/server/drivers/) on how to connect to MongoDB.

### Step 2. Set up environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then set each variable on `.env.local`:

- `MONGODB_URI` should be the MongoDB connection string you got from step 1.

### Step 3. Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev

### Compiles and minifies for production
```
npm run build
```

