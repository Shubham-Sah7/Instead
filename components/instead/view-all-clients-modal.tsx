"use client"

import React, { useState } from "react"
import { Search, X, Users, ArrowRight } from "lucide-react"
import { Client } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface ViewAllClientsModalProps {
  isOpen: boolean
  onClose: () => void
  clients: Client[]
  onSelectClient: (clientId: string) => void
}

export function InsteadViewAllClientsModal({
  isOpen,
  onClose,
  clients,
  onSelectClient
}: ViewAllClientsModalProps) {
  const [search, setSearch] = useState("")
  const [entityFilter, setEntityFilter] = useState("ALL")

  if (!isOpen) return null

  const generatedClients: Client[] = Array.from({ length: 240 }).map((_, idx) => {
    const types: ('1040' | '1120-S' | '1065' | '990')[] = ['1040', '1120-S', '1065', '990']
    const type = types[idx % 4]
    const statuses: ('Needs Attention' | 'Active Work' | 'Completed')[] = ['Active Work', 'Completed', 'Needs Attention']
    const status = statuses[idx % 3]
    return {
      id: `c-gen-${idx}`,
      name: `Client #${100 + idx} ${type === '1040' ? 'Family Trust' : type === '1120-S' ? 'Holdings Corp' : 'Partnership'}`,
      entityType: type,
      taxYear: 'TY2025',
      status: status,
      lastActive: `${(idx % 7) + 1} days ago`,
      assignedStaff: idx % 2 === 0 ? 'Shubham S.' : 'Elena R.',
    }
  })

  const fullBook = [...clients, ...generatedClients]

  const filtered = fullBook.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                          c.entityType.toLowerCase().includes(search.toLowerCase())
    const matchesEntity = entityFilter === 'ALL' || c.entityType === entityFilter
    return matchesSearch && matchesEntity
  })

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 font-sans text-[#24282C]">
      <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col shadow-xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#E2DFD7] flex items-center justify-between bg-[#F7F6F0]">
          <div>
            <h2 className="text-lg font-serif font-bold text-[#24282C]">Client Directory</h2>
            <p className="text-xs text-[#717882]">
              Showing {filtered.length} of 248 total clients
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EFECE6] text-[#717882] hover:text-[#24282C] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-[#E2DFD7] bg-[#FAF9F5] flex flex-col sm:flex-row gap-3 items-center justify-between text-xs">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#717882]" />
            <input
              type="text"
              placeholder="Search clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#E2DFD7] rounded-md pl-9 pr-3 py-1.5 text-xs text-[#24282C] placeholder-[#8A9099] focus:outline-none focus:border-[#24282C]"
            />
          </div>

          <div className="flex items-center gap-1">
            {['ALL', '1040', '1120-S', '1065', '990'].map(t => (
              <button
                key={t}
                onClick={() => setEntityFilter(t)}
                className={cn(
                  "px-2.5 py-1 rounded transition text-xs font-medium",
                  entityFilter === t ? "bg-[#24282C] text-[#FFFFFF]" : "text-[#717882] hover:bg-[#EFECE6]"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Client List */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {filtered.slice(0, 30).map((client) => (
              <div
                key={client.id}
                onClick={() => {
                  onSelectClient(client.id)
                  onClose()
                }}
                className="p-3 bg-[#FFFFFF] border border-[#E2DFD7] hover:border-[#24282C] rounded-lg transition cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <h3 className="font-medium text-[#24282C] group-hover:underline">{client.name}</h3>
                  <span className="text-[11px] text-[#717882] font-mono">{client.entityType} • {client.assignedStaff}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#717882]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
