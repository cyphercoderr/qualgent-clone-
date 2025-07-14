"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, User, Play, FileText, List, LogOut, ChevronDown } from "lucide-react"

export function QueueLayout() {
  const [userEmail, setUserEmail] = useState("")
  const [filters, setFilters] = useState({
    testRuns: "Test Runs",
    versions: "All Versions",
    priority: "Urgent",
    status: "Running",
    results: "All Results",
    categories: "All Categories",
  })
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
    } else if (tab === "run-view") {
      router.push("/run-view")
    } else if (tab === "files") {
      router.push("/files")
    }
  }

  const resetFilters = () => {
    setFilters({
      testRuns: "Test Runs",
      versions: "All Versions",
      priority: "Urgent",
      status: "Running",
      results: "All Results",
      categories: "All Categories",
    })
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
                className="flex items-center space-x-2 px-3 py-2 rounded-md cursor-pointer text-gray-600 hover:text-gray-900"
                onClick={() => handleTabClick("test-cases")}
              >
                <FileText className="h-4 w-4" />
                <span>Test Cases</span>
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
              <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-md border border-blue-200">
                <List className="h-4 w-4" />
                <span className="font-medium">Queue</span>
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

      {/* Main Content */}
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-blue-600 mb-2">Test Run Queue</h1>
          <p className="text-gray-600">Monitor and manage your test runs</p>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Test Runs</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>

          <Select value={filters.versions} onValueChange={(value) => setFilters({ ...filters, versions: value })}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Versions">All Versions</SelectItem>
              <SelectItem value="v1.0">v1.0</SelectItem>
              <SelectItem value="v2.0">v2.0</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.priority} onValueChange={(value) => setFilters({ ...filters, priority: value })}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Urgent">Urgent</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
            <SelectTrigger className="w-24 bg-blue-50 border-blue-200 text-blue-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Running">Running</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.results} onValueChange={(value) => setFilters({ ...filters, results: value })}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Results">All Results</SelectItem>
              <SelectItem value="Passed">Passed</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.categories} onValueChange={(value) => setFilters({ ...filters, categories: value })}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Categories">All Categories</SelectItem>
              <SelectItem value="Smoke">Smoke</SelectItem>
              <SelectItem value="Regression">Regression</SelectItem>
            </SelectContent>
          </Select>

          <button onClick={resetFilters} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Reset Filters
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 min-h-96">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-center">No test runs found</p>
          </div>
        </div>
      </div>
    </div>
  )
}
