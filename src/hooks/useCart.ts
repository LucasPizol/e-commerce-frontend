import { IProductModel } from "@/interface/Product";
import { addProductToCart } from "@/request/cart/add-product-to-cart";
import { deleteCartProduct } from "@/request/cart/delete-product";
import { updateProductQuantityCart } from "@/request/cart/update-product-cart";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/auth-context";

export const useCart = () => {
  const { user, cart, setCart } = useAuthContext();

  const addProduct = async (product: IProductModel, quantity: number) => {
    if (!user || !cart) return;

    const copyCart = [...cart];

    const findItemInCart = copyCart.find(
      (item) => item.stripe_product_id === product.id
    );

    if (!!findItemInCart) {
      findItemInCart.quantity += quantity;
      await updateProductQuantityCart(
        findItemInCart.id,
        findItemInCart.quantity
      );

      setCart([...copyCart]);

      toast.success(`${product.name} adicionado ao carrinho`, {
        autoClose: 2000,
      });

      return;
    }

    const cartProduct = await addProductToCart({
      quantity: quantity,
      stripe_product_id: product.id,
    });

    toast.success(`${product.name} adicionado ao carrinho`, {
      autoClose: 2000,
    });

    copyCart.push({ ...cartProduct, quantity: quantity });

    setCart([...copyCart]);
  };

  const incrementProduct = async (id: number) => {
    if (!user || !cart) return;

    const copyCart = [...cart];
    const findItemInCart = copyCart?.find((item) => item.id === id);

    if (!findItemInCart) return;

    findItemInCart.quantity += 1;
    await updateProductQuantityCart(id, findItemInCart.quantity);

    setCart([...copyCart]);
  };

  const deleteProduct = async (id: number) => {
    if (!user || !cart) return;

    const copyCart = cart.filter((item) => item.id !== id);
    await deleteCartProduct(id);

    setCart([...copyCart]);
  };

  const decrementProduct = async (id: number) => {
    if (!user || !cart) return;

    const copyCart = [...cart];
    const findItemInCart = copyCart?.find((item) => item.id === id);

    if (!findItemInCart) return;

    findItemInCart.quantity -= 1;
    await updateProductQuantityCart(id, findItemInCart.quantity);

    setCart([...copyCart]);
  };

  return {
    addProduct,
    deleteProduct,
    decrementProduct,
    incrementProduct,
  };
};
