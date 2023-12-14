import { Outlet, Navigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";

const PrivateRoutes = () => {
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const isAuthenticated = Boolean(cookies);
  console.log(cookies);

  return isAuthenticated ? (
    <CookiesProvider>
      <Outlet />
    </CookiesProvider>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
