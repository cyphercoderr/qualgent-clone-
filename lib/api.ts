const API_BASE = "http://localhost:5000"

// Generic API functions
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }

  return response.json()
}

// Test Categories API
export const testCategoriesApi = {
  getAll: () => apiRequest("/testCategories"),
  create: (data: any) =>
    apiRequest("/testCategories", {
      method: "POST",
      body: JSON.stringify({ ...data, createdAt: new Date().toISOString() }),
    }),
  update: (id: number, data: any) =>
    apiRequest(`/testCategories/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    apiRequest(`/testCategories/${id}`, {
      method: "DELETE",
    }),
}

// Test Cases API
export const testCasesApi = {
  getAll: () => apiRequest("/testCases"),
  getByCategory: (categoryId: number) => apiRequest(`/testCases?categoryId=${categoryId}`),
  create: (data: any) =>
    apiRequest("/testCases", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        status: "active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    }),
  update: (id: number, data: any) =>
    apiRequest(`/testCases/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ ...data, updatedAt: new Date().toISOString() }),
    }),
  delete: (id: number) =>
    apiRequest(`/testCases/${id}`, {
      method: "DELETE",
    }),
}

// App Files API
export const appFilesApi = {
  getAll: () => apiRequest("/appFiles"),
  create: (data: any) =>
    apiRequest("/appFiles", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        uploaded: new Date().toLocaleString(),
        uploadedAt: new Date().toISOString(),
      }),
    }),
  delete: (id: number) =>
    apiRequest(`/appFiles/${id}`, {
      method: "DELETE",
    }),
}

// Test Files API
export const testFilesApi = {
  getAll: () => apiRequest("/testFiles"),
  create: (data: any) =>
    apiRequest("/testFiles", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        uploaded: new Date().toLocaleString(),
        uploadedAt: new Date().toISOString(),
      }),
    }),
  delete: (id: number) =>
    apiRequest(`/testFiles/${id}`, {
      method: "DELETE",
    }),
}

// Test Runs API
export const testRunsApi = {
  getAll: () => apiRequest("/testRuns"),
  create: (data: any) =>
    apiRequest("/testRuns", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        startedAt: new Date().toISOString(),
        status: "running",
      }),
    }),
  update: (id: number, data: any) =>
    apiRequest(`/testRuns/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    apiRequest(`/testRuns/${id}`, {
      method: "DELETE",
    }),
}

// Analytics API
export const analyticsApi = {
  get: () => apiRequest("/analytics"),
}
