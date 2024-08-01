import * as React from "react";
import { AuthContext } from "./authContext";

export const CardContext = React.createContext(null);

const CardProvider = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  const [cards, setCards] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [error, setError] = React.useState("");

  const getAllCards = async (category = '', minPrice = '', maxPrice = '') => {
    try {
     if(!user) return;
      let url = "http://localhost:4000/api/items";
      
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);

      if (params.toString()) url += `?${params.toString()}`;
      
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        setError(data.message);
        return;
      }

      setCards(data.products);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const searchCardsByName = async (name) => {
    if(!user) return;
    try {
      const res = await fetch(`http://localhost:4000/api/items/search?name=${name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        setError(data.message);
        return;
      }

      setCards(data.products);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const addToCart = async (id) => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:4000/api/cart/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        setError(data.message);
        return false;
      }
      return true;

    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const getMyCartProducts = async () => {
    if (!user) return;
    try {
      const res = await fetch("http://localhost:4000/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        setError(data.message);
        return false;
      }
      
      setCartItems(data.products);
      return true;
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const removeFromCart = async (id) => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:4000/api/cart/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        setError(data.message);
        return false;
      }
      
      // Refresh cart items after removal
      getMyCartProducts();
      return true;
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const updateCartQuantity = async (id, quantity) => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:4000/api/cart/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify({ quantity }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        setError(data.message);
        return false;
      }
      
      getMyCartProducts();
      return true;
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };


   // Add Product
   const addProduct = async (product) => {
    if (!user) return;
    try {
      const res = await fetch("http://localhost:4000/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify(product),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        setError(data.message);
        return false;
      }
      return true;

    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const deleteProduct = async (productId) => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:4000/api/items/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        setError(data.message);
        return false;
      }
      return true;

    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const editProduct = async (id, updates) => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:4000/api/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify(updates),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        setError(data.message);
        return false;
      }
      return true;

    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };



  return (
    <CardContext.Provider value={{ error, cards, getAllCards, searchCardsByName, addToCart, getMyCartProducts, cartItems, removeFromCart, updateCartQuantity,addProduct,deleteProduct,editProduct}}>
      {children}
    </CardContext.Provider>
  );
};

export default CardProvider;