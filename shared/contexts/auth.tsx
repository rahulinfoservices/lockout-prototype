import {
  createUserWithEmailAndPassword,
  getAuth,
} from "@react-native-firebase/auth";
import {
  createContext,
  use,
  useCallback,
  useMemo,
  type PropsWithChildren,
} from "react";

type SignUpData = {
  name: string;
  email: string;
  password: string;
};

export type AuthContextType = {
  signIn: () => void;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  signIn: () => null,
  signUp: () => Promise.resolve(),
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
  const signIn = useCallback(() => null, []);

  const signUp = useCallback(async (data: SignUpData) => {
    const result = await createUserWithEmailAndPassword(
      getAuth(),
      data.email,
      data.password,
    );

    console.log("signOut result:", result);
  }, []);

  const signOut = useCallback(() => null, []);

  const value = useMemo(
    () => ({
      signIn,
      signOut,
      signUp,
    }),
    [],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
