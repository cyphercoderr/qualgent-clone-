"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, User, Folder, Plus, Edit2, Trash2, Play, FileText, List, LogOut } from "lucide-react"

const testCategories = [
  { name: "All", count: null, icon: Folder },
  { name: "new5", count: 3, icon: Folder },
  { name: "Another Test", count: 0, icon: Folder },
  { name: "hh", count: 1, icon: Folder },
  { name: "Instatest", count: 1, icon: Folder },
  { name: "Hey", count: 1, icon: Folder },
  { name: "yyy", count: 0, icon: Folder, hasActions: true },
  { name: "nmmm", count: 0, icon: Folder },
  { name: "SaketTest", count: 2, icon: Folder },
  { name: "Test name", count: 1, icon: Folder },
  { name: "test 333", count: 2, icon: Folder },
]

const testCases = [
  "aaa",
  "codewithkd",
  "ew",
  "hhh",
  "Karan",
  "test1",
  "ww",
  "ww",
  "Test Entire Functionality",
  "Ronz",
  "Test test",
]

export function TestCasesLayout() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [newTestName, setNewTestName] = useState("")
  const [newTestDescription, setNewTestDescription] = useState("")
  const [newTestCategory, setNewTestCategory] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const email = localStorage.getItem("userEmail")

    if (!isAuthenticated) {
      router.push("/")
      return
    }

    setUserEmail(email || "")
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  const handleCreateTest = () => {
    console.log("Creating test:", { newTestName, newTestDescription, newTestCategory })
    // Reset form
    setNewTestName("")
    setNewTestDescription("")
    setNewTestCategory("")
  }

  const handleTabClick = (tab: string) => {
    if (tab === "run-view") {
      router.push("/run-view")
    } else if (tab === "files") {
      router.push("/files")
    } else if (tab === "queue") {
      router.push("/queue")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">QG</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">QualGent</span>
            </div>

            <nav className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-md border border-blue-200">
                <FileText className="h-4 w-4" />
                <span className="font-medium">Test Cases</span>
              </div>
              <div
                className="flex items-center space-x-2 px-3 py-2 rounded-md cursor-pointer text-gray-600 hover:text-gray-900"
                onClick={() => handleTabClick("run-view")}
              >
                <Play className="h-4 w-4" />
                <span>Run & View</span>
              </div>
              <div
                className="flex items-center space-x-2 px-3 py-2 rounded-md cursor-pointer text-gray-600 hover:text-gray-900"
                onClick={() => handleTabClick("files")}
              >
                <FileText className="h-4 w-4" />
                <span>Files</span>
              </div>
              <div
                className="flex items-center space-x-2 px-3 py-2 rounded-md cursor-pointer text-gray-600 hover:text-gray-900"
                onClick={() => handleTabClick("queue")}
              >
                <List className="h-4 w-4" />
                <span>Queue</span>
              </div>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5 text-gray-600" />
            </Button>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-700">{userEmail}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="ml-2">
                <LogOut className="h-4 w-4 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Sidebar - Test Categories */}
        <div className="w-64 bg-white border-r border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">TEST CATEGORIES</h2>
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
              <Plus className="h-4 w-4 mr-1" />
              New
            </Button>
          </div>

          <div className="space-y-1">
            {testCategories.map((category, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer group ${
                  selectedCategory === category.name ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50 text-gray-700"
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className="flex items-center space-x-2 flex-1">
                  <category.icon className="h-4 w-4" />
                  <span className="text-sm">{category.name}</span>
                  {category.count !== null && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">{category.count}</span>
                  )}
                </div>
                {category.hasActions && (
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex">
          {/* Test Cases List */}
          <div className="flex-1 p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-blue-600 mb-2">Test Cases Repository</h1>
              <p className="text-gray-600">Manage your test cases and folders</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">All</h2>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Plus className="h-4 w-4 mr-1" />
                  New
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm font-medium text-gray-700 pb-2 border-b border-gray-200">
                  <span>Test Cases</span>
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {testCases.map((testCase, index) => (
                  <div key={index} className="py-2 px-3 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer">
                    {testCase}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Create New Test Case Form */}
          <div className="w-96 bg-white border-l border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Create new test case</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="category" className="text-sm font-medium text-gray-700 mb-2 block">
                  Category
                </Label>
                <Select value={newTestCategory} onValueChange={setNewTestCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {testCategories
                      .filter((cat) => cat.name !== "All")
                      .map((category, index) => (
                        <SelectItem key={index} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter test name"
                  value={newTestName}
                  onChange={(e) => setNewTestName(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-700 mb-2 block">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter a description for this test case"
                  value={newTestDescription}
                  onChange={(e) => setNewTestDescription(e.target.value)}
                  className="w-full h-32 resize-none"
                />
              </div>

              <Button onClick={handleCreateTest} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 mt-6">
                Create Test
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
