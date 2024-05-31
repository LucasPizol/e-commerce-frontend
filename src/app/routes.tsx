import { Header } from "@/components/Header";
import { LoadingPage } from "@/components/LoadingPage";
import { useAuthContext } from "@/context/auth-context";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminScreen } from "./pages/admin";
import { CartScreen } from "./pages/cart";
import { CheckoutFeedback } from "./pages/checkout_feedback";
import { HomeScreen } from "./pages/home";
import { LoginScreen } from "./pages/login";
import { ProfileScreen } from "./pages/profile";
import { RegisterScreen } from "./pages/register";

export const Router = () => {
  const { user, loadingPage } = useAuthContext();

  if (loadingPage) return <LoadingPage />;

  const conditionalRoutes = useMemo(() => {
    if (!user) {
      return (
        <>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </>
      );
    }

    return (
      <>
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/checkout" element={<CheckoutFeedback />} />
        <Route path="/profile" element={<ProfileScreen />} />
        {user.role === "admin" && (
          <Route path="/admin" element={<AdminScreen />} />
        )}
      </>
    );
  }, [user]);

  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/home" element={<HomeScreen />} />
          {conditionalRoutes}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
};
