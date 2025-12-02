import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/sonner";

// Cấu hình React Query Client
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

function App() {
  const isAuthenticated = !!localStorage.getItem("accessToken") || !!sessionStorage.getItem("accessToken");
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        {/* Nơi nội dung thay đổi theo trang */}
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Home /> : <Login />} 
          />

          {/* Route Login riêng lẻ:
             Nếu đã đăng nhập rồi mà cố tình vào /login thì đá về Home luôn */}
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
          />

          {/* Trang Register vẫn giữ nguyên đường dẫn riêng */}
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;