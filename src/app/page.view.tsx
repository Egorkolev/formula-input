import React, { ChangeEvent, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { TagProps } from "@/types";

interface PageViewProps {
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void,
    handleTagSelect: (tag: TagProps) => void,
    searchResults: TagProps[],
    operands: string[],
    searchTerm: string,
    isLoading: boolean,
    tags: TagProps[],
}

export default function PageView(props: PageViewProps) {
    const {handleInputChange, handleTagSelect, handleKeyDown, searchResults, searchTerm, isLoading, operands, tags} = props;
    
  return (
    <div className="max-w-7xl m-auto py-10 flex flex-col gap-2 px-10">
        <div className="relative h-fit">
            <div className="flex flex-wrap gap-2 border rounded-md py-1 px-3 items-center">
            {tags?.map((tag: TagProps) => (
                <div
                className={`${
                    operands.includes(tag.name)
                    ? ""
                    : "text-black text-lg border whitespace-nowrap rounded-sm px-2"
                }`}
                key={tag.id}
                >
                {tag.name}
                </div>
            ))}
            <Input
                className="border-none flex-1 focus:ring-0 focus:border-none focus:shadow-none focus:outline-none min-w-42 shadow-none"
                name="formula"
                type="text"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={searchTerm}
                placeholder="Search formulas..."
            />
            </div>

            {isLoading && <div>Loading...</div>}
            {searchTerm.length > 0 && (
            <div className="absolute z-10 w-full mt-1 max-h-[80vh] overflow-auto bg-white border rounded-sm shadow-lg">
                {searchResults.map((tag: TagProps, index: number) => (
                <div
                    key={`${tag.id}-${index}`}
                    onClick={() => handleTagSelect(tag)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                    {tag.name} (Category: {tag.category})
                </div>
                ))}
            </div>
            )}
        </div>
    </div>
  );
}
