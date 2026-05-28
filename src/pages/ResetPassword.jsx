import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";

function ResetPassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { resetPassword, errors: authErrors } = useAuth();
  const navigate = useNavigate();
  const { token } = useParams();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = handleSubmit(async (values) => {
    if (values.password !== values.repeatpassword) {
      return alert("Passwords do not match");
    }

    await resetPassword(token, {
      password: values.password,
    });

    navigate("/login");
  });

  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-gray-100 px-4">
      {authErrors.length > 0 && (
        <div className="w-full max-w-md space-y-2 mb-4">
          {authErrors.map((error, i) => (
            <div
              key={i}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-sm"
            >
              {error}
            </div>
          ))}
        </div>
      )}
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "the password is required",
                minLength: {
                  value: 6,
                  message: "It must be at least 8 characters long",
                },
              })}
              aria-invalid={errors.password ? "true" : "false"}
              className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                errors.password
                  ? "border-red-400 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
              placeholder="********"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-sm text-blue-500"
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>

          {errors.password && (
            <p role="alert" className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Repeat Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("repeatpassword", {
                required: "the password is required",
                minLength: {
                  value: 6,
                  message: "It must be at least 8 characters long",
                },
              })}
              aria-invalid={errors.password ? "true" : "false"}
              className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                errors.repeatpassword
                  ? "border-red-400 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
              placeholder="********"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-sm text-blue-500"
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>

          {errors.repeatpassword && (
            <p role="alert" className="text-red-500 text-sm mt-1">
              {errors.repeatpassword.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
