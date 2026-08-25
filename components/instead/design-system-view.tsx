"use client"

import React, { useState } from "react"
import { 
  Search, 
  ChevronDown, 
  Paperclip, 
  ArrowUp, 
  ArrowRight,
  Check,
  User,
  FolderCheck,
  FileText
} from "lucide-react"
import { cn } from "@/lib/utils"

interface DesignSystemViewProps {
  onBackToHome?: () => void
}

export function InsteadDesignSystemView({ onBackToHome }: DesignSystemViewProps) {
  const [demoInput, setDemoInput] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(true)
  const [selectedOption, setSelectedOption] = useState("Krishan K")

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-4 px-2 font-sans text-[#24282C]">
      {/* Design System Page Title */}
      <div className="border-b border-[#E2DFD7] pb-4 space-y-1">
        <h1 className="text-3xl font-serif text-[#24282C] tracking-tight">
          Instead Pro · Foundations & Design System
        </h1>
        <p className="text-xs text-[#717882] font-normal">
          Minimal reference sheet extracted directly from the Home, Client Context, and Workflow screens.
        </p>
      </div>

      {/* 1. BRAND COLORS */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-[#8A9099] uppercase tracking-wider">
          1. Brand Colors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
          {/* Charcoal */}
          <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-xl p-3 space-y-2">
            <div className="h-16 rounded-lg bg-[#24282C]" />
            <div>
              <p className="font-semibold text-[#24282C]">Charcoal</p>
              <p className="font-mono text-[11px] text-[#717882]">#24282C</p>
              <p className="text-[11px] text-[#8A9099] pt-1">Primary typography, dark buttons, brand contrast.</p>
            </div>
          </div>

          {/* Sand */}
          <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-xl p-3 space-y-2">
            <div className="h-16 rounded-lg bg-[#F7F6F0] border border-[#E8E5DC]" />
            <div>
              <p className="font-semibold text-[#24282C]">Sand</p>
              <p className="font-mono text-[11px] text-[#717882]">#F7F6F0</p>
              <p className="text-[11px] text-[#8A9099] pt-1">Workspace canvas background, soft container surfaces.</p>
            </div>
          </div>

          {/* Lime */}
          <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-xl p-3 space-y-2">
            <div className="h-16 rounded-lg bg-[#C2EF72]" />
            <div>
              <p className="font-semibold text-[#24282C]">Lime</p>
              <p className="font-mono text-[11px] text-[#717882]">#C2EF72</p>
              <p className="text-[11px] text-[#8A9099] pt-1">Selective active states, positive status, primary accents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TYPOGRAPHY */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-[#8A9099] uppercase tracking-wider">
          2. Typography
        </h2>
        <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-xl p-4 space-y-4 text-xs font-sans">
          <div className="space-y-1">
            <span className="text-[10px] text-[#8A9099] font-mono">Headings · Libre Baskerville</span>
            <p className="text-2xl font-serif font-normal text-[#24282C]">
              Good morning, Shubham.
            </p>
          </div>

          <div className="space-y-1 pt-2 border-t border-[#F0EEE6]">
            <span className="text-[10px] text-[#8A9099] font-mono">UI Body · Lato Regular</span>
            <p className="text-sm font-sans font-normal text-[#24282C] leading-relaxed">
              Two documents are still missing from Krishan's 2026 return: W-2 and 1099-INT.
            </p>
          </div>

          <div className="space-y-1 pt-2 border-t border-[#F0EEE6]">
            <span className="text-[10px] text-[#8A9099] font-mono">Secondary Text · Lato Regular</span>
            <p className="text-xs font-sans text-[#656B73]">
              Across 18 clients · Due Sep 15, 2026 · Current step: Document review
            </p>
          </div>

          <div className="space-y-1 pt-2 border-t border-[#F0EEE6]">
            <span className="text-[10px] text-[#8A9099] font-mono">Small / Meta · Lato Mono / Regular</span>
            <p className="text-xs text-[#717882] font-mono">
              TY2025 · 1040 · Step 3 of 7 · 12 received · 2 missing
            </p>
          </div>
        </div>
      </section>

      {/* 3. BUTTONS */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-[#8A9099] uppercase tracking-wider">
          3. Button States
        </h2>
        <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-xl p-4 flex flex-wrap items-center gap-4 text-xs">
          {/* Primary */}
          <div className="space-y-1">
            <span className="text-[10px] text-[#8A9099] block font-mono">Primary</span>
            <button className="px-3.5 py-1.5 rounded-full bg-[#24282C] text-[#FFFFFF] font-medium hover:bg-[#000000] transition-colors">
              Request documents
            </button>
          </div>

          {/* Secondary */}
          <div className="space-y-1">
            <span className="text-[10px] text-[#8A9099] block font-mono">Secondary</span>
            <button className="px-3.5 py-1.5 rounded-full bg-[#FAF9F5] border border-[#E2DFD7] text-[#24282C] font-medium hover:bg-[#EFECE6] transition-colors">
              Scope: All clients ▾
            </button>
          </div>

          {/* Ghost / Text Action */}
          <div className="space-y-1">
            <span className="text-[10px] text-[#8A9099] block font-mono">Text Action</span>
            <button className="text-xs text-[#24282C] font-medium hover:underline inline-flex items-center gap-1 group">
              <span>View workflow</span>
              <ArrowRight className="w-3 h-3 text-[#24282C]" />
            </button>
          </div>

          {/* Disabled */}
          <div className="space-y-1">
            <span className="text-[10px] text-[#8A9099] block font-mono">Disabled</span>
            <button disabled className="px-3.5 py-1.5 rounded-full bg-[#EFECE6] text-[#A0A6B0] cursor-not-allowed font-medium">
              Submit prompt
            </button>
          </div>
        </div>
      </section>

      {/* 4. INPUTS */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-[#8A9099] uppercase tracking-wider">
          4. Input States
        </h2>
        <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
          {/* Default Input */}
          <div className="space-y-1">
            <span className="text-[10px] text-[#8A9099] font-mono">Default Input</span>
            <input 
              type="text"
              placeholder="Ask Instead..."
              readOnly
              className="w-full bg-[#FAF9F5] border border-[#E2DFD7] rounded-xl px-3 py-2 text-[#24282C] placeholder-[#8A9099] focus:outline-none"
            />
          </div>

          {/* Focused Input */}
          <div className="space-y-1">
            <span className="text-[10px] text-[#8A9099] font-mono">Focused Input</span>
            <input 
              type="text"
              defaultValue="Which clients need attention today?"
              readOnly
              className="w-full bg-[#FFFFFF] border border-[#24282C] ring-1 ring-[#24282C]/10 rounded-xl px-3 py-2 text-[#24282C] focus:outline-none"
            />
          </div>

          {/* Search Input */}
          <div className="space-y-1">
            <span className="text-[10px] text-[#8A9099] font-mono">Search Input</span>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#8A9099] absolute left-3 top-2.5" />
              <input 
                type="text"
                placeholder="Search clients or workflows..."
                readOnly
                className="w-full bg-[#FAF9F5] border border-[#E2DFD7] rounded-xl pl-8 pr-3 py-2 text-[#24282C] placeholder-[#8A9099] focus:outline-none"
              />
            </div>
          </div>

          {/* Disabled Input */}
          <div className="space-y-1">
            <span className="text-[10px] text-[#8A9099] font-mono">Disabled Input</span>
            <input 
              type="text"
              disabled
              placeholder="Archived scope input"
              className="w-full bg-[#EFECE6] border border-[#E2DFD7] rounded-xl px-3 py-2 text-[#A0A6B0] cursor-not-allowed"
            />
          </div>
        </div>
      </section>

      {/* 5. DROPDOWN / SELECT */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-[#8A9099] uppercase tracking-wider">
          5. Dropdown & Select Controls
        </h2>
        <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          {/* Closed */}
          <div className="space-y-1">
            <span className="text-[10px] text-[#8A9099] font-mono">Default Closed</span>
            <button className="px-3 py-1.5 rounded-lg bg-[#FAF9F5] border border-[#E2DFD7] text-[#24282C] font-medium flex items-center gap-1.5">
              <span>Workspace</span>
              <ChevronDown className="w-3 h-3 text-[#717882]" />
            </button>
          </div>

          {/* Open State */}
          <div className="space-y-1">
            <span className="text-[10px] text-[#8A9099] font-mono">Open State (3 Options)</span>
            <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-xl p-1.5 space-y-1 shadow-sm w-60">
              <button className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-[#FAF9F5] text-[#555C66]">
                All clients
              </button>
              <button className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs bg-[#FAF9F5] text-[#24282C] font-medium flex items-center justify-between">
                <span>Krishan K</span>
                <Check className="w-3.5 h-3.5 text-[#24282C]" />
              </button>
              <button className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-[#FAF9F5] text-[#555C66]">
                Q3 Estimated Tax Reminders
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NAVIGATION */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-[#8A9099] uppercase tracking-wider">
          6. Navigation States
        </h2>
        <div className="bg-[#FAF9F5] border border-[#E2DFD7] rounded-xl p-4 space-y-2 text-xs max-w-xs font-sans">
          {/* Default Nav Item */}
          <div className="px-3 py-2 rounded-xl text-[#656B73] hover:text-[#24282C] flex items-center gap-2 font-normal cursor-pointer">
            <FileText className="w-4 h-4 text-[#8A9099]" />
            <span>Tax Docs</span>
          </div>

          {/* Active Nav Item */}
          <div className="px-3 py-2 rounded-xl bg-[#FFFFFF] border border-[#E2DFD7] text-[#24282C] font-medium flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <FolderCheck className="w-4 h-4 text-[#24282C]" />
              <span>Home</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C2EF72]" />
          </div>

          {/* Client Selected State */}
          <div className="px-3 py-2 rounded-xl bg-[#FAF9F5] border border-[#24282C]/20 text-[#24282C] flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium text-[#24282C]">Krishan K</p>
              <p className="text-[11px] text-[#717882]">1040 · Missing 2 docs</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#C2EF72]" />
          </div>
        </div>
      </section>

      {/* 7. STATUS & LABELS */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-[#8A9099] uppercase tracking-wider">
          7. Status & Labels
        </h2>
        <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-xl p-4 flex flex-wrap gap-4 text-xs font-sans">
          <div className="space-y-1">
            <span className="text-[10px] text-[#8A9099] block font-mono">Needs Attention</span>
            <span className="px-2.5 py-1 rounded-full bg-[#FAF9F5] border border-[#E2DFD7] text-[#24282C] font-normal">
              2 documents missing
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-[#8A9099] block font-mono">In Progress</span>
            <span className="px-2.5 py-1 rounded-full bg-[#FAF9F5] border border-[#E2DFD7] text-[#656B73] font-normal">
              In progress
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-[#8A9099] block font-mono">Complete</span>
            <span className="px-2.5 py-1 rounded-full bg-[#FAF9F5] border border-[#E2DFD7] text-[#24282C] font-medium">
              ✓ Complete
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-[#8A9099] block font-mono">Missing Document Item</span>
            <span className="text-[#24282C] font-normal">
              • W-2 · Missing
            </span>
          </div>
        </div>
      </section>

      {/* 8. CHAT COMPOSER REFERENCE */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-[#8A9099] uppercase tracking-wider">
          8. Chat Composer Pattern
        </h2>
        <div className="bg-[#FFFFFF] border border-[#E2DFD7] rounded-2xl p-4 space-y-3">
          <div className="text-xs text-[#656B73] flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span>Scope:</span>
              <span className="text-[#24282C] font-medium px-1.5 py-0.5 rounded bg-[#FAF9F5] border border-[#E2DFD7] inline-flex items-center gap-1">
                All clients <ChevronDown className="w-3 h-3 text-[#717882]" />
              </span>
            </div>
          </div>

          <input 
            type="text"
            placeholder="Ask Instead..."
            readOnly
            className="w-full bg-transparent text-[#24282C] placeholder-[#8A9099] text-base focus:outline-none font-normal"
          />

          <div className="flex items-center justify-between pt-2 border-t border-[#F0EEE6]">
            <button className="text-xs text-[#717882] flex items-center gap-1.5 font-normal">
              <Paperclip className="w-3.5 h-3.5" />
              <span>Attach</span>
            </button>
            <div className="w-7 h-7 rounded-full bg-[#24282C] text-[#FFFFFF] flex items-center justify-center">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
