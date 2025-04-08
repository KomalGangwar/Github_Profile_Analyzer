export interface Repository {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    language: string | null;
    fork: boolean;
  }
  
  export interface CommitData {
    date: string;
    count: number;
  }
  
  export interface UserData {
    name: string | null;
    login: string;
    avatar_url: string;
    bio: string | null;
    public_repos: number;
    followers: number;
    following: number;
  }