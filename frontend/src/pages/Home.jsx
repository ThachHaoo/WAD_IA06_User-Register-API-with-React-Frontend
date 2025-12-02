import { useNavigate } from "react-router-dom";
import { LogOut, CheckCircle2, ShieldCheck } from "lucide-react"; // Import icon cho đẹp

// Import các component của Shadcn
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const navigate = useNavigate();

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      
      {/* Sử dụng Card của Shadcn */}
      <Card className="w-full max-w-md shadow-2xl overflow-hidden border-none">
        
        {/* Banner màu */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32 w-full"></div>

        <CardContent className="px-8 pb-8 flex flex-col items-center relative">
          
          {/* Avatar Shadcn */}
          <div className="-mt-16 mb-4 rounded-full p-1.5 bg-white shadow-lg">
            <Avatar className="h-28 w-28 border-4 border-white">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
              <AvatarFallback>AD</AvatarFallback> {/* Hiện chữ AD nếu ảnh lỗi */}
            </Avatar>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Admin User</h2>
            <p className="text-sm font-medium text-gray-500">admin@gmail.com</p>
            
            {/* Badge Shadcn */}
            <div className="flex justify-center gap-2 mt-3">
              <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200 gap-1">
                <CheckCircle2 size={12} /> Active
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200 gap-1">
                <ShieldCheck size={12} /> Verified
              </Badge>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Thông tin chi tiết */}
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-medium">Role</span>
              <span className="font-bold text-gray-900">Administrator</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-medium">Member since</span>
              <span className="font-bold text-gray-900">{formattedDate}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-medium">Last Login</span>
              <span className="font-bold text-gray-900">Just now</span>
            </div>
          </div>

          {/* Button Shadcn */}
          <Button 
            onClick={handleLogout} 
            className="w-full mt-8 bg-slate-900 hover:bg-slate-800 gap-2"
            size="lg"
          >
            <LogOut size={16} />
            Đăng xuất
          </Button>

        </CardContent>
      </Card>
    </div>
  );
}