import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type WithAuthProps = {};

const withAuth = <P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAuth: React.FC<P> = (props) => {
    const navigate = useNavigate();
    const admin = localStorage.getItem("isadmin") === "true";

    useEffect(() => {
      if (!admin) {
        navigate("/login"); // Redirect to login if not authenticated
      }
    }, [admin, navigate]);

    if (!admin) {
      return null; // Optionally return a loading spinner or placeholder
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
