import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "../api/axiosClient";
import { Link, useNavigate } from "react-router-dom";
import { emailValidation, passwordValidation } from "../utils/validations";

export default function Register() {
  const navigate = useNavigate(); // Dùng để chuyển trang (NavigationService)

  // 1. Setup Form (React Hook Form) [cite: 26]
  // register: Hàm để đăng ký input vào form (Binding)
  // handleSubmit: Hàm xử lý khi bấm nút Submit
  // errors: Chứa các lỗi validate (Validation Errors)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange", // Kích hoạt validate ngay khi gõ
    delayError: 300,
  });

  // 2. Setup API Call (React Query) [cite: 41]
  // mutationFn: Hàm thực thi gọi API
  const mutation = useMutation({
    mutationFn: async (newUser) => {
      // Gọi API POST /user/register [cite: 35]
      return await axiosClient.post("/user/register", newUser);
    },
    onSuccess: () => {
      alert("Đăng ký thành công! Chuyển sang trang đăng nhập...");
      navigate("/login"); // Chuyển hướng sau khi thành công
    },
    onError: (error) => {
      // Hiển thị lỗi từ Backend trả về
      const message = error.response?.data?.message || "Có lỗi xảy ra";
      alert(`Đăng ký thất bại: ${message}`);
    },
  });

  // Hàm được gọi khi user bấm nút Đăng ký và Form hợp lệ
  const onSubmit = (data) => {
    mutation.mutate(data); // Kích hoạt gọi API
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      {/* Card chứa form */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Đăng Ký Tài Khoản
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Input Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", emailValidation)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="name@example.com"
            />
            {/* Hiển thị lỗi validation [cite: 46] */}
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Input Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              type="password"
              {...register("password", passwordValidation)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Nút Submit */}
          <button
            type="submit"
            disabled={mutation.isPending} // Disable nút khi đang loading [cite: 43]
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
              ${mutation.isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
          >
            {mutation.isPending ? "Đang xử lý..." : "Đăng Ký"}
          </button>
        </form>

        {/* Link chuyển sang trang Login */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
}