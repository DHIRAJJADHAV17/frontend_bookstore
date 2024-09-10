import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainNav from "./MainNav";
import AuthNav from "./AuthNav";

const Header = () => {
  const [islogin, setIslogin] = useState(false);
  const [isadmin, setIsadmin] = useState(false);
  useEffect(() => {
    const login = localStorage.getItem("accessToken");
    setIslogin(!!login); // Simplified check
    const admin = localStorage.getItem("isadmin") === "true";
    setIsadmin(admin); // Simplified check
  }, []);

  return (
    <div className="border-b-2 border-b-orange-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          className="text-3xl font-bold tracking-tight text-orange-500"
          to={"/"}
        >
          My_BOOk_Store
        </Link>
        <div>{islogin ? <MainNav isadmin={isadmin} /> : <AuthNav />}</div>{" "}
      </div>
    </div>
  );
};

export default Header;
