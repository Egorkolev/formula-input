import { FormulaStore, TagListProps, TagProps } from '@/types'
import { v4 as uuidv4 } from "uuid"
import { create } from 'zustand'

export const useFormulaStore = create<FormulaStore>((set) => ({
    tags: [] as TagProps[],
    tagList: [] as TagListProps[],

    addTag: (tag: TagProps) => set((state) => ({
        tags: state.tags.some((currentTag) => currentTag.id === tag.id) ? [...state.tags] : [...state.tags, tag]
    })),

    addToTagList: () => set((state) => ({
        ...state,
        tagList: [...state.tagList, {
            id: uuidv4(),
            list: [...state.tags]
        }],
        tags: []
    })),

    removeTag: (tagId: string) => set((state) => ({
        tags: state.tags.filter((currentTag: TagProps) => currentTag.id !== tagId)
    })),

    removeFromTagList: (tagListId: string) => set((state) => ({
        tagList: state.tagList.filter((currentTag: TagListProps) => currentTag.id !== tagListId)
    })),
}))