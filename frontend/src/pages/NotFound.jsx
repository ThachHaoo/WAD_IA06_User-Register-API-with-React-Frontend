import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react"; // Đã xóa MoveLeft

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4 text-center">
      {/* Số 404 Gradient */}
      <h1 className="text-[10rem] font-extrabold leading-none tracking-tight text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 select-none">
        404
      </h1>

      <div className="mt-6 space-y-4">
        <h3 className="text-2xl font-bold md:text-3xl text-gray-900">
          Oops! Trang này không tồn tại.
        </h3>
        <p className="text-gray-500 max-w-md mx-auto text-base">
          Có vẻ như đường dẫn bạn truy cập bị sai, trang đã bị xóa hoặc đã
          chuyển sang địa chỉ mới.
        </p>

        {/* Nút Về Trang chủ */}
        <div className="flex justify-center gap-4 mt-8">
          <Link to="/">
            <Button
              size="lg"
              className="gap-2 border border-blue-700 bg-blue-600 hover:bg-blue-700"
            >
              <Home size={18} />
              Về Trang chủ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
