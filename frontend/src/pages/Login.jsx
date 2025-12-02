import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"; // Dùng local state để quản lý loading giả

export default function Login() {
  const navigate = useNavigate();
  const [isFakeLoading, setIsFakeLoading] = useState(false); // Biến trạng thái loading

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Hàm xử lý khi bấm nút Đăng nhập
  const onSubmit = (data) => {
    console.log("Dữ liệu đăng nhập:", data); // Log ra console chơi thôi
    
    // 1. Bật trạng thái loading
    setIsFakeLoading(true);

    // 2. Giả lập gọi server mất 1.5 giây (Mock logic)
    setTimeout(() => {
      setIsFakeLoading(false); // Tắt loading
      alert("Đăng nhập thành công! (Giả lập)"); // Thông báo giả [cite: 39]
      navigate("/"); // 3. Chuyển hướng về trang chủ
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Đăng Nhập
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Input Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { 
                required: "Vui lòng nhập email", 
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email không hợp lệ"
                }
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="name@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Input Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              type="password"
              {...register("password", { required: "Vui lòng nhập mật khẩu" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Nút Submit */}
          <button
            type="submit"
            disabled={isFakeLoading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
              ${isFakeLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isFakeLoading ? "Đang kiểm tra..." : "Đăng Nhập"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Đăng ký mới
          </Link>
        </p>
      </div>
    </div>
  );
}