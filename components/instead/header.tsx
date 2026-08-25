"use client"

import React, { useState, useRef, useEffect } from "react"
import { 
  Search, 
  ChevronRight, 
  ChevronDown,
  Check,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"

interface HeaderProps {
  activeTab: 'home' | 'client' | 'workflow'
  clientName?: string
  entityType?: string
  workflowTitle?: string
  onSelectHome: () => void
  onSelectClient: (id: string) => void
  onSelectWorkflow: (id: string) => void
  onOpenSearch?: () => void
}

export function InsteadHeader({
  activeTab,
  clientName,
  entityType,
  workflowTitle,
  onSelectHome,
  onSelectClient,
  onSelectWorkflow,
  onOpenSearch
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="h-11 border-b border-[#E2DFD7]/60 bg-[#FAF9F5] px-6 flex items-center justify-between shrink-0 sticky top-0 z-10 font-sans">
      {/* Left Area: Screen Switcher & Context Breadcrumbs */}
      <div className="flex items-center gap-3 text-xs">
        {/* Prototype-Only Screen Switcher Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="px-2 py-1 rounded bg-[#EFECE6]/80 hover:bg-[#EFECE6] border border-[#E2DFD7] text-[#24282C] font-medium flex items-center gap-1.5 transition-colors duration-150"
            title="Switch Prototype Screen"
          >
            <span>Workspace</span>
            <ChevronDown className={cn("w-3 h-3 text-[#717882] transition-transform duration-150", isDropdownOpen && "rotate-180")} />
          </button>

          {/* Clean Prototype Screen Dropdown Menu (120-160ms transition) */}
          {isDropdownOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-64 bg-[#FFFFFF] border border-[#E2DFD7] rounded-xl p-1.5 shadow-sm transition-all duration-150 ease-out z-50 space-y-0.5 font-sans">
              <div className="px-2 py-1 text-[10px] font-semibold text-[#8A9099] uppercase tracking-wider">
                Prototype Views
              </div>

              {/* Option 1: Home */}
              <button
                onClick={() => {
                  onSelectHome()
                  setIsDropdownOpen(false)
                }}
                className={cn(
                  "w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors duration-150",
                  activeTab === 'home'
                    ? "bg-[#FAF9F5] text-[#24282C] font-medium"
                    : "hover:bg-[#FAF9F5] text-[#555C66]"
                )}
              >
                <span>Home</span>
                {activeTab === 'home' && (
                  <span className="w-2 h-2 rounded-full bg-[#C2EF72] border border-[#24282C]/20" />
                )}
              </button>

              {/* Option 2: Client - Krishan K */}
              <button
                onClick={() => {
                  onSelectClient('c-krishan')
                  setIsDropdownOpen(false)
                }}
                className={cn(
                  "w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors duration-150",
                  activeTab === 'client'
                    ? "bg-[#FAF9F5] text-[#24282C] font-medium"
                    : "hover:bg-[#FAF9F5] text-[#555C66]"
                )}
              >
                <span>Client - Krishan K</span>
                {activeTab === 'client' && (
                  <span className="w-2 h-2 rounded-full bg-[#C2EF72] border border-[#24282C]/20" />
                )}
              </button>

              {/* Option 3: Workflow - Q3 Estimated Tax Reminders */}
              <button
                onClick={() => {
                  onSelectWorkflow('wf-q3-estimates')
                  setIsDropdownOpen(false)
                }}
                className={cn(
                  "w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors duration-150",
                  activeTab === 'workflow'
                    ? "bg-[#FAF9F5] text-[#24282C] font-medium"
                    : "hover:bg-[#FAF9F5] text-[#555C66]"
                )}
              >
                <span className="truncate">Workflow - Q3 Estimated Tax Reminders</span>
                {activeTab === 'workflow' && (
                  <span className="w-2 h-2 rounded-full bg-[#C2EF72] border border-[#24282C]/20 shrink-0 ml-1" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Separator Slash */}
        <span className="text-[#D0CDC5]">/</span>

        {/* Breadcrumb Context Path */}
        <button 
          onClick={onSelectHome}
          className="text-[#717882] hover:text-[#24282C] transition-colors duration-150 font-normal"
        >
          Home
        </button>

        {activeTab === 'client' && clientName && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-[#A3A8B0]" />
            <div className="flex items-center gap-1.5 text-[#24282C] font-normal">
              <span>{clientName}</span>
              {entityType && (
                <span className="text-[11px] text-[#717882] font-mono">
                  ({entityType})
                </span>
              )}
              <button 
                onClick={onSelectHome}
                className="hover:text-[#24282C] ml-1 transition-colors duration-150"
                title="Return to Home"
              >
                <X className="w-3 h-3 text-[#717882]" />
              </button>
            </div>
          </>
        )}

        {activeTab === 'workflow' && workflowTitle && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-[#A3A8B0]" />
            <div className="flex items-center gap-1.5 text-[#24282C] font-normal">
              <span className="max-w-[240px] truncate">{workflowTitle}</span>
              <button 
                onClick={onSelectHome}
                className="hover:text-[#24282C] ml-1 transition-colors duration-150"
                title="Return to Home"
              >
                <X className="w-3 h-3 text-[#717882]" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Right Area: Quick Search Shortcut */}
      <div className="flex items-center gap-2">
        <button 
          onClick={onOpenSearch}
          className="px-2 py-1 rounded hover:bg-[#EFECE6] text-[#717882] hover:text-[#24282C] transition-colors duration-150 flex items-center gap-1.5 text-xs font-normal"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline font-mono text-[11px]">Cmd+K</span>
        </button>
      </div>
    </header>
  )
}
