import Logo from "shared/Logo/Logo";
import SocialsList1 from "shared/SocialsList1/SocialsList1";
import { CustomLink } from "data/types";
import React from "react";

interface FooterProps {
  hideLogo?: boolean;
}
export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "1",
    title: "",
    menus: [
      { href: "#", label: "Terms & conditions" },
      { href: "#", label: "Privacy policy" },
    ],
  },
  {
    id: "2",
    title: "",
    menus: [
      { href: "#", label: "About us" },
      { href: "#", label: "Help" },
    ],
  },
];

const Footer: React.FC<FooterProps> = ({ hideLogo }) => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div
      className="nc-Footer relative py-10 lg:py-10 border-t border-neutral-200 dark:border-neutral-700"
      // style={{height: "200px"}}
    >
      <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
        <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-2 md:col-span-1">
            {!hideLogo && <Logo />}
          </div>
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>
    </div>
  );
};

export default Footer;
