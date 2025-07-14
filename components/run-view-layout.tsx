"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Bell, User, Folder, Play, FileText, List, LogOut } from "lucide-react"

const testCategories = [
  { name: "All", count: 11, icon: Folder },
  { name: "new5", count: 3, icon: Folder },
  { name: "Another Test", count: 0, icon: Folder },
  { name: "hh", count: 1, icon: Folder },
  { name: "Instatest", count: 1, icon: Folder },
  { name: "Hey", count: 1, icon: Folder },
  { name: "yyy", count: 0, icon: Folder },
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

export function RunViewLayout() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTestCases, setSelectedTestCases] = useState<string[]>([])
  const [selectedTestCase, setSelectedTestCase] = useState("ww")
  const [activeTab, setActiveTab] = useState("History")
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

  const handleTabClick = (tab: string) => {
    if (tab === "test-cases") {
      router.push("/test-cases")
    } else if (tab === "files") {
      router.push("/files")
    } else if (tab === "queue") {
      router.push("/queue")
    }
  }

  const handleTestCaseSelect = (testCase: string, checked: boolean) => {
    if (checked) {
      setSelectedTestCases([...selectedTestCases, testCase])
    } else {
      setSelectedTestCases(selectedTestCases.filter((tc) => tc !== testCase))
    }
  }

  const handleRunTests = () => {
    console.log("Running tests:", selectedTestCases)
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
              <div
                className="flex items-center space-x-2 px-3 py-2 rounded-md cursor-pointer text-gray-600 hover:text-gray-900 border-transparent"
                onClick={() => handleTabClick("test-cases")}
              >
                <FileText className="h-4 w-4" />
                <span>Test Cases</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-md border border-blue-200">
                <Play className="h-4 w-4" />
                <span className="font-medium">Run & View</span>
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
          <div className="space-y-1">
            {testCategories.map((category, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                  selectedCategory === category.name ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50 text-gray-700"
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className="flex items-center space-x-2 flex-1">
                  <category.icon className="h-4 w-4" />
                  <span className="text-sm">{category.name}</span>
                  <span className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">{category.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex">
          {/* Test Cases Selection Panel */}
          <div className="w-80 bg-white border-r border-gray-200 p-4">
            <div className="mb-4">
              <Button
                onClick={handleRunTests}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                disabled={selectedTestCases.length === 0}
              >
                <Play className="h-4 w-4 mr-2" />
                Run Tests
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
                <div
                  key={index}
                  className="flex items-center space-x-3 py-2 px-3 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <Checkbox
                    checked={selectedTestCases.includes(testCase)}
                    onCheckedChange={(checked) => handleTestCaseSelect(testCase, checked as boolean)}
                  />
                  <span className="text-sm text-gray-700 flex-1" onClick={() => setSelectedTestCase(testCase)}>
                    {testCase}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Simulator Panel */}
          <div className="flex-1 p-6 flex flex-col">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{selectedTestCase}</h2>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                {/* iPhone Frame */}
                <div className="w-80 h-[600px] bg-black rounded-[3rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] relative overflow-hidden">
                    {/* iPhone Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl"></div>

                    {/* Screen Content */}
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-gray-500">
                        <p className="text-sm">No video available</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* History/Comments Panel */}
          <div className="w-80 bg-white border-l border-gray-200 p-4">
            <div className="mb-4">
              <div className="flex border-b border-gray-200">
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "History"
                      ? "text-gray-900 border-b-2 border-blue-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("History")}
                >
                  History
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "Comments"
                      ? "text-gray-900 border-b-2 border-blue-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("Comments")}
                >
                  Comments
                </button>
              </div>
            </div>

            <div className="flex-1">
              {activeTab === "History" && (
                <div className="text-center text-gray-500 mt-8">
                  <p className="text-sm">No test runs found</p>
                </div>
              )}
              {activeTab === "Comments" && (
                <div className="text-center text-gray-500 mt-8">
                  <p className="text-sm">No comments yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
