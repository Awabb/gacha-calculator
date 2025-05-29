"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"
import Link from "next/link"

// Update the games array to remove calculator subtitles and add hover effects
const games = [
  {
    id: "hsr",
    name: "Honkai: Star Rail",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Honkai-Star-Rail_Logo-2047130562-PCMWeUrnOldeg2QYv3KOKkvvjaxbVm.png",
    bgImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Honkai-Star-Rail-256778420.jpg-opQf5VjLamEcjRyyYXFtzbWo3hdLJa.jpeg",
    available: true,
    hoverEffect: "pulse", // Star Rail logo pulses
  },
  {
    id: "genshin",
    name: "Genshin Impact",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Genshin-Impact-Logo-2213140855-JDlmNPlKcfwGp0dpBVIp2CdW2wVWFD.png",
    bgImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/genshin-impact-3-2480546387.jpg-YbIPcrldXba9BcD20CkKGEy2rG3toP.jpeg",
    available: false,
    hoverEffect: "shine", // Genshin logo shines
  },
  {
    id: "zzz",
    name: "Zenless Zone Zero",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/51296d07ef153ca7dd744dc31874d548_4734072724131588175-1318834376-UDiqHXb7EentlHNfAUQ3JrPfIxWJA1.png",
    bgImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Zenless-Zone-Zero-Season-2-2000x1125-249983374.jpg-lMlO8YJQrr1YxCTGfsvsbluS8INv9G.jpeg",
    available: false,
    hoverEffect: "glitch-intense", // Enhanced glitch effect
  },
]

export default function GameSelector() {
  const [hoveredGame, setHoveredGame] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [logoAnimated, setLogoAnimated] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Trigger logo animation after initial mount
    setTimeout(() => setLogoAnimated(true), 1000)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background with Smooth Transitions */}
      <div className="fixed inset-0">
        {/* Enhanced Default Background with Animated Elements */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            hoveredGame ? "opacity-0 scale-110" : "opacity-100 scale-100"
          }`}
        >
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800" />

          {/* Animated gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/3 animate-pulse"
            style={{ animationDuration: "4s" }}
          />

          {/* Moving geometric patterns */}
          <div className="absolute inset-0 opacity-30">
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-white/10 to-transparent rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: "6s", animationDelay: "0s" }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-gray-300/10 to-transparent rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: "8s", animationDelay: "2s" }}
            />
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-white/5 to-gray-400/5 rounded-full blur-2xl animate-pulse"
              style={{ animationDuration: "10s", animationDelay: "4s" }}
            />

            {/* Additional floating elements */}
            <div
              className="absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-br from-white/8 to-transparent rounded-full blur-2xl animate-pulse"
              style={{ animationDuration: "7s", animationDelay: "1s" }}
            />
            <div
              className="absolute bottom-1/3 left-1/3 w-56 h-56 bg-gradient-to-tl from-gray-200/8 to-transparent rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: "9s", animationDelay: "3s" }}
            />
          </div>

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />

          {/* Floating orbs */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse blur-sm"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${30 + i * 5}%`,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${4 + i * 0.5}s`,
                }}
              />
            ))}
          </div>

          {/* Animated lines */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse"
              style={{ animationDuration: "5s", animationDelay: "1s" }}
            />
            <div
              className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse"
              style={{ animationDuration: "6s", animationDelay: "2s" }}
            />
          </div>
        </div>

        {/* Game Backgrounds */}
        {games.map((game) => (
          <div
            key={game.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              hoveredGame === game.id ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
            style={{
              backgroundImage: `url(${game.bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <div
          className={`flex items-center gap-3 transition-all duration-700 ${
            mounted ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}
        >
          <div
            className={`w-8 h-8 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-500 hover:from-white/30 hover:to-white/20 hover:rotate-12 hover:scale-110 ${logoAnimated ? "animate-bounce" : ""}`}
          >
            <Calculator className="w-5 h-5 text-white transition-transform duration-300 hover:rotate-12" />
          </div>
          <div className="overflow-hidden">
            <div className={`transition-all duration-700 delay-200 ${mounted ? "translate-y-0" : "translate-y-full"}`}>
              <span className="text-white font-bold text-xl transition-all duration-300 hover:text-gray-300 hover:scale-105 inline-block">
                gacha
              </span>
              <span className="text-white/80 font-bold text-xl transition-all duration-300 hover:text-white hover:scale-105 inline-block">
                .planner
              </span>
            </div>
          </div>
        </div>

        <div
          className={`flex items-center gap-6 transition-all duration-700 delay-200 ${
            mounted ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <Button
              variant="ghost"
              className={`text-gray-300 hover:text-white transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:-translate-y-1 ${
                mounted ? "translate-y-0" : "-translate-y-full"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              Home
            </Button>
          </div>
          <div className="overflow-hidden">
            <Button
              variant="ghost"
              className={`text-gray-300 hover:text-white transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:-translate-y-1 ${
                mounted ? "translate-y-0" : "-translate-y-full"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              About
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-8">
        {/* Enhanced Animated Title */}
        <div className="text-center mb-20 max-w-4xl">
          <div className="overflow-hidden">
            <h1 className="text-7xl font-bold mb-8">
              <span
                className={`inline-block text-white transition-all duration-1000 ease-out hover:scale-110 hover:text-gray-300 ${
                  mounted ? "translate-y-0 opacity-100 rotate-0" : "translate-y-20 opacity-0 -rotate-12"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                Choose
              </span>{" "}
              <span
                className={`inline-block text-white transition-all duration-1000 ease-out hover:scale-110 hover:text-gray-300 ${
                  mounted ? "translate-y-0 opacity-100 rotate-0" : "translate-y-20 opacity-0 rotate-12"
                }`}
                style={{ transitionDelay: "800ms" }}
              >
                Your
              </span>{" "}
              <span
                className={`inline-block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent transition-all duration-1000 ease-out hover:scale-125 hover:from-gray-200 hover:to-white ${
                  mounted
                    ? "translate-y-0 opacity-100 scale-100 rotate-0"
                    : "translate-y-20 opacity-0 scale-95 rotate-6"
                }`}
                style={{ transitionDelay: "1000ms" }}
              >
                Game
              </span>
            </h1>
          </div>

          {/* Animated subtitle with typewriter effect */}
          <div className="overflow-hidden">
            <p
              className={`text-gray-400 text-xl transition-all duration-1000 delay-300 ease-out ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "1200ms" }}
            >
              <span
                className={`inline-block transition-all duration-500 hover:text-white hover:scale-105 ${mounted ? "opacity-100" : "opacity-0"}`}
                style={{ transitionDelay: "1400ms" }}
              >
                Select
              </span>{" "}
              <span
                className={`inline-block transition-all duration-500 hover:text-white hover:scale-105 ${mounted ? "opacity-100" : "opacity-0"}`}
                style={{ transitionDelay: "1500ms" }}
              >
                a
              </span>{" "}
              <span
                className={`inline-block transition-all duration-500 hover:text-white hover:scale-105 ${mounted ? "opacity-100" : "opacity-0"}`}
                style={{ transitionDelay: "1600ms" }}
              >
                gacha
              </span>{" "}
              <span
                className={`inline-block transition-all duration-500 hover:text-white hover:scale-105 ${mounted ? "opacity-100" : "opacity-0"}`}
                style={{ transitionDelay: "1700ms" }}
              >
                game
              </span>{" "}
              <span
                className={`inline-block transition-all duration-500 hover:text-white hover:scale-105 ${mounted ? "opacity-100" : "opacity-0"}`}
                style={{ transitionDelay: "1800ms" }}
              >
                to
              </span>{" "}
              <span
                className={`inline-block transition-all duration-500 hover:text-white hover:scale-105 ${mounted ? "opacity-100" : "opacity-0"}`}
                style={{ transitionDelay: "1900ms" }}
              >
                access
              </span>{" "}
              <span
                className={`inline-block transition-all duration-500 hover:text-white hover:scale-105 ${mounted ? "opacity-100" : "opacity-0"}`}
                style={{ transitionDelay: "2000ms" }}
              >
                planning
              </span>{" "}
              <span
                className={`inline-block transition-all duration-500 hover:text-white hover:scale-105 ${mounted ? "opacity-100" : "opacity-0"}`}
                style={{ transitionDelay: "2100ms" }}
              >
                tools
              </span>
            </p>
          </div>
        </div>

        {/* Ultra Minimalistic Game Cards */}
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Update the game cards rendering to make logos bigger and add hover effects */}
            {games.map((game, index) => (
              <div
                key={game.id}
                className={`group cursor-pointer transition-all duration-700 ease-out ${
                  mounted ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                } hover:scale-105 hover:-translate-y-2`}
                style={{ transitionDelay: `${2600 + index * 200}ms` }}
                onMouseEnter={() => setHoveredGame(game.id)}
                onMouseLeave={() => setHoveredGame(null)}
              >
                {/* Clickable Card Container */}
                <Link href={game.available ? `/${game.id}` : "#"} className="block">
                  <div className="relative text-center py-12 px-8 transition-all duration-500 ease-out backdrop-blur-sm group-hover:backdrop-blur-none bg-black/10 group-hover:bg-transparent rounded-lg group-hover:rounded-none border border-white/5 group-hover:border-transparent group-hover:shadow-2xl group-hover:shadow-white/10">
                    {/* Animated border effect */}
                    <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-white/20 transition-all duration-500 group-hover:animate-pulse" />

                    {/* Game Logo */}
                    <div className="mb-8 flex justify-center">
                      <div className="relative transition-all duration-500 group-hover:scale-125 group-hover:rotate-3">
                        <img
                          src={game.logo || "/placeholder.svg"}
                          alt={game.name}
                          className={`h-24 w-auto object-contain filter brightness-0 invert transition-all duration-500 group-hover:brightness-100 group-hover:invert-0 group-hover:drop-shadow-2xl ${
                            game.hoverEffect === "glitch-intense"
                              ? "group-hover:animate-glitch-intense"
                              : game.hoverEffect === "glitch"
                                ? "group-hover:animate-glitch"
                                : game.hoverEffect === "shine"
                                  ? "group-hover:animate-shine"
                                  : game.hoverEffect === "pulse"
                                    ? "group-hover:animate-pulse"
                                    : ""
                          } ${!game.available ? "opacity-50" : ""}`}
                        />
                        {/* Enhanced Glow Effect */}
                        <div className="absolute inset-0 bg-white/30 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150" />
                        <div className="absolute inset-0 bg-white/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-200" />
                      </div>
                    </div>

                    {/* Coming Soon Badge for unavailable games */}
                    {!game.available && (
                      <div className="inline-block px-4 py-2 bg-gray-700/50 rounded-full text-gray-400 text-sm font-light">
                        Coming Soon
                      </div>
                    )}

                    {/* Subtle Hover Line */}
                    <div className="absolute bottom-0 left-1/2 w-0 h-px bg-gradient-to-r from-white/60 to-gray-300/60 transition-all duration-500 group-hover:w-24 group-hover:-translate-x-12" />

                    {/* Corner accents */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-white/0 group-hover:border-white/30 transition-all duration-500" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-white/0 group-hover:border-white/30 transition-all duration-500" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-white/0 group-hover:border-white/30 transition-all duration-500" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-white/0 group-hover:border-white/30 transition-all duration-500" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Enhanced Floating Particles Animation */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full transition-all duration-1000 ${
              i % 4 === 0
                ? "w-1 h-1 bg-white/30 animate-pulse"
                : i % 4 === 1
                  ? "w-2 h-2 bg-white/20 blur-sm animate-pulse"
                  : i % 4 === 2
                    ? "w-0.5 h-0.5 bg-white/40 animate-bounce"
                    : "w-1.5 h-1.5 bg-white/25 blur-sm animate-pulse"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Footer */}
      <footer
        className={`relative z-10 text-center py-8 transition-all duration-1000 delay-1200 ease-out hover:scale-105 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <p className="text-gray-600 text-sm font-light transition-colors duration-300 hover:text-gray-400">
          © 2024 Gacha Planner. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
