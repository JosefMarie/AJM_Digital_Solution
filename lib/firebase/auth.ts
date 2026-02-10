// Firebase Authentication helper functions
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    UserCredential,
} from 'firebase/auth';
import { auth } from './config';

// Sign up with email and password
export const registerWithEmail = async (
    email: string,
    password: string
): Promise<UserCredential> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

// Sign in with email and password
export const loginWithEmail = async (
    email: string,
    password: string
): Promise<UserCredential> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Sign out
export const logout = async (): Promise<void> => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};

// Listen to auth state changes
export const onAuthChange = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
};

// Get current user
export const getCurrentUser = (): User | null => {
    return auth.currentUser;
};
