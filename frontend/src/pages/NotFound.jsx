import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Import Button Shadcn
import { Home } from "lucide-react"; // Icon Home

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4 text-center">
      
      {/* Số 404 - Giữ nguyên style cũ vì nó đã khá ấn tượng */}
      <div className="relative">
        <h1 className="text-9xl font-extrabold text-gray-900 tracking-widest select-none">
          404
        </h1>
        <div className="bg-red-500 px-2 text-sm rounded rotate-12 absolute top-12 left-10 text-white font-bold shadow-md">
          Page Not Found
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="text-2xl font-bold md:text-3xl text-gray-800">
          Oops! Trang này không tồn tại.
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Có vẻ như đường dẫn bạn truy cập bị sai, trang đã bị xóa hoặc đã chuyển sang địa chỉ mới.
        </p>

        {/* Thay nút thường bằng Button Shadcn */}
        <Link to="/">
          <Button size="lg" className="mt-4 gap-2 shadow-lg">
            <Home size={18} />
            Quay về Trang chủ
          </Button>
        </Link>
      </div>
    </div>
  );
}