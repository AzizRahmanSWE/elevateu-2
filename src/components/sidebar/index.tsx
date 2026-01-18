'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { menuOptions } from '@/lib/constant'
import clsx from 'clsx'
import { Separator } from '@/components/ui/separator'
import { Database, GitBranch, LucideMousePointerClick } from 'lucide-react'
import { ModeToggle } from '../global/mode-toggle'

type Props = {}

const MenuOptions = (props: Props) => {
  const pathName = usePathname()

  return (
    <nav className="h-screen overflow-y-auto overflow-x-hidden justify-between flex items-center flex-col gap-10 py-6 px-3 bg-transparent">
      <div className="flex items-center justify-center flex-col gap-8">
        <Link
          className="flex font-bold flex-row bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
          href="/"
        >
          Elevate.
        </Link>
        <TooltipProvider>
          {menuOptions.map((menuItem) => (
            <ul key={menuItem.name}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <li>
                    <Link
                      href={menuItem.href}
                      className={clsx(
                        'group h-8 w-8 flex items-center justify-center scale-[1.5] rounded-lg p-[3px] cursor-pointer border border-transparent bg-white/[0.02] hover:bg-white/[0.06] hover:border-gray-700/70 transition-colors',
                        {
                          'bg-gradient-to-br from-purple-600/25 to-pink-600/25 border-purple-500/40':
                            pathName === menuItem.href,
                        }
                      )}
                    >
                      <menuItem.Component
                        selected={pathName === menuItem.href}
                      />
                    </Link>
                  </li>
                </TooltipTrigger>
                <TooltipContent // shows text/tag on hover
                  side="right"
                  className="bg-black/60 border border-gray-800/60 text-gray-100 backdrop-blur-xl"
                >
                  <p>{menuItem.name}</p>
                </TooltipContent>
              </Tooltip>
            </ul>
          ))}
        </TooltipProvider>
        <Separator />
        <div className="flex items-center flex-col gap-9 bg-white/[0.03] py-4 px-2 rounded-full h-56 overflow-y-auto overflow-x-hidden border border-gray-800/60">
          <div className="relative bg-white/[0.06] p-2 rounded-full border border-gray-700/70">
            <LucideMousePointerClick
              className="text-gray-200"
              size={18}
            />
            <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]" />
          </div>
          <div className="relative bg-white/[0.06] p-2 rounded-full border border-gray-700/70">
            <GitBranch
              className="text-muted-foreground"
              size={18}
            />
            <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"></div>
          </div>
          <div className="relative bg-white/[0.06] p-2 rounded-full border border-gray-700/70">
            <Database
              className="text-muted-foreground"
              size={18}
            />
            <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"></div>
          </div>
          <div className="relative bg-white/[0.06] p-2 rounded-full border border-gray-700/70">
            <GitBranch
              className="text-muted-foreground"
              size={18}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center flex-col gap-8">
        <ModeToggle />
      </div>
    </nav>
  )
}

export default MenuOptions