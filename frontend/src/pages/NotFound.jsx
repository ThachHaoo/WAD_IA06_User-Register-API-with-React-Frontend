import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4 text-center">
      {/* Số 404 to đùng */}
      <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest">
        404
      </h1>
      
      {/* Dòng chữ trang trí đè lên số */}
      <div className="bg-red-500 px-2 text-sm rounded rotate-12 absolute text-white font-bold shadow-md">
        Page Not Found
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold md:text-3xl text-gray-800 mb-2">
          Oops! Trang này không tồn tại.
        </h3>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Có vẻ như đường dẫn bạn truy cập bị sai hoặc trang đã bị xóa.
        </p>

        {/* Nút quay về Home */}
        <Link to="/">
          <button className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Quay về Trang chủ
          </button>
        </Link>
      </div>
    </div>
  );
}