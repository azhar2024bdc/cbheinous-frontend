"use client";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutHandler } from "@/utils/handleLogout";
import { BsPlusCircleDotted } from "react-icons/bs";
import { PiGitPullRequestLight } from "react-icons/pi";
import { BiPurchaseTag } from "react-icons/bi";
import { SiOpenproject } from "react-icons/si";
import { ConfigProvider } from "antd";
import logo from "@/assets/images/logo.png";
import {
  Briefcase,
  CircleGauge,
  FileCode,
  LogOut,
  Menu,
  MonitorSmartphone,
  ShieldCheck,
  User,
  UserCheck,
  Users,
  Users2,
  X,
  HelpCircle,
  Bell,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import Image from "next/image";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<{
    [key: string]: boolean;
  }>({
    communityManage: false,
    settings: false,
    policySettings: false,
  });
  const router = useRouter();
  const pathname = usePathname();
  const [customRole] = useState<string>(
    pathname?.startsWith("/dashboard/super-admin") ||
      pathname?.startsWith("/super-admin")
      ? "SUPER_ADMIN"
      : pathname?.startsWith("/dashboard/admin") ||
        pathname?.startsWith("/admin")
      ? "ADMIN"
      : pathname?.startsWith("/dashboard/sub-admin") ||
        pathname?.startsWith("/sub-admin")
      ? "SUB_ADMIN"
      : pathname?.startsWith("/dashboard/supervisor") ||
        pathname?.startsWith("/supervisor")
      ? "SUPERVISOR"
      : pathname?.startsWith("/dashboard/employee") ||
        pathname?.startsWith("/employee")
      ? "EMPLOYEE"
      : ""
  );
  const role = user?.role || customRole;
  useEffect(() => {
    const newExpandedMenus = { ...expandedMenus };

    if (role === "SUPER_ADMIN") {
      if (
        pathname.includes("/group-buy-manage") ||
        pathname.includes("/announcement-manage") ||
        pathname.includes("/learn-manage") ||
        pathname.includes("/open-chat-manage")
      ) {
        newExpandedMenus.communityManage = true;
      }

      if (
        pathname.includes("/admin-account-settings") ||
        pathname.includes("/moderator-permission")
      ) {
        newExpandedMenus.settings = true;
      }

      if (
        pathname.includes("/privacy-policy") ||
        pathname.includes("/terms-condition") ||
        pathname.includes("/data-policy")
      ) {
        newExpandedMenus.policySettings = true;
      }
    }

    setExpandedMenus(newExpandedMenus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, role]);

  const toggleMenu = (menuKey: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const isActive = (href: string) => {
    if (
      href === "/dashboard/super-admin" ||
      href === "/dashboard/admin" ||
      href === "/sub-admin" ||
      href === "/supervisor" ||
      href === "/employee"
    ) {
      return pathname === href;
    }

    if (pathname.startsWith(href)) {
      const nextChar = pathname[href.length];
      return nextChar === "/" || nextChar === undefined;
    }

    return false;
  };

  interface MenuItem {
    icon: any;
    text: string;
    path?: string;
    expandable?: boolean;
    key?: string;
    submenu?: { text: string; path: string }[];
  }

  let menuItems: MenuItem[] = [];

  if (role === "ADMIN") {
    menuItems = [
      {
        icon: TbLayoutDashboardFilled,
        text: "Dashboard",
        path: "/dashboard/admin",
      },
      {
        icon: Users,
        text: "User Manage",
        path: "/dashboard/admin/user-management",
      },
 
      {
        icon: Users,
        text: "Offer Request",
        path: "/dashboard/admin/offer-requests",
      },
      {
        icon: Users,
        text: "Subscription Manage",
        path: "/dashboard/admin/subscription-manage",
      },
 
      {
        icon: HelpCircle,
        text: "Terms & Privacy",
        path: "/dashboard/admin/terms-condition",
      },
      {
        icon: HelpCircle,
        text: "Negotiate",
        path: "/dashboard/admin/negotiate",
      },
      {
        icon: HelpCircle,
        text: "Help & Support Manage",
        path: "/dashboard/admin/help-support",
      },
    ];
  }
  if (role === "SUPER_ADMIN") {
    menuItems = [
      {
        icon: TbLayoutDashboardFilled,
        text: "Dashboard",
        path: "/super-admin",
      },
      {
        icon: Briefcase,
        text: "Projects",
        path: "/super-admin/projects",
      },
      {
        icon: FileCode,
        text: "Cost Code",
        path: "/super-admin/cost-code",
      },
      {
        icon: MonitorSmartphone,
        text: "Equipment",
        path: "/super-admin/equipment",
      },
      {
        icon: ShieldCheck,
        text: "Sub Admin",
        path: "/super-admin/sub-admin",
      },
      {
        icon: Users2,
        text: "Supervisor",
        path: "/super-admin/supervisor",
      },
      {
        icon: UserCheck,
        text: "Employee",
        path: "/super-admin/employee",
      },
    ];
  }
  if (role === "SUB_ADMIN") {
    menuItems = [
      {
        icon: TbLayoutDashboardFilled,
        text: "Dashboard",
        path: "/sub-admin",
      },
      {
        icon: Briefcase,
        text: "Projects",
        path: "/sub-admin/projects",
      },
      {
        icon: FileCode,
        text: "Cost Code",
        path: "/sub-admin/cost-code",
      },
      {
        icon: MonitorSmartphone,
        text: "Equipment",
        path: "/sub-admin/equipment",
      },
      {
        icon: Users2,
        text: "Supervisor",
        path: "/sub-admin/supervisor",
      },
      {
        icon: UserCheck,
        text: "Employee",
        path: "/sub-admin/employee",
      },
      {
        icon: CircleGauge,
        text: "PTO Requests",
        path: "/sub-admin/pto",
      },
    ];
  }
  if (role === "SUPERVISOR") {
    menuItems = [
      {
        icon: TbLayoutDashboardFilled,
        text: "Dashboard",
        path: "/supervisor",
      },
      {
        icon: BsPlusCircleDotted,
        text: "Add PTO request",
        path: "/supervisor/add-pto-request",
      },
      {
        icon: BsPlusCircleDotted,
        text: "Add purchase",
        path: "/supervisor/add-purchase",
      },
      {
        icon: PiGitPullRequestLight,
        text: "Employee PTO request",
        path: "/supervisor/employe-pto-request",
      },
      {
        icon: PiGitPullRequestLight,
        text: "My PTO request",
        path: "/supervisor/my-pto-request",
      },
      {
        icon: BiPurchaseTag,
        text: "My purchase",
        path: "/supervisor/my-purchase",
      },
    ];
  }
  if (role === "EMPLOYEE") {
    menuItems = [
      {
        icon: TbLayoutDashboardFilled,
        text: "Dashboard",
        path: "/employee",
      },
      {
        icon: BsPlusCircleDotted,
        text: "Add PTO request",
        path: "/employee/add-pto-request",
      },
      {
        icon: BsPlusCircleDotted,
        text: "Add Project entry",
        path: "/employee/add-project-entry",
      },
      {
        icon: BsPlusCircleDotted,
        text: "Add purchase",
        path: "/employee/add-purchase",
      },

      {
        icon: SiOpenproject,
        text: "All Projects",
        path: "/employee/all-project",
      },
      {
        icon: PiGitPullRequestLight,
        text: "My PTO request",
        path: "/employee/my-pto-request",
      },
      {
        icon: BiPurchaseTag,
        text: "My purchase",
        path: "/employee/my-purchase",
      },
    ];
  }

  const isAnySubmenuActive = (submenu?: { path: string }[]) => {
    if (!submenu) return false;
    return submenu.some((item) => isActive(item.path));
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: `var(--primary-bg)`,
          
        },
      }}
    >
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#F8F8F8]  border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-24 px-4 bg-primary-bg border-b  ">
          <Link
            href="/dashboard/super-admin"
            className="flex items-center justify-center w-full"
          >
            <Image
              src={logo}
              width={100}
              height={100}
              alt="logo"
              className="object-contain w-[90px] h-auto "
              priority
              unoptimized
              
            />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md lg:hidden hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-140px)] ">
          {menuItems?.map((item, index) => (
            <div key={index}>
              {item.expandable ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.key!)}
                    className={`flex items-center justify-between w-full px-4 py-3 text-sm rounded-lg hover:bg-primary hover:text-white transition-all duration-200 ${
                      isAnySubmenuActive(item.submenu)
                        ? "bg-primary text-white"
                        : "text-gray-700"
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.text}
                    </div>
                    {expandedMenus[item.key!] ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {expandedMenus[item.key!] && (
                    <div className="mt-1 ml-4 space-y-1">
                      {item.submenu!.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.path}
                          className={`flex items-center px-4 py-2.5 text-sm rounded-lg hover:bg-primary hover:bg-opacity-10 transition-all duration-200 ${
                            isActive(subItem.path)
                              ? "bg-primary bg-opacity-10 text-primary font-medium"
                              : "text-gray-600"
                          }`}
                        >
                          {/* <span className={`w-1.5 h-1.5 ${isActive(subItem.path) ? "bg-primary" : "bg-gray-600"} rounded-full mr-3`}></span> */}
                          {subItem.text}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.path!}
                  className={`flex items-center px-4 py-3 text-sm rounded-lg hover:bg-primary hover:text-white transition-all duration-200 ${
                    isActive(item.path!)
                      ? "bg-primary text-white"
                      : "text-gray-700"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.text}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4  border-t border-gray-200">
          <button
            onClick={() => {
              logoutHandler(dispatch, router);
            }}
            className="flex items-center w-full px-4 py-3 text-sm text-gray-700 transition-all duration-200 rounded-lg hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      <div className="lg:pl-64 bg-primary-bg min-h-[calc(100vh-64px)] ">
        <header className="fixed top-0 right-0 left-0 lg:left-64  bg-primary-bg border-b  z-40 ">
          <div className="flex items-center justify-between h-24  px-5">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100 block lg:hidden"
            >
              <Menu className="w-5 h-5 text-gray-500" />
            </button>

            <h4 className="flex items-center justify-center text-2xl font-semibold">
              Dashboard
            </h4>

            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-500" />
              </button>
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  {user?.profileImage ? (
                    <Image
                      src={user.profileImage}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-gray-500" />
                  )}
                </button>
                <div className="">
                  <h3 className="text-lg text-text-primary">
                    {user?.name || "Name"}{" "}
                  </h3>
                  <p className="text-text-secondary">{user?.role || "Role"}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-5 mt-24 ">{children}</main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-text-secondary bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </ConfigProvider>
  );
};

export default DashboardLayout;
