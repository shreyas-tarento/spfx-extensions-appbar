import * as React from "react";
import styles from "./SideNav.module.scss";
import ISideNavProps, { MenuItemProps } from "./ISideNavProps";
import { ActionButton } from "@fluentui/react/lib/Button";
import { Icon } from "@fluentui/react/lib/Icon";

const MenuItems: Array<MenuItemProps> = [
  { id: 1, label: "Home", link: "Home link", iconName: "Home" },
  { id: 2, label: "Projects", link: "Projects link", iconName: "Home" },
  { id: 3, label: "Partners", link: "Partners link", iconName: "Home" },
  { id: 4, label: "Users", link: "Users link", iconName: "Home" },
];

const SideNav = ({ context }: ISideNavProps) => {
  const [navIndex, setNavIndex] = React.useState<Number>(1);
  const onHandleClick = (navItem: MenuItemProps) => {
    console.log(context.pageContext.web);
    setNavIndex(navItem.id);
  };

  return (
    <div className={styles.appBar}>
      {MenuItems.map((navItem) => (
        <ActionButton
          key={`nav-key-${navItem.id}`}
          className={`${styles.appBarButton} ${
            navItem.id === navIndex ? styles.isActive : ""
          }`}
          onClick={() => onHandleClick(navItem)}
          styles={{
            flexContainer: {
              flexDirection: "column",
            },
          }}
        >
          <Icon className={styles.appBarIcon} iconName={navItem.iconName} />
          <p className={styles.appBarItemLabel}>{navItem.label}</p>
        </ActionButton>
      ))}
    </div>
  );
};

export default SideNav;
