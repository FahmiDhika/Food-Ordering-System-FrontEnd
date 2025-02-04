import ManagerTemplate from "@/components/managerTemplate";
import MenuList from "../menuList";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Menu | Food Ordering System",
  description: "Developed by Fahmi Dhika Rawr",
};

type PropsLayout = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: PropsLayout) => {
  return (
    <ManagerTemplate title="Menu" id="Menu" menuList={MenuList}>
      {children}
      <ToastContainer containerId={`toastMenu`} position="top-right" autoClose={2000} />
    </ManagerTemplate>
  );
};

export default RootLayout;