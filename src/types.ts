export interface FormulaStore {
    tags: TagProps[];
    addTag: (tag: TagProps) => void;
    removeTag: (id: string) => void;
  }

export interface TagProps {
    name: string;
    category: string;
    value: number;
    id: string;
    inputs?: string;
 }