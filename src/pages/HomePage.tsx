import { getAdminBooks, getAllBooks } from "@/api/MyBookApi";
import CardItems from "@/components/CardItems";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [books, setBooks] = useState([]); // Corrected `book` to `books`
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const navigate = useNavigate();

  // Handle Search Submit
  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate(`/search/${searchFormValues.searchQuery}`);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const admin = localStorage.getItem("isadmin");
        let response;
        if (admin === "true") {
          response = await getAdminBooks();
        } else {
          response = await getAllBooks();
        }
        setBooks(response); // Set books in state
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false); // Stop loading once fetching is complete
      }
    };

    fetchBooks();
  }, []);

  // If still loading, display loading message
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If books are fetched and available
  return (
    <div>
      <SearchBar placeHolder="Search by Title" onSubmit={handleSearchSubmit} />
      {books.length > 0 ? (
        <div className="grid md:grid-cols-4 gap-5 mt-5">
          {books.map((book, index) => (
            <CardItems key={index} detail={book} />
          ))}
        </div>
      ) : (
        <div>No books available</div> // If no books are found
      )}
    </div>
  );
};

export default HomePage;
