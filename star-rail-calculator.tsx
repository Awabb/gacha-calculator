"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calculator,
  Star,
  Calendar,
  Trophy,
  Zap,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Github,
  Settings,
  HelpCircle,
  Sparkles,
  Target,
  Award,
} from "lucide-react"

// Your StarRailCalculator class converted to TypeScript
class StarRailCalculator {
  dailyJades = 60
  weeklyJades = 500
  monthlyJades = 2000
  jadesPerPull = 160
  expressPassDailyJades = 90
  expressPassDuration = 30
  mocStarsPerReset = 0
  pfStarsPerReset = 0
  asStarsPerReset = 0
  mocJadesPerStar = 60
  pfJadesPerStar = 60
  asJadesPerStar = 60
  mocResetInterval = 14
  pfResetInterval = 14
  asResetInterval = 14
  maxMocStars = 30
  maxPfStars = 12
  maxAsStars = 12
  mocNextReset: Date
  pfNextReset: Date
  asNextReset: Date

  constructor() {
    this.initializeResetDates()
  }

  initializeResetDates() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const getDaysUntilNextReset = (lastResetDay: number) => {
      const daysSinceLastReset = (today.getDay() - lastResetDay + 7) % 7
      return (14 - daysSinceLastReset) % 14
    }

    this.mocNextReset = new Date(today)
    this.mocNextReset.setDate(today.getDate() + getDaysUntilNextReset(1))

    this.pfNextReset = new Date(today)
    this.pfNextReset.setDate(today.getDate() + getDaysUntilNextReset(4))

    const nextASReset = new Date("2024-05-26")
    if (today < nextASReset) {
      this.asNextReset = nextASReset
    } else {
      const daysSinceAS = Math.floor((today.getTime() - nextASReset.getTime()) / (1000 * 60 * 60 * 24))
      const cycles = Math.ceil(daysSinceAS / 14)
      this.asNextReset = new Date(nextASReset)
      this.asNextReset.setDate(nextASReset.getDate() + cycles * 14)
      if (this.asNextReset <= today) {
        this.asNextReset.setDate(this.asNextReset.getDate() + 14)
      }
    }

    if (this.mocNextReset.getTime() === today.getTime()) {
      this.mocNextReset.setDate(this.mocNextReset.getDate() + 14)
    }
    if (this.pfNextReset.getTime() === today.getTime()) {
      this.pfNextReset.setDate(this.pfNextReset.getDate() + 14)
    }
  }

  setMocStars(stars: number) {
    if (stars < 0) stars = 0
    if (stars > this.maxMocStars) stars = this.maxMocStars
    this.mocStarsPerReset = stars
    return {
      value: stars,
      max: this.maxMocStars,
      isValid: stars >= 0 && stars <= this.maxMocStars,
    }
  }

  setPfStars(stars: number) {
    if (stars < 0) stars = 0
    if (stars > this.maxPfStars) stars = this.maxPfStars
    this.pfStarsPerReset = stars
    return {
      value: stars,
      max: this.maxPfStars,
      isValid: stars >= 0 && stars <= this.maxPfStars,
    }
  }

  setAsStars(stars: number) {
    if (stars < 0) stars = 0
    if (stars > this.maxAsStars) stars = this.maxAsStars
    this.asStarsPerReset = stars
    return {
      value: stars,
      max: this.maxAsStars,
      isValid: stars >= 0 && stars <= this.maxAsStars,
    }
  }

  calculateDaysFromDate(targetDate: string) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const target = new Date(targetDate)
    target.setHours(0, 0, 0, 0)

    const diffTime = target.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays > 0 ? diffDays : 0
  }

  calculate(input: number | string, hasExpressPass = false) {
    const days = typeof input === "string" ? this.calculateDaysFromDate(input) : input
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + days)

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

    const mocResets = this.calculateResets(this.mocNextReset, endDate, this.mocResetInterval)
    const pfResets = this.calculateResets(this.pfNextReset, endDate, this.pfResetInterval)
    const asResets = this.calculateResets(this.asNextReset, endDate, this.asResetInterval)

    const mocJades = mocResets.totalResets * this.mocStarsPerReset * this.mocJadesPerStar
    const pfJades = pfResets.totalResets * this.pfStarsPerReset * this.pfJadesPerStar
    const asJades = asResets.totalResets * this.asStarsPerReset * this.asJadesPerStar

    const totalJades = dailyJades + expressPassJades + mocJades + pfJades + asJades
    const totalPulls = Math.floor(totalJades / this.jadesPerPull)

    return {
      days,
      totalJades,
      totalPulls,
      breakdown: {
        daily: dailyJades,
        expressPass: expressPassJades,
        moc: {
          total: mocJades,
          resets: mocResets,
        },
        pf: {
          total: pfJades,
          resets: pfResets,
        },
        as: {
          total: asJades,
          resets: asResets,
        },
      },
    }
  }

  calculateResets(nextReset: Date, endDate: Date, interval: number) {
    const resets: Array<{ date: Date; jades: number }> = []
    const currentReset = new Date(nextReset)
    let totalResets = 0

    let starsPerReset: number, jadesPerStar: number
    if (interval === this.mocResetInterval) {
      starsPerReset = this.mocStarsPerReset
      jadesPerStar = this.mocJadesPerStar
    } else if (interval === this.pfResetInterval) {
      starsPerReset = this.pfStarsPerReset
      jadesPerStar = this.pfJadesPerStar
    } else {
      starsPerReset = this.asStarsPerReset
      jadesPerStar = this.asJadesPerStar
    }

    while (currentReset <= endDate) {
      resets.push({
        date: new Date(currentReset),
        jades: starsPerReset * jadesPerStar,
      })
      totalResets++
      currentReset.setDate(currentReset.getDate() + interval)
    }

    return {
      totalResets,
      resets,
      nextReset: new Date(nextReset),
    }
  }
}

export default function Component() {
  const [calculator] = useState(() => new StarRailCalculator())
  const [currentStep, setCurrentStep] = useState(1)
  const [days, setDays] = useState(90)
  const [mocStars, setMocStars] = useState(0)
  const [pfStars, setPfStars] = useState(0)
  const [asStars, setAsStars] = useState(0)
  const [hasExpressPass, setHasExpressPass] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [showResults, setShowResults] = useState(false)

  // Update calculator when stars change
  useEffect(() => {
    calculator.setMocStars(mocStars)
  }, [mocStars, calculator])

  useEffect(() => {
    calculator.setPfStars(pfStars)
  }, [pfStars, calculator])

  useEffect(() => {
    calculator.setAsStars(asStars)
  }, [asStars, calculator])

  const calculateResults = () => {
    const result = calculator.calculate(days, hasExpressPass)
    setResults(result)
    setShowResults(true)
  }

  const resetCalculator = () => {
    setCurrentStep(1)
    setDays(90)
    setMocStars(0)
    setPfStars(0)
    setAsStars(0)
    setHasExpressPass(false)
    setResults(null)
    setShowResults(false)
    calculator.setMocStars(0)
    calculator.setPfStars(0)
    calculator.setAsStars(0)
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
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(79, 181, 255, 0.1) 0%, transparent 25%), radial-gradient(circle at 75% 75%, rgba(157, 78, 221, 0.1) 0%, transparent 25%)`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-black/40 backdrop-blur-xl border-r border-blue-500/20 p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">HSR Calculator</h1>
              <p className="text-blue-300 text-xs">Stellar Jade Tracker</p>
            </div>
          </div>

          <nav className="space-y-2">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-3">Tools</div>
            <Button
              variant="ghost"
              className="w-full justify-start text-white bg-blue-500/20 border border-blue-500/30"
            >
              <Calculator className="w-4 h-4 mr-3" />
              Pull Calculator
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10">
              <Star className="w-4 h-4 mr-3" />
              Character Planner
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10">
              <Calendar className="w-4 h-4 mr-3" />
              Event Timeline
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10">
              <Trophy className="w-4 h-4 mr-3" />
              Achievements
            </Button>

            <div className="text-xs text-gray-400 uppercase tracking-wider mb-3 mt-6">Resources</div>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10">
              <Target className="w-4 h-4 mr-3" />
              Endgame Guide
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10">
              <Award className="w-4 h-4 mr-3" />
              Tier Lists
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10">
              <HelpCircle className="w-4 h-4 mr-3" />
              Help & Support
            </Button>
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-700">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10">
              <Github className="w-4 h-4 mr-3" />
              GitHub
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10">
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {!showResults ? (
              <Card className="bg-black/40 backdrop-blur-xl border-blue-500/20 shadow-2xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Stellar Jade Calculator
                  </CardTitle>
                  <p className="text-gray-400">Plan your pulls and maximize your savings</p>

                  {/* Progress Indicator */}
                  <div className="flex justify-center gap-2 mt-6">
                    {[1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={`w-3 h-3 rounded-full transition-all ${
                          step === currentStep
                            ? "bg-blue-500 scale-125"
                            : step < currentStep
                              ? "bg-blue-600"
                              : "bg-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  {/* Step 1: Days Input */}
                  {currentStep === 1 && (
                    <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                      <div className="text-center">
                        <h2 className="text-2xl font-semibold text-white mb-2">Plan Your Pulls</h2>
                        <p className="text-gray-400">How many days do you want to save for?</p>
                      </div>

                      <div className="max-w-md mx-auto">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Number of Days</label>
                        <Input
                          type="number"
                          value={days}
                          onChange={(e) => setDays(Number(e.target.value))}
                          min="1"
                          className="bg-black/50 border-blue-500/30 text-white text-lg text-center"
                          placeholder="90"
                        />
                        <p className="text-xs text-gray-500 mt-2">Typical patch cycle is ~42 days</p>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          onClick={nextStep}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                        >
                          Continue
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Endgame Content */}
                  {currentStep === 2 && (
                    <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                      <div className="text-center">
                        <h2 className="text-2xl font-semibold text-white mb-2">Endgame Content</h2>
                        <p className="text-gray-400">How many stars do you typically earn?</p>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        <Card className="bg-gradient-to-br from-red-900/20 to-red-800/20 border-red-500/30">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg text-red-300 flex items-center gap-2">
                              <Trophy className="w-5 h-5" />
                              Memory of Chaos
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Input
                              type="number"
                              value={mocStars}
                              onChange={(e) => setMocStars(Math.min(30, Math.max(0, Number(e.target.value))))}
                              min="0"
                              max="30"
                              className="bg-black/50 border-red-500/30 text-white"
                            />
                            <p className="text-xs text-gray-400 mt-2">Max: 30 ★ • Resets every 14 days</p>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-500/30">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg text-purple-300 flex items-center gap-2">
                              <Sparkles className="w-5 h-5" />
                              Pure Fiction
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Input
                              type="number"
                              value={pfStars}
                              onChange={(e) => setPfStars(Math.min(12, Math.max(0, Number(e.target.value))))}
                              min="0"
                              max="12"
                              className="bg-black/50 border-purple-500/30 text-white"
                            />
                            <p className="text-xs text-gray-400 mt-2">Max: 12 ★ • Resets every 14 days</p>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-orange-900/20 to-orange-800/20 border-orange-500/30">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg text-orange-300 flex items-center gap-2">
                              <Zap className="w-5 h-5" />
                              Apocalyptic Shadow
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Input
                              type="number"
                              value={asStars}
                              onChange={(e) => setAsStars(Math.min(12, Math.max(0, Number(e.target.value))))}
                              min="0"
                              max="12"
                              className="bg-black/50 border-orange-500/30 text-white"
                            />
                            <p className="text-xs text-gray-400 mt-2">Max: 12 ★ • Resets every 14 days</p>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="flex justify-between">
                        <Button
                          onClick={prevStep}
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-white/10"
                        >
                          <ChevronLeft className="w-4 h-4 mr-2" />
                          Back
                        </Button>
                        <Button
                          onClick={nextStep}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                        >
                          Continue
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Express Pass */}
                  {currentStep === 3 && (
                    <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                      <div className="text-center">
                        <h2 className="text-2xl font-semibold text-white mb-2">Express Supply Pass</h2>
                        <p className="text-gray-400">Do you have an active Express Supply Pass?</p>
                      </div>

                      <Card className="max-w-md mx-auto bg-gradient-to-br from-yellow-900/20 to-yellow-800/20 border-yellow-500/30">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id="express-pass"
                              checked={hasExpressPass}
                              onCheckedChange={(checked) => setHasExpressPass(checked as boolean)}
                              className="border-yellow-500/50 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                            />
                            <label htmlFor="express-pass" className="text-yellow-300 font-medium cursor-pointer">
                              I have Express Supply Pass
                            </label>
                          </div>
                          <p className="text-xs text-gray-400 mt-2 ml-6">+90 Stellar Jades per day</p>
                        </CardContent>
                      </Card>

                      <div className="flex justify-between">
                        <Button
                          onClick={prevStep}
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-white/10"
                        >
                          <ChevronLeft className="w-4 h-4 mr-2" />
                          Back
                        </Button>
                        <Button
                          onClick={nextStep}
                          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
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
              /* Results Section */
              <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
                <Card className="bg-black/40 backdrop-blur-xl border-blue-500/20 shadow-2xl">
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                      Your Stellar Jade Forecast
                    </CardTitle>
                    <p className="text-gray-400">Based on {days} days of saving</p>
                  </CardHeader>

                  <CardContent className="p-8">
                    {/* Summary Cards */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border-blue-500/30">
                        <CardContent className="p-6 text-center">
                          <div className="text-3xl font-bold text-blue-300 mb-2">
                            {results?.totalJades.toLocaleString()}
                          </div>
                          <div className="text-blue-200">Total Stellar Jades</div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border-purple-500/30">
                        <CardContent className="p-6 text-center">
                          <div className="text-3xl font-bold text-purple-300 mb-2">{results?.totalPulls}</div>
                          <div className="text-purple-200">Total Pulls</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white mb-4">Breakdown</h3>

                      <div className="grid gap-4">
                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg border border-white/10">
                          <span className="text-gray-300">Daily Activities</span>
                          <span className="text-white font-semibold">{results?.breakdown.daily.toLocaleString()}</span>
                        </div>

                        {hasExpressPass && (
                          <div className="flex justify-between items-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                            <span className="text-yellow-300">Express Supply Pass</span>
                            <span className="text-yellow-200 font-semibold">
                              {results?.breakdown.expressPass.toLocaleString()}
                            </span>
                          </div>
                        )}

                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                            <div>
                              <span className="text-red-300">Memory of Chaos</span>
                              <div className="text-xs text-red-200">
                                {results?.breakdown.moc.resets.totalResets} resets • Next:{" "}
                                {formatDate(results?.breakdown.moc.resets.nextReset)}
                              </div>
                            </div>
                            <span className="text-red-200 font-semibold">
                              {results?.breakdown.moc.total.toLocaleString()}
                            </span>
                          </div>

                          <div className="flex justify-between items-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                            <div>
                              <span className="text-purple-300">Pure Fiction</span>
                              <div className="text-xs text-purple-200">
                                {results?.breakdown.pf.resets.totalResets} resets • Next:{" "}
                                {formatDate(results?.breakdown.pf.resets.nextReset)}
                              </div>
                            </div>
                            <span className="text-purple-200 font-semibold">
                              {results?.breakdown.pf.total.toLocaleString()}
                            </span>
                          </div>

                          <div className="flex justify-between items-center p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                            <div>
                              <span className="text-orange-300">Apocalyptic Shadow</span>
                              <div className="text-xs text-orange-200">
                                {results?.breakdown.as.resets.totalResets} resets • Next:{" "}
                                {formatDate(results?.breakdown.as.resets.nextReset)}
                              </div>
                            </div>
                            <span className="text-orange-200 font-semibold">
                              {results?.breakdown.as.total.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 text-center">
                      <Button
                        onClick={resetCalculator}
                        className="bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600"
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
  )
}
