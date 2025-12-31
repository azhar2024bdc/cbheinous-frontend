
"use client";
import { useSelector } from "react-redux";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { RootState } from "@/redux/store";
import { useMemo } from "react";
import { IUser } from "@/types";


export const useLoggedUser = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data, isLoading, isError, refetch } = useGetMeQuery(undefined, {
    skip: !user?.role,
  });

  const loggedUser = useMemo<IUser | undefined>(() => data?.data, [data]);

  const role = useMemo(() => user?.role, [user]);
  // const isPremiumUser = loggedUser?.SubscriptionUser?.subscriptionPlan

  return { loggedUser, isLoading, isError, refetch, role };
};

