"use client"

import React, { useState, useRef, useEffect } from "react"
import { ArrowUp, Paperclip, X, Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ScopeSelection {
  type: 'all' | 'client' | 'workflow'
  id?: string
  label: string
}

interface ChatComposerProps {
  onSendMessage: (query: string) => void
  placeholder?: string
  contextScopeText?: string
  onClearScope?: () => void
  suggestions?: string[]
  isCompact?: boolean
  currentScope?: ScopeSelection
  onSelectScope?: (scope: ScopeSelection) => void
}

export function InsteadChatComposer({
  onSendMessage,
  placeholder = "Ask Instead...",
  contextScopeText,
  onClearScope,
  suggestions = [],
  isCompact = false,
  currentScope = { type: 'all', label: 'All clients' },
  onSelectScope
}: ChatComposerProps) {
  const [input, setInput] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [isScopeDropdownOpen, setIsScopeDropdownOpen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const scopeDropdownRef = useRef<HTMLDivElement>(null)

  // Click outside to close scope dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (scopeDropdownRef.current && !scopeDropdownRef.current.contains(event.target as Node)) {
        setIsScopeDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSubmit = (textToSend?: string, e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const query = textToSend || input
    if (!query.trim() || isSending) return

    setIsSending(true)
    setTimeout(() => {
      onSendMessage(query.trim())
      setInput("")
      setIsSending(false)
    }, 150)
  }

  // Populate & submit prompt immediately when clicked
  const handleSuggestionClick = (prompt: string) => {
    setInput(prompt)
    handleSubmit(prompt)
  }

  const handleScopeChoice = (scope: ScopeSelection) => {
    if (onSelectScope) {
      onSelectScope(scope)
    }
    setIsScopeDropdownOpen(false)
  }

  const displayScopeLabel = contextScopeText || currentScope.label

  return (
    <div className="w-full space-y-2.5 font-sans">
      {/* Quiet Composer Surface */}
      <form 
        onSubmit={(e) => handleSubmit(undefined, e)}
        className={cn(
          "bg-[#FFFFFF] border border-[#E2DFD7] focus-within:border-[#24282C] focus-within:ring-1 focus-within:ring-[#24282C]/10 rounded-2xl transition-all duration-150 ease-out p-3.5 md:p-4 flex flex-col justify-between min-h-[110px]",
          isCompact ? "min-h-[90px] p-3" : "min-h-[110px] p-3.5 md:p-4"
        )}
      >
        <div>
          {/* Subtle First-Class Scope Control (Section 1) */}
          <div className="mb-2 text-xs text-[#656B73] flex items-center justify-between relative" ref={scopeDropdownRef}>
            <div className="flex items-center gap-1">
              <span>Scope:</span>
              <button
                type="button"
                onClick={() => setIsScopeDropdownOpen(!isScopeDropdownOpen)}
                className="text-[#24282C] font-medium hover:underline inline-flex items-center gap-1 py-0.5 px-1.5 rounded bg-[#FAF9F5] border border-[#E2DFD7] transition-colors duration-150"
              >
                <span>{displayScopeLabel}</span>
                <ChevronDown className={cn("w-3 h-3 text-[#717882] transition-transform duration-150", isScopeDropdownOpen && "rotate-180")} />
              </button>
            </div>

            {onClearScope && currentScope.type !== 'all' && (
              <button 
                type="button" 
                onClick={onClearScope}
                className="hover:text-[#24282C] transition-colors duration-150 flex items-center gap-1 text-xs"
              >
                <span>Reset scope</span>
                <X className="w-3 h-3 text-[#717882]" />
              </button>
            )}

            {/* Scope Selection Dropdown */}
            {isScopeDropdownOpen && (
              <div className="absolute left-0 top-full mt-1 w-64 bg-[#FFFFFF] border border-[#E2DFD7] rounded-xl p-1.5 shadow-sm transition-all duration-150 ease-out z-50 space-y-1 font-sans text-xs">
                {/* Option: All clients */}
                <button
                  type="button"
                  onClick={() => handleScopeChoice({ type: 'all', label: 'All clients' })}
                  className={cn(
                    "w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors duration-150",
                    currentScope.type === 'all'
                      ? "bg-[#FAF9F5] text-[#24282C] font-semibold"
                      : "hover:bg-[#FAF9F5] text-[#555C66]"
                  )}
                >
                  <span>All clients</span>
                  {currentScope.type === 'all' && <Check className="w-3.5 h-3.5 text-[#24282C]" />}
                </button>

                {/* Group: CLIENTS */}
                <div className="pt-1">
                  <div className="px-2.5 py-0.5 text-[10px] font-semibold text-[#8A9099] uppercase tracking-wider">
                    Clients
                  </div>
                  <button
                    type="button"
                    onClick={() => handleScopeChoice({ type: 'client', id: 'c-krishan', label: 'Krishan K · 1040' })}
                    className={cn(
                      "w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors duration-150",
                      currentScope.id === 'c-krishan'
                        ? "bg-[#FAF9F5] text-[#24282C] font-semibold"
                        : "hover:bg-[#FAF9F5] text-[#555C66]"
                    )}
                  >
                    <span>Krishan K</span>
                    <span className="text-[11px] text-[#8A9099]">1040</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleScopeChoice({ type: 'client', id: 'c-acme', label: 'Acme Holdings LLC · 1120-S' })}
                    className={cn(
                      "w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors duration-150",
                      currentScope.id === 'c-acme'
                        ? "bg-[#FAF9F5] text-[#24282C] font-semibold"
                        : "hover:bg-[#FAF9F5] text-[#555C66]"
                    )}
                  >
                    <span>Acme Holdings LLC</span>
                    <span className="text-[11px] text-[#8A9099]">1120-S</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleScopeChoice({ type: 'client', id: 'c-sarah', label: 'Sarah Chen · 1040' })}
                    className={cn(
                      "w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors duration-150",
                      currentScope.id === 'c-sarah'
                        ? "bg-[#FAF9F5] text-[#24282C] font-semibold"
                        : "hover:bg-[#FAF9F5] text-[#555C66]"
                    )}
                  >
                    <span>Sarah Chen</span>
                    <span className="text-[11px] text-[#8A9099]">1040</span>
                  </button>
                </div>

                {/* Group: WORKFLOWS */}
                <div className="pt-1">
                  <div className="px-2.5 py-0.5 text-[10px] font-semibold text-[#8A9099] uppercase tracking-wider">
                    Workflows
                  </div>
                  <button
                    type="button"
                    onClick={() => handleScopeChoice({ type: 'workflow', id: 'wf-q3-estimates', label: 'Q3 Estimated Tax Reminders' })}
                    className={cn(
                      "w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors duration-150",
                      currentScope.id === 'wf-q3-estimates'
                        ? "bg-[#FAF9F5] text-[#24282C] font-semibold"
                        : "hover:bg-[#FAF9F5] text-[#555C66]"
                    )}
                  >
                    <span className="truncate">Q3 Estimated Tax Reminders</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleScopeChoice({ type: 'workflow', id: 'wf-w2-followup', label: 'Missing W-2 & 1099 Follow-up' })}
                    className={cn(
                      "w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors duration-150",
                      currentScope.id === 'wf-w2-followup'
                        ? "bg-[#FAF9F5] text-[#24282C] font-semibold"
                        : "hover:bg-[#FAF9F5] text-[#555C66]"
                    )}
                  >
                    <span className="truncate">Missing W-2 & 1099 Follow-up</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit()
              }
            }}
            placeholder={
              currentScope.type === 'client'
                ? `Ask Instead about ${currentScope.label.split('·')[0].trim()}...`
                : currentScope.type === 'workflow'
                ? "Ask Instead about this workflow..."
                : placeholder
            }
            rows={2}
            className="w-full bg-transparent text-[#24282C] placeholder-[#8A9099] text-base focus:outline-none resize-none leading-relaxed tracking-tight font-normal"
          />
        </div>

        {/* Bottom Action Bar */}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            className="text-xs text-[#717882] hover:text-[#24282C] transition-colors duration-150 flex items-center gap-1.5 font-normal"
            title="Attach files"
          >
            <Paperclip className="w-3.5 h-3.5" />
            <span>Attach</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8A9099] font-mono hidden sm:inline">
              {isSending ? "Sending..." : "Return ↵"}
            </span>
            <button
              type="submit"
              disabled={!input.trim() || isSending}
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center transition-all duration-150 ease-out shrink-0",
                input.trim() && !isSending
                  ? "bg-[#24282C] text-[#FFFFFF] hover:bg-[#000000]"
                  : "bg-[#EFECE6] text-[#A0A6B0] cursor-not-allowed"
              )}
            >
              {isSending ? (
                <Check className="w-3.5 h-3.5 text-white" />
              ) : (
                <ArrowUp className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Suggested Prompts */}
      {suggestions.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap text-xs px-1 pt-0.5">
          <span className="text-[#8A9099]">Try asking Instead:</span>
          {suggestions.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestionClick(prompt)}
              className="text-[#555C66] hover:text-[#24282C] hover:underline font-normal transition-colors duration-150"
            >
              {prompt}{idx < suggestions.length - 1 ? " ·" : ""}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
