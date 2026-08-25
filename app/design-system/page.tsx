"use client"

import React, { useState } from "react"
import { InsteadSidebar } from "@/components/instead/sidebar"
import { InsteadHeader } from "@/components/instead/header"
import { InsteadDesignSystemView } from "@/components/instead/design-system-view"
import { InsteadViewAllClientsModal } from "@/components/instead/view-all-clients-modal"
import { MOCK_CLIENTS, MOCK_WORKFLOWS } from "@/lib/mock-data"
import { useRouter } from "next/navigation"

export default function DesignSystemPage() {
  const router = useRouter()
  const [isAllClientsOpen, setIsAllClientsOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-[#FAF9F5] text-[#24282C] overflow-hidden font-sans">
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Left Sidebar */}
        <InsteadSidebar
          clients={MOCK_CLIENTS}
          workflows={MOCK_WORKFLOWS}
          selectedClientId={null}
          selectedWorkflowId={null}
          activeTab="home"
          onSelectHome={() => router.push('/')}
          onSelectClient={() => router.push('/')}
          onSelectWorkflow={() => router.push('/')}
          onOpenAllClients={() => setIsAllClientsOpen(true)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#FAF9F5]">
          <InsteadHeader
            activeTab="design-system"
            onSelectHome={() => router.push('/')}
            onSelectClient={() => router.push('/')}
            onSelectWorkflow={() => router.push('/')}
            onSelectDesignSystem={() => router.push('/design-system')}
            onOpenSearch={() => setIsAllClientsOpen(true)}
          />

          <main className="flex-1 overflow-y-auto p-6 md:p-10">
            <InsteadDesignSystemView onBackToHome={() => router.push('/')} />
          </main>
        </div>
      </div>

      <InsteadViewAllClientsModal
        isOpen={isAllClientsOpen}
        onClose={() => setIsAllClientsOpen(false)}
        clients={MOCK_CLIENTS}
        onSelectClient={() => router.push('/')}
      />
    </div>
  )
}
