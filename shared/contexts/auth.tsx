import { createContext, use, type PropsWithChildren } from "react";

export type AuthContextType = {
  signIn: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
});

// Use this hook to access the user info.
export function useAuth() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useAuth must be wrapped in a <AuthProvider />");
  }

  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
  return (
    <AuthContext.Provider
      value={{
        signIn: () => {},
        signOut: () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
