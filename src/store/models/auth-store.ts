export interface AuthStore {
  isLoggedIn: boolean;
  accessToken: string;
  isRefreshTokenIntervalOn: boolean;
  setAccessToken: (accessToken: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setIsRefreshTokenIntervalOn: (isRefreshTokenIntervalOn: boolean) => void;
}
