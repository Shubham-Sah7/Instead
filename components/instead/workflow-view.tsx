"use client"

import React, { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Workflow, ChatMessage } from "@/lib/mock-data"
import { InsteadChatComposer } from "./chat-composer"
import { cn } from "@/lib/utils"

interface WorkflowViewProps {
  workflow: Workflow
  onBackToHome: () => void
  onSelectClient: (clientId: string) => void
}

export function InsteadWorkflowView({
  workflow,
  onBackToHome,
  onSelectClient
}: WorkflowViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isThinking, setIsThinking] = useState(false)

  const isSingleClient = workflow.scope === 'single-client' || workflow.id === 'wf-krishan-1040' || workflow.id === 'wf-acme-ext'

  const handleSendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now'
    }

    setMessages(prev => [...prev, userMsg])
    setIsThinking(true)

    // 400ms subtle thinking state
    setTimeout(() => {
      let aiReplyText = ""
      let actions: ChatMessage['actions'] = []

      const qLower = text.toLowerCase()

      if (isSingleClient) {
        if (qLower.includes("block") || qLower.includes("missing")) {
          aiReplyText = `Return is currently blocked by 2 missing documents:\n• W-2 (Stripe Inc)\n• 1099-INT (First Republic Bank)`
          actions = [
            { label: "Request missing documents →", type: "client", targetId: "c-krishan" }
          ]
        } else if (qLower.includes("draft") || qLower.includes("request")) {
          aiReplyText = `Drafted upload request for Krishan K. Ready to dispatch.`
        } else {
          aiReplyText = `Current step is Document Review (Step 3 of 7).`
        }
      } else {
        if (qLower.includes("status") || qLower.includes("progress")) {
          aiReplyText = `Q3 Estimated Tax Reminders is in progress.\n\n12 of 18 clients are complete.\n4 clients are pending.\n2 clients need attention.\n\nThe workflow is due Sep 15.`
          actions = [
            { label: "View 2 clients needing attention →", type: "action", actionId: "view-attention" }
          ]
        } else if (qLower.includes("attention") || qLower.includes("who") || qLower.includes("pending")) {
          aiReplyText = `2 clients need attention:\n\n• Acme Holdings LLC — Waiting for extension information\n• Sarah Chen — Pending review`
          actions = [
            { label: "View Acme Holdings →", type: "client", targetId: "c-acme" },
            { label: "View Sarah Chen →", type: "client", targetId: "c-sarah" }
          ]
        } else {
          aiReplyText = `I don't have enough information in this prototype to answer that reliably.`
          actions = [
            { label: "Ask about this workflow", type: "filter" }
          ]
        }
      }

      const aiMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: aiReplyText,
        timestamp: 'Just now',
        actions
      }

      setMessages(prev => [...prev, aiMsg])
      setIsThinking(false)
    }, 400)
  }

  const handleActionClick = (act: NonNullable<ChatMessage['actions']>[number]) => {
    if (act.actionId === 'view-attention') {
      handleSendMessage("Who needs attention?")
    } else if (act.targetId) {
      onSelectClient(act.targetId)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-7 py-2 font-sans text-[#24282C]">
      {/* 1. Workflow Header (Libre Baskerville Heading) */}
      <div className="space-y-0.5">
        <h1 className="text-3xl md:text-3xl font-serif font-normal text-[#24282C] tracking-tight">
          {workflow.title}
        </h1>
        <p className="text-xs text-[#717882] font-normal">
          {isSingleClient ? (
            <span>
              For{" "}
              <button 
                onClick={() => onSelectClient(workflow.clientId || 'c-krishan')} 
                className="underline hover:text-[#24282C]"
              >
                {workflow.clientName || 'Krishan K'}
              </button>
              {" "}· In progress
            </span>
          ) : (
            `Across ${workflow.clientCount || 18} clients · Due ${workflow.dueDate}`
          )}
        </p>
      </div>

      {/* 2. Contextual Chat — Primary Action */}
      <InsteadChatComposer
        onSendMessage={handleSendMessage}
        placeholder={isSingleClient ? "Ask Instead about Krishan's 1040 preparation..." : "Ask Instead about Q3 Estimated Tax Reminders..."}
        contextScopeText={isSingleClient ? "Krishan's 1040 preparation" : "Q3 Estimated Tax Reminders"}
        onClearScope={onBackToHome}
        suggestions={
          isSingleClient
            ? [
                "What is blocking this return?",
                "Draft a request for the missing documents",
                "Check Schedule C Sole-Prop details"
              ]
            : [
                "What's the status of this workflow?",
                "Which clients are still pending?",
                "Who needs attention?"
              ]
        }
      />

      {/* Thinking Loading State Indicator */}
      {isThinking && (
        <div className="text-xs text-[#717882] font-sans px-1 py-0.5 animate-pulse">
          Instead is thinking...
        </div>
      )}

      {/* Interactive Discussion Log */}
      {messages.length > 0 && (
        <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-xl p-3.5 space-y-3 transition-all duration-200 ease-out">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#F0EEE6]">
            <span className="text-xs font-medium text-[#8A9099]">
              Discussion · Workflow
            </span>
            <button 
              onClick={() => setMessages([])}
              className="text-xs text-[#8A9099] hover:text-[#24282C] transition-colors duration-150"
            >
              Clear
            </button>
          </div>

          <div className="space-y-3">
            {messages.map((msg) => (
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
                  <div className="flex items-center gap-2.5 mt-2.5 pt-2 border-t border-[#E2DFD7]/80 flex-wrap">
                    {msg.actions.map((act, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleActionClick(act)}
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

      {/* 3. WORKFLOW CONTENT */}
      {isSingleClient ? (
        /* SINGLE-CLIENT WORKFLOW */
        <div className="space-y-6 pt-1">
          <section className="space-y-1">
            <h2 className="text-base font-sans font-semibold text-[#24282C]">
              Workflow status
            </h2>
            <p className="text-[15px] font-normal text-[#24282C]">
              3 of 7 steps complete
            </p>
            <p className="text-xs text-[#656B73]">
              Current step: <span className="text-[#24282C] font-medium">Document review</span>
            </p>
          </section>

          <section className="space-y-1.5 text-xs">
            <h2 className="text-base font-sans font-semibold text-[#24282C]">
              Sequence
            </h2>
            <div className="space-y-1 text-[#656B73]">
              <div className="flex items-center justify-between max-w-sm">
                <span>Client information</span>
                <span className="text-[#24282C]">✓ Completed</span>
              </div>
              <div className="flex items-center justify-between max-w-sm">
                <span>Income documents</span>
                <span className="text-[#24282C]">✓ Completed</span>
              </div>
              <div className="flex items-center justify-between max-w-sm font-medium text-[#24282C]">
                <span>Document review</span>
                <span>Current</span>
              </div>
              <div className="flex items-center justify-between max-w-sm text-[#8A9099]">
                <span>Return preparation</span>
                <span>Next</span>
              </div>
            </div>
          </section>

          <section className="space-y-1.5 pt-1">
            <h2 className="text-base font-sans font-semibold text-[#24282C]">
              Blocked
            </h2>
            <div className="flex items-baseline justify-between text-xs">
              <div className="space-y-0.5 text-[#656B73]">
                <p>• W-2</p>
                <p>• 1099-INT</p>
              </div>
              <button
                onClick={() => handleSendMessage("Draft a request for the missing documents")}
                className="text-xs text-[#24282C] font-normal hover:underline shrink-0 ml-4 inline-flex items-center gap-1 group"
              >
                <span>Draft request</span>
                <ArrowRight className="w-3 h-3 text-[#24282C] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </section>
        </div>
      ) : (
        /* CROSS-CLIENT WORKFLOW (Section 3) */
        <div className="space-y-6 pt-1">
          {/* Workflow Status */}
          <section className="space-y-1">
            <h2 className="text-base font-sans font-semibold text-[#24282C]">
              Workflow status
            </h2>
            <div className="space-y-0.5 text-xs text-[#656B73]">
              <p className="text-[15px] font-normal text-[#24282C]">18 clients total</p>
              <p>12 ready · 4 waiting on information · 2 need review</p>
            </div>
          </section>

          {/* Client Breakdown by Group with Group Actions */}
          <section className="space-y-4 pt-1">
            <h2 className="text-base font-sans font-semibold text-[#24282C]">
              Clients
            </h2>

            {/* READY (12) */}
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between border-b border-[#F0EEE6] pb-1">
                <h3 className="text-xs font-semibold text-[#8A9099] uppercase tracking-wider">
                  READY · 12
                </h3>
                <button
                  onClick={() => handleSendMessage("Send Q3 estimate reminders to 12 ready clients")}
                  className="text-xs text-[#24282C] font-medium hover:underline inline-flex items-center gap-1 group"
                >
                  <span>Send to 12 clients</span>
                  <ArrowRight className="w-3 h-3 text-[#24282C] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
              <div className="space-y-1 text-xs">
                <div 
                  onClick={() => onSelectClient('c-krishan')} 
                  className="py-1 flex items-baseline justify-between cursor-pointer group hover:underline"
                >
                  <span className="font-sans text-[15px] font-medium text-[#24282C]">Krishan K</span>
                  <span className="text-[#656B73] inline-flex items-center gap-1">
                    <span>Ready to send</span>
                    <ArrowRight className="w-3 h-3 text-[#24282C] group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
                <div 
                  onClick={() => onSelectClient('c-acme')} 
                  className="py-1 flex items-baseline justify-between cursor-pointer group hover:underline"
                >
                  <span className="font-sans text-[15px] font-medium text-[#24282C]">Acme Holdings LLC</span>
                  <span className="text-[#656B73] inline-flex items-center gap-1">
                    <span>Ready to send</span>
                    <ArrowRight className="w-3 h-3 text-[#24282C] group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>

            {/* WAITING ON INFORMATION (4) */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-baseline justify-between border-b border-[#F0EEE6] pb-1">
                <h3 className="text-xs font-semibold text-[#8A9099] uppercase tracking-wider">
                  WAITING ON INFORMATION · 4
                </h3>
                <button
                  onClick={() => handleSendMessage("Follow up with 4 waiting clients")}
                  className="text-xs text-[#24282C] font-medium hover:underline inline-flex items-center gap-1 group"
                >
                  <span>Follow up with 4</span>
                  <ArrowRight className="w-3 h-3 text-[#24282C] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
              <div className="space-y-1 text-xs">
                <div 
                  onClick={() => onSelectClient('c-sarah')} 
                  className="py-1 flex items-baseline justify-between cursor-pointer group hover:underline"
                >
                  <span className="font-sans text-[15px] font-medium text-[#24282C]">Sarah Chen</span>
                  <span className="text-[#656B73]">Missing income information</span>
                </div>
                <div 
                  onClick={() => onSelectClient('c-greentree')} 
                  className="py-1 flex items-baseline justify-between cursor-pointer group hover:underline"
                >
                  <span className="font-sans text-[15px] font-medium text-[#24282C]">Green Tree Foundation</span>
                  <span className="text-[#656B73]">Awaiting confirmation</span>
                </div>
              </div>
            </div>

            {/* NEEDS REVIEW (2) */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-baseline justify-between border-b border-[#F0EEE6] pb-1">
                <h3 className="text-xs font-semibold text-[#8A9099] uppercase tracking-wider">
                  NEEDS REVIEW · 2
                </h3>
                <button
                  onClick={() => handleSendMessage("Who needs attention?")}
                  className="text-xs text-[#24282C] font-medium hover:underline inline-flex items-center gap-1 group"
                >
                  <span>Review 2</span>
                  <ArrowRight className="w-3 h-3 text-[#24282C] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
              <div className="space-y-1 text-xs">
                <div 
                  onClick={() => onSelectClient('c-vanguard')} 
                  className="py-1 flex items-baseline justify-between cursor-pointer group hover:underline"
                >
                  <span className="font-sans text-[15px] font-medium text-[#24282C]">Vanguard BioTech Partners</span>
                  <span className="text-[#656B73]">Review required</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-[#717882]">
              <span>Showing 5 of 18 clients</span>
              <button
                onClick={() => handleSendMessage("Who needs attention?")}
                className="text-xs text-[#24282C] font-normal hover:underline inline-flex items-center gap-1 group"
              >
                <span>View all 18 clients</span>
                <ArrowRight className="w-3 h-3 text-[#24282C] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
