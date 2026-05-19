import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";

function UserForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const {
    createUser,
    getUser,
    updateUser,
    getLabs,
    labs,
    errors: apiErrors,
  } = useAuth();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getLabs();
    async function loadUser() {
      if (params.id) {
        const user = await getUser(params.id);
        setValue("name", user.name);
        setValue("email", user.email);
        setValue("role", user.role);
        setValue(
          "labs",
          user.labs.map((lab) => lab._id),
        );
      }
    }
    loadUser();
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(async (values) => {
          if (params.id) {
            await updateUser(params.id, values);
          } else {
            await createUser(values);
          }

          navigate("/users");
        })}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-5"
      >
        {apiErrors.map((error, i) => (
          <div
            key={i}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3"
          >
            {error}
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            {...register("name", { required: "The name is required" })}
            aria-invalid={errors.name ? "true" : "false"}
            className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.name
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-400"
            }`}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p role="alert" className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
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
            <p role="alert" className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        {!params.id && (
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "the password is required",
                  minLength: {
                    value: 8,
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
        )}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Role
          </label>
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
            <option value="technician">Technician</option>
          </select>
          {errors.role && (
            <p role="alert" className="text-red-500 text-sm mt-1">
              {errors.role.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Laboratories
          </label>

          <div className="space-y-2">
            {labs.map((lab) => (
              <label key={lab._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={lab._id}
                  {...register("labs")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />

                <span className="text-gray-700">{lab.name}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 active:scale-95 transition duration-200"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default UserForm;
