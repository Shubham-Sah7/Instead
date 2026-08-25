"use client"

import React, { useState } from "react"
import { 
  Home,
  Users, 
  Search, 
  Layers,
  Folder,
  Plus,
  MessageSquare,
  History,
  FileText,
  UserPlus,
  Sliders,
  PanelLeftClose,
  PanelLeft,
  ArrowUpRight,
  Hash
} from "lucide-react"
import { Client, Workflow } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface SidebarProps {
  clients: Client[]
  workflows: Workflow[]
  selectedClientId: string | null
  selectedWorkflowId: string | null
  activeTab: 'home' | 'client' | 'workflow'
  onSelectHome: () => void
  onSelectClient: (clientId: string) => void
  onSelectWorkflow: (workflowId: string) => void
  onOpenAllClients: () => void
  collapsed?: boolean
  onToggleCollapse?: () => void
}

export function InsteadSidebar({
  clients,
  workflows,
  selectedClientId,
  selectedWorkflowId,
  activeTab,
  onSelectHome,
  onSelectClient,
  onSelectWorkflow,
  onOpenAllClients,
  collapsed = false,
  onToggleCollapse
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredClients = clients.filter(client => {
    return client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           client.entityType.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const currentClient = clients.find(c => c.id === selectedClientId) || clients[0]

  return (
    <aside className={cn(
      "h-full bg-[#FAF9F5] flex flex-col transition-all duration-200 ease-out select-none relative z-20 font-sans text-[#24282C] shrink-0 border-r border-[#E8E5DC]/60",
      collapsed ? "w-20" : "w-[310px]"
    )}>
      {/* 1. TOP BRAND LOGO */}
      <div className={cn(
        "shrink-0 flex items-center transition-all duration-200 ease-out",
        collapsed ? "pt-6 pb-4 justify-center" : "pt-4 px-4 pb-3 justify-between"
      )}>
        <button 
          onClick={onSelectHome}
          className="flex items-center justify-center group transition-opacity duration-150 hover:opacity-80"
          title="instead Home"
        >
          <img 
            src="/instead-logo.png" 
            alt="instead" 
            className={cn("w-auto object-contain transition-all duration-200", collapsed ? "h-6" : "h-[30px]")} 
          />
        </button>
      </div>

      {/* 2. MAIN NAVIGATION BODY */}
      {!collapsed ? (
        /* EXPANDED MODE */
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden px-3.5 py-1.5 space-y-4.5">
          {/* Active Client Card Switcher */}
          <div className="bg-[#EFECE6]/75 border border-[#E4E1D8] rounded-2xl p-3 space-y-2.5 shrink-0 transition-colors duration-150">
            <button
              onClick={() => onSelectClient(currentClient.id)}
              className="w-full flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <ArrowUpRight className="w-3.5 h-3.5 text-[#717882] shrink-0 group-hover:text-[#24282C] transition-colors duration-150" />
                <span className="text-[14px] font-semibold text-[#24282C] truncate">
                  {currentClient.name}
                </span>
              </div>
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[#EBF7D4] text-[#24282C] font-medium shrink-0">
                {currentClient.entityType}
              </span>
            </button>

            {/* Sub Navigation Icons */}
            <div className="flex items-center gap-1.5 pt-0.5">
              <button
                onClick={() => onSelectWorkflow(workflows[0]?.id || 'wf-q3-estimates')}
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all duration-150 ease-out border",
                  activeTab === 'workflow'
                    ? "bg-[#FFFFFF] text-[#24282C] border-[#E2DFD7]"
                    : "text-[#555C66] border-transparent hover:bg-[#FFFFFF]/60"
                )}
              >
                <Layers className="w-3 h-3 text-[#717882]" />
                <span>Workflows</span>
              </button>

              <button
                onClick={onSelectHome}
                className="p-1.5 rounded-full text-[#555C66] hover:bg-[#FFFFFF]/60 transition-colors duration-150"
                title="Chat"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {}}
                className="p-1.5 rounded-full text-[#555C66] hover:bg-[#FFFFFF]/60 transition-colors duration-150"
                title="Docs"
              >
                <FileText className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenAllClients}
                className="p-1.5 rounded-full text-[#555C66] hover:bg-[#FFFFFF]/60 transition-colors duration-150 ml-auto"
                title="Add / Switch Client"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* TAX DOCS Section */}
          <div className="shrink-0 space-y-2">
            <div className="flex items-center justify-between px-1 text-xs text-[#8A9099] font-medium">
              <div className="flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-semibold">
                <FileText className="w-3.5 h-3.5 text-[#8A9099]" />
                <span>TAX DOCS</span>
              </div>
              <div className="flex items-center gap-2">
                <button title="History" className="hover:text-[#24282C] transition-colors duration-150"><History className="w-3 h-3" /></button>
                <button title="Search Docs" className="hover:text-[#24282C] transition-colors duration-150"><Search className="w-3 h-3" /></button>
                <button title="Add Doc" className="hover:text-[#24282C] transition-colors duration-150"><Plus className="w-3 h-3" /></button>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-[#555C66] pl-0.5">
              <div className="flex items-center gap-2 py-1 px-1.5 hover:bg-[#EFECE6] rounded-md transition-colors duration-150 cursor-pointer">
                <Folder className="w-3.5 h-3.5 text-[#8A9099]" />
                <span>2026</span>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-full py-1.5 px-3 flex items-center gap-1.5 text-xs text-[#24282C] font-medium cursor-pointer hover:bg-[#F7F6F0] transition-colors duration-150 w-full my-0.5">
                <Plus className="w-3 h-3 text-[#717882]" />
                <span>Upload files</span>
              </div>

              <div className="flex items-center gap-2 py-1 px-1.5 hover:bg-[#EFECE6] rounded-md transition-colors duration-150 cursor-pointer">
                <Folder className="w-3.5 h-3.5 text-[#8A9099]" />
                <span>2025</span>
              </div>
            </div>
          </div>

          {/* CLIENTS Directory Section */}
          <div className="flex-1 flex flex-col min-h-0 pt-1">
            <div className="flex items-center justify-between px-1 mb-2.5 shrink-0">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A9099]">
                CLIENTS
              </span>
              <button
                onClick={onOpenAllClients}
                className="text-xs text-[#555C66] hover:text-[#24282C] font-medium transition-colors duration-150"
              >
                + Add client
              </button>
            </div>

            {/* Compact Search Input */}
            <div className="px-0.5 mb-2.5 shrink-0">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8A9099]" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-8 bg-[#FFFFFF] border border-[#E2DFD7] rounded-md pl-7 pr-2.5 text-xs text-[#24282C] placeholder-[#A0A6B0] focus:outline-none focus:border-[#24282C] transition-colors duration-150 font-normal"
                />
              </div>
            </div>

            {/* Client List */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-1">
              {filteredClients.map((client) => {
                const isSelected = selectedClientId === client.id && activeTab === 'client'
                
                let attentionNote: string | null = null
                if (client.id === 'c-krishan') attentionNote = "Missing 2 docs"
                else if (client.id === 'c-acme') attentionNote = "Extension due Sep 15"
                else if (client.id === 'c-sarah') attentionNote = "Review required"

                return (
                  <button
                    key={client.id}
                    onClick={() => onSelectClient(client.id)}
                    className={cn(
                      "w-full text-left px-2.5 py-1.5 rounded-md transition-all duration-150 ease-out block group",
                      isSelected
                        ? "bg-[#EFECE6] text-[#24282C] font-medium"
                        : "hover:bg-[#EFECE6]/60 text-[#33383F]"
                    )}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[14px] font-normal text-[#24282C] truncate group-hover:text-[#24282C] transition-colors duration-150">
                        {client.name}
                      </span>
                      <span className="text-[12px] text-[#8A9099] font-normal shrink-0">
                        {client.entityType}
                      </span>
                    </div>

                    {attentionNote && (
                      <p className="text-[11px] text-[#656B73] truncate mt-0.5 font-normal">
                        {attentionNote}
                      </p>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* THREADS Section */}
          <div className="shrink-0 pt-3 border-t border-[#E8E5DC]/60 space-y-1.5">
            <div className="flex items-center justify-between px-1 text-xs text-[#8A9099]">
              <span className="text-[11px] uppercase tracking-wider font-semibold">THREADS</span>
              <button title="New Thread" className="hover:text-[#24282C] transition-colors duration-150"><Plus className="w-3 h-3" /></button>
            </div>

            <div className="flex items-center justify-between text-xs px-2 py-1 text-[#555C66] hover:bg-[#EFECE6] rounded-md transition-colors duration-150 cursor-pointer">
              <span>Untitled thread</span>
              <span className="text-[11px] text-[#8A9099]">2h</span>
            </div>
          </div>
        </div>
      ) : (
        /* REDESIGNED COLLAPSED NAVIGATION (Requirements 1 - 14) */
        <div className="flex-1 flex flex-col justify-between items-center py-2 px-2 min-h-0 overflow-hidden">
          {/* PRIMARY NAVIGATION GROUP (Top-aligned, compact 8px gap) */}
          <div className="flex flex-col items-center gap-2 pt-1 w-full">
            {/* 1. Home */}
            <div className="relative group flex items-center justify-center">
              <button
                onClick={onSelectHome}
                className={cn(
                  "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-150 ease-out",
                  activeTab === 'home'
                    ? "bg-[#EFECE6] text-[#24282C] font-semibold"
                    : "text-[#656B73] hover:bg-[#EFECE6]/60 hover:text-[#24282C]"
                )}
              >
                <Home className="w-5 h-5" />
              </button>
              <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute left-full ml-3 px-2.5 py-1 bg-[#24282C] text-[#FFFFFF] text-xs font-sans rounded-md shadow-sm whitespace-nowrap transition-opacity duration-150 z-50">
                Home
              </div>
            </div>

            {/* 2. Clients */}
            <div className="relative group flex items-center justify-center">
              <button
                onClick={() => onSelectClient(selectedClientId || clients[0].id)}
                className={cn(
                  "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-150 ease-out relative",
                  activeTab === 'client'
                    ? "bg-[#EFECE6] text-[#24282C] font-semibold"
                    : "text-[#656B73] hover:bg-[#EFECE6]/60 hover:text-[#24282C]"
                )}
              >
                <Users className="w-5 h-5" />
                {selectedClientId && (
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#24282C]" />
                )}
              </button>
              <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute left-full ml-3 px-2.5 py-1 bg-[#24282C] text-[#FFFFFF] text-xs font-sans rounded-md shadow-sm whitespace-nowrap transition-opacity duration-150 z-50">
                {selectedClientId && currentClient ? `Clients (${currentClient.name.split(' ')[0]})` : "Clients"}
              </div>
            </div>

            {/* 3. Workflows */}
            <div className="relative group flex items-center justify-center">
              <button
                onClick={() => onSelectWorkflow(selectedWorkflowId || workflows[0].id)}
                className={cn(
                  "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-150 ease-out",
                  activeTab === 'workflow'
                    ? "bg-[#EFECE6] text-[#24282C] font-semibold"
                    : "text-[#656B73] hover:bg-[#EFECE6]/60 hover:text-[#24282C]"
                )}
              >
                <Layers className="w-5 h-5" />
              </button>
              <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute left-full ml-3 px-2.5 py-1 bg-[#24282C] text-[#FFFFFF] text-xs font-sans rounded-md shadow-sm whitespace-nowrap transition-opacity duration-150 z-50">
                Workflows
              </div>
            </div>

            {/* 4. Tax Docs */}
            <div className="relative group flex items-center justify-center">
              <button
                onClick={() => {}}
                className="w-11 h-11 rounded-xl flex items-center justify-center text-[#656B73] hover:bg-[#EFECE6]/60 hover:text-[#24282C] transition-all duration-150 ease-out"
              >
                <FileText className="w-5 h-5" />
              </button>
              <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute left-full ml-3 px-2.5 py-1 bg-[#24282C] text-[#FFFFFF] text-xs font-sans rounded-md shadow-sm whitespace-nowrap transition-opacity duration-150 z-50">
                Tax Docs
              </div>
            </div>

            {/* 5. Threads */}
            <div className="relative group flex items-center justify-center">
              <button
                onClick={() => {}}
                className="w-11 h-11 rounded-xl flex items-center justify-center text-[#656B73] hover:bg-[#EFECE6]/60 hover:text-[#24282C] transition-all duration-150 ease-out"
              >
                <Hash className="w-5 h-5" />
              </button>
              <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute left-full ml-3 px-2.5 py-1 bg-[#24282C] text-[#FFFFFF] text-xs font-sans rounded-md shadow-sm whitespace-nowrap transition-opacity duration-150 z-50">
                Threads
              </div>
            </div>
          </div>

          {/* Flexible Space (Requirement 11) - pushes bottom controls to bottom */}
          <div className="flex-1 min-h-[20px]" />

          {/* BOTTOM CONTROLS GROUP (Aligned to exact same center axis - Requirement 8 & 9) */}
          <div className="flex flex-col items-center gap-2 pt-3 border-t border-[#E8E5DC]/60 w-full shrink-0">
            {/* Account Profile Avatar */}
            <div className="relative group flex items-center justify-center my-0.5">
              <div className="w-8 h-8 rounded-full bg-[#E8E5DC] text-[#24282C] font-semibold text-[11px] flex items-center justify-center cursor-pointer transition-colors duration-150 hover:bg-[#DFDCD2]">
                SS
              </div>
              <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute left-full ml-3 px-2.5 py-1 bg-[#24282C] text-[#FFFFFF] text-xs font-sans rounded-md shadow-sm whitespace-nowrap transition-opacity duration-150 z-50">
                Shubham S. (Account)
              </div>
            </div>

            {/* Settings */}
            <div className="relative group flex items-center justify-center">
              <button
                onClick={() => {}}
                className="w-11 h-11 rounded-xl flex items-center justify-center text-[#717882] hover:bg-[#EFECE6]/60 hover:text-[#24282C] transition-all duration-150 ease-out"
              >
                <Sliders className="w-5 h-5" />
              </button>
              <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute left-full ml-3 px-2.5 py-1 bg-[#24282C] text-[#FFFFFF] text-xs font-sans rounded-md shadow-sm whitespace-nowrap transition-opacity duration-150 z-50">
                Settings
              </div>
            </div>

            {/* Expand / Collapse Toggle */}
            {onToggleCollapse && (
              <div className="relative group flex items-center justify-center">
                <button
                  onClick={onToggleCollapse}
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-[#717882] hover:bg-[#EFECE6]/60 hover:text-[#24282C] transition-all duration-150 ease-out"
                >
                  <PanelLeft className="w-5 h-5" />
                </button>
                <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute left-full ml-3 px-2.5 py-1 bg-[#24282C] text-[#FFFFFF] text-xs font-sans rounded-md shadow-sm whitespace-nowrap transition-opacity duration-150 z-50">
                  Expand Sidebar
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. EXPANDED FOOTER ONLY */}
      {!collapsed && (
        <div className="p-3.5 border-t border-[#E8E5DC]/60 flex items-center justify-between text-xs text-[#717882] shrink-0 bg-[#FAF9F5]">
          <div className="flex items-center justify-between w-full">
            <div className="w-6 h-6 rounded-full bg-[#E8E5DC] text-[#24282C] font-semibold text-[11px] flex items-center justify-center">
              SS
            </div>

            <div className="flex items-center gap-3 text-[#717882]">
              <button title="Invite User" className="hover:text-[#24282C] transition-colors duration-150"><UserPlus className="w-3.5 h-3.5" /></button>
              <button title="Settings" className="hover:text-[#24282C] transition-colors duration-150"><Sliders className="w-3.5 h-3.5" /></button>
              {onToggleCollapse && (
                <button onClick={onToggleCollapse} title="Collapse Sidebar" className="hover:text-[#24282C] transition-colors duration-150">
                  <PanelLeftClose className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
