// Luật kiểm tra Email
export const emailValidation = {
  required: "Vui lòng nhập email",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Email không hợp lệ (ví dụ: abc@gmail.com)"
  }
};

// Luật kiểm tra Password
export const passwordValidation = {
  required: "Vui lòng nhập mật khẩu",
  minLength: {
    value: 6,
    message: "Mật khẩu phải có ít nhất 6 ký tự"
  }
};