"use client"

import InfoChart from "./InfoChart"
import StatsCards from "./StateCard"


export default function Dashboard() {
  return (
    <div className="">
      {/* Stats Cards */}
      <StatsCards />

      <InfoChart />
    </div>
  )
}
