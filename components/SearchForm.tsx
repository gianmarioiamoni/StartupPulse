import Form from "next/form";
import { Search } from "lucide-react";

import SearchFormReset from "./SearchFormReset";

const SearchForm = ({query}: {query?: string}) => {

    
  return (
      <Form action="./" scroll={false} className="search-form">
        <input
            name="query"
            defaultValue={query}
            className="search-input text-black bg-white"
            placeholder="Search Startups"
        />

            <div className="flex gap-2">
                {query && <SearchFormReset />}
              
                <button type="submit" className="search-btn text-white">
                    <Search className="size-5"/> 
                </button>
            </div>
      </Form>
  )
}

export default SearchForm;