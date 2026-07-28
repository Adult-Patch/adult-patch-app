import BottomNavigation from "./BottomNavigation";

function AppLayout({
  children,
  showBottomNavigation = false,
  className = "",
}) {
  const contentClassName = [
    "hide-scrollbar",
    "flex min-h-0 flex-1 flex-col",
    "overflow-x-hidden overflow-y-auto",
    "overscroll-y-contain",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex h-dvh min-h-0 w-full justify-center overflow-hidden bg-app-background">
      <div className="relative flex h-full min-h-0 w-full max-w-[480px] flex-col overflow-hidden bg-white min-[481px]:shadow-device">
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