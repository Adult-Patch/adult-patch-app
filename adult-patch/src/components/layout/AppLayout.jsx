import BottomNavigation from "./BottomNavigation";

function AppLayout({
  children,
  showBottomNavigation = false,
  className = "",
}) {
  const contentClassName = [
    "app-content",
    showBottomNavigation
      ? "app-content--with-navigation"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="app-shell">
      <div className="app-device">
        <main className={contentClassName}>
          {children}
        </main>

        {showBottomNavigation && (
          <BottomNavigation />
        )}
      </div>
    </div>
  );
}

export default AppLayout;