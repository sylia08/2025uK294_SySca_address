import { type FC } from "react";

interface TopNavLinksProps {
  links: { label: string; href: string }[];
}

export const TopNavLinks: FC<TopNavLinksProps> = ({ links }) => {
  return (
    <div className="All-Links">
      {links.map((link) => (
        <a key={link.label} href={link.href} className="Link">
          {link.label}
        </a>
      ))}
    </div>
  );
};
