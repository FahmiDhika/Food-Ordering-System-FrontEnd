import ManagerTemplate from "@/components/managerTemplate";
import MenuList from "../menuList";

export const metadata = {
  title: "Transaksi | Food Ordering System",
  description: "Developed by Fahmi Dhika Rawr",
};

type PropsLayout = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: PropsLayout) => {
  return (
    <ManagerTemplate title="Transaksi" id="Transaksi" menuList={MenuList}>
      {children}
    </ManagerTemplate>
  );
};

export default RootLayout;