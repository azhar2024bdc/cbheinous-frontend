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
import { useRouter } from "next/navigation";
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

interface OfferRequest {
  id: string;
  name: string;
  email: string;
  offerDate: string;
  status: string;
}

export default function OfferRequests() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [toggleMode, setToggleMode] = useState(false);
  const [loadingUserIds] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const router = useRouter();

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

  const fakeData = [
    {
      id: "1",
      name: "Emma Johnson",
      email: "yourmail@gmail.com",
      offerDate: "10 Jun, 2025",
      status: "Pending",
    },
    {
      id: "2",
      name: "Emma Johnson",
      email: "yourmail@gmail.com",
      offerDate: "10 Jun, 2025",
      status: "Progress",
    },
    {
      id: "3",
      name: "Emma Johnson",
      email: "yourmail@gmail.com",
      offerDate: "10 Jun, 2025",
      status: "Approved",
    },
    {
      id: "4",
      name: "Emma Johnson",
      email: "yourmail@gmail.com",
      offerDate: "10 Jun, 2025",
      status: "Approved",
    },
    {
      id: "5",
      name: "Emma Johnson",
      email: "yourmail@gmail.com",
      offerDate: "10 Jun, 2025",
      status: "Approved",
    },
    {
      id: "6",
      name: "Emma Johnson",
      email: "yourmail@gmail.com",
      offerDate: "10 Jun, 2025",
      status: "Approved",
    },
    {
      id: "7",
      name: "Emma Johnson",
      email: "yourmail@gmail.com",
      offerDate: "10 Jun, 2025",
      status: "Approved",
    },
    {
      id: "8",
      name: "Emma Johnson",
      email: "yourmail@gmail.com",
      offerDate: "10 Jun, 2025",
      status: "Approved",
    },
    {
      id: "9",
      name: "Emma Johnson",
      email: "yourmail@gmail.com",
      offerDate: "10 Jun, 2025",
      status: "Approved",
    },
    {
      id: "10",
      name: "Emma Johnson",
      email: "yourmail@gmail.com",
      offerDate: "10 Jun, 2025",
      status: "Approved",
    },
    {
      id: "11",
      name: "Emma Johnson",
      email: "yourmail@gmail.com",
      offerDate: "10 Jun, 2025",
      status: "Approved",
    },
    {
      id: "12",
      name: "Emma Johnson",
      email: "yourmail@gmail.com",
      offerDate: "10 Jun, 2025",
      status: "Approved",
    },
    {
      id: "13",
      name: "Emma Johnson",
      email: "yourmail@gmail.com",
      offerDate: "10 Jun, 2025",
      status: "Approved",
    },
    {
      id: "14",
      name: "Emma Johnson",
      email: "yourmail@gmail.com",
      offerDate: "10 Jun, 2025",
      status: "Reject",
    },
    {
      id: "15",
      name: "Emma Johnson",
      email: "yourmail@gmail.com",
      offerDate: "10 Jun, 2025",
      status: "Reject",
    },
  ];

  const columns: TableColumn[] = [
    {
      key: "name",
      label: "Name",
      className: "text-gray-500 font-medium",
    },

    {
      key: "email",
      label: "Email",
      className: "text-gray-600",
    },
    {
      key: "offerDate",
      label: "Offer Date",
      className: "text-gray-600",
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

  const handleViewDetails = (row: TransformedUserData) => {
    router.push(`/dashboard/admin/offer-requests/${row.id}`);
  };

  const actions = (row: TransformedUserData): TableAction[] => {
    const actionList: TableAction[] = [];

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
    <div className="min-h-screen  p-6">
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
                  optionSelectedBg: "var(--primary-color)",
                  optionSelectedColor: "#fff",
                  controlOutline: "var(--primary-color)",
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
          data={fakeData}
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
