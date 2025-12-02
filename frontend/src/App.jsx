import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Cấu hình React Query Client
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        {/* Thanh Menu đơn giản */}
        <nav className="bg-white p-4 shadow-md flex gap-4 justify-center">
          <Link to="/" className="text-blue-600 font-bold hover:underline">Home</Link>
          <Link to="/login" className="text-blue-600 font-bold hover:underline">Login</Link>
          <Link to="/register" className="text-blue-600 font-bold hover:underline">Register</Link>
        </nav>

        {/* Nơi nội dung thay đổi theo trang */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;