import React from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";

type MainNavProps = {
  isadmin: boolean; // Correctly typing the isadmin prop
};

const MainNav = ({ isadmin }: MainNavProps) => {
  // Destructure props correctly
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    navigate("/"); // Navigate to the homepage
  };

  return (
    <div className="flex gap-4">
      {isadmin ? (
        <Link to="/managebook">
          <Button
            className="font-bold hover:text-white hover:bg-primary"
            variant="ghost"
          >
            Add Book
          </Button>
        </Link>
      ) : (
        <></>
      )}

      <Button
        className="font-bold hover:text-white hover:bg-primary"
        variant="ghost"
        onClick={handleLogout}
      >
        Log-Out
      </Button>
    </div>
  );
};

export default MainNav;
