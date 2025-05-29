"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  AlertTriangle,
  Menu,
  Download,
  Upload,
  FileDown,
  Search,
  Star,
  BarChart3,
  Trophy,
  Calendar,
  Target,
  Users,
  Sword,
  Package,
  BookOpen,
  Settings,
  X,
} from "lucide-react"

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState("Exploration: Huanglong")
  const [searchTerm, setSearchTerm] = useState("")
  const [completionFilter, setCompletionFilter] = useState("All")
  const [hiddenFilter, setHiddenFilter] = useState("All")

  const categories = [
    { name: "Exploration: Huanglong", progress: "0/35", percentage: "0.00%", total: "0/285" },
    { name: "Footprints in Huanglong I", progress: "0/16", percentage: "0.00%", total: "0/100" },
    { name: "Footprints in Huanglong II", progress: "0/14", percentage: "0.00%", total: "0/145" },
    { name: "Wilderness Calls", progress: "0/39", percentage: "0.00%", total: "0/380" },
    { name: "Footprints on the Shores I", progress: "0/17", percentage: "0.00%", total: "0/150" },
    { name: "Exploration: Rinascita", progress: "0/64", percentage: "0.00%", total: "0/435" },
    { name: "Footprints in Rinascita I", progress: "0/22", percentage: "0.00%", total: "0/180" },
  ]

  const achievements = [
    {
      title: "POWER!",
      description: "Sit on the highest chair in Jinzhou.",
      stars: 5,
      completed: false,
    },
    {
      title: "May the Beacons Guide Us",
      description: 'Complete "Lost History."',
      stars: 5,
      completed: false,
    },
    {
      title: "One-way Road Ahead",
      description: "Solve a Magnetic Cube puzzle 1 time.",
      stars: 5,
      completed: false,
    },
    {
      title: "Set off the Fireworks",
      description: "Solve an Encryption Block puzzle 1 time.",
      stars: 5,
      completed: false,
    },
    {
      title: "The Metamorphosis",
      description: "Complete 5 Echo Challenges.",
      stars: 5,
      completed: false,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div>
              <span className="text-white font-medium">wuwatracker</span>
              <span className="text-orange-500">.com</span>
              <div className="text-xs text-gray-400">Wuthering Waves Tools</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-red-600 px-3 py-1 rounded text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Alert</span>
          </div>
          <span className="text-sm text-gray-300">
            {"It's been over a month since your last local backup. Download now?"}
          </span>
          <Download className="w-4 h-4 text-gray-400" />
          <X className="w-4 h-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-gray-300">
            🌐 English
          </Button>
          <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center text-sm">a</div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 min-h-screen p-4">
          <div className="flex items-center gap-2 mb-6">
            <Menu className="w-5 h-5" />
            <span className="font-medium">Achievements</span>
          </div>

          <nav className="space-y-6">
            <div>
              <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-3">Tools</h3>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
                  <BarChart3 className="w-4 h-4 mr-3" />
                  Pull Tracker
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
                  <BarChart3 className="w-4 h-4 mr-3" />
                  Global Statistics
                </Button>
                <Button variant="ghost" className="w-full justify-start text-white bg-gray-800">
                  <Trophy className="w-4 h-4 mr-3" />
                  Achievements
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
                  <Calendar className="w-4 h-4 mr-3" />
                  Event Timeline
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
                  <Target className="w-4 h-4 mr-3" />
                  Ascension Planner
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-3">Inventory</h3>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
                  <Users className="w-4 h-4 mr-3" />
                  Resonators
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
                  <Sword className="w-4 h-4 mr-3" />
                  Weapons
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
                  <Package className="w-4 h-4 mr-3" />
                  Items
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-3">Guides</h3>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
                  <Upload className="w-4 h-4 mr-3" />
                  Import Pulls
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
                  <BookOpen className="w-4 h-4 mr-3" />
                  Support
                </Button>
              </div>
            </div>
          </nav>

          <div className="mt-8 pt-4 border-t border-gray-800">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
              <Upload className="w-4 h-4 mr-3" />
              Import Old Pulls
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-8">Achievements</h1>

          <div className="grid grid-cols-12 gap-6">
            {/* Categories List */}
            <div className="col-span-4 space-y-2">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedCategory === category.name ? "bg-gray-700" : "bg-gray-800 hover:bg-gray-750"
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <h3 className="font-medium text-white mb-2">{category.name}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      {category.progress} ({category.percentage})
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400">{category.total}</span>
                      <Star className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Achievement Details */}
            <div className="col-span-8">
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">{selectedCategory}</h2>
                  <div className="text-right">
                    <div className="text-3xl font-bold">0.00%</div>
                    <div className="text-sm text-gray-400">Completed (0/35)</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Import
                  </Button>
                  <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700">
                    <FileDown className="w-4 h-4 mr-2" />
                    Export JSON
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Search</label>
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Search for something..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Completion</label>
                    <Select value={completionFilter} onValueChange={setCompletionFilter}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Incomplete">Incomplete</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Hidden</label>
                    <Select value={hiddenFilter} onValueChange={setHiddenFilter}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Hidden">Hidden</SelectItem>
                        <SelectItem value="Visible">Visible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-white mb-1">{achievement.title}</h3>
                        <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: achievement.stars }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <Checkbox
                        checked={achievement.completed}
                        className="w-5 h-5 border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
