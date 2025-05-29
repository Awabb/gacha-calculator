"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calculator,
  Trophy,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Menu,
  Home,
  Settings,
  Star,
  Users,
  LogOut,
  X,
  Calendar,
  Clock,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Endgame schedule data - Extended until 4.0
const ENDGAME_SCHEDULE = [
  // Current 3.2 content
  {
    id: "pf_3_2",
    name: "Pure Fiction 3.2",
    type: "Pure Fiction",
    version: "3.2",
    startDate: new Date("2025-04-28T04:00:00Z"),
    endDate: new Date("2025-06-09T03:59:00Z"),
    maxStars: 12,
    jadesPerStar: 60,
  },
  {
    id: "moc_3_2",
    name: "Memory of Chaos 3.2",
    type: "Memory of Chaos",
    version: "3.2",
    startDate: new Date("2025-05-12T04:00:00Z"),
    endDate: new Date("2025-06-23T03:59:00Z"),
    maxStars: 30,
    jadesPerStar: 60,
  },

  // Current 3.3 content
  {
    id: "as_3_3",
    name: "Apocalyptic Shadow 3.3",
    type: "Apocalyptic Shadow",
    version: "3.3",
    startDate: new Date("2025-05-26T04:00:00Z"),
    endDate: new Date("2025-07-07T03:59:00Z"),
    maxStars: 12,
    jadesPerStar: 60,
  },
  {
    id: "pf_3_3",
    name: "Pure Fiction 3.3",
    type: "Pure Fiction",
    version: "3.3",
    startDate: new Date("2025-06-09T04:00:00Z"),
    endDate: new Date("2025-07-21T03:59:00Z"),
    maxStars: 12,
    jadesPerStar: 60,
  },
  {
    id: "moc_3_3",
    name: "Memory of Chaos 3.3",
    type: "Memory of Chaos",
    version: "3.3",
    startDate: new Date("2025-06-23T04:00:00Z"),
    endDate: new Date("2025-08-04T03:59:00Z"),
    maxStars: 30,
    jadesPerStar: 60,
  },

  // Predicted 3.4 content
  {
    id: "as_3_4",
    name: "Apocalyptic Shadow 3.4",
    type: "Apocalyptic Shadow",
    version: "3.4",
    startDate: new Date("2025-07-07T04:00:00Z"),
    endDate: new Date("2025-08-18T03:59:00Z"),
    maxStars: 12,
    jadesPerStar: 60,
  },
  {
    id: "pf_3_4",
    name: "Pure Fiction 3.4",
    type: "Pure Fiction",
    version: "3.4",
    startDate: new Date("2025-07-21T04:00:00Z"),
    endDate: new Date("2025-09-01T03:59:00Z"),
    maxStars: 12,
    jadesPerStar: 60,
  },
  {
    id: "moc_3_4",
    name: "Memory of Chaos 3.4",
    type: "Memory of Chaos",
    version: "3.4",
    startDate: new Date("2025-08-04T04:00:00Z"),
    endDate: new Date("2025-09-15T03:59:00Z"),
    maxStars: 30,
    jadesPerStar: 60,
  },

  // Predicted 3.5 content
  {
    id: "as_3_5",
    name: "Apocalyptic Shadow 3.5",
    type: "Apocalyptic Shadow",
    version: "3.5",
    startDate: new Date("2025-08-18T04:00:00Z"),
    endDate: new Date("2025-09-29T03:59:00Z"),
    maxStars: 12,
    jadesPerStar: 60,
  },
  {
    id: "pf_3_5",
    name: "Pure Fiction 3.5",
    type: "Pure Fiction",
    version: "3.5",
    startDate: new Date("2025-09-01T04:00:00Z"),
    endDate: new Date("2025-10-13T03:59:00Z"),
    maxStars: 12,
    jadesPerStar: 60,
  },
  {
    id: "moc_3_5",
    name: "Memory of Chaos 3.5",
    type: "Memory of Chaos",
    version: "3.5",
    startDate: new Date("2025-09-15T04:00:00Z"),
    endDate: new Date("2025-10-27T03:59:00Z"),
    maxStars: 30,
    jadesPerStar: 60,
  },

  // Predicted 3.6 content
  {
    id: "as_3_6",
    name: "Apocalyptic Shadow 3.6",
    type: "Apocalyptic Shadow",
    version: "3.6",
    startDate: new Date("2025-09-29T04:00:00Z"),
    endDate: new Date("2025-11-10T03:59:00Z"),
    maxStars: 12,
    jadesPerStar: 60,
  },
  {
    id: "pf_3_6",
    name: "Pure Fiction 3.6",
    type: "Pure Fiction",
    version: "3.6",
    startDate: new Date("2025-10-13T04:00:00Z"),
    endDate: new Date("2025-11-24T03:59:00Z"),
    maxStars: 12,
    jadesPerStar: 60,
  },
  {
    id: "moc_3_6",
    name: "Memory of Chaos 3.6",
    type: "Memory of Chaos",
    version: "3.6",
    startDate: new Date("2025-10-27T04:00:00Z"),
    endDate: new Date("2025-12-08T03:59:00Z"),
    maxStars: 30,
    jadesPerStar: 60,
  },

  // Predicted 3.7 content
  {
    id: "as_3_7",
    name: "Apocalyptic Shadow 3.7",
    type: "Apocalyptic Shadow",
    version: "3.7",
    startDate: new Date("2025-11-10T04:00:00Z"),
    endDate: new Date("2025-12-22T03:59:00Z"),
    maxStars: 12,
    jadesPerStar: 60,
  },
  {
    id: "pf_3_7",
    name: "Pure Fiction 3.7",
    type: "Pure Fiction",
    version: "3.7",
    startDate: new Date("2025-11-24T04:00:00Z"),
    endDate: new Date("2026-01-05T03:59:00Z"),
    maxStars: 12,
    jadesPerStar: 60,
  },
  {
    id: "moc_3_7",
    name: "Memory of Chaos 3.7",
    type: "Memory of Chaos",
    version: "3.7",
    startDate: new Date("2025-12-08T04:00:00Z"),
    endDate: new Date("2026-01-19T03:59:00Z"),
    maxStars: 30,
    jadesPerStar: 60,
  },

  // Predicted early 4.0 content
  {
    id: "as_4_0",
    name: "Apocalyptic Shadow 4.0",
    type: "Apocalyptic Shadow",
    version: "4.0",
    startDate: new Date("2025-12-22T04:00:00Z"),
    endDate: new Date("2026-02-02T03:59:00Z"),
    maxStars: 12,
    jadesPerStar: 60,
  },
  {
    id: "pf_4_0",
    name: "Pure Fiction 4.0",
    type: "Pure Fiction",
    version: "4.0",
    startDate: new Date("2026-01-05T04:00:00Z"),
    endDate: new Date("2026-02-16T03:59:00Z"),
    maxStars: 12,
    jadesPerStar: 60,
  },
  {
    id: "moc_4_0",
    name: "Memory of Chaos 4.0",
    type: "Memory of Chaos",
    version: "4.0",
    startDate: new Date("2026-01-19T04:00:00Z"),
    endDate: new Date("2026-03-02T03:59:00Z"),
    maxStars: 30,
    jadesPerStar: 60,
  },
]

// Enhanced calculator class
class EnhancedStarRailCalculator {
  dailyJades = 60
  jadesPerPull = 160
  expressPassDailyJades = 90
  expressPassDuration = 30

  getCurrentDate() {
    return new Date("2025-05-29T00:00:00Z") // Current date as specified
  }

  getSimulatedUniverseResets(targetDate: Date) {
    const currentDate = this.getCurrentDate()
    // Current period ends in 3 days 15h from current date
    const currentPeriodEnd = new Date("2025-06-01T19:00:00Z") // 3 days 15h from current

    let resets = 0
    let nextReset = currentPeriodEnd

    while (nextReset <= targetDate) {
      resets++
      nextReset = new Date(nextReset.getTime() + 7 * 24 * 60 * 60 * 1000) // Add 7 days
    }

    return resets
  }

  getEmberExchangeResets(targetDate: Date) {
    const currentDate = this.getCurrentDate()
    // First reset is in 3 days from current date
    const firstReset = new Date("2025-06-01T04:00:00Z") // 3 days from current

    let resets = 0
    let nextReset = firstReset

    while (nextReset <= targetDate) {
      resets++
      nextReset = new Date(nextReset.getTime() + 30 * 24 * 60 * 60 * 1000) // Add 30 days
    }

    return resets
  }

  getActiveEndgameModes(targetDate: Date) {
    const currentDate = this.getCurrentDate()
    const active = []
    const upcoming = []
    const completed = []

    ENDGAME_SCHEDULE.forEach((mode) => {
      if (mode.endDate < currentDate) {
        completed.push(mode)
      } else if (mode.startDate <= currentDate && mode.endDate >= currentDate) {
        active.push(mode)
      } else if (mode.startDate <= targetDate) {
        upcoming.push(mode)
      }
    })

    return { active, upcoming, completed }
  }

  calculateEndgameJades(endgameModes: any[], targetDate: Date) {
    const currentDate = this.getCurrentDate()
    let totalJades = 0
    const breakdown = []

    endgameModes.forEach((mode) => {
      const starsEarned = mode.starsEarned || 0
      const jades = starsEarned * mode.jadesPerStar
      totalJades += jades

      breakdown.push({
        ...mode,
        starsEarned,
        jades,
        isActive: mode.startDate <= currentDate && mode.endDate >= currentDate,
        isUpcoming: mode.startDate > currentDate,
        daysUntilStart:
          mode.startDate > currentDate
            ? Math.ceil((mode.startDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
            : 0,
        daysUntilEnd:
          mode.endDate > currentDate
            ? Math.ceil((mode.endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
            : 0,
      })
    })

    return { totalJades, breakdown }
  }

  calculate(days: number, hasExpressPass: boolean, endgameModes: any[], otherSources: any) {
    const currentDate = this.getCurrentDate()
    const targetDate = new Date(currentDate)
    targetDate.setDate(targetDate.getDate() + days)

    // Daily jades calculation
    let dailyJades = 0
    let expressPassJades = 0

    if (hasExpressPass) {
      const expressPassDays = Math.min(days, this.expressPassDuration)
      dailyJades = expressPassDays * this.dailyJades
      expressPassJades = expressPassDays * this.expressPassDailyJades

      const remainingDays = days - expressPassDays
      dailyJades += remainingDays * this.dailyJades
    } else {
      dailyJades = days * this.dailyJades
    }

    // Endgame calculation
    const endgameResult = this.calculateEndgameJades(endgameModes, targetDate)

    // Calculate recurring rewards
    const simulatedUniverseResets = this.getSimulatedUniverseResets(targetDate)
    const emberExchangeResets = this.getEmberExchangeResets(targetDate)

    // Other sources calculation
    const simulatedUniverseJades = simulatedUniverseResets * 225
    const emberExchangePulls = emberExchangeResets * 5
    const emberExchangeJades = emberExchangePulls * this.jadesPerPull
    const namelessHonorJades = otherSources.namelessHonor ? 680 : 0
    const namelessHonorPulls = otherSources.namelessHonor ? 3 : 0
    const namelessHonorPullsAsJades = namelessHonorPulls * this.jadesPerPull

    const otherJades = simulatedUniverseJades + emberExchangeJades + namelessHonorJades + namelessHonorPullsAsJades

    const totalJades = dailyJades + expressPassJades + endgameResult.totalJades + otherJades
    const totalPulls = Math.floor(totalJades / this.jadesPerPull)

    return {
      days,
      totalJades,
      totalPulls,
      breakdown: {
        daily: dailyJades,
        expressPass: expressPassJades,
        endgame: endgameResult,
        simulatedUniverse: simulatedUniverseJades,
        emberExchange: emberExchangeJades,
        namelessHonor: namelessHonorJades + namelessHonorPullsAsJades,
        other: otherJades,
      },
      details: {
        simulatedUniverseResets,
        emberExchangeResets,
        namelessHonorPulls,
      },
    }
  }
}

export default function StarRailCalculator() {
  const [calculator] = useState(() => new EnhancedStarRailCalculator())
  const [currentStep, setCurrentStep] = useState(1)
  const [days, setDays] = useState(90)
  const [targetDate, setTargetDate] = useState("")
  const [inputMode, setInputMode] = useState<"days" | "date">("days")
  const [hasExpressPass, setHasExpressPass] = useState(false)
  const [hasNamelessHonor, setHasNamelessHonor] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [showResults, setShowResults] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Endgame mode states
  const [endgameModes, setEndgameModes] = useState<any[]>([])
  const [activeEndgame, setActiveEndgame] = useState<any>({ active: [], upcoming: [], completed: [] })

  // Settings
  const [showLeakedContent, setShowLeakedContent] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  // Calculate days from target date
  useEffect(() => {
    if (inputMode === "date" && targetDate) {
      const currentDate = calculator.getCurrentDate()
      const target = new Date(targetDate)
      const diffTime = target.getTime() - currentDate.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      if (diffDays > 0) {
        setDays(diffDays)
      }
    }
  }, [targetDate, inputMode, calculator])

  // Initialize endgame modes when days change
  useEffect(() => {
    const currentDate = calculator.getCurrentDate()
    const target = new Date(currentDate)
    target.setDate(target.getDate() + days)

    const modes = calculator.getActiveEndgameModes(target)
    setActiveEndgame(modes)

    // Initialize endgame modes with default values
    const allModes = [...modes.active, ...modes.upcoming].map((mode) => ({
      ...mode,
      starsEarned: 0,
      completed: false,
    }))
    setEndgameModes(allModes)
  }, [days, calculator])

  const updateEndgameMode = (modeId: string, field: string, value: any) => {
    setEndgameModes((prev) => prev.map((mode) => (mode.id === modeId ? { ...mode, [field]: value } : mode)))
  }

  const calculateResults = () => {
    const result = calculator.calculate(days, hasExpressPass, endgameModes, {
      namelessHonor: hasNamelessHonor,
    })
    setResults(result)
    setShowResults(true)
  }

  const resetCalculator = () => {
    setCurrentStep(1)
    setDays(90)
    setTargetDate("")
    setInputMode("days")
    setHasExpressPass(false)
    setHasNamelessHonor(false)
    setResults(null)
    setShowResults(false)
    setEndgameModes([])
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      calculateResults()
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getEndgameModeIcon = (type: string) => {
    switch (type) {
      case "Memory of Chaos":
        return Trophy
      case "Pure Fiction":
        return Sparkles
      case "Apocalyptic Shadow":
        return Star
      default:
        return Star
    }
  }

  const getEndgameModeColor = (type: string) => {
    switch (type) {
      case "Memory of Chaos":
        return "text-orange-400"
      case "Pure Fiction":
        return "text-blue-400"
      case "Apocalyptic Shadow":
        return "text-purple-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="min-h-screen w-full bg-black relative">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(79, 181, 255, 0.05) 0%, transparent 25%), radial-gradient(circle at 75% 75%, rgba(157, 78, 221, 0.05) 0%, transparent 25%)`,
              backgroundSize: "60px 60px",
            }}
          ></div>
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
                    <Link href="/hsr">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
                      >
                        <Home className="w-4 h-4 mr-3" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-start text-white bg-white/10">
                      <Calculator className="w-4 h-4 mr-3" />
                      Jade Calculator
                    </Button>
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
                    <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          Preferences
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-black/90 backdrop-blur-xl border-white/10 text-white">
                        <DialogHeader>
                          <DialogTitle className="text-white">Settings & Preferences</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-white font-medium">Show Leaked Content</h3>
                              <p className="text-gray-400 text-sm">Display unreleased characters and content</p>
                            </div>
                            <Switch
                              checked={showLeakedContent}
                              onCheckedChange={setShowLeakedContent}
                              className="data-[state=checked]:bg-orange-500"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-white font-medium">Auto-save Calculations</h3>
                              <p className="text-gray-400 text-sm">Automatically save your calculation settings</p>
                            </div>
                            <Switch className="data-[state=checked]:bg-orange-500" />
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500/80 to-orange-400/80 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-white font-bold text-lg">Stellar Jade Calculator</h1>
                  <p className="text-gray-400 text-xs">Plan your pulls and savings</p>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 p-4 lg:p-8 w-full max-w-none">
            <div className="max-w-6xl mx-auto w-full">
              {!showResults ? (
                <Card className="bg-black/40 backdrop-blur-xl border-white/10 shadow-2xl w-full">
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-white">
                      Stellar Jade <span className="text-orange-400">Calculator</span>
                    </CardTitle>
                    <p className="text-gray-400">Plan your pulls and maximize your savings</p>

                    {/* Progress Indicator */}
                    <div className="flex justify-center gap-2 mt-6">
                      {[1, 2, 3].map((step) => (
                        <div
                          key={step}
                          className={`w-3 h-3 rounded-full transition-all ${
                            step === currentStep
                              ? "bg-orange-500 scale-125"
                              : step < currentStep
                                ? "bg-orange-600/50"
                                : "bg-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                  </CardHeader>

                  <CardContent className="p-4 lg:p-8">
                    {/* Step 1: Days/Date Input */}
                    {currentStep === 1 && (
                      <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                        <div className="text-center">
                          <h2 className="text-2xl font-semibold text-white mb-2">Plan Your Pulls</h2>
                          <p className="text-gray-400">Set your saving timeframe</p>
                        </div>

                        <div className="max-w-md mx-auto space-y-4">
                          {/* Input Mode Toggle */}
                          <div className="flex items-center justify-center gap-4">
                            <Button
                              variant={inputMode === "days" ? "default" : "outline"}
                              onClick={() => setInputMode("days")}
                              className={
                                inputMode === "days"
                                  ? "bg-orange-500 hover:bg-orange-600"
                                  : "border-white/20 text-gray-300"
                              }
                            >
                              Days
                            </Button>
                            <Button
                              variant={inputMode === "date" ? "default" : "outline"}
                              onClick={() => setInputMode("date")}
                              className={
                                inputMode === "date"
                                  ? "bg-orange-500 hover:bg-orange-600"
                                  : "border-white/20 text-gray-300"
                              }
                            >
                              Target Date
                            </Button>
                          </div>

                          {inputMode === "days" ? (
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Number of Days</label>
                              <Input
                                type="number"
                                value={days}
                                onChange={(e) => setDays(Number(e.target.value))}
                                min="1"
                                className="bg-black/50 border-white/20 text-white text-lg text-center"
                                placeholder="90"
                              />
                              <p className="text-xs text-gray-500 mt-2">Typical patch cycle is ~42 days</p>
                            </div>
                          ) : (
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Target Date</label>
                              <Input
                                type="date"
                                value={targetDate}
                                onChange={(e) => setTargetDate(e.target.value)}
                                min={new Date().toISOString().split("T")[0]}
                                className="bg-black/50 border-white/20 text-white text-lg text-center"
                              />
                              {targetDate && <p className="text-xs text-gray-500 mt-2">That's {days} days from now</p>}
                            </div>
                          )}
                        </div>

                        {/* Current Date Display */}
                        <div className="text-center">
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                            <Calendar className="w-4 h-4 text-orange-400" />
                            <span className="text-gray-300 text-sm">
                              Current Date: {formatDate(calculator.getCurrentDate())}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button
                            onClick={nextStep}
                            disabled={inputMode === "date" && !targetDate}
                            className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white disabled:opacity-50"
                          >
                            Continue
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Enhanced Endgame Content */}
                    {currentStep === 2 && (
                      <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                        <div className="text-center">
                          <h2 className="text-2xl font-semibold text-white mb-2">Endgame Content Schedule</h2>
                          <p className="text-gray-400">Configure your endgame mode completion and expectations</p>
                        </div>

                        {/* Active Modes */}
                        {activeEndgame.active.length > 0 && (
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-400" />
                              <h3 className="text-lg font-semibold text-white">Currently Active</h3>
                            </div>

                            {activeEndgame.active.map((mode) => {
                              const IconComponent = getEndgameModeIcon(mode.type)
                              const colorClass = getEndgameModeColor(mode.type)
                              const modeData = endgameModes.find((m) => m.id === mode.id)

                              return (
                                <div
                                  key={mode.id}
                                  className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30"
                                >
                                  <div className="relative p-6">
                                    <div className="flex items-center justify-between mb-4">
                                      <div className="flex items-center gap-3">
                                        <IconComponent className={`w-6 h-6 ${colorClass}`} />
                                        <div>
                                          <h3 className="text-xl font-semibold text-white">{mode.name}</h3>
                                          <p className="text-sm text-gray-400">
                                            Ends: {formatDate(mode.endDate)} (
                                            {Math.ceil(
                                              (mode.endDate.getTime() - calculator.getCurrentDate().getTime()) /
                                                (1000 * 60 * 60 * 24),
                                            )}{" "}
                                            days left)
                                          </p>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <div className="text-sm text-gray-400">Max: {mode.maxStars} ★</div>
                                        <div className="text-xs text-gray-500">
                                          {mode.maxStars * mode.jadesPerStar} Jades
                                        </div>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                          Completion Status
                                        </label>
                                        <Select
                                          value={modeData?.completed ? "completed" : "not_completed"}
                                          onValueChange={(value) =>
                                            updateEndgameMode(mode.id, "completed", value === "completed")
                                          }
                                        >
                                          <SelectTrigger className="bg-black/50 border-white/20 text-white">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent className="bg-black/90 border-white/20">
                                            <SelectItem value="completed">Already Completed</SelectItem>
                                            <SelectItem value="not_completed">Not Completed Yet</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>

                                      {!modeData?.completed && (
                                        <div>
                                          <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Expected Stars
                                          </label>
                                          <Input
                                            type="number"
                                            value={modeData?.starsEarned || 0}
                                            onChange={(e) =>
                                              updateEndgameMode(
                                                mode.id,
                                                "starsEarned",
                                                Math.min(mode.maxStars, Math.max(0, Number(e.target.value))),
                                              )
                                            }
                                            min="0"
                                            max={mode.maxStars}
                                            className="bg-black/50 border-white/20 text-white"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )}

                        {/* Upcoming Modes */}
                        {activeEndgame.upcoming.length > 0 && (
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5 text-blue-400" />
                              <h3 className="text-lg font-semibold text-white">Upcoming in Your Timeframe</h3>
                            </div>

                            {activeEndgame.upcoming.map((mode) => {
                              const IconComponent = getEndgameModeIcon(mode.type)
                              const colorClass = getEndgameModeColor(mode.type)
                              const modeData = endgameModes.find((m) => m.id === mode.id)
                              const daysUntilStart = Math.ceil(
                                (mode.startDate.getTime() - calculator.getCurrentDate().getTime()) /
                                  (1000 * 60 * 60 * 24),
                              )

                              return (
                                <div
                                  key={mode.id}
                                  className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30"
                                >
                                  <div className="relative p-6">
                                    <div className="flex items-center justify-between mb-4">
                                      <div className="flex items-center gap-3">
                                        <IconComponent className={`w-6 h-6 ${colorClass}`} />
                                        <div>
                                          <h3 className="text-xl font-semibold text-white">{mode.name}</h3>
                                          <p className="text-sm text-gray-400">
                                            Starts: {formatDate(mode.startDate)} (in {daysUntilStart} days)
                                          </p>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <div className="text-sm text-gray-400">Max: {mode.maxStars} ★</div>
                                        <div className="text-xs text-gray-500">
                                          {mode.maxStars * mode.jadesPerStar} Jades
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Expected Stars
                                      </label>
                                      <Input
                                        type="number"
                                        value={modeData?.starsEarned || 0}
                                        onChange={(e) =>
                                          updateEndgameMode(
                                            mode.id,
                                            "starsEarned",
                                            Math.min(mode.maxStars, Math.max(0, Number(e.target.value))),
                                          )
                                        }
                                        min="0"
                                        max={mode.maxStars}
                                        className="bg-black/50 border-white/20 text-white"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )}

                        <div className="flex justify-between">
                          <Button
                            onClick={prevStep}
                            variant="outline"
                            className="border-white/20 text-gray-300 hover:bg-white/10"
                          >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Back
                          </Button>
                          <Button
                            onClick={nextStep}
                            className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white"
                          >
                            Continue
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Other Sources with Images */}
                    {currentStep === 3 && (
                      <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                        <div className="text-center">
                          <h2 className="text-2xl font-semibold text-white mb-2">Other Sources</h2>
                          <p className="text-gray-400">Additional Stellar Jade and pull sources</p>
                        </div>

                        <div className="space-y-6">
                          {/* Express Supply Pass */}
                          <div className="bg-black/30 border border-white/10 rounded-xl p-6">
                            <div className="flex items-center space-x-4 mb-4">
                              <img
                                src="/express-pass.png"
                                alt="Express Supply Pass"
                                className="w-12 h-12 object-contain"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-3">
                                  <Checkbox
                                    id="express-pass"
                                    checked={hasExpressPass}
                                    onCheckedChange={(checked) => setHasExpressPass(checked as boolean)}
                                    className="border-orange-500/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                                  />
                                  <label htmlFor="express-pass" className="text-white font-medium cursor-pointer">
                                    Express Supply Pass
                                  </label>
                                </div>
                                <p className="text-sm text-gray-400 mt-2">+90 Stellar Jades per day for 30 days</p>
                              </div>
                            </div>
                          </div>

                          {/* Simulated Universe */}
                          <div className="bg-black/30 border border-white/10 rounded-xl p-6">
                            <div className="flex items-center gap-4 mb-4">
                              <img
                                src="/simulated-universe.jpeg"
                                alt="Simulated Universe"
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div>
                                <h3 className="text-lg font-medium text-white">Simulated Universe</h3>
                                <p className="text-sm text-gray-400">225 Stellar Jades per weekly reset</p>
                              </div>
                            </div>
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                              <p className="text-blue-300 text-sm">
                                <Clock className="w-4 h-4 inline mr-2" />
                                Current period ends in 3 days 15h. Automatically calculated based on your timeframe.
                              </p>
                            </div>
                          </div>

                          {/* Ember Exchange */}
                          <div className="bg-black/30 border border-white/10 rounded-xl p-6">
                            <div className="flex items-center gap-4 mb-4">
                              <img
                                src="/ember-exchange.jpeg"
                                alt="Ember Exchange"
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div>
                                <h3 className="text-lg font-medium text-white">Ember Exchange Passes</h3>
                                <p className="text-sm text-gray-400">5 Star Rail Passes every 30 days</p>
                              </div>
                            </div>
                            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                              <p className="text-purple-300 text-sm">
                                <Clock className="w-4 h-4 inline mr-2" />
                                Next reset in 3 days. Automatically calculated based on your timeframe.
                              </p>
                            </div>
                          </div>

                          {/* Nameless Honor */}
                          <div className="bg-black/30 border border-white/10 rounded-xl p-6">
                            <div className="flex items-center space-x-4 mb-4">
                              <img
                                src="/nameless-honor.webp"
                                alt="Nameless Honor"
                                className="w-12 h-12 object-contain"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-3">
                                  <Checkbox
                                    id="nameless-honor"
                                    checked={hasNamelessHonor}
                                    onCheckedChange={(checked) => setHasNamelessHonor(checked as boolean)}
                                    className="border-orange-500/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                                  />
                                  <label htmlFor="nameless-honor" className="text-white font-medium cursor-pointer">
                                    Nameless Honor (Battle Pass)
                                  </label>
                                </div>
                                <p className="text-sm text-gray-400 mt-2">680 Stellar Jades + 3 Star Rail Passes</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Button
                            onClick={prevStep}
                            variant="outline"
                            className="border-white/20 text-gray-300 hover:bg-white/10"
                          >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Back
                          </Button>
                          <Button
                            onClick={nextStep}
                            className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white"
                          >
                            Calculate Results
                            <Calculator className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                /* Enhanced Results Section */
                <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500 w-full">
                  <Card className="bg-black/40 backdrop-blur-xl border-white/10 shadow-2xl w-full">
                    <CardHeader className="text-center">
                      <CardTitle className="text-3xl font-bold text-white">
                        Your Stellar Jade <span className="text-orange-400">Forecast</span>
                      </CardTitle>
                      <p className="text-gray-400">Based on {days} days of saving</p>
                    </CardHeader>

                    <CardContent className="p-4 lg:p-8">
                      {/* Summary Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <Card className="bg-gradient-to-br from-black to-gray-900 border-white/10">
                          <CardContent className="p-6 text-center">
                            <div className="flex items-center justify-center gap-3 mb-2">
                              <img src="/stellar-jade.png" alt="Stellar Jade" className="w-8 h-8" />
                              <div className="text-3xl font-bold text-orange-400">
                                {results?.totalJades.toLocaleString()}
                              </div>
                            </div>
                            <div className="text-white">Total Stellar Jades</div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-black to-gray-900 border-white/10">
                          <CardContent className="p-6 text-center">
                            <div className="flex items-center justify-center gap-3 mb-2">
                              <img src="/star-rail-pass.png" alt="Star Rail Pass" className="w-8 h-8" />
                              <div className="text-3xl font-bold text-orange-400">{results?.totalPulls}</div>
                            </div>
                            <div className="text-white">Total Pulls</div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Enhanced Breakdown */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                          <img src="/stellar-jade.png" alt="Stellar Jade" className="w-5 h-5" />
                          <h3 className="text-xl font-semibold text-white">Detailed Breakdown</h3>
                        </div>

                        {/* Daily Activities */}
                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg border border-white/10">
                          <span className="text-gray-300">Daily Activities ({days} days)</span>
                          <span className="text-white font-semibold">{results?.breakdown.daily.toLocaleString()}</span>
                        </div>

                        {/* Express Pass */}
                        {hasExpressPass && (
                          <div className="flex justify-between items-center p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                            <div className="flex items-center gap-3">
                              <img src="/express-pass.png" alt="Express Supply Pass" className="w-6 h-6" />
                              <span className="text-orange-300">Express Supply Pass</span>
                            </div>
                            <span className="text-orange-200 font-semibold">
                              {results?.breakdown.expressPass.toLocaleString()}
                            </span>
                          </div>
                        )}

                        {/* Simulated Universe */}
                        {results?.breakdown.simulatedUniverse > 0 && (
                          <div className="flex justify-between items-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                            <div className="flex items-center gap-3">
                              <img
                                src="/simulated-universe.jpeg"
                                alt="Simulated Universe"
                                className="w-6 h-6 rounded"
                              />
                              <span className="text-blue-300">
                                Simulated Universe ({results?.details.simulatedUniverseResets} resets)
                              </span>
                            </div>
                            <span className="text-blue-200 font-semibold">
                              {results?.breakdown.simulatedUniverse.toLocaleString()}
                            </span>
                          </div>
                        )}

                        {/* Ember Exchange */}
                        {results?.breakdown.emberExchange > 0 && (
                          <div className="flex justify-between items-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                            <div className="flex items-center gap-3">
                              <img src="/ember-exchange.jpeg" alt="Ember Exchange" className="w-6 h-6 rounded" />
                              <span className="text-purple-300">
                                Ember Exchange ({results?.details.emberExchangeResets} resets)
                              </span>
                            </div>
                            <span className="text-purple-200 font-semibold">
                              {results?.breakdown.emberExchange.toLocaleString()}
                            </span>
                          </div>
                        )}

                        {/* Nameless Honor */}
                        {hasNamelessHonor && (
                          <div className="flex justify-between items-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                            <div className="flex items-center gap-3">
                              <img src="/nameless-honor.webp" alt="Nameless Honor" className="w-6 h-6" />
                              <span className="text-yellow-300">
                                Nameless Honor (680 + {results?.details.namelessHonorPulls} pulls)
                              </span>
                            </div>
                            <span className="text-yellow-200 font-semibold">
                              {results?.breakdown.namelessHonor.toLocaleString()}
                            </span>
                          </div>
                        )}

                        {/* Enhanced Endgame Breakdown */}
                        {results?.breakdown.endgame.breakdown.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                              <Trophy className="w-5 h-5 text-orange-400" />
                              Endgame Content Schedule
                            </h4>

                            {results.breakdown.endgame.breakdown.map((mode: any) => {
                              const IconComponent = getEndgameModeIcon(mode.type)
                              const colorClass = getEndgameModeColor(mode.type)

                              return (
                                <div key={mode.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <IconComponent className={`w-5 h-5 ${colorClass}`} />
                                      <div>
                                        <span className="text-white font-medium">{mode.name}</span>
                                        <div className="text-xs text-gray-400">
                                          {mode.isActive && "Currently Active"}
                                          {mode.isUpcoming && `Starts in ${mode.daysUntilStart} days`}
                                          {mode.isActive &&
                                            mode.daysUntilEnd > 0 &&
                                            ` • ${mode.daysUntilEnd} days left`}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <span className="text-white font-semibold">{mode.jades.toLocaleString()}</span>
                                      <div className="text-xs text-gray-400">
                                        {mode.starsEarned}/{mode.maxStars} ★
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}

                            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-500/10 to-orange-400/10 rounded-lg border border-orange-500/20">
                              <span className="text-orange-300 font-medium">Total Endgame Rewards</span>
                              <span className="text-orange-200 font-bold text-lg">
                                {results.breakdown.endgame.totalJades.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-8 text-center">
                        <Button
                          onClick={resetCalculator}
                          className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-800 hover:to-gray-700 text-white"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          New Calculation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
