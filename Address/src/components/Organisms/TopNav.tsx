import { type FC } from "react";
import { TopNavLinks } from "../molecules/TopNavButtons";

const navItems = [
  { label: "Logout", href: "/" },
  { label: "Home", href: "/address" },
  { label: "Creat", href: "/address/create" },
];

export const TopNav: FC = () => {
  return (
    <header className="Top-Nav">
      <TopNavLinks links={navItems} />
    </header>
  );
};
