import ManagerTemplate from "@/components/managerTemplate";
import MenuList from "../menuList";

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
    </ManagerTemplate>
  );
};

export default RootLayout;