"use client"

import React from "react"
import { ArrowRight, Check, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface PresentationViewProps {
  onSelectScreen?: (screen: 'home' | 'client' | 'workflow') => void
}

export function InsteadPresentationView({ onSelectScreen }: PresentationViewProps) {
  return (
    <div className="max-w-[1400px] mx-auto space-y-16 py-8 px-4 font-sans text-[#24282C]">
      {/* ================================================== */}
      {/* HEADER & INTRO */}
      {/* ================================================== */}
      <header className="border-b border-[#E2DFD7] pb-8 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono text-[#8A9099] uppercase tracking-widest block">
            INSTEAD PRO · UX CASE STUDY & DESIGN BOARD
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-[#24282C] tracking-tight">
            Product Thinking & Design Decisions
          </h1>
          <p className="text-base font-sans text-[#656B73] max-w-3xl pt-1 leading-relaxed">
            "I designed the experience around one core idea: help a Pro understand what needs attention, understand the context, and move directly into action."
          </p>
        </div>

        {/* Intro Conceptual Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Flow 1: DISCOVER → UNDERSTAND → ACT */}
          <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-2xl p-4 flex items-center justify-between text-xs">
            <span className="font-mono text-[#8A9099] uppercase text-[10px]">Product Journey</span>
            <div className="flex items-center gap-2 font-medium text-[#24282C]">
              <span>DISCOVER</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8A9099]" />
              <span>UNDERSTAND</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8A9099]" />
              <span className="text-[#24282C] bg-[#C2EF72] px-2 py-0.5 rounded-full">ACT</span>
            </div>
          </div>

          {/* Flow 2: Home → Client → Workflow → Chat */}
          <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-2xl p-4 flex items-center justify-between text-xs">
            <span className="font-mono text-[#8A9099] uppercase text-[10px]">Context Hierarchy</span>
            <div className="flex items-center gap-2 font-medium text-[#24282C]">
              <span>Home</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8A9099]" />
              <span>Client</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8A9099]" />
              <span>Workflow</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8A9099]" />
              <span className="font-semibold text-[#24282C]">Chat</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#717882] italic">
          "The three screens represent different levels of context within the same workspace."
        </p>
      </header>

      {/* ================================================== */}
      {/* SECTION 01 — HOME */}
      {/* ================================================== */}
      <section className="space-y-6">
        <div className="border-b border-[#E2DFD7] pb-3">
          <h2 className="text-2xl font-serif text-[#24282C]">
            01 — HOME
          </h2>
          <p className="text-sm text-[#656B73] font-sans">
            "What should I work on right now?"
          </p>
        </div>

        {/* Screen Showcase with Surrounding Annotations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column Callouts */}
          <div className="lg:col-span-4 space-y-4">
            {/* CALLOUT 01 — CHAT */}
            <div className="bg-[#FFFFFF] border border-[#24282C] rounded-2xl p-4 space-y-2 relative shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#717882] uppercase">Callout 01</span>
                <span className="text-[10px] font-semibold bg-[#24282C] text-[#FFFFFF] px-2 py-0.5 rounded-full">
                  Primary Interaction
                </span>
              </div>
              <h3 className="text-sm font-semibold text-[#24282C]">CHAT IS THE STARTING POINT</h3>
              <p className="text-xs text-[#656B73] leading-relaxed">
                "Chat is the primary interaction model in the brief, so I gave it the strongest position rather than treating it like a support widget."
              </p>
              <div className="pt-1 border-t border-[#F0EEE6] flex items-center gap-1.5 text-[11px] font-medium text-[#24282C]">
                <span className="text-[#8A9099] font-mono">DECISION:</span>
                <span>Make chat the primary entry point.</span>
              </div>
            </div>

            {/* CALLOUT 02 — SCOPE */}
            <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-2xl p-4 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#717882] uppercase">Callout 02</span>
                <span className="text-[10px] font-mono text-[#656B73] bg-[#F7F6F0] px-2 py-0.5 rounded-full border border-[#E2DFD7]">
                  Scope Control
                </span>
              </div>
              <h3 className="text-sm font-semibold text-[#24282C]">CONTEXT BEFORE CONVERSATION</h3>
              <p className="text-xs text-[#656B73] leading-relaxed">
                "The scope tells the Pro what Instead is currently working across. This keeps chat useful without forcing the user to repeatedly explain the context."
              </p>
              <div className="pt-1 border-t border-[#F0EEE6] flex items-center gap-1.5 text-[11px] font-medium text-[#24282C]">
                <span className="text-[#8A9099] font-mono">DECISION:</span>
                <span>Chat understands whether I'm talking about whole book, a client, or a workflow.</span>
              </div>
            </div>

            {/* CALLOUT 05 — CLIENT RAIL */}
            <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-2xl p-4 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#717882] uppercase">Callout 05</span>
                <span className="text-[10px] font-mono text-[#656B73] bg-[#F7F6F0] px-2 py-0.5 rounded-full border border-[#E2DFD7]">
                  Navigation Rail
                </span>
              </div>
              <h3 className="text-sm font-semibold text-[#24282C]">KEEP THE BOOK VISIBLE</h3>
              <p className="text-xs text-[#656B73] leading-relaxed">
                "I didn't want the Pro to lose the feeling of managing a client book, but I also didn't want 200 clients to dominate Home."
              </p>
              <div className="pt-1 border-t border-[#F0EEE6] flex items-center gap-1.5 text-[11px] font-medium text-[#24282C]">
                <span className="text-[#8A9099] font-mono">DECISION:</span>
                <span>Keep client book accessible without making it the main canvas.</span>
              </div>
            </div>
          </div>

          {/* Center Column: UI Preview Card */}
          <div className="lg:col-span-8 space-y-4">
            <div 
              onClick={() => onSelectScreen && onSelectScreen('home')}
              className="bg-[#FAF9F5] border border-[#E2DFD7] rounded-2xl p-6 shadow-sm space-y-5 cursor-pointer hover:border-[#24282C] transition-all group relative"
            >
              <div className="flex items-center justify-between border-b border-[#E2DFD7] pb-3">
                <span className="text-xs font-serif font-bold text-[#24282C] flex items-center gap-2">
                  <span>SCREEN 01 — HOME WORKSPACE HERO</span>
                  <span className="text-[10px] font-sans font-normal text-[#717882] group-hover:underline">Click to view full screen →</span>
                </span>
                <span className="text-[11px] font-mono text-[#8A9099]">Scope: All clients</span>
              </div>

              {/* UI Mockup Content */}
              <div className="space-y-4 font-sans text-xs">
                <div>
                  <h3 className="text-lg font-serif">
                    <span className="font-bold text-[#24282C]">Good morning, Shubham. </span>
                    <span className="font-normal text-[#656B73]">What are we working on?</span>
                  </h3>
                </div>

                {/* Chat Composer Element */}
                <div className="bg-[#FFFFFF] border border-[#24282C] rounded-2xl p-3.5 space-y-2">
                  <div className="text-[11px] text-[#656B73] flex items-center justify-between">
                    <span>Scope: <span className="text-[#24282C] font-medium px-1.5 py-0.5 rounded bg-[#FAF9F5] border border-[#E2DFD7]">All clients ▾</span></span>
                  </div>
                  <p className="text-sm text-[#8A9099]">Which clients need attention today?</p>
                </div>

                {/* Needs Attention Element */}
                <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-2xl p-3.5 space-y-2">
                  <h4 className="font-semibold text-[#24282C]">Needs attention</h4>
                  <div className="flex items-center justify-between text-xs border-t border-[#F0EEE6] pt-2">
                    <div>
                      <p className="font-medium text-[#24282C]">Krishan K · 1040</p>
                      <p className="text-[#656B73]">Missing W-2 and 1099-INT</p>
                    </div>
                    <span className="text-[#24282C] font-medium underline">Request documents →</span>
                  </div>
                </div>

                {/* Active Work Element */}
                <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-2xl p-3.5 space-y-2">
                  <h4 className="font-semibold text-[#24282C]">Active work</h4>
                  <div className="flex items-center justify-between text-xs border-t border-[#F0EEE6] pt-2">
                    <div>
                      <p className="font-medium text-[#24282C]">Q3 Estimated Tax Reminders</p>
                      <p className="text-[#656B73]">Across 18 clients · Due Sep 15</p>
                    </div>
                    <span className="text-[#24282C] font-medium underline">View workflow →</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row Callouts for Home */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* CALLOUT 03 — NEEDS ATTENTION */}
              <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-2xl p-4 space-y-2">
                <span className="text-[10px] font-mono text-[#717882] uppercase">Callout 03</span>
                <h3 className="text-xs font-semibold text-[#24282C]">SURFACE ACTION</h3>
                <p className="text-[11px] text-[#656B73] leading-relaxed">
                  "The main workspace prioritizes clients that actually require attention over a wall of rows."
                </p>
              </div>

              {/* CALLOUT 04 — ACTIVE WORK */}
              <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-2xl p-4 space-y-2">
                <span className="text-[10px] font-mono text-[#717882] uppercase">Callout 04</span>
                <h3 className="text-xs font-semibold text-[#24282C]">SEPARATE CLIENTS & WORK</h3>
                <p className="text-[11px] text-[#656B73] leading-relaxed">
                  "A client is who you work for; a workflow is the work being performed."
                </p>
              </div>

              {/* CALLOUT 06 — HIERARCHY */}
              <div className="bg-[#FFFFFF] border border-[#24282C] rounded-2xl p-4 space-y-2">
                <span className="text-[10px] font-mono text-[#717882] uppercase">Callout 06</span>
                <h3 className="text-xs font-semibold text-[#24282C]">HOME HIERARCHY</h3>
                <div className="flex items-center gap-1 text-[10px] font-bold text-[#24282C] pt-1">
                  <span>CHAT</span> → <span>ATTENTION</span> → <span>WORK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 02 — CLIENT CONTEXT */}
      {/* ================================================== */}
      <section className="space-y-6 pt-6">
        <div className="border-b border-[#E2DFD7] pb-3">
          <h2 className="text-2xl font-serif text-[#24282C]">
            02 — CLIENT CONTEXT
          </h2>
          <p className="text-sm text-[#656B73] font-sans">
            "What's happening with this client?"
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* UI Preview Card */}
          <div className="lg:col-span-8 space-y-4">
            <div 
              onClick={() => onSelectScreen && onSelectScreen('client')}
              className="bg-[#FAF9F5] border border-[#E2DFD7] rounded-2xl p-6 shadow-sm space-y-5 cursor-pointer hover:border-[#24282C] transition-all group"
            >
              <div className="flex items-center justify-between border-b border-[#E2DFD7] pb-3">
                <span className="text-xs font-serif font-bold text-[#24282C] flex items-center gap-2">
                  <span>SCREEN 02 — KRISHAN K · 1040 CONTEXT</span>
                  <span className="text-[10px] font-sans font-normal text-[#717882] group-hover:underline">Click to view full screen →</span>
                </span>
                <span className="text-[11px] font-mono text-[#8A9099]">Scope: Krishan K · 1040</span>
              </div>

              <div className="space-y-4 font-sans text-xs">
                <div>
                  <h3 className="text-2xl font-serif text-[#24282C]">Krishan K</h3>
                  <p className="text-xs text-[#717882]">1040 · Return in progress</p>
                </div>

                {/* NEXT BEST ACTION Element */}
                <div className="bg-[#FFFFFF] border border-[#24282C] rounded-2xl p-3.5 space-y-1">
                  <span className="text-[10px] font-semibold text-[#8A9099] uppercase">NEXT BEST ACTION</span>
                  <p className="text-sm font-medium text-[#24282C] underline">Request the 2 missing documents →</p>
                </div>

                {/* Needs Attention & Work */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-2xl p-3 space-y-1">
                    <h4 className="font-semibold text-[#24282C]">Needs attention</h4>
                    <p className="text-xs text-[#656B73]">• W-2 · Missing</p>
                    <p className="text-xs text-[#656B73]">• 1099-INT · Missing</p>
                  </div>
                  <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-2xl p-3 space-y-1">
                    <h4 className="font-semibold text-[#24282C]">Current work</h4>
                    <p className="text-xs font-medium text-[#24282C]">1040 Tax Return Preparation</p>
                    <p className="text-[11px] text-[#656B73]">2 of 7 steps complete</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Callouts */}
          <div className="lg:col-span-4 space-y-4">
            {/* CALLOUT 01 — CLIENT IDENTITY */}
            <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-2xl p-4 space-y-2">
              <span className="text-[10px] font-mono text-[#717882] uppercase">Callout 01</span>
              <h3 className="text-xs font-semibold text-[#24282C]">ESTABLISH CONTEXT FIRST</h3>
              <p className="text-xs text-[#656B73] leading-relaxed">
                "The Pro should immediately know which client and return they are working on before taking any action."
              </p>
            </div>

            {/* CALLOUT 02 — NEXT BEST ACTION */}
            <div className="bg-[#FFFFFF] border border-[#24282C] rounded-2xl p-4 space-y-2">
              <span className="text-[10px] font-mono text-[#717882] uppercase">Callout 02</span>
              <h3 className="text-xs font-semibold text-[#24282C]">TURN A BLOCKER INTO AN ACTION</h3>
              <p className="text-xs text-[#656B73] leading-relaxed">
                "Instead of simply telling the Pro that something is missing, I surface the most obvious next step."
              </p>
            </div>

            {/* CALLOUT 06 — CONTEXTUAL CHAT */}
            <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-2xl p-4 space-y-2">
              <span className="text-[10px] font-mono text-[#717882] uppercase">Callout 06</span>
              <h3 className="text-xs font-semibold text-[#24282C]">CHAT CHANGES WITH CONTEXT</h3>
              <p className="text-xs text-[#656B73] leading-relaxed">
                "Once the Pro enters a client, the conversation becomes automatically scoped to that client."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 03 — WORKFLOW */}
      {/* ================================================== */}
      <section className="space-y-6 pt-6">
        <div className="border-b border-[#E2DFD7] pb-3">
          <h2 className="text-2xl font-serif text-[#24282C]">
            03 — WORKFLOW
          </h2>
          <p className="text-sm text-[#656B73] font-sans">
            "What's happening with this piece of work?"
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column Callouts */}
          <div className="lg:col-span-4 space-y-4">
            {/* CALLOUT 02 — STATUS SUMMARY */}
            <div className="bg-[#FFFFFF] border border-[#24282C] rounded-2xl p-4 space-y-2">
              <span className="text-[10px] font-mono text-[#717882] uppercase">Callout 02</span>
              <h3 className="text-xs font-semibold text-[#24282C]">SHOW WHERE WORK IS STUCK</h3>
              <p className="text-xs text-[#656B73] leading-relaxed">
                "Instead of making the Pro inspect every client, the summary gives an immediate picture of the workflow."
              </p>
            </div>

            {/* CALLOUT 03 — CLIENT GROUPS */}
            <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-2xl p-4 space-y-2">
              <span className="text-[10px] font-mono text-[#717882] uppercase">Callout 03</span>
              <h3 className="text-xs font-semibold text-[#24282C]">GROUP BY WORK STATE</h3>
              <p className="text-xs text-[#656B73] leading-relaxed">
                "I group clients by their state in the work rather than treating the workflow like an unorganized list."
              </p>
            </div>
          </div>

          {/* UI Preview Card */}
          <div className="lg:col-span-8 space-y-4">
            <div 
              onClick={() => onSelectScreen && onSelectScreen('workflow')}
              className="bg-[#FAF9F5] border border-[#E2DFD7] rounded-2xl p-6 shadow-sm space-y-5 cursor-pointer hover:border-[#24282C] transition-all group"
            >
              <div className="flex items-center justify-between border-b border-[#E2DFD7] pb-3">
                <span className="text-xs font-serif font-bold text-[#24282C] flex items-center gap-2">
                  <span>SCREEN 03 — Q3 ESTIMATED TAX REMINDERS</span>
                  <span className="text-[10px] font-sans font-normal text-[#717882] group-hover:underline">Click to view full screen →</span>
                </span>
                <span className="text-[11px] font-mono text-[#8A9099]">Scope: Q3 Reminders</span>
              </div>

              <div className="space-y-4 font-sans text-xs">
                <div>
                  <h3 className="text-2xl font-serif text-[#24282C]">Q3 Estimated Tax Reminders</h3>
                  <p className="text-xs text-[#717882]">Across 18 clients · Due Sep 15, 2026</p>
                </div>

                {/* Status Summary Element */}
                <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-2xl p-3.5 space-y-2">
                  <h4 className="font-semibold text-[#24282C]">Workflow status</h4>
                  <p className="text-xs text-[#656B73]">
                    <span className="font-medium text-[#24282C]">18 clients total</span> · 12 ready · 4 waiting on information · 2 need review
                  </p>
                </div>

                {/* Groups */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-[#FFFFFF] border border-[#E2DFD7] rounded-xl p-2.5">
                    <span className="font-semibold text-[#24282C]">READY · 12</span>
                    <span className="text-xs text-[#24282C] underline">Send to 12 clients →</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#FFFFFF] border border-[#E2DFD7] rounded-xl p-2.5">
                    <span className="font-semibold text-[#24282C]">WAITING ON INFORMATION · 4</span>
                    <span className="text-xs text-[#24282C] underline">Follow up with 4 →</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#FFFFFF] border border-[#E2DFD7] rounded-xl p-2.5">
                    <span className="font-semibold text-[#24282C]">NEEDS REVIEW · 2</span>
                    <span className="text-xs text-[#24282C] underline">Review 2 →</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 04 — THE CONNECTING IDEA */}
      {/* ================================================== */}
      <section className="bg-[#FFFFFF] border border-[#24282C] rounded-3xl p-8 space-y-6">
        <div className="space-y-1 text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-mono text-[#8A9099] uppercase tracking-widest block">SECTION 04</span>
          <h2 className="text-2xl font-serif text-[#24282C]">
            One Workspace, Different Levels of Context
          </h2>
          <p className="text-xs text-[#656B73]">
            "Home, Client and Workflow are not separate destinations. They are different levels of the same work."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center font-sans text-xs">
          <div className="bg-[#FAF9F5] border border-[#E2DFD7] rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-mono text-[#717882]">01 — HOME</span>
            <p className="font-medium text-[#24282C]">"What should I work on?"</p>
          </div>
          <div className="bg-[#FAF9F5] border border-[#E2DFD7] rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-mono text-[#717882]">02 — CLIENT</span>
            <p className="font-medium text-[#24282C]">"What's happening with this client?"</p>
          </div>
          <div className="bg-[#FAF9F5] border border-[#E2DFD7] rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-mono text-[#717882]">03 — WORKFLOW</span>
            <p className="font-medium text-[#24282C]">"What's happening with this work?"</p>
          </div>
          <div className="bg-[#24282C] text-[#FFFFFF] rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-mono text-[#C2EF72]">04 — CHAT</span>
            <p className="font-medium text-[#FFFFFF]">"Let's do something about it."</p>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 05 — KEY TRADEOFFS */}
      {/* ================================================== */}
      <section className="space-y-4 pt-4">
        <div className="border-b border-[#E2DFD7] pb-2">
          <h2 className="text-xl font-serif text-[#24282C]">
            Key Tradeoffs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
          <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-mono text-[#8A9099]">TRADEOFF 01</span>
            <h3 className="font-semibold text-[#24282C]">CLIENT VISIBILITY VS CHAT</h3>
            <p className="text-[#656B73] leading-relaxed">
              "I kept the client book visible, but limited what occupies the main canvas so chat remains primary."
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-mono text-[#8A9099]">TRADEOFF 02</span>
            <h3 className="font-semibold text-[#24282C]">INFORMATION VS CLUTTER</h3>
            <p className="text-[#656B73] leading-relaxed">
              "I surfaced information that helps the Pro make a decision and pushed deeper details into context-specific views."
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-mono text-[#8A9099]">TRADEOFF 03</span>
            <h3 className="font-semibold text-[#24282C]">CHAT VS NAVIGATION</h3>
            <p className="text-[#656B73] leading-relaxed">
              "Chat is the primary interaction model, but traditional navigation remains available so the Pro never feels trapped."
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-mono text-[#8A9099]">TRADEOFF 04</span>
            <h3 className="font-semibold text-[#24282C]">BREADTH VS DEPTH</h3>
            <p className="text-[#656B73] leading-relaxed">
              "Home gives a broad view of the book. Client and Workflow views provide depth only when the Pro needs it."
            </p>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 06 — DESIGN PRINCIPLES */}
      {/* ================================================== */}
      <footer className="bg-[#FAF9F5] border border-[#E2DFD7] rounded-3xl p-8 space-y-6 text-center">
        <h2 className="text-xl font-serif text-[#24282C]">
          Design Principles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold text-[#24282C]">
          <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-xl p-3">MAKE ATTENTION OBVIOUS</div>
          <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-xl p-3">KEEP CONTEXT CLOSE</div>
          <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-xl p-3">MAKE NEXT ACTION CLEAR</div>
          <div className="bg-[#24282C] text-[#FFFFFF] rounded-xl p-3">CHAT SHOULD HELP DO WORK</div>
        </div>

        <p className="text-xs text-[#656B73] max-w-xl mx-auto italic">
          "Every element should help the Pro understand what needs attention, what is happening, or what they can do next."
        </p>
      </footer>
    </div>
  )
}
