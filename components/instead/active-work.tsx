"use client"

import React from "react"
import { ArrowRight } from "lucide-react"
import { Workflow } from "@/lib/mock-data"

interface ActiveWorkProps {
  workflows: Workflow[]
  onSelectWorkflow: (workflowId: string) => void
  onSelectClient: (clientId: string) => void
}

export function InsteadActiveWork({
  workflows,
  onSelectWorkflow,
  onSelectClient
}: ActiveWorkProps) {
  return (
    <section className="space-y-2 font-sans pt-1">
      {/* Section Heading & Supporting Text */}
      <div className="flex items-baseline justify-between">
        <h2 className="text-[#24282C] font-sans text-base font-semibold tracking-tight">
          Active work
        </h2>
        <span className="text-xs text-[#8A9099] font-normal">
          {workflows.length} workflows in progress
        </span>
      </div>

      {/* Visually Quieter Rows with 150ms Smooth Hover */}
      <div className="space-y-2">
        {workflows.map((wf) => {
          let lineMeta = ""
          if (wf.id === 'wf-q3-estimates') {
            lineMeta = "Across 18 clients · Due Sep 15"
          } else if (wf.id === 'wf-w2-followup') {
            lineMeta = "Across 7 clients · In progress"
          } else if (wf.id === 'wf-krishan-1040') {
            lineMeta = "For Krishan K · In progress"
          } else if (wf.id === 'wf-acme-ext') {
            lineMeta = "For Acme Holdings · In progress"
          } else {
            lineMeta = wf.scope === 'cross-client' 
              ? `Across ${wf.clientCount || 18} clients · Due ${wf.dueDate}`
              : `For ${wf.clientName || 'one client'} · In progress`
          }

          return (
            <div
              key={wf.id}
              onClick={() => onSelectWorkflow(wf.id)}
              className="py-1 px-1 rounded-md cursor-pointer flex items-baseline justify-between transition-all duration-150 ease-out hover:bg-[#FFFFFF]/60 group"
            >
              <div className="space-y-0.5">
                <h3 className="font-sans text-[14px] font-medium text-[#24282C] group-hover:underline transition-colors duration-150">
                  {wf.title}
                </h3>
                <p className="text-xs text-[#656B73] font-normal">
                  {lineMeta}
                </p>
              </div>

              <span className="text-xs text-[#24282C] font-normal group-hover:underline shrink-0 ml-4 inline-flex items-center gap-1 transition-colors duration-150">
                <span>View workflow</span>
                <ArrowRight className="w-3 h-3 text-[#24282C] group-hover:translate-x-1 transition-transform duration-150 ease-out" />
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
