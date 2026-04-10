import { useForm } from "react-hook-form";

function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit((values) => {
          console.log(values);
        })}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            aria-invalid={errors.email ? "true" : "false"}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.email
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            placeholder="tu@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "It must be at least 6 characters long",
              },
            })}
            aria-invalid={errors.password ? "true" : "false"}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.password
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
