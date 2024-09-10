import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const AuthNav = () => {
  return (
    <div className="flex gap-4">
      <Link to="/login">
        <Button
          className="font-bold hover:text-white hover:bg-primary"
          variant="ghost"
        >
          login
        </Button>
      </Link>
      <Link to="/signup">
        <Button
          className="font-bold hover:text-white hover:bg-primary"
          variant="ghost"
        >
          Signup
        </Button>
      </Link>
    </div>
  );
};

export default AuthNav;
