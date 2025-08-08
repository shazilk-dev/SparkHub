export interface GitHubProfile {
  id: string;
  login: string;
  bio?: string;
  email?: string;
  name?: string;
  avatar_url?: string;
}

export interface ExtendedSession {
  id?: string;
}
