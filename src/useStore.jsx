import { create } from 'zustand';
import { defineAbilitiesFor } from './ability';

export const useStore = create((set) => ({
    libraryBooks: [],
    findBooks: [],
    searchBook: '',
    user: JSON.parse(localStorage.getItem('user')) || null,
    ability: defineAbilitiesFor(JSON.parse(localStorage.getItem('user'))),
    setLibraryBooks: (books) => set({libraryBooks: books}),
    setFindBooks: (books) => set({findBooks: books}),
    setSearchBook: (book) => set({searchBook: book}),
    setUser: (userData) => set((state) => ({
        user: userData,
        ability: defineAbilitiesFor(userData),
    })),
}));