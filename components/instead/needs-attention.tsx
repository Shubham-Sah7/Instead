"use client"

import React, { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { NeedsAttentionItem } from "@/lib/mock-data"

interface NeedsAttentionProps {
  items: NeedsAttentionItem[]
  onSelectClient: (clientId: string) => void
  onResolveInChat: (item: NeedsAttentionItem) => void
}

export function InsteadNeedsAttention({
  items,
  onSelectClient,
  onResolveInChat
}: NeedsAttentionProps) {
  const [clickedId, setClickedId] = useState<string | null>(null)

  const handleActionClick = (item: NeedsAttentionItem) => {
    setClickedId(item.id)
    setTimeout(() => {
      onResolveInChat(item)
      setClickedId(null)
    }, 250)
  }

  return (
    <section className="space-y-2 font-sans pt-1">
      {/* Section Heading & Supporting Text */}
      <div className="flex items-baseline justify-between">
        <h2 className="text-[#24282C] font-sans text-base font-semibold tracking-tight">
          Needs attention
        </h2>
        <span className="text-xs text-[#8A9099] font-normal">
          {items.length} clients need action
        </span>
      </div>

      {/* Clean Compact Rows with Subtle 150ms Hover & Action Feedback */}
      <div className="space-y-2">
        {items.map((item) => {
          let lineMeta = ""
          let actionText = "Request documents"

          if (item.clientId === 'c-krishan') {
            lineMeta = "1040 · Missing 2 documents"
            actionText = "Request documents"
          } else if (item.clientId === 'c-acme') {
            lineMeta = "1120-S · Extension due Sep 15"
            actionText = "Draft Form 7004"
          } else if (item.clientId === 'c-sarah') {
            lineMeta = "1040 · Review required"
            actionText = "Review return"
          } else {
            lineMeta = `${item.entityType} · ${item.reason}`
            actionText = item.actionText
          }

          const isClicked = clickedId === item.id

          return (
            <div
              key={item.id}
              className="py-1 px-1 rounded-md transition-all duration-150 ease-out hover:bg-[#FFFFFF]/60 flex items-baseline justify-between group"
            >
              <div className="space-y-0.5">
                <button
                  onClick={() => onSelectClient(item.clientId)}
                  className="text-left font-sans text-[15px] font-medium text-[#24282C] hover:underline block transition-colors duration-150"
                >
                  {item.clientName}
                </button>
                <p className="text-xs text-[#656B73] font-normal">
                  {lineMeta}
                </p>
              </div>

              <button
                onClick={() => handleActionClick(item)}
                className="text-xs text-[#24282C] font-medium hover:underline shrink-0 ml-4 inline-flex items-center gap-1 transition-colors duration-150"
              >
                <span>{isClicked ? "Requested" : actionText}</span>
                {isClicked ? (
                  <Check className="w-3 h-3 text-[#24282C]" />
                ) : (
                  <ArrowRight className="w-3 h-3 text-[#24282C] group-hover:translate-x-1 transition-transform duration-150 ease-out" />
                )}
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
