import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Skeleton from "./ui/Skeleton";
import { Alert, AlertDescription, AlertTitle } from "./ui/Alert";
import { AlertCircle, Github, Search, BookOpen } from "lucide-react";
import { Repository, CommitData, UserData } from "../types/github";

const GitHubProfileAnalyzer: React.FC = () => {
  const [username, setUsername] = useState("");
  const [searchedUsername, setSearchedUsername] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [commitData, setCommitData] = useState<CommitData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setError("");
      setSearchedUsername(username);
    }
  };

  // Fetch user data and repositories when searchedUsername changes
  useEffect(() => {
    if (!searchedUsername) return;

    const fetchUserData = async () => {
      setLoading(true);
      setError("");
      setUserData(null);
      setRepositories([]);
      setCommitData([]);

      try {
        // Fetch user profile
        const userResponse = await fetch(`https://api.github.com/users/${searchedUsername}`);
        if (!userResponse.ok) {
          throw new Error("User not found. Please check the username and try again.");
        }
        const userData = await userResponse.json();
        setUserData(userData);

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${searchedUsername}/repos?per_page=100`);
        const reposData = await reposResponse.json();
        setRepositories(reposData);

        // Generate mock commit data for demonstration
        generateMockCommitData();
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [searchedUsername]);

  // Generate mock commit data for the chart
  const generateMockCommitData = () => {
    const data: CommitData[] = [];
    const now = new Date();
    
    // Generate data for the last 30 days
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      // Random commit count between 0 and 10
      const count = Math.floor(Math.random() * 11);
      
      data.push({ date: dateString, count });
    }
    
    setCommitData(data);
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-6xl mx-auto">
      <header className="flex items-center mb-6 w-full justify-center">
        <Github className="mr-2" size={32} />
        <h1 className="text-2xl font-bold">GitHub Profile Analyzer</h1>
      </header>

      <form onSubmit={handleSubmit} className="flex w-full max-w-lg mb-8 gap-2">
        <Input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : <><Search className="mr-2" size={16} /> Search</>}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive" className="w-full max-w-3xl mb-6">
          <div className="alert-icon">
            <AlertCircle size={16} />
          </div>
          <div className="alert-content">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </div>
        </Alert>
      )}

      {loading ? (
        <div className="w-full max-w-3xl space-y-6">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      ) : (
        userData && (
          <div className="w-full max-w-3xl space-y-6">
            {/* User Profile Card */}
            <Card>
              <CardHeader className="flex">
                <div className="flex items-center gap-4">
                  <img
                    src={userData.avatar_url}
                    alt={`${userData.login}'s avatar`}
                    style={{ width: '64px', height: '64px', borderRadius: '50%' }}
                  />
                  <div>
                    <CardTitle>{userData.name || userData.login}</CardTitle>
                    <CardDescription>@{userData.login}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {userData.bio && <p className="mb-4">{userData.bio}</p>}
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="font-bold">{userData.public_repos}</span> Repositories
                  </div>
                  <div>
                    <span className="font-bold">{userData.followers}</span> Followers
                  </div>
                  <div>
                    <span className="font-bold">{userData.following}</span> Following
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Commits Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Commits (Last 30 Days)</CardTitle>
                <CardDescription>
                  Note: This is simulated data for demonstration purposes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ height: '16rem' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={commitData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        interval={6}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(label) => new Date(label).toLocaleDateString()}
                        formatter={(value) => [`${value} commits`, "Commits"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#3b82f6"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Repositories List */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <BookOpen className="mr-2" size={20} />
                  <CardTitle>Repositories ({repositories.length})</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {repositories.length === 0 ? (
                    <p className="text-center text-gray-500">No repositories found</p>
                  ) : (
                    repositories.map((repo) => (
                      <Card key={repo.id} className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-blue-600 hover:underline text-lg"
                          <a>
                            {repo.name} {repo.fork && <span className="text-xs text-gray-500">(fork)</span>}
                          </a>
                          <div className="flex items-center">
                            <span className="flex items-center text-sm text-gray-500">
                              ★ {repo.stargazers_count}
                            </span>
                          </div>
                        </div>
                        {repo.description && <p className="text-sm text-gray-700 mb-2">{repo.description}</p>}
                        {repo.language && (
                          <div className="flex items-center mt-2">
                            <div 
                              style={{ 
                                height: '12px', 
                                width: '12px', 
                                borderRadius: '50%', 
                                backgroundColor: '#3b82f6', 
                                marginRight: '8px' 
                              }} 
                            />
                            <span className="text-xs">{repo.language}</span>
                          </div>
                        )}
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )
      )}
    </div>
  );
};

export default GitHubProfileAnalyzer;