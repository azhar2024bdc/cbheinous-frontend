"use client";

import {
  MyDataTable,
  PaginationInfo,
  StatusBadge,
  TableAction,
  TableColumn,
} from "@/components/ui/core/DataTable/MyDataTable";
import {
  useGetAllUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} from "@/redux/features/auth/authApi";
import { ConfigProvider, Input, Select } from "antd";
import Image from "next/image";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface UserData {
  id: string;
  name: string;
  email: string;
  image: string;
  country: string;
  city: string;
  status: string;
  role: string;
  groupBuyClick: number;
  catalogClick: number;
  createdAt: string;
}

interface TransformedUserData {
  id: string;
  userId: string;
  createdDate: string;
  userImage: string;
  name: string;
  email: string;
  location: string;
  groupBuyClick: number;
  catalogClick: number;
  status: string;
  role: string;
}

export default function UserManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [toggleMode, setToggleMode] = useState(false);
  const [loadingUserIds, setLoadingUserIds] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  const { data, isLoading, isFetching } = useGetAllUsersQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
  });

  const users = useMemo<TransformedUserData[]>(() => {
    if (data?.data && Array.isArray(data.data)) {
      return data.data.map((user: UserData) => ({
        id: user.id,
        userId: `#${user.id.substring(0, 6)}`,
        createdDate: new Date(user.createdAt).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        userImage: user.image || "/default-avatar.png",
        name: user.name,
        email: user.email,
        location: `${user.city}, ${user.country}`,
        groupBuyClick: user.groupBuyClick || 0,
        catalogClick: user.catalogClick || 0,
        status: user.status,
        role: user.role || "USER",
      }));
    }
    return [];
  }, [data]);

  //  const fakeUsers = [
  //   {
  //     id: "45777",
  //     name: "Mehedi Hasan",
  //     email: "usermail@gmail.com",
  //     image: "https://i.pravatar.cc/150?img=12",
  //     country: "Bangladesh",
  //     city: "Dhaka",
  //     status: "ACTIVE",
  //     role: "USER",
  //     groupBuyClick: 34,
  //     catalogClick: 34,
  //     createdAt: "2025-01-02T10:30:00Z",
  //   },
  //   {
  //     id: "45778",
  //     name: "Sarah Johnson",
  //     email: "sarah.j@gmail.com",
  //     image: "https://i.pravatar.cc/150?img=5",
  //     country: "USA",
  //     city: "New York",
  //     status: "ACTIVE",
  //     role: "USER",
  //     groupBuyClick: 45,
  //     catalogClick: 52,
  //     createdAt: "2025-01-03T14:20:00Z",
  //   },
  //   {
  //     id: "45779",
  //     name: "Ahmed Ali",
  //     email: "ahmed.ali@gmail.com",
  //     image: "https://i.pravatar.cc/150?img=33",
  //     country: "UAE",
  //     city: "Dubai",
  //     status: "BLOCKED",
  //     role: "USER",
  //     groupBuyClick: 12,
  //     catalogClick: 18,
  //     createdAt: "2024-12-28T08:15:00Z",
  //   },
  //   {
  //     id: "45780",
  //     name: "Emily Chen",
  //     email: "emily.chen@gmail.com",
  //     image: "https://i.pravatar.cc/150?img=9",
  //     country: "Canada",
  //     city: "Toronto",
  //     status: "ACTIVE",
  //     role: "USER",
  //     groupBuyClick: 67,
  //     catalogClick: 78,
  //     createdAt: "2025-01-05T16:45:00Z",
  //   },
  //   {
  //     id: "45781",
  //     name: "Rajesh Kumar",
  //     email: "rajesh.k@gmail.com",
  //     image: "https://i.pravatar.cc/150?img=15",
  //     country: "India",
  //     city: "Mumbai",
  //     status: "ACTIVE",
  //     role: "USER",
  //     groupBuyClick: 23,
  //     catalogClick: 29,
  //     createdAt: "2025-01-01T11:30:00Z",
  //   },
  //   {
  //     id: "45782",
  //     name: "Maria Garcia",
  //     email: "maria.garcia@gmail.com",
  //     image: "https://i.pravatar.cc/150?img=10",
  //     country: "Spain",
  //     city: "Madrid",
  //     status: "ACTIVE",
  //     role: "USER",
  //     groupBuyClick: 89,
  //     catalogClick: 95,
  //     createdAt: "2024-12-30T09:20:00Z",
  //   },
  //   {
  //     id: "45783",
  //     name: "John Smith",
  //     email: "john.smith@gmail.com",
  //     image: "https://i.pravatar.cc/150?img=13",
  //     country: "UK",
  //     city: "London",
  //     status: "BLOCKED",
  //     role: "USER",
  //     groupBuyClick: 8,
  //     catalogClick: 12,
  //     createdAt: "2024-12-25T13:10:00Z",
  //   },
  //   {
  //     id: "45784",
  //     name: "Fatima Rahman",
  //     email: "fatima.r@gmail.com",
  //     image: "https://i.pravatar.cc/150?img=20",
  //     country: "Bangladesh",
  //     city: "Chittagong",
  //     status: "ACTIVE",
  //     role: "USER",
  //     groupBuyClick: 56,
  //     catalogClick: 61,
  //     createdAt: "2025-01-04T15:25:00Z",
  //   },
  //   {
  //     id: "45785",
  //     name: "David Lee",
  //     email: "david.lee@gmail.com",
  //     image: "https://i.pravatar.cc/150?img=14",
  //     country: "Australia",
  //     city: "Sydney",
  //     status: "ACTIVE",
  //     role: "USER",
  //     groupBuyClick: 41,
  //     catalogClick: 47,
  //     createdAt: "2025-01-02T12:40:00Z",
  //   },
  //   {
  //     id: "45786",
  //     name: "Sophie Martin",
  //     email: "sophie.m@gmail.com",
  //     image: "https://i.pravatar.cc/150?img=24",
  //     country: "France",
  //     city: "Paris",
  //     status: "ACTIVE",
  //     role: "USER",
  //     groupBuyClick: 73,
  //     catalogClick: 82,
  //     createdAt: "2024-12-31T10:15:00Z",
  //   },
  //   {
  //     id: "45787",
  //     name: "Mohammed Hassan",
  //     email: "mohammed.h@gmail.com",
  //     image: "https://i.pravatar.cc/150?img=17",
  //     country: "Egypt",
  //     city: "Cairo",
  //     status: "BLOCKED",
  //     role: "USER",
  //     groupBuyClick: 5,
  //     catalogClick: 9,
  //     createdAt: "2024-12-20T14:30:00Z",
  //   },
  //   {
  //     id: "45788",
  //     name: "Lisa Anderson",
  //     email: "lisa.anderson@gmail.com",
  //     image: "https://i.pravatar.cc/150?img=16",
  //     country: "USA",
  //     city: "Los Angeles",
  //     status: "ACTIVE",
  //     role: "USER",
  //     groupBuyClick: 92,
  //     catalogClick: 98,
  //     createdAt: "2025-01-06T09:50:00Z",
  //   },
  // ];

  const columns: TableColumn[] = [
    {
      key: "userId",
      label: "User ID",
      className: "text-gray-500 font-medium",
    },
    {
      key: "createdDate",
      label: "Created Date",
      className: "text-gray-600",
    },
    {
      key: "userImage",
      label: "Name",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <Image
            src={value as string}
            alt="user"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
          />
          <div>
            <p className="text-gray-800 font-medium">
              {(row as TransformedUserData).name}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      className: "text-gray-600",
    },
    {
      key: "groupBuyClick",
      label: "Group Buy Click",
      className: "text-gray-600 text-center",
    },
    {
      key: "catalogClick",
      label: "Catalog Click",
      className: "text-gray-600 text-center",
    },
    {
      key: "status",
      label: "Status",
      render: (value) => <StatusBadge status={value as string} />,
    },
  ];

  const totalItems = data?.meta?.total || 0;

  const paginationInfo: PaginationInfo = {
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange: setCurrentPage,
    onItemsPerPageChange: (items) => {
      setItemsPerPage(items);
      setCurrentPage(1);
    },
  };

  const handleBlockUser = async (row: TransformedUserData) => {
    setLoadingUserIds((prev) => [...prev, row.id]);
    try {
      const res = await blockUser(row.id).unwrap();
      if (res?.success) {
        toast.success(
          res.message || res?.data?.message || "User blocked successfully."
        );
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          "An error occurred while blocking the user."
      );
    } finally {
      setLoadingUserIds((prev) => prev.filter((id) => id !== row.id));
    }
  };

  const handleUnblockUser = async (row: TransformedUserData) => {
    setLoadingUserIds((prev) => [...prev, row.id]);
    try {
      const res = await unblockUser(row.id).unwrap();
      if (res?.success) {
        toast.success(
          res.message || res?.data?.message || "User unblocked successfully."
        );
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          "An error occurred while unblocking the user."
      );
    } finally {
      setLoadingUserIds((prev) => prev.filter((id) => id !== row.id));
    }
  };

  const handleViewDetails = (row: TransformedUserData) => {
    console.log("View details for user:", row.id);
  };

  const actions = (row: TransformedUserData): TableAction[] => {
    const actionList: TableAction[] = [];

    // Block/Unblock action based on user status
    if (row.status === "ACTIVE" || row.status === "Active") {
      actionList.push({
        label: "Block",
        onClick: () => handleBlockUser(row),
      });
    } else if (row.status === "BLOCKED" || row.status === "Blocked") {
      actionList.push({
        label: "Unblock",
        onClick: () => handleUnblockUser(row),
      });
    }

    actionList.push({
      label: "View Details",
      onClick: () => handleViewDetails(row),
    });

    return actionList;
  };

  const handleSearch = (value: string) => {
    // Implement search functionality here
    console.log("Search for:", value);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between  mb-4">
        <div className="relative w-full max-w-xs">
          <div className="absolute top-1/2 right-3 -translate-y-1/2 z-10">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-60"
            >
              <path
                d="M14.166 14.1666L17.4993 17.5"
                stroke="#374151"
                strokeWidth="1.25"
                strokeLinecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667Z"
                stroke="#374151"
                strokeWidth="1.25"
                strokeLinecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <Input
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            className="px-3 h-11 w-full rounded-lg border !border-border-color focus:border-primary focus:ring-2 focus:ring-primary transition-all duration-200 shadow-sm hover:shadow-md"
          />
        </div>
        <div className="flex items-center gap-4">
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  optionSelectedBg: "var(--primary-color)", // highlighted option background
                  optionSelectedColor: "#fff", // highlighted option text color
                  controlOutline: "var(--primary-color)", // border outline on focus
                },
              },
            }}
          >
            <Select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e);
                setCurrentPage(1);
              }}
              className="w-24 h-11"
            >
              <Select.Option value="all">All Users</Select.Option>
              <Select.Option value="ACTIVE">Active</Select.Option>
              <Select.Option value="BLOCKED">Blocked</Select.Option>
              <Select.Option value="PENDING">Pending</Select.Option>
            </Select>
          </ConfigProvider>
        </div>
      </div>

      <div className=" rounded-lg ">
        <MyDataTable
          data={users}
          columns={columns}
          pagination={paginationInfo}
          toggleMode={toggleMode}
          onToggleMode={() => setToggleMode(!toggleMode)}
          isLoading={isLoading || isFetching}
          actions={actions as any}
          className="!bg-transparent"
          mutationLoadingIds={loadingUserIds}
        />
      </div>
    </div>
  );
}
