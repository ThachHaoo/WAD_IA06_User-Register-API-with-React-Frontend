import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      {/* Card chính - giống layout Login/Register */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-200">
        
        {/* Header - Tiêu đề chính */}
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Trang Chủ
        </h2>
        
        {/* Sub-heading - Mô tả ngắn */}
        <p className="text-center text-sm text-gray-600 mb-6">
          Đây là trang Home demo cho bài IA03 – User Registration API với React Frontend.
        </p>

        {/* Phần trạng thái đăng nhập giả lập */}
        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
          <p className="text-sm text-green-700 text-center">
            ✅ Bạn đã đăng nhập giả lập thành công từ màn hình Đăng Nhập.
          </p>
        </div>

        {/* Hướng dẫn sử dụng - Danh sách bullet */}
        <div className="mb-6 space-y-2">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Hướng dẫn sử dụng:
          </p>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            <li>Bước 1: Đăng ký tài khoản ở trang Đăng Ký.</li>
            <li>Bước 2: Thử đăng nhập giả lập ở trang Đăng Nhập.</li>
            <li>Bước 3: Kiểm tra dữ liệu user mới trong database (Supabase).</li>
          </ul>
        </div>

        {/* Nút điều hướng chính - Style giống nút Submit */}
        <Link to="/login">
          <button
            type="button"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Vào lại trang Đăng Nhập
          </button>
        </Link>

        {/* Link phụ - Style giống phần "Chưa có tài khoản?" */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Tạo tài khoản mới
          </Link>
        </p>
      </div>
    </div>
  );
}