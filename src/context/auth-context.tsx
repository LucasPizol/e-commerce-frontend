import { ICartModelWithAggregation } from "@/interface/Cart";
import {
  IAddUserModel,
  IAuthenticateUserModel,
  IUserModel,
} from "@/interface/User";
import { authUser } from "@/request/auth/auth-user";
import { registerUser } from "@/request/auth/register-user";
import { verifyAuth } from "@/request/auth/verify-auth";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: IUserModel | null;
  loading: boolean;
  loadingPage: boolean;
  register: (user: IAddUserModel) => Promise<void>;
  login: (user: IAuthenticateUserModel) => Promise<void>;
  setCart: React.Dispatch<
    React.SetStateAction<ICartModelWithAggregation[] | undefined>
  >;
  cart: ICartModelWithAggregation[] | undefined;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IUserModel | null>(null);
  const [cart, setCart] = useState<ICartModelWithAggregation[] | undefined>();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);

  useEffect(() => {
    verifyAuth()
      .then((data) => {
        setUser(data.user);
        setCart(data.cart);
        setLoadingPage(false);
      })
      .catch(() => {
        logout();
        setLoadingPage(false);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const login = async (user: IAuthenticateUserModel) => {
    setLoading(true);

    try {
      const data = await authUser(user);
      setUser(data.user);
      setCart(data.cart);
      localStorage.setItem("token", data.user.token);
    } catch (error) {
      setLoading(false);
      throw error;
    }

    setLoading(false);
  };

  const register = async (user: IAddUserModel) => {
    setLoading(true);

    try {
      const data = await registerUser(user);
      setUser(data);
      localStorage.setItem("token", data.token);
    } catch (error) {
      setLoading(false);
      throw error;
    }

    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loadingPage,
        register,
        login,
        cart,
        setCart,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
