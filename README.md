
# GitHub Profile Analyzer

A React application that visualizes GitHub user activity including repositories and daily commit patterns.



## Features

-  User profile information display
- Visualization of daily commit activity (simulated data)
- Comprehensive repository listing with:

   - Repository name and description
   - Star count
   - Primary language
   - Fork status


## Getting Started
### Prerequisites
- Node.js (v14.0.0 or higher)
- npm or yarn
- GitHub account (for deployment to Vercel)






### Installation

- Clone the repository:

```bash
git clone https://github.com/yourusername/github-profile-analyzer.git
cd github-profile-analyzer
```
- Install dependencies:
```bash
npm install
# or
yarn install
```

- Create a .env file in the root directory (optional for higher GitHub API rate limits):
```bash
GITHUB_TOKEN=your_github_personal_access_token
```
Note: The application works without a token but will have lower API rate limits.

- Start the development server:
```bash
npm run dev
# or
yarn dev
```

- Open http://localhost:3000 in your browser.
## Project Structure

```bash
github-profile-analyzer/
|── src/
|   |──components/
│   |    ├── ui/
│   |    |  ├── Alert.tsx
│   |    |  ├── Button.tsx
│   |    |  ├── Card.tsx
│   |    |  ├── Input.tsx
│   |    |  └── Skeleton.tsx
│   |    GitHubProfileAnalyzer.tsx
|   |──types/
│        └── github.ts
|── public/ 
│── App.tsx
│── index.tsx
├── vite.config.ts
├── package.json
├── tsconfig.json
└── README.md
```


## How It Works

- Enter a GitHub username in the search box and click "Search"
- The application makes API calls to GitHub to fetch:

   - User profile information
   - Public repositories


- The application displays:

   - User profile details (avatar, name, bio, follower counts)
   - A simulated daily commit chart for the last 30 days
   - A list of repositories with details


## Technologies Used

**React:** UI framework

**Next.js:** React framework for server-side rendering and static site generation

**TypeScript:** For type safety

**Recharts :** For data visualizations




## Deployment to Vercel
**Step 1:**  Prepare Your Repository

Make sure your code is pushed to a GitHub repository.

**Step 2:** Sign Up for Vercel
- Go to Vercel and sign up with your GitHub account
- Click "New Project" button
- Import your GitHub repository

**Step 3:** Configure Project
- Keep the default settings or customize as needed
- Add environment variables if you're using a GitHub token:

  - Name: GITHUB_TOKEN
  - Value: Your GitHub personal access token

**Step 4:** Deploy
- Click "Deploy"
- Wait for the deployment to finish
- Vercel will provide you with a URL to access your application

**Link:** https://github-profile-analyzer-sjwh.vercel.app/  
## Acknowledgements

- GitHub API for providing the data
- Recharts for the visualization components
- Vercel for hosting
