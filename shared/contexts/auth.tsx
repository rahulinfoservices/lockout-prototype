import {
  createUserWithEmailAndPassword,
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as signUserOut,
} from "@react-native-firebase/auth";
import {
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "@react-native-firebase/firestore";
import {
  createContext,
  type PropsWithChildren,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { CenterLoader } from "../components/core/loaders/center-loader";

export type SignUpData = {
  name: string;
  email: string;
  password: string;
};

export type SignInData = Omit<SignUpData, "name">;

export type User = FirebaseAuthTypes.User | null;

export type AuthContextType = {
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => void;
  user: User;
};

const AuthContext = createContext<AuthContextType>({
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => null,
  user: null,
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
  const [authenticating, setAuthenticating] = useState(true);
  const [user, setUser] = useState<User>(null);

  const signIn = useCallback(async (data: SignInData) => {
    await signInWithEmailAndPassword(getAuth(), data.email, data.password);
  }, []);

  const signUp = useCallback(async (data: SignUpData) => {
    const userCredentials = await createUserWithEmailAndPassword(
      getAuth(),
      data.email,
      data.password,
    );

    const { uid } = userCredentials.user;

    const db = getFirestore();

    await setDoc(doc(collection(doc(db, "users"), uid)), {
      name: data.name,
      email: data.email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }, []);

  const signOut = useCallback(() => {
    signUserOut(getAuth());
  }, []);

  const handleAuthStateChanged = useCallback((user: User) => {
    setUser(user);
    setAuthenticating(false);
  }, []);

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [handleAuthStateChanged]);

  const value = useMemo(
    () => ({
      signIn,
      signOut,
      signUp,
      user,
    }),
    [signIn, signOut, signUp, user],
  );

  if (authenticating) {
    return <CenterLoader />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
