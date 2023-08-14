export interface AuthStore {
  isLoggedIn: boolean;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}
