export default function Home() {

  const handleLogout = () => {
    // 1. Xóa token
    localStorage.removeItem("accessToken");
    // 2. Reload lại trang để App nhận diện lại là chưa đăng nhập -> Hiện Login
    window.location.reload();
  };

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

        {/* Nút Đăng xuất */}
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}