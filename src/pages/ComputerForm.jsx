import { useForm } from "react-hook-form";

function ComputerForm() {
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
          <label className="text-sm font-medium text-gray-700">
            Laboratory
          </label>
          <input
            type="text"
            {...register("laboratory", {
              required: "The laboratory is required",
            })}
            aria-invalid={errors.laboratory ? "true" : "false"}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.laboratory
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            placeholder="Lab name"
          />
          {errors.laboratory && (
            <p className="text-red-500 text-sm">{errors.laboratory.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Processor</label>
          <input
            type="text"
            {...register("processor", {
              required: "The processor is required",
            })}
            aria-invalid={errors.processor ? "true" : "false"}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.processor
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            placeholder="e.g. Intel i7"
          />
          {errors.processor && (
            <p className="text-red-500 text-sm">{errors.processor.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">RAM</label>
          <input
            type="text"
            {...register("ram", { required: "The RAM is required" })}
            aria-invalid={errors.ram ? "true" : "false"}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.ram
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            placeholder="e.g. 16GB"
          />
          {errors.ram && (
            <p className="text-red-500 text-sm">{errors.ram.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Storage</label>
          <input
            type="text"
            {...register("storage", {
              required: "The storage is required",
            })}
            aria-invalid={errors.storage ? "true" : "false"}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.storage
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            placeholder="e.g. 512GB SSD"
          />
          {errors.storage && (
            <p className="text-red-500 text-sm">{errors.storage.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Graphics</label>
          <input
            type="text"
            {...register("graphics", {
              required: "The graphics is required",
            })}
            aria-invalid={errors.graphics ? "true" : "false"}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.graphics
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            placeholder="e.g. NVIDIA RTX 3060"
          />
          {errors.graphics && (
            <p className="text-red-500 text-sm">{errors.graphics.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Register computer
        </button>
      </form>
    </div>
  );
}

export default ComputerForm;
