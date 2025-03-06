import { PageViewProps, TagListProps, TagProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function PageView(props: PageViewProps) {
  const { searchResults, searchTerm, isLoading, operands, tagList, tags } =
    props;
  const {
    handleRemoveTagList,
    handleAddToTagList,
    handleInputChange,
    handleTagSelect,
    handleKeyDown,
  } = props;

  return (
    <div className="max-w-7xl m-auto py-10 flex flex-col gap-2 px-10">
        <h1 className="text-2xl font-bold">Formula Input: Tags</h1>
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
                <Button onClick={handleAddToTagList}>Add Tags</Button>
            </div>

            {isLoading && <div>Loading...</div>}
            <div className={`flex gap-2 ${!tagList.length ? 'justify-start' : 'justify-end'}`}>
                {searchTerm.length > 0 && (
                    <div className="w-[50%] mt-1 max-h-[80vh] overflow-auto bg-white border rounded-sm shadow-lg">
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
                {tagList.length > 0 && (
                    <div className="w-[50%] mt-1 flex flex-col gap-1 max-h-[80vh] overflow-auto bg-white border rounded-sm shadow-lg p-2">
                        {tagList?.map((tag: TagListProps) => (
                            <div key={tag.id} className="flex gap-1 items-center">
                                <div className="flex gap-1 p-1 bg-black rounded-md w-full">
                                    {tag.list.map((tagName) => (
                                        <div
                                            className={`${
                                            operands.includes(tagName.name)
                                                ? "text-white"
                                                : "text-black bg-white text-lg border whitespace-nowrap rounded-sm px-2"
                                            }`}
                                            key={tagName.id}
                                        >
                                            {tagName.name}
                                        </div>
                                    ))}
                                </div>
                                <Button onClick={() => handleRemoveTagList(tag.id)} className="bg-red-500">Delete</Button>
                            </div>
            
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}
