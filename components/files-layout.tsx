"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Bell, User, Play, FileText, List, LogOut, File } from "lucide-react"

const appFiles = [
  {
    appName: "d",
    version: "s",
    os: "android",
    filename: "2c0d4807-592a-4b8e-be7f-f70686eeb49a.apk",
    size: "156.07 MB",
    uploaded: "Jul 11, 2025, 09:51 AM",
  },
  {
    appName: "Youtube",
    version: "1.1",
    os: "android",
    filename: "YouTube_20.26.40_APKPure.apk",
    size: "156.07 MB",
    uploaded: "Jul 10, 2025, 06:41 AM",
  },
]

const testFiles = [
  {
    type: "image",
    name: "nf-aws-batch.png",
    size: "158.26 KB",
    uploaded: "Jul 11, 2025, 10:31 PM",
  },
  {
    type: "image",
    name: "Karan.jpeg",
    size: "5.37 KB",
    uploaded: "Jul 11, 2025, 12:04 PM",
  },
  {
    type: "file",
    name: "APKPure_v3.20.51_apkpure.com.apk",
    size: "19.91 MB",
    uploaded: "Jul 10, 2025, 07:25 AM",
  },
  {
    type: "file",
    name: "vault.1.20.0_windows_amd64.zip",
    size: "168.99 MB",
    uploaded: "Jul 10, 2025, 07:15 AM",
  },
  {
    type: "file",
    name: "NoSQL_Workbench.exe",
    size: "147.41 MB",
    uploaded: "Jul 10, 2025, 07:14 AM",
  },
  {
    type: "pdf",
    name: "new_resume.pdf",
    size: "113.23 KB",
    uploaded: "Jul 10, 2025, 07:09 AM",
  },
  {
    type: "pdf",
    name: "resume.pdf",
    size: "113.32 KB",
    uploaded: "Jul 10, 2025, 04:39 AM",
  },
  {
    type: "pdf",
    name: "Rahul_Panchal-Resume.pdf",
    size: "223.98 KB",
    uploaded: "Jul 9, 2025, 08:43 PM",
  },
  {
    type: "pdf",
    name: "OmSinghan_CoverLetter.pdf",
    size: "41.49 KB",
    uploaded: "Jul 9, 2025, 07:46 PM",
  },
]

export function FilesLayout() {
  const [userEmail, setUserEmail] = useState("")
  const [appName, setAppName] = useState("")
  const [version, setVersion] = useState("")
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
    } else if (tab === "queue") {
      router.push("/queue")
    }
  }

  const getFileIcon = (type: string) => {
    if (type === "image") return "🖼️"
    if (type === "pdf") return "📄"
    return "📁"
  }

  const getOSIcon = (os: string) => {
    return os === "android" ? "🤖" : "📱"
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
              <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-md border border-blue-200">
                <FileText className="h-4 w-4" />
                <span className="font-medium">Files</span>
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

      {/* Main Content */}
      <div className="p-6 flex space-x-6">
        {/* Left Column - App Files */}
        <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">App Files</h2>
            <p className="text-gray-600 text-sm">Upload app files here (iOS: .ipa, .app, Android: .apk, .aab)</p>
          </div>

          {/* Upload Form */}
          <div className="mb-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="App Name"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className="border-gray-300"
              />
              <Input
                placeholder="Version (e.g. 1.0.0)"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="border-gray-300"
              />
            </div>
          </div>

          {/* App Files Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-700"></th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">App Name</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">Version</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">OS</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">Filename</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">Size</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">Uploaded</th>
                </tr>
              </thead>
              <tbody>
                {appFiles.map((file, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2">
                      <Checkbox />
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-900">{file.appName}</td>
                    <td className="py-3 px-2 text-sm text-gray-900">{file.version}</td>
                    <td className="py-3 px-2 text-sm">{getOSIcon(file.os)}</td>
                    <td className="py-3 px-2 text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                      {file.filename}
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-700">{file.size}</td>
                    <td className="py-3 px-2 text-sm text-gray-700">{file.uploaded}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column - Test Files */}
        <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Test Files</h2>
            <p className="text-gray-600 text-sm">Files to be used in tests (credentials csv, PDF, etc.)</p>
          </div>

          <div className="mb-6">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">Select Files</Button>
          </div>

          {/* Test Files Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-700"></th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">Type</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">Name</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">Size</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">Uploaded</th>
                </tr>
              </thead>
              <tbody>
                {testFiles.map((file, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2">
                      <Checkbox />
                    </td>
                    <td className="py-3 px-2 text-sm">
                      <File className="h-4 w-4 text-blue-500" />
                    </td>
                    <td className="py-3 px-2 text-sm text-blue-600 hover:text-blue-700 cursor-pointer">{file.name}</td>
                    <td className="py-3 px-2 text-sm text-gray-700">{file.size}</td>
                    <td className="py-3 px-2 text-sm text-gray-700">{file.uploaded}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
