"use client";


import { icon_pet, pet_sitter, totalbooking, totalRevenue } from "@/assets/icons/ioncs";
import Loading from "@/components/ui/core/Loading/Loading";
import { useGetUserStatQuery } from "@/redux/features/auth/authApi";




export default function StatsCards() {
  const {isLoading,data}=useGetUserStatQuery(undefined)


  const userData=data?.data




  if(isLoading){
    return <Loading/>
  }
  const stats = [
    {
      title: "Total Pet",
      value: userData?.totalUsers || 0,
      icon: icon_pet,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Pet Sitter",
      value: userData?.totalAthletes || 0,
      icon: pet_sitter,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Total Revenue",
      value: userData?.totalClubs || 0,
      icon: totalRevenue,
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      title: "Total Booking",
      value: userData?.totalIndividuals || 0,
      icon: totalbooking,
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-600",
    },
 
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[16px] font-medium text-text-primary mb-1">{stat.title}</p>
              <p className="text-[28px] font-semibold text-text-primary">{stat.value}</p>
            </div>
            <div className={`bg-primary-bg ${stat.iconColor} p-3 rounded-lg`}>{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
