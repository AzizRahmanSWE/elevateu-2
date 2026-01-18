import React from 'react'

type Props = { children: React.ReactNode }

const Layout = ({ children }: Props) => {
  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden border-l border-t border-gray-800/60 rounded-l-3xl bg-black/20 backdrop-blur-xl pb-20">
      {children}
    </div>
  )
}

export default Layout