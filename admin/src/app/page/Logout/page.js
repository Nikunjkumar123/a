"use client";
import { LogOut, User } from "react-feather";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function HeaderWithSidebar({ children }) {
  const router = useRouter();
  const { user, logout, fetchUser } = useAuth();

  const handleLogout = async () => {
    await logout();
    console.log("clicked on logged out");
    
    router.push("/");
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white fixed left-0 top-0 h-full">
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/page/dashboard"
                className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-md"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/page/order"
                className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-md"
              >
                Orders
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 ml-64 flex flex-col">
        <header className="bg-purple-500 text-white">
          <div className="flex p-4 justify-between items-center">
            <div>{user ? user.userId?.email : "Guest"}</div>
            <div>
              <LogOut className="cursor-pointer" onClick={handleLogout} />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}

export default HeaderWithSidebar;
