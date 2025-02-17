import { ReactNode } from "react";

import { IoHomeOutline } from "react-icons/io5";
import { FaShoppingBasket } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { IoFolderOpenOutline } from "react-icons/io5";

interface IPropMenu {
  id: string;
  path: string;
  label: string;
  icon: ReactNode;
}

let menuList: IPropMenu[] = [
  {
    id: `dashboard`,
    path: `/cashier/dashboard`,
    label: `Dashboard`,
    icon: (
        <IoHomeOutline size={32} />
    ),
  },
  {
    id: `menu`,
    path: `/cashier/menu`,
    label: `Menu`,
    icon: (
        <MdMenuBook size={32}/>
    ),
  },
  {
    id: `transaksi`,
    path: `/cashier/transaksi`,
    label: `Transaksi`,
    icon: (
        <IoFolderOpenOutline size={32}/>
    ),
  },
  {
    id: `Order`,
    path: `/cashier/order`,
    label: `Order`,
    icon: (
        <FaShoppingBasket size={32}/>
    ),
  },
];

export default menuList