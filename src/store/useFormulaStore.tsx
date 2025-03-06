import { FormulaStore, TagProps } from '@/types'
import { create } from 'zustand'

export const useFormulaStore = create<FormulaStore>((set) => ({
    tags: [] as TagProps[],
    addTag: (tag: TagProps) => set((state) => ({
        tags: state.tags.some((currentTag) => currentTag.id === tag.id) ? [...state.tags] : [...state.tags, tag]
    })),
    removeTag: (tagId: string) => set((state) => ({
        tags: state.tags.filter((currentTag: TagProps) => currentTag.id !== tagId)
    })),
}))