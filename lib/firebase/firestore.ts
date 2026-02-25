// Firestore helper functions for CRUD operations
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    setDoc,
    query,
    orderBy,
    Timestamp,
} from 'firebase/firestore';
import { db } from './config';
import { Project, Resume, AppSettings } from '../types';

// ===== PROJECTS CRUD =====

export const getProjects = async (): Promise<Project[]> => {
    try {
        const projectsRef = collection(db, 'projects');
        const q = query(projectsRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
            updatedAt: doc.data().updatedAt?.toDate(),
        })) as Project[];
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

export const createProject = async (
    projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
    try {
        const projectsRef = collection(db, 'projects');
        const docRef = await addDoc(projectsRef, {
            ...projectData,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

export const updateProject = async (
    id: string,
    projectData: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<void> => {
    try {
        const projectRef = doc(db, 'projects', id);
        await updateDoc(projectRef, {
            ...projectData,
            updatedAt: Timestamp.now(),
        });
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
};

export const deleteProject = async (id: string): Promise<void> => {
    try {
        const projectRef = doc(db, 'projects', id);
        await deleteDoc(projectRef);
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
};

// ===== RESUME CRUD =====

// Assuming a single resume document with ID 'default'
const RESUME_DOC_ID = 'default';

export const getResume = async (): Promise<Resume | null> => {
    try {
        const resumeRef = doc(db, 'resume', RESUME_DOC_ID);
        const snapshot = await getDoc(resumeRef);
        if (snapshot.exists()) {
            return {
                id: snapshot.id,
                ...snapshot.data(),
                updatedAt: snapshot.data().updatedAt?.toDate(),
            } as Resume;
        }
        return null;
    } catch (error) {
        console.error('Error fetching resume:', error);
        throw error;
    }
};

export const createResume = async (
    resumeData: Omit<Resume, 'id' | 'updatedAt'>
): Promise<void> => {
    try {
        const resumeRef = doc(db, 'resume', RESUME_DOC_ID);
        await setDoc(resumeRef, {
            ...resumeData,
            updatedAt: Timestamp.now(),
        });
    } catch (error) {
        console.error('Error creating resume:', error);
        throw error;
    }
};

export const updateResume = async (
    resumeData: Omit<Resume, 'id' | 'updatedAt'>
): Promise<void> => {
    try {
        const resumeRef = doc(db, 'resume', RESUME_DOC_ID);
        await updateDoc(resumeRef, {
            ...resumeData,
            updatedAt: Timestamp.now(),
        });
    } catch (error) {
        console.error('Error updating resume:', error);
        throw error;
    }
};
// ===== SETTINGS CRUD =====
const SETTINGS_DOC_ID = 'app_settings';

export const getSettings = async (): Promise<AppSettings> => {
    const defaultSettings: AppSettings = {
        accentColor: '#22d3ee',
        secondaryColor: '#7c3aed',
        siteName: 'AJM Digital Solution',
        updatedAt: new Date(),
    };

    try {
        const settingsRef = doc(db, 'settings', SETTINGS_DOC_ID);
        const snapshot = await getDoc(settingsRef);
        if (snapshot.exists()) {
            return {
                id: snapshot.id,
                ...snapshot.data(),
                updatedAt: snapshot.data().updatedAt?.toDate(),
            } as AppSettings;
        }

        return defaultSettings;
    } catch (error) {
        console.error('Error fetching settings (using defaults):', error);
        return defaultSettings;
    }
};

export const updateSettings = async (
    settingsData: Omit<AppSettings, 'id' | 'updatedAt'>
): Promise<void> => {
    try {
        const settingsRef = doc(db, 'settings', SETTINGS_DOC_ID);
        await setDoc(settingsRef, {
            ...settingsData,
            updatedAt: Timestamp.now(),
        });
    } catch (error) {
        console.error('Error updating settings:', error);
        throw error;
    }
};
