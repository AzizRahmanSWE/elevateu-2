import React from "react";
import Sidebar from '@/components/sidebar'
import InfoBar from "@/components/infobar";

type Props = { children: React.ReactNode };

const Layout = (props: Props) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-black via-slate-950 to-black text-white">
      <div className="shrink-0 border-r border-gray-800/60 bg-gradient-to-b from-black via-slate-950 to-black">
        <Sidebar />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <InfoBar />
        <div className="min-h-0 flex-1">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Layout