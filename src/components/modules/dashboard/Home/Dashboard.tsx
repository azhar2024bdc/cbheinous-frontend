"use client"

// import ChartSection from "./ChartSection"
import RealChart from "./RealChart"
import RevenueCards from "./RevenueCard"
import StatsCards from "./StateCard"


export default function Dashboard() {
  return (
    <div className="">
      {/* Stats Cards */}
      <StatsCards />

      {/* Revenue Cards */}
      <RevenueCards />

      {/* Chart Section */}
      <RealChart/>
    </div>
  )
}
