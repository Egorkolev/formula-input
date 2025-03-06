"use client";

import React, { ChangeEvent, KeyboardEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formulaSearchQuery } from "@/requests/formulaEndpoint";
import { useFormulaStore } from "@/store/useFormulaStore";
import { v4 as uuidv4 } from "uuid";
import { TagProps } from "@/types";
import PageView from "./page.view";
import { debounce } from "lodash";

const operands = ['+', '-', '*', '/', '%', '(', ')', '^'];

export default function Home() {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const {tags, tagList, addTag, addToTagList, removeTag, removeFromTagList} = useFormulaStore();
  const queryClient = useQueryClient();

  const debouncedSetSearchTerm = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearchTerm(value);
      }, 500),
    []
  );

  useEffect(() => {
    debouncedSetSearchTerm(searchTerm);

    return () => {
      debouncedSetSearchTerm.cancel();
    }
  }, [searchTerm, debouncedSetSearchTerm])

  const { 
    data: searchResults = [],
    isLoading,
  } = useQuery({
    queryKey: ['formulaSearch', debouncedSearchTerm],
    queryFn: async () => {
      if (!debouncedSearchTerm) return [];
      const response = await formulaSearchQuery(debouncedSearchTerm);
      const data = await response;
      queryClient.setQueryData(['formulaSearch', debouncedSearchTerm], data)
      return data;
    },
    enabled: !!debouncedSearchTerm,
  });

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if(operands.includes(value)) {
      addTag({
        name: value, 
        category: "",
        value: 0,
        id: uuidv4(),
      });
      return
    };
    setSearchTerm(value);
  }, [addTag]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !searchTerm.length && tags.length) {
      const lastTag = tags[tags.length - 1];
      removeTag(lastTag.id);
    }
  }, [removeTag, tags, searchTerm.length]);

  const handleRemoveTagList = useCallback((tagListId: string) => {
      removeFromTagList(tagListId);
  }, [removeFromTagList]);

  const handleAddToTagList = useCallback(() => {
    addToTagList()
  }, [addToTagList]);

  const handleTagSelect = useCallback((tag: TagProps) => {
    
    addTag(tag);
    setSearchTerm('');
  }, [addTag]);

  return (
    <PageView
      {
        ...{
          handleRemoveTagList,
          handleAddToTagList,
          handleInputChange,
          handleTagSelect,
          handleKeyDown,
          searchResults,
          searchTerm,
          isLoading,
          operands,
          tagList,
          tags,
        }
      }
    />
  );
}
