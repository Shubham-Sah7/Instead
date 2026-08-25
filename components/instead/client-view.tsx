"use client"

import React, { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { Client, Workflow, ChatMessage } from "@/lib/mock-data"
import { InsteadChatComposer } from "./chat-composer"
import { cn } from "@/lib/utils"

interface ClientViewProps {
  client: Client
  activeWorkflow?: Workflow
  onBackToHome: () => void
  onOpenWorkflow: (workflowId: string) => void
}

export function InsteadClientView({
  client,
  activeWorkflow,
  onBackToHome,
  onOpenWorkflow
}: ClientViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isThinking, setIsThinking] = useState(false)
  const [isSent, setIsSent] = useState(false)

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

      if (qLower.includes("missing") || qLower.includes("still missing") || qLower.includes("return")) {
        aiReplyText = `Two documents are still missing from Krishan's 2026 return:\n\n• W-2\n• 1099-INT\n\nThe return preparation workflow is currently waiting on these documents.`
        actions = [
          { label: "Request missing documents →", type: "action", actionId: "draft-req" }
        ]
      } else if (qLower.includes("draft") || qLower.includes("follow-up") || qLower.includes("request") || qLower.includes("draft-req")) {
        aiReplyText = `Follow-up drafted:\n\n"Hi Krishan, we're still missing your W-2 and 1099-INT to continue preparing your return."`
        actions = [
          { label: "Edit draft", type: "action", actionId: "edit" },
          { label: "Send follow-up", type: "action", actionId: "send-followup" }
        ]
      } else if (qLower.includes("review") || qLower.includes("next") || qLower.includes("should i review")) {
        aiReplyText = `Once the W-2 and 1099-INT arrive, the next step is to review the income section and continue the 1040 preparation.`
        actions = [
          { label: "Open 1040 workflow →", type: "workflow", targetId: "wf-krishan-1040" }
        ]
      } else {
        aiReplyText = `I don't have enough information in this prototype to answer that reliably.`
        actions = [
          { label: "Ask about this client", type: "filter" },
          { label: "View client details", type: "filter" }
        ]
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
    if (act.actionId === 'draft-req') {
      handleSendMessage("Draft a follow-up for the missing documents")
    } else if (act.actionId === 'send-followup') {
      setIsSent(true)
      setTimeout(() => setIsSent(false), 2000)
    } else if (act.targetId) {
      onOpenWorkflow(act.targetId)
    }
  }

  // Dynamic details per client
  const isKrishan = client.id === 'c-krishan'
  const isAcme = client.id === 'c-acme'

  return (
    <div className="max-w-3xl mx-auto space-y-7 py-2 font-sans text-[#24282C]">
      {/* 1. Client Identity Header (Libre Baskerville Major Heading) */}
      <div className="space-y-0.5">
        <div className="flex items-baseline gap-2">
          <h1 className="text-3xl md:text-3xl font-serif font-normal text-[#24282C] tracking-tight">
            {client.name}
          </h1>
          <span className="text-xs text-[#717882] font-mono">
            {client.entityType}
          </span>
        </div>
        <p className="text-xs text-[#717882] font-normal">
          {isKrishan ? "Return in progress" : isAcme ? "Extension preparation" : "Return review required"}
        </p>
      </div>

      {/* 2. Contextual Chat — Primary Action */}
      <InsteadChatComposer
        onSendMessage={handleSendMessage}
        placeholder={`Ask Instead about ${client.name.split(' ')[0]}...`}
        contextScopeText={`${client.name} · ${client.entityType}`}
        onClearScope={onBackToHome}
        suggestions={
          isKrishan
            ? [
                "What is still missing from Krishan's return?",
                "Draft a follow-up for the missing documents",
                "What should I review next?"
              ]
            : [
                "Review Form 7004 extension details",
                "Check prior year tax payments",
                "File extension with IRS"
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
              Discussion · {client.name}
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
                        <span>{act.actionId === 'send-followup' && isSent ? "Follow-up sent ✓" : act.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Small Clear NEXT Action (Section 2) */}
      <section className="space-y-1 pt-1">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[#8A9099]">
          NEXT
        </h2>
        <button
          onClick={() => handleSendMessage("Draft a follow-up for the missing documents")}
          className="text-sm font-medium text-[#24282C] hover:underline inline-flex items-center gap-1 group"
        >
          <span>{isKrishan ? "Request the 2 missing documents" : "Review extension details"}</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#24282C] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </section>

      {/* 4. Needs Attention */}
      <section className="space-y-1.5 pt-1">
        <h2 className="text-base font-sans font-semibold text-[#24282C]">
          Needs attention
        </h2>
        <div className="flex items-baseline justify-between text-xs">
          <div className="space-y-0.5">
            <p className="text-[15px] font-normal text-[#24282C]">
              {isKrishan ? "2 documents missing" : isAcme ? "Form 7004 extension filing due Sep 15" : "Form 8879 authorization required"}
            </p>
            <div className="text-[#656B73] font-normal space-y-0.5">
              {isKrishan ? (
                <>
                  <p>• W-2</p>
                  <p>• 1099-INT</p>
                </>
              ) : (
                <p>• Prior year tax voucher verification pending</p>
              )}
            </div>
          </div>
          <button
            onClick={() => handleSendMessage(isKrishan ? "Draft a follow-up for the missing documents" : "Review extension details")}
            className="text-xs text-[#24282C] font-normal hover:underline shrink-0 ml-4 inline-flex items-center gap-1 group"
          >
            <span>{isKrishan ? "Request documents" : "Review details"}</span>
            <ArrowRight className="w-3 h-3 text-[#24282C] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* 5. Current Work */}
      <section className="space-y-2 pt-1">
        <h2 className="text-base font-sans font-semibold text-[#24282C]">
          Current work
        </h2>
        <div className="space-y-2 text-xs">
          <div className="flex items-baseline justify-between">
            <button
              onClick={() => onOpenWorkflow(activeWorkflow?.id || 'wf-krishan-1040')}
              className="text-left font-sans text-[15px] font-medium text-[#24282C] hover:underline inline-flex items-center gap-1 group"
            >
              <span>{isAcme ? "Form 7004 Extension Preparation" : "1040 Tax Return Preparation"}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#24282C] group-hover:translate-x-0.5 transition-transform" />
            </button>
            <span className="text-[#656B73]">
              {isKrishan ? "3 of 7 steps complete" : "4 of 4 steps complete"}
            </span>
          </div>

          <p className="text-[#656B73]">
            Current step: <span className="text-[#24282C] font-medium">{isKrishan ? "Document review" : "Review extension details"}</span>
          </p>

          {/* Sequence */}
          <div className="space-y-1 text-xs text-[#656B73] pt-1 pl-1">
            <div className="flex items-center justify-between max-w-sm">
              <span>Client information</span>
              <span className="text-[#24282C]">Complete</span>
            </div>
            <div className="flex items-center justify-between max-w-sm">
              <span>Income documents</span>
              <span className="text-[#24282C]">Complete</span>
            </div>
            <div className="flex items-center justify-between max-w-sm">
              <span className="text-[#24282C] font-medium">Document review</span>
              <span className="text-[#24282C] font-medium">Current</span>
            </div>
            <div className="flex items-center justify-between max-w-sm">
              <span>Return preparation</span>
              <span className="text-[#8A9099]">Next</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Documents */}
      <section className="space-y-1.5 pt-1">
        <h2 className="text-base font-sans font-semibold text-[#24282C]">
          Documents
        </h2>
        <div className="space-y-1.5 text-xs">
          <p className="text-[15px] font-normal text-[#24282C]">
            {isKrishan ? "12 received · 2 missing" : "8 received · Complete"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5 text-[#656B73]">
            <div>
              <p className="text-[#8A9099] font-medium mb-0.5">Received:</p>
              <ul className="space-y-0.5">
                <li>• W-2</li>
                <li>• 1099</li>
                <li>• 1099-INT</li>
              </ul>
            </div>
            {isKrishan && (
              <div>
                <p className="text-[#8A9099] font-medium mb-0.5">Missing:</p>
                <ul className="space-y-0.5 text-[#24282C]">
                  <li>• W-2</li>
                  <li>• 1099-INT</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
