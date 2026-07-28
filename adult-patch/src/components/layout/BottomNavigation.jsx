import { NavLink } from "react-router";

const navigationItems = [
  {
    path: "/home",
    label: "홈",
    icon: "home",
  },
  {
    path: "/explore",
    label: "패치 탐색",
    icon: "explore",
  },
  {
    path: "/my-patch",
    label: "나의 패치",
    icon: "patch",
  },
];

function NavigationIcon({ type }) {
  if (type === "home") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-full"
      >
        <path
          d="M4 10.5 12 4l8 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-8Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M9.5 20v-5.5h5V20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "explore") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-full"
      >
        <circle
          cx="12"
          cy="12"
          r="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
        />

        <path
          d="m14.8 9.2-1.7 3.9-3.9 1.7 1.7-3.9 3.9-1.7Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-full"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
      />

      <path
        d="m8.3 12.2 2.4 2.4 5-5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BottomNavigation() {
  return (
    <nav
      className="grid h-[calc(78px+env(safe-area-inset-bottom))] flex-none grid-cols-3 border-t border-line bg-white/95 px-5 pt-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg"
      aria-label="주요 메뉴"
    >
      {navigationItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end
          className={({ isActive }) =>
            [
              "flex flex-col items-center justify-center gap-1",
              "text-[11px] leading-none font-bold tracking-[-0.025em]",
              "transition-colors",
              isActive
                ? "text-brand-600"
                : "text-content-tertiary",
            ]
              .filter(Boolean)
              .join(" ")
          }
        >
          <span className="flex size-[25px] items-center justify-center">
            <NavigationIcon type={item.icon} />
          </span>

          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNavigation;