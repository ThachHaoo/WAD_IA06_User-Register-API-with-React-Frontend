import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LogOut, CheckCircle2, ShieldCheck } from "lucide-react";

// Shadcn imports
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function Home() {
  const navigate = useNavigate();

  // 3. State giả lập loading
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Giả lập gọi API mất 2 giây
    const timer = setTimeout(() => {
      setUserData({
        name: "Admin User",
        email: "admin@gmail.com",
        role: "Administrator",
        joinedDate: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }),
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    toast.info("Đang đăng xuất...", {
      description: "Hẹn gặp lại bạn sớm!",
      duration: 2000,
    });

    setTimeout(() => {
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-500 shadow-md">
        {/* Banner */}
        {isLoading ? (
          <Skeleton className="h-32 w-full rounded-none" /> // Skeleton Banner
        ) : (
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 h-32 w-full animate-in fade-in duration-700"></div>
        )}

        <CardContent className="px-8 pb-8 flex flex-col items-center relative">
          {/* Avatar Area */}
          <div className="-mt-16 mb-4 rounded-full p-1.5 bg-white border border-gray-200">
            {isLoading ? (
              <Skeleton className="h-28 w-28 rounded-full" /> // Skeleton Avatar
            ) : (
              <Avatar className="h-28 w-28 border-4 border-white animate-in fade-in zoom-in-75 duration-500">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            )}
          </div>

          {/* User Info Area */}
          <div className="text-center space-y-2 w-full flex flex-col items-center">
            {isLoading ? (
              <>
                <Skeleton className="h-8 w-48" /> {/* Skeleton Name */}
                <Skeleton className="h-4 w-32" /> {/* Skeleton Email */}
                <div className="flex gap-2 mt-3">
                  <Skeleton className="h-6 w-20 rounded-full" />{" "}
                  {/* Skeleton Badge */}
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </>
            ) : (
              <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                  {userData.name}
                </h2>
                <p className="text-sm font-medium text-gray-500">
                  {userData.email}
                </p>

                <div className="flex justify-center gap-2 mt-3">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 hover:bg-green-200 gap-1"
                  >
                    <CheckCircle2 size={12} /> Active
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 hover:bg-blue-200 gap-1"
                  >
                    <ShieldCheck size={12} /> Verified
                  </Badge>
                </div>
              </div>
            )}
          </div>

          <Separator className="my-6" />

          {/* Details Area */}
          <div className="w-full space-y-4">
            {isLoading ? (
              // Skeleton cho các dòng thông tin
              [1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  {i !== 3 && <Separator />}
                </div>
              ))
            ) : (
              // Dữ liệu thật
              <div className="space-y-4 animate-in fade-in duration-1000">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Role</span>
                  <span className="font-bold text-gray-900">
                    {userData.role}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">
                    Member since
                  </span>
                  <span className="font-bold text-gray-900">
                    {userData.joinedDate}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Last Login</span>
                  <span className="font-bold text-gray-900">Just now</span>
                </div>
              </div>
            )}
          </div>

          <Button
            onClick={handleLogout}
            className="w-full mt-8 bg-slate-900 hover:bg-slate-800 gap-2"
            size="lg"
            disabled={isLoading} // Không cho logout khi đang load
          >
            <LogOut size={16} />
            Đăng xuất
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
