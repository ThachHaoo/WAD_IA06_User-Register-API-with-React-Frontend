import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { emailValidation, passwordValidation } from "../utils/validations";

// Import Shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";

export default function Login() {
  const navigate = useNavigate();
  const [isFakeLoading, setIsFakeLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
    delayError: 300,
  });

  const isRemembered = watch("remember");

  const onSubmit = () => {
    setIsFakeLoading(true);
    setTimeout(() => {
      setIsFakeLoading(false);
      const token = "token_gia_lap_123456";

      // 4. LOGIC QUAN TRỌNG Ở ĐÂY:
      if (isRemembered) {
        // Nếu tích -> Lưu vào localStorage (Vĩnh viễn)
        localStorage.setItem("accessToken", token);
      } else {
        // Nếu không tích -> Lưu vào sessionStorage (Mất khi tắt tab)
        sessionStorage.setItem("accessToken", token);
      }
      toast.success("Chào mừng trở lại! 👋", {
        description: "Đăng nhập thành công. Đang chuyển hướng...",
        duration: 3000,
      });
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000); // Delay 1s
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md border border-gray-200 shadow-md animate-in fade-in zoom-in-95 duration-700">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Đăng nhập
          </CardTitle>
          <p className="text-sm text-gray-500">
            Nhập email và mật khẩu để truy cập
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
                // Input của Shadcn hỗ trợ class lỗi rất hay
                className={
                  errors.email
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
              />
              {errors.email && (
                <p className="text-red-500 text-xs font-medium">
                  {errors.email.message}
                </p>
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
                className={
                  errors.password
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
              />
              {errors.password && (
                <p className="text-red-500 text-xs font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                onCheckedChange={(checked) => setValue("remember", checked)}
              />
              <Label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-600"
              >
                Ghi nhớ đăng nhập
              </Label>
            </div>

            {/* Nút Submit */}
            <Button className="w-full" type="submit" disabled={isFakeLoading}>
              {isFakeLoading ? (
                <>
                  <Spinner className="mr-2" />
                  Đang kiểm tra...
                </>
              ) : (
                "Đăng Nhập"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:underline"
            >
              Đăng ký mới
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
