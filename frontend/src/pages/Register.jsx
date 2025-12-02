import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "../api/axiosClient";
import { Link, useNavigate } from "react-router-dom";
import { emailValidation, passwordValidation } from "../utils/validations";
import { Loader2 } from "lucide-react"; // Icon loading

// Import Shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    delayError: 300,
  });

  const mutation = useMutation({
    mutationFn: async (newUser) => {
      return await axiosClient.post("/user/register", newUser);
    },
    onSuccess: () => {
      alert("Đăng ký thành công! Chuyển sang trang đăng nhập...");
      navigate("/login"); 
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Có lỗi xảy ra";
      alert(`Đăng ký thất bại: ${message}`);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg">
        
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Đăng Ký Tài Khoản
          </CardTitle>
          <p className="text-sm text-gray-500">
            Tạo tài khoản mới để bắt đầu trải nghiệm
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Input Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register("email", emailValidation)}
                className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-xs font-medium">{errors.email.message}</p>
              )}
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••"
                {...register("password", passwordValidation)}
                className={errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.password && (
                <p className="text-red-500 text-xs font-medium">{errors.password.message}</p>
              )}
            </div>

            {/* Nút Submit */}
            <Button 
              className="w-full" 
              type="submit" 
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang xử lý...
                </>
              ) : (
                "Đăng Ký"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <Link to="/" className="font-semibold text-blue-600 hover:underline">
              Đăng nhập ngay
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}