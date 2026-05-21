import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function LaboratoryForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const { createLab, getLab, updateLab, errors: apiErrors } = useAuth();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadLaboratory() {
      if (params.id) {
        const laboratory = await getLab(params.id);
        setValue("name", laboratory.name);
        setValue("location", laboratory.location);
        setValue("computerCount", laboratory.computerCount);
      }
    }
    loadLaboratory();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(async (values) => {
          if (params.id) {
            await updateLab(params.id, values);
            toast.success("Laboratory edited successfully");
          } else {
            await createLab(values);
            toast.success("Laboratory created successfully");
          }

          navigate("/laboratories");
        })}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        {apiErrors.map((error, i) => (
          <div
            key={i}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3"
          >
            {error}
          </div>
        ))}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            {...register("name", { required: "The name is required" })}
            aria-invalid={errors.name ? "true" : "false"}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.name
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            placeholder="Laboratory name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            {...register("location", {
              required: "The location is required",
            })}
            aria-invalid={errors.location ? "true" : "false"}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.location
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            placeholder="e.g. Building A"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Number of computers
          </label>
          <input
            type="number"
            {...register("computerCount", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Must be at least 1 computer",
              },
            })}
            aria-invalid={errors.computerCount ? "true" : "false"}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.computerCount
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            placeholder="0"
          />
          {errors.computerCount && (
            <p className="text-red-500 text-sm">
              {errors.computerCount.message}
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 active:scale-95 transition duration-200"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate("/laboratories")}
            className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default LaboratoryForm;
