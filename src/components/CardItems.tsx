import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./ui/card";

type Props = {
  detail: any;
};

const CardItems = ({ detail }: Props) => {
  const isAdmin = localStorage.getItem("isadmin") === "true";

  return (
    <Link to={isAdmin ? `/editbook/${detail._id}` : `/viewbook/${detail._id}`}>
      <Card className="shadow-lg transform transition-transform duration-300 hover:scale-105 ">
        <CardContent>
          <img
            className="w-full max-h-[150px] object-fit mt-2"
            src={detail.imageUrl}
            alt="Cover Image"
          />
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <CardTitle>Book Name: {detail.title}</CardTitle>
          <CardDescription>Genre: {detail.genre}</CardDescription>
          <CardDescription>Price: {detail.price}</CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CardItems;
