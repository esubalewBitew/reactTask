import create from 'zustand';

const useStore = create((set) => ({
    tags: [],
    addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
    editTag: (tagId, newName) => set((state) => ({ tags: state.tags.map((tag) => (tag.id === tagId ? { ...tag, name: newName } : tag)) })),
    removeTag: (tagId) => set((state) => ({ tags: state.tags.filter((tag) => tag.id !== tagId) })),
    calculate: () => {
        // Implement calculate logic using tags
        // Return the calculated result
    },
}));
export default useStore;