import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";
import CreateTask from "./pages/CreateTask";
import Dashboard from "./pages/Dashboard";
import News from "./pages/News";
import Pricing from "./pages/Pricing";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-dtoad-background via-dtoad-background-light to-dtoad-background">
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/news" element={<News />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/explore-tasks" element={<Navigate to="/tasks" replace />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;