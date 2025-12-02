import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "../api/axiosClient";
import { Link, useNavigate } from "react-router-dom";
import { emailValidation, passwordValidation } from "../utils/validations";
import { AlertCircle } from "lucide-react";

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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    delayError: 300,
  });

  const termsAccepted = watch("terms");

  const mutation = useMutation({
    mutationFn: async (newUser) => {
      return await axiosClient.post("/user/register", newUser);
    },
    onSuccess: () => {
      toast.success("Đăng ký thành công! 🎉", {
        description: "Bạn sẽ được chuyển sang trang đăng nhập ngay bây giờ.",
        duration: 3000, // Tự tắt sau 3s
      });
      navigate("/login");
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Có lỗi xảy ra";
      toast.error("Đăng ký thất bại", {
        description: message,
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md border border-gray-200 animate-in fade-in zoom-in-95 duration-500 shadow-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Đăng Ký Tài Khoản
          </CardTitle>
          <p className="text-sm text-gray-500">
            Tạo tài khoản mới để bắt đầu trải nghiệm
          </p>
        </CardHeader>

        <CardContent>
          {mutation.isError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Lỗi đăng ký</AlertTitle>
              <AlertDescription>
                {mutation.error?.response?.data?.message ||
                  "Đã xảy ra lỗi không xác định."}
              </AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Input Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register("email", emailValidation)}
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

            <div className="flex items-top space-x-2">
              <Checkbox
                id="terms"
                onCheckedChange={(checked) => setValue("terms", checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-600"
                >
                  Tôi đồng ý với các{" "}
                  <span className="text-blue-600 underline hover:text-blue-500">
                    điều khoản và dịch vụ
                  </span>
                </Label>
                <p className="text-xs text-muted-foreground">
                  Bạn cần đồng ý để tiếp tục.
                </p>
              </div>
            </div>

            {/* Nút Submit */}
            <Button
              className="w-full"
              type="submit"
              disabled={mutation.isPending || !termsAccepted}
            >
              {mutation.isPending ? (
                <>
                  <Spinner className="mr-2" />
                  Đang xử lý...
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
            <Link
              to="/"
              className="font-semibold text-blue-600 hover:underline"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
