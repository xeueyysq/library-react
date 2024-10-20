import create from 'zustand';

const useStore = create((set) => ({
    books: [],
    setBooks: (books) => set({books: books}),
}));

export default useStore;