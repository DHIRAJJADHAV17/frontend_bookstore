import { useAdminSearchBook, useSearchBooks } from "@/api/MyBookApi";
import CardItems from "@/components/CardItems";
import PaginationSelector from "@/components/PaginationSelector";
import PriceRangeFilter from "@/components/PriceRangeFilter";
import RatingFilter from "@/components/RatingFilter";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  minPrice: number;
  maxPrice: number;
  rating: number | null;
  sortOption: string;
};

const SearchPage = () => {
  const { title } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    minPrice: 0,
    maxPrice: 100, // Default range for price
    rating: null, // Default to no rating selected
    sortOption: "price_desc",
  });

  const [results, setResults] = useState<any>(null); // Manage results
  const [isLoading, setIsLoading] = useState<boolean>(false); // Manage loading state
  const [error, setError] = useState<string | null>(null); // Manage errors

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const admin = localStorage.getItem("isadmin");
        let response;
        if (admin === "true") {
          response = await useAdminSearchBook(searchState, title);
        } else {
          response = await useSearchBooks(searchState, title);
        }

        setResults(response);
      } catch (err) {
        setError("Failed to fetch books");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [searchState, title]); // Re-fetch when searchState or title changes

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setPriceRange = (minPrice: number, maxPrice: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      minPrice,
      maxPrice,
      page: 1,
    }));
  };

  const setRating = (rating: number | null) => {
    setSearchState((prevState) => ({
      ...prevState,
      rating,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState({
      searchQuery: "",
      page: 1,
      minPrice: 0,
      maxPrice: 100,
      rating: null,
      sortOption: "price_desc",
    });
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>{error}</span>;
  }

  if (!results?.data || !title) {
    return <span>No results found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="filters">
        <PriceRangeFilter
          minPrice={searchState.minPrice}
          maxPrice={searchState.maxPrice}
          onPriceChange={setPriceRange}
        />
        <RatingFilter rating={searchState.rating} onRatingChange={setRating} />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by Book Title"
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} title={title} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.data.map((data: any) => (
            <CardItems detail={data} key={data.id} />
          ))}
        </div>

        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
