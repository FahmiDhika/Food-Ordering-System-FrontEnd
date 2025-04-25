"use client";

import { useState, useEffect } from "react";
import { storeCookie, getCookie } from "@/lib/client-cookie";
import { IMenu, ICart } from "@/app/types";
import { AlertInfo } from "@/components/alert";
import { InputGroupComponent } from "@/components/inputComponent";
import { useRouter } from "next/navigation"; // Tambahkan di bagian atas file
import { ModalAlert } from "@/components/modalAlert";
import { BASE_API_URL } from "@/global";

export const QuantityCounter = ({ menu }: { menu: IMenu }) => {
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    const savedCart = getCookie("cart");
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      const item = cartData.find((item: ICart) => item.idMenu === menu.id);
      if (item) setQuantity(item.quantity);
    }
  }, [menu.id]);

  useEffect(() => {
    const savedCart = getCookie("cart");
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      const item = cartData.find((item: ICart) => item.idMenu === menu.id);
      if (item) setQuantity(item.quantity);
    }

    const handleCartClear = () => {
      setQuantity(0);
    };

    window.addEventListener("cartCleared", handleCartClear);
    return () => {
      window.removeEventListener("cartCleared", handleCartClear);
    };
  }, [menu.id]);

  const modifyCart = (newQuantity: number) => {
    if (newQuantity < 0) return;

    setQuantity(newQuantity);

    let cart: ICart[] = [];
    const savedCart = getCookie("cart");
    if (savedCart) cart = JSON.parse(savedCart);

    const itemIndex = cart.findIndex((item) => item.idMenu === menu.id);
    if (itemIndex !== -1) {
      if (newQuantity === 0) {
        cart.splice(itemIndex, 1);
      } else {
        cart[itemIndex].quantity = newQuantity;
      }
    } else {
      cart.push({
        idMenu: menu.id, // Simpan ID
        price: menu.price,
        quantity: newQuantity,
        note: "",
      });
    }

    storeCookie("cart", JSON.stringify(cart));
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

export const Cart = ({ menus }: { menus: IMenu[] }) => {
  const [cart, setCart] = useState<ICart[]>([]);
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const router = useRouter(); // digunakan jika ingin redirect
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "QRIS">("CASH");
  const [status, setStatus] = useState<"NEW" | "PAID" | "DONE">("NEW");
  const [alert, setAlert] = useState<{
    title: string;
    message: string;
    type: "success" | "error";
  } | null>(null);

  const fetchCart = () => {
    const savedCart = getCookie("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  useEffect(() => {
    fetchCart();
    const handleCartUpdate = () => fetchCart();
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  useEffect(() => {
    const savedOrderInfo = getCookie("orderInfo");
    if (savedOrderInfo) {
      try {
        const { customer, table_number, payment_met, status } = JSON.parse(savedOrderInfo);
        setCustomerName(customer);
        setTableNumber(table_number);
        setPaymentMethod(payment_met);
        if (status) setStatus(status); // <- tambahkan ini
      } catch (error) {
        console.error("Gagal parsing orderInfo:", error);
      }
    }
  }, []);

  useEffect(() => {
    const orderInfo = {
      customer: customerName,
      table_number: tableNumber,
      payment_met: paymentMethod,
      status: status, // <- tambahkan ini
    };
    storeCookie("orderInfo", JSON.stringify(orderInfo));
  }, [customerName, tableNumber, paymentMethod, status]); // jangan lupa tambahkan status di deps

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlenoteChange = (idMenu: number, note: string) => {
    setNotes((prev) => ({ ...prev, [idMenu]: note }));
    setCart((prev) => {
      const updatedCart = prev.map((item) =>
        item.idMenu === idMenu ? { ...item, note } : item
      );
      storeCookie("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleCheckout = async () => {
    const token = getCookie("token"); // Ambil token dari cookie
    if (!customerName || !tableNumber) {
      setAlert({
        title: "Data Kurang",
        message: "Nama customer dan nomor meja wajib diisi!",
        type: "error",
      });
      return;
    }

    if (!token) {
      setAlert({
        title: "Belum Login",
        message: "Silakan login terlebih dahulu.",
        type: "error",
      });
      return;
    }

    const checkoutData = {
      customer: customerName,
      table_number: tableNumber,
      payment_met: paymentMethod,
      status: status, // <- ambil dari state
      orderlists: cart.map((item) => ({
        menuId: item.idMenu,
        quantity: item.quantity,
        note: item.note?.trim() === "" ? "-" : item.note, // biar aman
      })),
    };

    try {
      const res = await fetch(`${BASE_API_URL}/order/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(checkoutData),
      });

      const result = await res.json();
      if (!result.status) throw new Error(result.message);

      setAlert({
        title: "Berhasil",
        message: "Order berhasil dikirim!",
        type: "success",
      });

      storeCookie("cart", JSON.stringify([]));
      storeCookie(
        "orderInfo",
        JSON.stringify({ customer: "", table_number: "", payment_met: "CASH" })
      );
      setCart([]);
      setCustomerName("");
      setTableNumber("");
      setPaymentMethod("CASH");
      setStatus("NEW");
      window.dispatchEvent(new Event("cartCleared"));
    } catch (err: any) {
      setAlert({
        title: "Gagal",
        message: "Gagal melakukan order: " + err.message,
        type: "error",
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {alert && (
        <ModalAlert
          title={alert.title}
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <h2 className="font-bold text-2xl mb-2">Cart</h2>
      <div className="space-y-2 mb-4">
        <input
          type="text"
          placeholder="Nama Customer"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="text"
          placeholder="Nomor Meja"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <div className="flex items-center gap-4">
          <label className="font-medium">Metode Pembayaran:</label>
          <select
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(e.target.value as "CASH" | "QRIS")
            }
            className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="CASH">Cash</option>
            <option value="QRIS">QRIS</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="font-medium">Status Pesanan:</label>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "NEW" | "PAID" | "DONE")
            }
            className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="NEW">NEW</option>
            <option value="PAID">PAID</option>
            <option value="DONE">DONE</option>
          </select>
        </div>
      </div>

      {cart.length > 0 ? (
        <>
          <ul className="max-h-full space-y-2 overflow-y-auto">
            {cart.map((item, index) => {
              const menuData = menus.find((menu) => menu.id === item.idMenu);
              return (
                <li key={index} className="border p-2 rounded-lg shadow-md">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">
                      {menuData ? menuData.name : "Unknown Item"}
                    </span>
                    <span>
                      {item.quantity} x Rp. {item.price}
                    </span>
                  </div>
                  <InputGroupComponent
                    id="note"
                    type="text"
                    value={
                      cart.find((i) => i.idMenu === menuData?.id)?.note || ""
                    }
                    onChange={(value) => handlenoteChange(item.idMenu, value)}
                    placeholder="Catatan (opsional)"
                  />
                </li>
              );
            })}
          </ul>

          <div className="mt-4 space-y-3">
            <div className="font-bold text-lg text-right">
              Total: Rp. {totalPrice.toLocaleString()}
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <AlertInfo title="informasi">No data Available</AlertInfo>
      )}
    </div>
  );
};
