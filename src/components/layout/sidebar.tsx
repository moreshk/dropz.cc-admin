import { useSessionStore } from "@/stores/auth-store";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Coins, LayoutTemplate, Link as IconLink } from "lucide-react";

export const SideBar = () => {
  const location = useLocation();
  const pathname = "/" + location.pathname.split("/")[1];
  const { session } = useSessionStore();
  const isAdmin = session?.isAdmin;

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <img
                width={40}
                height={40}
                src="https://dropz.cc/favicon-32x32.png"
                alt="logo"
              />
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-pink-200 to-blue-600">
                SolDrops
              </span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <div>
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    pathname === "/dashboard"
                      ? "text-primary bg-muted"
                      : "text-muted-foreground"
                  }`}
                >
                  Dashboard
                </Link>
              </div>
              {isAdmin && (
                <div>
                  <p className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary">
                    Admin
                  </p>
                  {adminLinks.map((link) => (
                    <Link
                      to={link.href}
                      key={link.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                        pathname === link.href
                          ? "text-primary bg-muted"
                          : "text-muted-foreground"
                      }`}
                    >
                      <link.icon className="h-4 w-4" />
                      {link.title}
                    </Link>
                  ))}
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
          Welcome
        </header>
        <Outlet />
      </div>
    </div>
  );
};

const adminLinks = [
  {
    href: "/tokens",
    title: "Tokens",
    icon: Coins,
    visibility: true,
  },
  {
    href: "/widgets",
    title: "Widgets",
    icon: LayoutTemplate,
    visibility: true,
  },
  {
    href: "/referral",
    title: "Referral",
    icon: IconLink,
    visibility: true,
  },
];
