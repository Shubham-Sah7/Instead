"use client"

import React, { useState } from "react"
import { InsteadSidebar } from "@/components/instead/sidebar"
import { InsteadHeader } from "@/components/instead/header"
import { InsteadChatComposer, ScopeSelection } from "@/components/instead/chat-composer"
import { InsteadNeedsAttention } from "@/components/instead/needs-attention"
import { InsteadActiveWork } from "@/components/instead/active-work"
import { InsteadClientView } from "@/components/instead/client-view"
import { InsteadWorkflowView } from "@/components/instead/workflow-view"
import { InsteadViewAllClientsModal } from "@/components/instead/view-all-clients-modal"
import { 
  MOCK_CLIENTS, 
  MOCK_WORKFLOWS, 
  MOCK_NEEDS_ATTENTION, 
  ChatMessage,
  NeedsAttentionItem 
} from "@/lib/mock-data"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function HomeWorkspace() {
  const [activeTab, setActiveTab] = useState<'home' | 'client' | 'workflow'>('home')
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null)
  const [isAllClientsOpen, setIsAllClientsOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Scope State inside Chat (Requirement 1 - 3)
  const [currentHomeScope, setCurrentHomeScope] = useState<ScopeSelection>({
    type: 'all',
    label: 'All clients'
  })

  // Scoped chat state for home
  const [homeMessages, setHomeMessages] = useState<ChatMessage[]>([])
  const [isThinking, setIsThinking] = useState(false)

  const selectedClient = MOCK_CLIENTS.find(c => c.id === selectedClientId)
  const selectedWorkflow = MOCK_WORKFLOWS.find(w => w.id === selectedWorkflowId)

  // 1. Navigation Handlers
  const handleSelectHome = () => {
    setActiveTab('home')
    setSelectedClientId(null)
    setSelectedWorkflowId(null)
    setCurrentHomeScope({ type: 'all', label: 'All clients' })
  }

  const handleSelectClient = (clientId: string) => {
    setSelectedClientId(clientId)
    setSelectedWorkflowId(null)
    setActiveTab('client')
  }

  const handleSelectWorkflow = (workflowId: string) => {
    setSelectedWorkflowId(workflowId)
    setActiveTab('workflow')
  }

  const handleResolveNeedsAttention = (item: NeedsAttentionItem) => {
    handleSelectClient(item.clientId)
  }

  // Handle Chat Scope Selection (Section 1, 2, 3)
  const handleScopeSelect = (scope: ScopeSelection) => {
    setCurrentHomeScope(scope)
  }

  // 2. Functional Home Chat Query Handler (Context 1)
  const handleHomeSendMessage = (query: string) => {
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    }

    setHomeMessages(prev => [...prev, userMsg])
    setIsThinking(true)

    // 400ms subtle thinking state
    setTimeout(() => {
      let replyText = ""
      let actions: ChatMessage['actions'] = []

      const qLower = query.toLowerCase()

      // Dynamic response based on current selected scope
      if (currentHomeScope.type === 'client' && currentHomeScope.id === 'c-krishan') {
        if (qLower.includes("missing") || qLower.includes("document") || qLower.includes("status")) {
          replyText = "Two documents are still missing from Krishan's 2026 return:\n• W-2\n• 1099-INT\n\nThe return preparation workflow is currently waiting on these documents."
          actions = [
            { label: "Open client →", type: "client", targetId: "c-krishan" }
          ]
        } else {
          replyText = "Krishan K (1040) is currently at Step 3 of 7 (Document Review). Missing 2 wage statements."
          actions = [
            { label: "Open client →", type: "client", targetId: "c-krishan" }
          ]
        }
      } else if (currentHomeScope.type === 'workflow' && currentHomeScope.id === 'wf-q3-estimates') {
        replyText = "Q3 Estimated Tax Reminders is in progress.\n\n12 of 18 clients are complete.\n4 clients are pending.\n2 clients need attention.\n\nThe workflow is due Sep 15."
        actions = [
          { label: "Open workflow →", type: "workflow", targetId: "wf-q3-estimates" }
        ]
      } else {
        // Scope = All clients
        if (qLower.includes("attention") || qLower.includes("need") || qLower.includes("today")) {
          replyText = "3 clients need your attention today:\n\n• Krishan K — Missing W-2 and 1099-INT (Overdue)\n• Acme Holdings LLC — Form 7004 extension due Sep 15\n• Sarah Chen — Return review pending\n\nI can help you follow up with any of them."
          actions = [
            { label: "View Krishan →", type: "client", targetId: "c-krishan" },
            { label: "View Acme Holdings →", type: "client", targetId: "c-acme" },
            { label: "View Sarah →", type: "client", targetId: "c-sarah" }
          ]
        } else if (qLower.includes("send") || qLower.includes("estimate") || qLower.includes("q3")) {
          replyText = "Q3 Estimated Tax Reminders workflow is in progress.\n12 of 18 clients are complete, 4 pending, and 2 need attention.\n\nDispatching Q3 estimate reminders to 12 ready clients. Confirmation queued."
          actions = [
            { label: "View Q3 Workflow →", type: "workflow", targetId: "wf-q3-estimates" }
          ]
        } else if (qLower.includes("krishan") || qLower.includes("document")) {
          replyText = "Krishan K is missing 2 documents for 2026 1040 preparation: W-2 (Stripe Inc) and 1099-INT (First Republic Bank)."
          actions = [
            { label: "View Krishan →", type: "client", targetId: "c-krishan" }
          ]
        } else {
          replyText = "I don't have enough information in this prototype to answer that reliably."
          actions = [
            { label: "Ask about clients", type: "filter" },
            { label: "Ask about workflow", type: "workflow", targetId: "wf-q3-estimates" }
          ]
        }
      }

      const aiMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: 'Just now',
        actions
      }

      setHomeMessages(prev => [...prev, aiMsg])
      setIsThinking(false)
    }, 400)
  }

  return (
    <div className="flex flex-col h-screen bg-[#FAF9F5] text-[#24282C] overflow-hidden font-sans">
      {/* Top App Workspace Shell */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* 1. Left Navigation Rail */}
        <InsteadSidebar
          clients={MOCK_CLIENTS}
          workflows={MOCK_WORKFLOWS}
          selectedClientId={selectedClientId}
          selectedWorkflowId={selectedWorkflowId}
          activeTab={activeTab}
          onSelectHome={handleSelectHome}
          onSelectClient={handleSelectClient}
          onSelectWorkflow={handleSelectWorkflow}
          onOpenAllClients={() => setIsAllClientsOpen(true)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* 2. Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#FAF9F5]">
          {/* Quiet Header */}
          <InsteadHeader
            activeTab={activeTab}
            clientName={selectedClient?.name}
            entityType={selectedClient?.entityType}
            workflowTitle={selectedWorkflow?.title}
            onSelectHome={handleSelectHome}
            onSelectClient={handleSelectClient}
            onSelectWorkflow={handleSelectWorkflow}
            onOpenSearch={() => setIsAllClientsOpen(true)}
          />

          {/* Main Workspace Canvas */}
          <main className="flex-1 overflow-y-auto p-6 md:p-10 transition-opacity duration-200 ease-out">
            {/* STATE 1: HOME / OVERVIEW */}
            {activeTab === 'home' && (
              <div className="max-w-3xl mx-auto space-y-6 py-2 transition-opacity duration-200 ease-out">
                {/* Greeting Header — Dynamic based on Scope (Section 2 & 3) */}
                <div className="space-y-0.5">
                  <h1 className="text-xl md:text-2xl font-serif tracking-tight leading-tight">
                    <span className="font-bold text-[#24282C]">Good morning, Shubham. </span>
                    <span className="font-normal text-[#656B73]">
                      {currentHomeScope.type === 'client'
                        ? `Working with ${currentHomeScope.label.split('·')[0].trim()}`
                        : currentHomeScope.type === 'workflow'
                        ? `Working on ${currentHomeScope.label}`
                        : "What are we working on?"}
                    </span>
                  </h1>
                  <p className="text-xs text-[#717882] font-normal pt-0.5">
                    Ask Instead to work across your clients, documents, and workflows.
                  </p>
                </div>

                {/* Chat Hero Composer with Scope Selector (Section 1) */}
                <InsteadChatComposer
                  onSendMessage={handleHomeSendMessage}
                  currentScope={currentHomeScope}
                  onSelectScope={handleScopeSelect}
                  onClearScope={() => setCurrentHomeScope({ type: 'all', label: 'All clients' })}
                  placeholder={
                    currentHomeScope.type === 'client'
                      ? `Ask Instead about ${currentHomeScope.label.split('·')[0].trim()}...`
                      : currentHomeScope.type === 'workflow'
                      ? "Ask Instead about this workflow..."
                      : "Ask Instead..."
                  }
                  suggestions={
                    currentHomeScope.type === 'client'
                      ? [
                          "What is still missing from Krishan's return?",
                          "Draft a follow-up for the missing documents",
                          "What should I review next?"
                        ]
                      : currentHomeScope.type === 'workflow'
                      ? [
                          "What's the status of this workflow?",
                          "Which clients are still pending?",
                          "Who needs attention?"
                        ]
                      : [
                          "Which clients need attention today?",
                          "Send Q3 estimate reminders",
                          "What documents are missing for Krishan?"
                        ]
                  }
                />

                {/* Thinking Loading State Indicator */}
                {isThinking && (
                  <div className="text-xs text-[#717882] font-sans px-1 py-0.5 animate-pulse">
                    Instead is thinking...
                  </div>
                )}

                {/* Discussion Log */}
                {homeMessages.length > 0 && (
                  <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-xl p-3.5 space-y-3 transition-all duration-200 ease-out">
                    <div className="flex items-center justify-between pb-1.5 border-b border-[#F0EEE6]">
                      <span className="text-xs font-medium text-[#8A9099]">
                        Discussion · {currentHomeScope.label}
                      </span>
                      <button 
                        onClick={() => setHomeMessages([])}
                        className="text-xs text-[#8A9099] hover:text-[#24282C] transition-colors duration-150"
                      >
                        Clear
                      </button>
                    </div>

                    <div className="space-y-3">
                      {homeMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={cn(
                            "p-3 rounded-xl text-xs leading-relaxed max-w-2xl font-normal transition-all duration-150",
                            msg.sender === 'user'
                              ? "bg-[#EFECE6] text-[#24282C] ml-auto border border-[#E2DFD7]"
                              : "bg-[#FAF9F5] text-[#24282C] border border-[#F0EEE6]"
                          )}
                        >
                          <div className="flex items-center justify-between mb-1.5 text-[10px] text-[#717882] font-mono">
                            <span>{msg.sender === 'user' ? 'You' : 'Instead'}</span>
                            <span>{msg.timestamp}</span>
                          </div>
                          <p className="whitespace-pre-line text-sm font-normal text-[#24282C]">{msg.text}</p>

                          {msg.actions && msg.actions.length > 0 && (
                            <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-[#E2DFD7]/80 flex-wrap">
                              {msg.actions.map((act, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    if (act.type === 'client' && act.targetId) handleSelectClient(act.targetId)
                                    else if (act.type === 'workflow' && act.targetId) handleSelectWorkflow(act.targetId)
                                    else setIsAllClientsOpen(true)
                                  }}
                                  className="text-xs text-[#24282C] font-medium hover:underline inline-flex items-center gap-1 transition-colors duration-150"
                                >
                                  <span>{act.label}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SCOPE-BASED HOME CONTENT (Section 2 & 3) */}
                {currentHomeScope.type === 'client' && currentHomeScope.id === 'c-krishan' ? (
                  /* Focused Krishan K Scope Summary on Home */
                  <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-2xl p-4 space-y-3 font-sans transition-all duration-200">
                    <div className="flex items-baseline justify-between">
                      <h2 className="text-base font-semibold text-[#24282C]">
                        Krishan K Context
                      </h2>
                      <span className="text-xs text-[#717882] font-mono">1040</span>
                    </div>

                    <div className="space-y-1.5 text-xs text-[#656B73]">
                      <p className="text-[14px] text-[#24282C] font-normal">• Missing 2 documents (W-2 & 1099-INT)</p>
                      <p>• 1040 return in progress (3 of 7 steps complete)</p>
                      <p>• Next action: request W-2 + 1099-INT</p>
                    </div>

                    <button
                      onClick={() => handleSelectClient('c-krishan')}
                      className="text-xs text-[#24282C] font-medium hover:underline inline-flex items-center gap-1 pt-1"
                    >
                      <span>Open client</span>
                      <ArrowRight className="w-3 h-3 text-[#24282C]" />
                    </button>
                  </div>
                ) : currentHomeScope.type === 'workflow' && currentHomeScope.id === 'wf-q3-estimates' ? (
                  /* Focused Q3 Workflow Scope Summary on Home */
                  <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-2xl p-4 space-y-3 font-sans transition-all duration-200">
                    <div className="flex items-baseline justify-between">
                      <h2 className="text-base font-semibold text-[#24282C]">
                        Q3 Estimated Tax Reminders
                      </h2>
                      <span className="text-xs text-[#717882] font-mono">Due Sep 15</span>
                    </div>

                    <div className="space-y-1.5 text-xs text-[#656B73]">
                      <p className="text-[14px] text-[#24282C] font-normal">18 clients enrolled</p>
                      <p>12 of 18 complete · 4 pending · 2 need attention</p>
                    </div>

                    <button
                      onClick={() => handleSelectWorkflow('wf-q3-estimates')}
                      className="text-xs text-[#24282C] font-medium hover:underline inline-flex items-center gap-1 pt-1"
                    >
                      <span>Open workflow</span>
                      <ArrowRight className="w-3 h-3 text-[#24282C]" />
                    </button>
                  </div>
                ) : (
                  /* Default All Clients Scope Content */
                  <>
                    <InsteadNeedsAttention
                      items={MOCK_NEEDS_ATTENTION}
                      onSelectClient={handleSelectClient}
                      onResolveInChat={handleResolveNeedsAttention}
                    />

                    <InsteadActiveWork
                      workflows={MOCK_WORKFLOWS}
                      onSelectWorkflow={handleSelectWorkflow}
                      onSelectClient={handleSelectClient}
                    />
                  </>
                )}
              </div>
            )}

            {/* STATE 2: CLIENT SCOPED STATE */}
            {activeTab === 'client' && selectedClient && (
              <div className="transition-opacity duration-200 ease-out">
                <InsteadClientView
                  client={selectedClient}
                  activeWorkflow={MOCK_WORKFLOWS.find(w => w.clientId === selectedClient.id || w.id === selectedClient.activeWorkflowId)}
                  onBackToHome={handleSelectHome}
                  onOpenWorkflow={handleSelectWorkflow}
                />
              </div>
            )}

            {/* STATE 3 & 4: WORKFLOW VIEW STATE */}
            {activeTab === 'workflow' && selectedWorkflow && (
              <div className="transition-opacity duration-200 ease-out">
                <InsteadWorkflowView
                  workflow={selectedWorkflow}
                  onBackToHome={handleSelectHome}
                  onSelectClient={handleSelectClient}
                />
              </div>
            )}
          </main>
        </div>
      </div>


      {/* Directory Modal */}
      <InsteadViewAllClientsModal
        isOpen={isAllClientsOpen}
        onClose={() => setIsAllClientsOpen(false)}
        clients={MOCK_CLIENTS}
        onSelectClient={handleSelectClient}
      />
    </div>
  )
}
