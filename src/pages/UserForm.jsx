import { useForm } from "react-hook-form";

function UserForm() {
  const { register, formState: {errors}, handleSubmit } = useForm();
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-200 px-4">
      <form
        onSubmit={handleSubmit((values) => {
          console.log(values);
        })}
       className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            {...register("username", { required: "The name is required" })}
            aria-invalid={errors.username ? "true" : "false"}
           className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.username
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-400"
            }`}
            placeholder="Enter your name"
          />
          {errors.username && (
            <p role="alert" className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: "email is required" })}
            aria-invalid={errors.email ? "true" : "false"}
            className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.email
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-400"
            }`}
            placeholder="correo@email.com"
          />
          {errors.email && (
            <p role="alert" className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            {...register("password", { required: "the password is required", minLength: {
              value: 6,
                message: "It must be at least 6 characters long",
            } })}
            aria-invalid={errors.password ? "true" : "false"}
            className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.password
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-400"
            }`}
            placeholder="********"
          />
          {errors.password && (
            <p role="alert" className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Role</label>
          <select
            {...register("role", { required: "The role is required" })}
            aria-invalid={errors.role ? "true" : "false"}
             className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.role
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          >
            <option value="">Selected a role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          {errors.role &&(
            <p role="alert" className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Laboratories
          </label>
          <input
            type="text"
            {...register("labs")}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ej: Lab 1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 active:scale-95 transition duration-200"
        >
          Register user
        </button>
      </form>
    </div>
  );
}

export default UserForm;
