import { getBookById } from "@/api/MyBookApi";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewBook = () => {
  const { bookId } = useParams<{ bookId?: string }>();
  const [book, setBook] = useState<any>(null); // Initialize with `null`
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Corrected from `router` to `navigate`

  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (bookId) {
          const fetchedBook = await getBookById(bookId);
          if (fetchedBook) {
            setBook(fetchedBook);
          }
        }
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setIsLoading(false); // Move this inside the async function
      }
    };

    fetchBook();
  }, [bookId]); // Added dependency array

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>No book found</div>; // Handle case where no book is found
  }

  return (
    <div>
      <Button
        className="font-bold hover:text-white hover:bg-primary"
        variant="ghost"
        onClick={() => navigate("/")} // Corrected from `router` to `navigate`
      >
        Back
      </Button>
      <div className="flex flex-col px-20 py-8">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="relative flex flex-col gap-4">
            <AspectRatio ratio={16 / 18}>
              {book.imageUrl && (
                <img
                  className="w-full h-full object-fit"
                  src={book.imageUrl}
                  alt="Book Image"
                />
              )}
            </AspectRatio>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold  ">{book?.title}</h1>
            <h1 className="font-light ">Genre: {book?.genre}</h1>
            <span className="font-bold">Description</span>
            <p className="text-justify pr-16">{book.description}</p>
            <ul className="flex space-x-2">
              <span className="font-bold">Tags</span>
              {book.tag.map((_: any, index: number) => (
                <li key={index}>#{book.tag[index].name}</li>
              ))}
            </ul>
            <p className="font-bold">Rating: </p>{" "}
            <span className="font-bold">Reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
