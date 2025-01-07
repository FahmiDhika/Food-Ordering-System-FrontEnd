import React from "react";
import Link from "next/link";

interface menuItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  active?: boolean;
}

const menuItem = ({ icon, label, path, active }: menuItemProps) => {
  return (
    <Link
      href={path}
      className={`flex items-center p-2 my-2 hover:bg-slate-600 hover:scale-105 hover:shadow-xl hover:bg-slate-600/50 rounded-lg ease-in duration-150  ${
        active ? "text-primary" : "text-gray"
      }`}
    >
      <span className="mr-4">{icon}</span>
      <span className="flex-1 text-lg">{label}</span>
    </Link>
  );
};

export default menuItem