import { ChangeEvent, KeyboardEvent } from "react";

export interface TagListProps {
    list: TagProps[];
    id: string;
}
export interface FormulaStore {
    removeFromTagList: (id: string) => void;
    addTag: (tag: TagProps) => void;
    removeTag: (id: string) => void;
    addToTagList: () => void;
    tagList: TagListProps[];
    tags: TagProps[];
}

export interface TagProps {
    category: string;
    inputs?: string;
    value: number;
    name: string;
    id: string;
}

export interface PageViewProps {
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    handleRemoveTagList: (tagListId: TagListProps["id"]) => void;
    handleTagSelect: (tag: TagProps) => void;
    handleAddToTagList: () => void;
    searchResults: TagProps[];
    tagList: TagListProps[];
    operands: string[];
    searchTerm: string;
    isLoading: boolean;
    tags: TagProps[];
}