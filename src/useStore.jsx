import { create } from 'zustand';

export const useStore = create((set) => ({
    libraryBooks: [],
    findBooks: [],
    searchBook: '',
    setLibraryBooks: (books) => set({libraryBooks: books}),
    setFindBooks: (books) => set({findBooks: books}),
    setSearchBook: (book) => set({searchBook: book}),
}));