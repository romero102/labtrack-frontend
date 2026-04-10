import { useForm } from "react-hook-form";

function MaintenanceForm() {
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
          <label className="text-sm font-medium text-gray-700">Computer</label>
          <input
            type="text"
            {...register("computer", {
              required: "The computer is required",
            })}
            aria-invalid={errors.computer ? "true" : "false"}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.computer
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            placeholder="Computer ID or name"
          />
          {errors.computer && (
            <p className="text-red-500 text-sm">{errors.computer.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Technician
          </label>
          <input
            type="text"
            {...register("technician", {
              required: "The technician is required",
            })}
            aria-invalid={errors.technician ? "true" : "false"}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.technician
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            placeholder="Technician name"
          />
          {errors.technician && (
            <p className="text-red-500 text-sm">{errors.technician.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select
            {...register("category", { required: "The category is required" })}
            aria-invalid={errors.category ? "true" : "false"}
            className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.category
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
          >
            <option value="">Selected a category</option>
            <option value="physical">Physical</option>
            <option value="logical">Logical</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Nature</label>
          <select
            {...register("nature", { required: "The nature is required" })}
            aria-invalid={errors.nature ? "true" : "false"}
            className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.nature
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
          >
            <option value="">Selected a nature</option>
            <option value="preventive">Preventive</option>
            <option value="corrective">Corrective</option>
          </select>
          {errors.nature && (
            <p className="text-red-500 text-sm">{errors.nature.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            {...register("description", {
              required: "The description is required",
            })}
            aria-invalid={errors.description ? "true" : "false"}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.description
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            placeholder="Describe the issue"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Findings</label>
          <input
            type="text"
            {...register("findings", {
              required: "The findings are required",
            })}
            aria-invalid={errors.findings ? "true" : "false"}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.findings
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            placeholder="What was found"
          />
          {errors.findings && (
            <p className="text-red-500 text-sm">{errors.findings.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select
            {...register("status", { required: "The status is required" })}
            aria-invalid={errors.status ? "true" : "false"}
            className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.status
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
          >
            <option value="">Selected a status</option>
            <option value="pending">Penging</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Register mantenance
        </button>
      </form>
    </div>
  );
}

export default MaintenanceForm;
