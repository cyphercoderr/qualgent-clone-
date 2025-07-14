"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Bell,
  User,
  Folder,
  Plus,
  Edit2,
  Trash2,
  Play,
  FileText,
  List,
  LogOut,
  Search,
  Download,
  Upload,
} from "lucide-react"
import { testCategoriesApi, testCasesApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Toast } from "@/components/toast"

export function EnhancedTestCasesLayout() {
  const [testCategories, setTestCategories] = useState<any[]>([])
  const [testCases, setTestCases] = useState<any[]>([])
  const [filteredTestCases, setFilteredTestCases] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [newTestName, setNewTestName] = useState("")
  const [newTestDescription, setNewTestDescription] = useState("")
  const [newTestCategory, setNewTestCategory] = useState("")
  const [newCategoryName, setNewCategoryName] = useState("")
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [editingTest, setEditingTest] = useState<any>(null)
  const [userEmail, setUserEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false)
  const [isCreateTestOpen, setIsCreateTestOpen] = useState(false)
  const router = useRouter()
  const { toasts, toast, removeToast } = useToast()

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const email = localStorage.getItem("userEmail")

    if (!isAuthenticated) {
      router.push("/")
      return
    }

    setUserEmail(email || "")
    loadData()
  }, [router])

  useEffect(() => {
    // Filter test cases based on search and category
    let filtered = testCases

    if (selectedCategory !== "All") {
      const category = testCategories.find((cat) => cat.name === selectedCategory)
      if (category) {
        filtered = filtered.filter((tc) => tc.categoryId === category.id)
      }
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (tc) =>
          tc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tc.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredTestCases(filtered)
  }, [testCases, selectedCategory, searchQuery, testCategories])

  const loadData = async () => {
    try {
      setLoading(true)
      const [categoriesData, testCasesData] = await Promise.all([testCategoriesApi.getAll(), testCasesApi.getAll()])
      setTestCategories(categoriesData)
      setTestCases(testCasesData)
    } catch (error) {
      toast({ type: "error", title: "Failed to load data", description: "Please try again" })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return

    try {
      setLoading(true)
      await testCategoriesApi.create({ name: newCategoryName, count: 0 })
      setNewCategoryName("")
      setIsCreateCategoryOpen(false)
      await loadData()
      toast({ type: "success", title: "Category created successfully!" })
    } catch (error) {
      toast({ type: "error", title: "Failed to create category" })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTest = async () => {
    if (!newTestName.trim() || !newTestCategory) return

    try {
      setLoading(true)
      const category = testCategories.find((cat) => cat.name === newTestCategory)
      await testCasesApi.create({
        name: newTestName,
        description: newTestDescription,
        categoryId: category?.id,
      })

      // Update category count
      if (category) {
        await testCategoriesApi.update(category.id, { count: category.count + 1 })
      }

      setNewTestName("")
      setNewTestDescription("")
      setNewTestCategory("")
      setIsCreateTestOpen(false)
      await loadData()
      toast({ type: "success", title: "Test case created successfully!" })
    } catch (error) {
      toast({ type: "error", title: "Failed to create test case" })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCategory = async (category: any) => {
    if (window.confirm(`Are you sure you want to delete "${category.name}"?`)) {
      try {
        setLoading(true)
        await testCategoriesApi.delete(category.id)
        await loadData()
        toast({ type: "success", title: "Category deleted successfully!" })
      } catch (error) {
        toast({ type: "error", title: "Failed to delete category" })
      } finally {
        setLoading(false)
      }
    }
  }

  const handleDeleteTest = async (testCase: any) => {
    if (window.confirm(`Are you sure you want to delete "${testCase.name}"?`)) {
      try {
        setLoading(true)
        await testCasesApi.delete(testCase.id)

        // Update category count
        const category = testCategories.find((cat) => cat.id === testCase.categoryId)
        if (category && category.count > 0) {
          await testCategoriesApi.update(category.id, { count: category.count - 1 })
        }

        await loadData()
        toast({ type: "success", title: "Test case deleted successfully!" })
      } catch (error) {
        toast({ type: "error", title: "Failed to delete test case" })
      } finally {
        setLoading(false)
      }
    }
  }

  const exportTestCases = () => {
    const dataStr = JSON.stringify(filteredTestCases, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = "test-cases.json"
    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
    toast({ type: "success", title: "Test cases exported successfully!" })
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    router.push("/")
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
      {/* Toast notifications */}
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onRemove={removeToast} />
      ))}

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
            <Dialog open={isCreateCategoryOpen} onOpenChange={setIsCreateCategoryOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Plus className="h-4 w-4 mr-1" />
                  New
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Category</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="categoryName">Category Name</Label>
                    <Input
                      id="categoryName"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Enter category name"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleCreateCategory} disabled={loading} className="flex-1">
                      {loading ? "Creating..." : "Create Category"}
                    </Button>
                    <Button variant="outline" onClick={() => setIsCreateCategoryOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
                  <Folder className="h-4 w-4" />
                  <span className="text-sm">{category.name}</span>
                  {category.name !== "All" && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">{category.count}</span>
                  )}
                </div>
                {category.name !== "All" && (
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteCategory(category)
                      }}
                    >
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

            {/* Search and Actions */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search test cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" onClick={exportTestCases}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  {selectedCategory} ({filteredTestCases.length})
                </h2>
                <Dialog open={isCreateTestOpen} onOpenChange={setIsCreateTestOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                      <Plus className="h-4 w-4 mr-1" />
                      New
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Test Case</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="testCategory">Category</Label>
                        <Select value={newTestCategory} onValueChange={setNewTestCategory}>
                          <SelectTrigger>
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
                        <Label htmlFor="testName">Name</Label>
                        <Input
                          id="testName"
                          value={newTestName}
                          onChange={(e) => setNewTestName(e.target.value)}
                          placeholder="Enter test name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="testDescription">Description</Label>
                        <Textarea
                          id="testDescription"
                          value={newTestDescription}
                          onChange={(e) => setNewTestDescription(e.target.value)}
                          placeholder="Enter test description"
                          className="h-24"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleCreateTest} disabled={loading} className="flex-1">
                          {loading ? "Creating..." : "Create Test"}
                        </Button>
                        <Button variant="outline" onClick={() => setIsCreateTestOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm font-medium text-gray-700 pb-2 border-b border-gray-200">
                  <span>Test Cases</span>
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-500 mt-2">Loading...</p>
                  </div>
                ) : filteredTestCases.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No test cases found</p>
                  </div>
                ) : (
                  filteredTestCases.map((testCase, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 px-3 text-sm text-gray-700 hover:bg-gray-50 rounded group"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{testCase.name}</div>
                        <div className="text-xs text-gray-500">{testCase.description}</div>
                      </div>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => handleDeleteTest(testCase)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
