import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout";
import Home from "./Pages/Home/page";
import Cart from "./Pages/Cart/page";
import WishList from "./Pages/WishList/page";
import Products from "./Pages/Products/page";
import Category from "./Pages/Category/page";
import Login from "./Pages/Auth/Login/page";
import Register from "./Pages/Auth/Register/page";
import ForgetPassword from "./Pages/Auth/ForgetPassword/page";
import VerifyCode from "./Pages/Auth/VerifyCode/page";
import ResetPassword from "./Pages/Auth/ResetPassword/page";
import Brand from "./Pages/Brand/page";
import AuthContextProvider from "./Context/AuthContextProvider";
import ProtectedRoute from "./Components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from "./Pages/Products/ProductDetails";
import CartContecxtProvider from "./Context/CartContecxtProvider";
import WishListContextProvider from "./Context/WishListContextProvider";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishList",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          ),
        },
        {
          path: "brand",
          element: (
            <ProtectedRoute>
              <Brand />
            </ProtectedRoute>
          ),
        },
        {
          path: "productDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "verify-code", element: <VerifyCode /> },
        { path: "reset-password", element: <ResetPassword /> },
      ],
    },
  ]);
  const client = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={client}>
        <AuthContextProvider>
          <CartContecxtProvider>
            <WishListContextProvider>
              <RouterProvider router={router} />
            </WishListContextProvider>
          </CartContecxtProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
