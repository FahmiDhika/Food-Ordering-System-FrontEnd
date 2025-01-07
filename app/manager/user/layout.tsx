import ManagerTemplate from "@/components/managerTemplate";
import MenuList from "../menuList";

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
    </ManagerTemplate>
  );
};

export default RootLayout;