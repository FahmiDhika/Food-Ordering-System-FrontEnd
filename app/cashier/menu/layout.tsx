import CashierTemplate from "@/components/cashierTemplate";
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
    <CashierTemplate title="Menu" id="Menu" menuList={MenuList}>
      {children}
    </CashierTemplate>
  );
};

export default RootLayout;