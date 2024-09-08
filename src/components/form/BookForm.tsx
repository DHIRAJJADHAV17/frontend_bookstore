import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreatebook, getBookById, useUpdatebook } from "@/api/MyBookApi"; // Ensure these imports are correct
import { useEffect, useState } from "react";
import DetailsSection from "../DetailsSection";
import ImageSection from "../ImageSection";
import TagSection from "../TagSection";
import { useNavigate, useParams } from "react-router-dom";

const formSchema = z
  .object({
    title: z.string().min(1, "Book title is required"),
    genre: z.string().min(1, "Genre is required"),
    publish: z.string().min(1, "Published date is required"),
    price: z.coerce.number().min(1, "Price is required"),
    description: z.string().min(1, "Description is required"),
    tag: z.array(
      z.object({
        name: z.string().min(1, "Tag name is required"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image file must be provided",
    path: ["imageFile"],
  });

export type BookFormData = z.infer<typeof formSchema>;

const BookFormk = () => {
  const { bookId } = useParams<{ bookId?: string }>();
  const [isExistingBook, setIsExistingBook] = useState<boolean>(false);
  const form = useForm<BookFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (bookId) {
      const fetchBook = async () => {
        try {
          const book = await getBookById(bookId);
          if (book) {
            form.reset({
              ...book,
              publish: formatDate(book.publish), // Format date for input
            });
            setIsExistingBook(true);
          }
        } catch (error) {
          console.error("Error fetching book:", error);
        }
      };
      fetchBook();
    } else {
      // Reset form for new book
      form.reset({});
      setIsExistingBook(false);
    }
  }, [bookId, form]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Extract date part (yyyy-MM-dd)
  };

  const onSubmit = async (data: BookFormData) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("genre", data.genre);
      formData.append("publish", data.publish); // Ensure data.publish is in yyyy-MM-dd format
      formData.append("price", data.price.toString());
      formData.append("description", data.description);

      data.tag.forEach((tag, index) => {
        formData.append(`tag[${index}][name]`, tag.name);
      });

      if (data.imageFile) {
        formData.append("imageFile", data.imageFile);
      }

      const result = isExistingBook
        ? await useUpdatebook(bookId!, formData)
        : await useCreatebook(formData);

      if (result) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <TagSection />
        <ImageSection />
        <Button className="text-white" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default BookFormk;
