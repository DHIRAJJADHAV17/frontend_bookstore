import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BookFormk from "./components/form/BookForm";
import SearchPage from "./pages/SearchPage";
import ViewBook from "./pages/ViewBook";
import withAuth from "./components/hoc/withauth";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/signup"
        element={
          <Layout>
            <Signup />
          </Layout>
        }
      />
      <Route
        path="/viewbook/:bookId"
        element={
          <Layout>
            <ViewBook />
          </Layout>
        }
      />
      <Route
        path="/search/:title"
        element={
          <Layout>
            <SearchPage />
          </Layout>
        }
      />

      <Route
        path="/managebook"
        element={
          <Layout>
            <WithAuthWrapper component={BookFormk} />{" "}
            {/* Use the HOC properly */}
          </Layout>
        }
      />
      <Route
        path="/editbook/:bookId"
        element={
          <Layout>
            <WithAuthWrapper component={BookFormk} />{" "}
            {/* Use the HOC properly */}
          </Layout>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
const WithAuthWrapper = ({
  component: Component,
}: {
  component: React.ComponentType<any>;
}) => {
  const AuthenticatedComponent = withAuth(Component);
  return <AuthenticatedComponent />;
};
export default AppRoutes;
