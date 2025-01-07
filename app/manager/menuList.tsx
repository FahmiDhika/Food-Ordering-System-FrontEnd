import { ReactNode } from "react";

import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
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
    path: `/manager/dashboard`,
    label: `Dashboard`,
    icon: (
        <IoHomeOutline size={32} />
    ),
  },
  {
    id: `user`,
    path: `/manager/user`,
    label: `User`,
    icon: (
        <FaRegUser size={32}/>
    ),
  },
  {
    id: `menu`,
    path: `/manager/menu`,
    label: `Menu`,
    icon: (
        <MdMenuBook size={32}/>
    ),
  },
  {
    id: `transaksi`,
    path: `/manager/transaksi`,
    label: `Transaksi`,
    icon: (
        <IoFolderOpenOutline size={32}/>
    ),
  },
];

export default menuList