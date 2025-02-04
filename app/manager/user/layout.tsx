import ManagerTemplate from "@/components/managerTemplate";
import MenuList from "../menuList";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "User | Food Ordering System",
  description: "Developed by Fahmi Dhika Rawr",
};

type PropsLayout = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: PropsLayout) => {
  return (
    <ManagerTemplate title="User" id="User" menuList={MenuList}>
      {children}
      <ToastContainer containerId={`toastUser`} position="top-right" autoClose={1000} />
    </ManagerTemplate>
    
  );
};

export default RootLayout;