"use client"

import { useSearchRequests } from "@/app/context/SearchRequestsContext";
import { SearchIcon, XIcon } from "lucide-react";
import { Button } from "../common/Button";
export default function SearchInput() {

  const { searchValue, clearInput, onSearchChange, handleKeyDown } = useSearchRequests()


  return (
    <div className='bg-secondary p-2 rounded-full h-full flex-center w-full'>
      <input
        value={searchValue}
        onChange={onSearchChange}
        onKeyDown={handleKeyDown} type="text" className="w-full text-sm focus:outline-0 focus:ring-0 px-4 rounded-full h-full"
        placeholder='جستجو میان درخواستی ها'
      />
      <div className='flex-row-center gap-x-1 h-full flex-center text-sm font-semibold text-foreground rounded-full'>
        {searchValue.trim().length > 0 && (
          <Button size="icon-sm" variant="ghost-destructive" onClick={clearInput}>
            <XIcon className="size-5" />
          </Button>
        )}


        <SearchIcon className='size-5 min-w-5 min-h-5 h-full ml-2' />

      </div>
    </div>
  )
}
