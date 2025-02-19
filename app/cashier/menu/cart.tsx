"use client";

import { useState, useEffect } from "react";
import { storeCookie, getCookie } from "@/lib/client-cookie";
import { IMenu, ICart } from "@/app/types";

export const QuantityCounter = ({ menu }: { menu: IMenu }) => {
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    // Ambil quantity dari cookie jika ada
    const savedCart = getCookie("cart");
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      const item = cartData.find((item: ICart) => item.menuName === menu.name);
      if (item) setQuantity(item.quantity);
    }
  }, [menu.name]);

  const modifyCart = (newQuantity: number) => {
    if (newQuantity < 0) return; // Cegah quantity negatif

    setQuantity(newQuantity);

    let cart: ICart[] = [];
    const savedCart = getCookie("cart");
    if (savedCart) cart = JSON.parse(savedCart);

    const itemIndex = cart.findIndex((item) => item.menuName === menu.name);
    if (itemIndex !== -1) {
      if (newQuantity === 0) {
        cart.splice(itemIndex, 1); // Hapus item jika quantity = 0
      } else {
        cart[itemIndex].quantity = newQuantity;
      }
    } else {
      cart.push({
        menuName: menu.name,
        price: menu.price,
        quantity: newQuantity,
      });
    }

    storeCookie("cart", JSON.stringify(cart));
    
    // Dispatch event agar komponen Cart tahu ada perubahan
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="flex items-center">
      <button
        onClick={() => modifyCart(quantity - 1)}
        className="bg-red-500 px-2 py-1 rounded-md shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="5"
          stroke="currentColor"
          className="size-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
      </button>
      <small className="font-bold text-xl px-5">{quantity}</small>
      <button
        onClick={() => modifyCart(quantity + 1)}
        className="bg-blue-500 px-2 py-1 rounded-md shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  );
};

export const Cart = () => {
  const [cart, setCart] = useState<ICart[]>([]);

  const fetchCart = () => {
    const savedCart = getCookie("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  useEffect(() => {
    fetchCart(); // Ambil data pertama kali

    const handleCartUpdate = () => {
      fetchCart();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2 className="font-bold text-2xl mb-2">Cart</h2>
      {cart.length > 0 ? (
        <ul className="max-h-full space-y-2">
          {cart.map((item, index) => (
            <li key={index} className=" border p-2 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{item.menuName}</span>
                <span>
                  {item.quantity} x Rp. {item.price}
                </span>
              </div>
            </li>
          ))}
          <li className="font-bold text-lg mt-2">Total: Rp. {totalPrice}</li>
        </ul>
      ) : (
        <p>Cart is empty</p>
      )}
    </div>
  );
};
