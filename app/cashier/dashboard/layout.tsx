import CashierTemplate from "@/components/cashierTemplate";
import MenuList from "../menuList";

export const metadata = {
  title: "Dashboard | Food Ordering System",
  description: "Developed by Fahmi Dhika Rawr",
};

type PropsLayout = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: PropsLayout) => {
  return (
    <CashierTemplate title="Dashboard" id="Dashboard" menuList={MenuList}>
      {children}
    </CashierTemplate>
  );
};

export default RootLayout;