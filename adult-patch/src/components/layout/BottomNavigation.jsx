import { NavLink } from "react-router";

const navigationItems = [
  {
    path: "/home",
    label: "홈",
  },
  {
    path: "/my-patch",
    label: "나의 패치",
  },
];

function BottomNavigation() {
  return (
    <nav
      className="bottom-navigation"
      aria-label="하단 메뉴"
    >
      {navigationItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            [
              "bottom-navigation__item",
              isActive
                ? "bottom-navigation__item--active"
                : "",
            ]
              .filter(Boolean)
              .join(" ")
          }
        >
          <span className="bottom-navigation__symbol">
            <span className="bottom-navigation__symbol-center" />
          </span>

          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNavigation;