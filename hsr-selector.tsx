"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Users, Sparkles, Menu, Home, Settings, Star, LogOut, X, Calculator } from "lucide-react"
import Link from "next/link"

const tools = [
  {
    id: "stellar-jade",
    name: "Stellar Jade Calculator",
    subtitle: "Plan your pulls and savings",
    icon: Sparkles,
    available: true,
    href: "/hsr/calculator",
    currency: "/stellar-jade.png",
  },
  {
    id: "character-planner",
    name: "Character Ascension",
    subtitle: "Plan character builds and materials",
    icon: Users,
    available: false,
    href: "/hsr/planner",
    currency: "/star-rail-pass.png",
  },
]

export default function HSRSelector() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [logoAnimated, setLogoAnimated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTimeout(() => setLogoAnimated(true), 1000)
  }, [])

  return (
    <div className="min-h-screen w-full bg-black relative">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
        </div>
      </div>

      {/* Layout Container */}
      <div className="relative z-10 flex min-h-screen w-full">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-black/90 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static lg:inset-0`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500/80 to-orange-400/80 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Star Rail</h1>
                <p className="text-gray-400 text-xs">Planning Tools</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Sidebar Content */}
          <div className="flex flex-col h-full">
            <div className="flex-1 p-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-3">Navigation</h3>
                  <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start text-white bg-white/10">
                      <Home className="w-4 h-4 mr-3" />
                      Dashboard
                    </Button>
                    <Link href="/hsr/calculator">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
                      >
                        <Calculator className="w-4 h-4 mr-3" />
                        Jade Calculator
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-300 hover:text-white opacity-50 cursor-not-allowed"
                    >
                      <Users className="w-4 h-4 mr-3" />
                      Character Planner
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-3">Settings</h3>
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Preferences
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="border-t border-white/10 p-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Back to Games
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen w-full lg:ml-0">
          {/* Header */}
          <header className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-6 py-4 border-b border-white/10 bg-black/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-white hover:bg-white/10"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 bg-gradient-to-r from-orange-500/80 to-orange-400/80 rounded-lg flex items-center justify-center transition-all duration-500 hover:rotate-12 hover:scale-110 ${logoAnimated ? "animate-bounce" : ""}`}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-white font-bold text-xl transition-all duration-300 hover:text-orange-300">
                    Honkai: Star Rail
                  </h1>
                  <p className="text-gray-400 text-sm">Planning Tools</p>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 p-4 lg:p-8 w-full max-w-none">
            {/* Rest of the existing content with currency images added to tool cards */}
            <div className="max-w-6xl mx-auto w-full">
              {/* Animated Title */}
              <div className="text-center mb-20 max-w-4xl mx-auto">
                <div className="overflow-hidden">
                  <h1 className="text-7xl font-bold mb-8">
                    <span
                      className={`inline-block text-white transition-all duration-1000 ease-out hover:scale-110 hover:text-orange-300 ${
                        mounted ? "translate-y-0 opacity-100 rotate-0" : "translate-y-20 opacity-0 -rotate-12"
                      }`}
                      style={{ transitionDelay: "600ms" }}
                    >
                      Choose
                    </span>{" "}
                    <span
                      className={`inline-block text-white transition-all duration-1000 ease-out hover:scale-110 hover:text-orange-300 ${
                        mounted ? "translate-y-0 opacity-100 rotate-0" : "translate-y-20 opacity-0 rotate-12"
                      }`}
                      style={{ transitionDelay: "800ms" }}
                    >
                      Your
                    </span>{" "}
                    <span
                      className={`inline-block bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent transition-all duration-1000 ease-out hover:scale-125 hover:from-orange-300 hover:to-orange-200 ${
                        mounted
                          ? "translate-y-0 opacity-100 scale-100 rotate-0"
                          : "translate-y-20 opacity-0 scale-95 rotate-6"
                      }`}
                      style={{ transitionDelay: "1000ms" }}
                    >
                      Tool
                    </span>
                  </h1>
                </div>

                {/* Animated subtitle */}
                <div className="overflow-hidden">
                  <p
                    className={`text-gray-400 text-xl transition-all duration-1000 delay-300 ease-out ${
                      mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: "1200ms" }}
                  >
                    Select a planning tool to get started
                  </p>
                </div>
              </div>

              {/* Tool Selection Cards */}
              <div className="w-full max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {tools.map((tool, index) => {
                    const IconComponent = tool.icon
                    return (
                      <div
                        key={tool.id}
                        className={`group cursor-pointer transition-all duration-700 ease-out ${
                          mounted ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                        } ${tool.available ? "hover:scale-105 hover:-translate-y-2" : "opacity-60 cursor-not-allowed"}`}
                        style={{ transitionDelay: `${2200 + index * 200}ms` }}
                        onMouseEnter={() => setHoveredTool(tool.id)}
                        onMouseLeave={() => setHoveredTool(null)}
                      >
                        {/* Clickable Card Container */}
                        {tool.available ? (
                          <Link href={tool.href} className="block">
                            <div className="relative text-center py-16 px-8 transition-all duration-500 ease-out backdrop-blur-sm group-hover:backdrop-blur-none rounded-xl group-hover:rounded-2xl border border-white/10 group-hover:border-orange-500/40 group-hover:shadow-2xl group-hover:shadow-orange-500/10 overflow-hidden">
                              {/* Currency Icon */}
                              <div className="mb-6 flex justify-center relative z-10">
                                <div className="relative transition-all duration-500 group-hover:scale-110">
                                  <img
                                    src={tool.currency || "/placeholder.svg"}
                                    alt="Currency"
                                    className="w-16 h-16 object-contain transition-all duration-500 group-hover:drop-shadow-lg"
                                  />
                                </div>
                              </div>

                              {/* Tool Icon */}
                              <div className="mb-8 flex justify-center relative z-10">
                                <div className="relative transition-all duration-500 group-hover:scale-125 group-hover:rotate-3">
                                  <div className="w-20 h-20 bg-black/50 border border-white/20 group-hover:border-orange-500/30 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:shadow-lg group-hover:shadow-orange-500/20">
                                    <IconComponent className="w-10 h-10 text-orange-400 group-hover:text-orange-300 transition-all duration-500" />
                                  </div>
                                  {/* Enhanced Glow Effect */}
                                  <div className="absolute inset-0 bg-orange-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150 rounded-2xl" />
                                </div>
                              </div>

                              {/* Tool Name */}
                              <h3 className="text-white text-2xl font-bold mb-4 transition-all duration-300 group-hover:text-orange-300 group-hover:scale-105 relative z-10">
                                {tool.name}
                              </h3>

                              {/* Tool Subtitle */}
                              <p className="text-gray-400 text-lg font-light transition-all duration-300 group-hover:text-gray-300 group-hover:scale-105 relative z-10">
                                {tool.subtitle}
                              </p>

                              {/* Subtle Hover Line */}
                              <div className="absolute bottom-4 left-1/2 w-0 h-px bg-gradient-to-r from-orange-500/60 to-orange-300/60 transition-all duration-500 group-hover:w-32 group-hover:-translate-x-16 z-10" />

                              {/* Corner accents */}
                              <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-white/0 group-hover:border-orange-500/40 transition-all duration-500 z-10" />
                              <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-white/0 group-hover:border-orange-500/40 transition-all duration-500 z-10" />
                              <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-white/0 group-hover:border-orange-500/40 transition-all duration-500 z-10" />
                              <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-white/0 group-hover:border-orange-500/40 transition-all duration-500 z-10" />
                            </div>
                          </Link>
                        ) : (
                          <div className="relative text-center py-16 px-8 transition-all duration-500 ease-out backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                            {/* Currency Icon */}
                            <div className="mb-6 flex justify-center relative z-10">
                              <img
                                src={tool.currency || "/placeholder.svg"}
                                alt="Currency"
                                className="w-16 h-16 object-contain opacity-50"
                              />
                            </div>

                            {/* Tool Icon */}
                            <div className="mb-8 flex justify-center relative z-10">
                              <div className="w-20 h-20 bg-black/50 border border-white/10 rounded-2xl flex items-center justify-center">
                                <IconComponent className="w-10 h-10 text-gray-500" />
                              </div>
                            </div>

                            {/* Tool Name */}
                            <h3 className="text-gray-400 text-2xl font-bold mb-4 relative z-10">{tool.name}</h3>

                            {/* Tool Subtitle */}
                            <p className="text-gray-500 text-lg font-light mb-6 relative z-10">{tool.subtitle}</p>

                            {/* Coming Soon Badge */}
                            <div className="inline-block px-6 py-3 bg-black/50 rounded-full text-gray-400 text-sm font-light border border-white/10 relative z-10">
                              Coming Soon
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
