import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";

function ComputerForm() {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const {
    createComputer,
    getComputer,
    updateComputer,
    labs,
    errors: apiErrors,
  } = useAuth();
  const navigate = useNavigate();
  const params = useParams();

  const [loadingComputer, setLoadingComputer] = useState(true);

  useEffect(() => {
    async function loadComputer() {
      try {
        if (params.id) {
        const computer = await getComputer(params.id);
        setValue("code", computer.code);
        setValue("lab", computer.lab._id || computer.lab);
        setValue("processor", computer.processor);
        setValue("ram", computer.ram);
        setValue("storage", computer.storage);
        setValue("graphics", computer.graphics);
      }
      } finally {
      setLoadingComputer(false);
    }
    }
    loadComputer();
  }, []);

  const labOptions = labs.map((lab) => ({
    value: lab._id,
    label: lab.name,
  }));

  if (loadingComputer && params.id) {
  return (
  <div className="min-h-screen flex items-center justify-center px-4">
      <h1 className="text-xl font-semibold text-gray-700 animate-pulse">
        Loading computer...
      </h1> 
  </div>
);
}

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(async (values) => {
          if (params.id) {
            await updateComputer(params.id, values);
            toast.success("Computer edited successfully");
          } else {
            await createComputer(values);
            toast.success("Computer created successfully");
          }

          navigate("/computers");
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
          <label className="text-sm font-medium text-gray-700">Code</label>
          <input
            type="text"
            {...register("code", {
              required: "The code is required",
            })}
            aria-invalid={errors.code ? "true" : "false"}
            className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.role
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-400"
            }`}
            placeholder="code"
          />
          {errors.code && (
            <p className="text-red-500 text-sm">{errors.code.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Laboratory
          </label>
          <Controller
            name="lab"
            control={control}
            rules={{ required: "The laboratory is required" }}
            render={({ field }) => (
              <Select
                options={labOptions}
                placeholder="Select a laboratory..."
                className="text-sm"
                onChange={(selected) => field.onChange(selected.value)}
                value={labOptions.find(
                  (option) => option.value === field.value,
                )}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderColor: state.isFocused
                      ? "#3b82f6" // azul Tailwind
                      : "#d1d5db", // gris Tailwind
                    boxShadow: state.isFocused ? "0 0 0 2px #93c5fd" : "none",
                    "&:hover": { borderColor: "#3b82f6" },
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused
                      ? "#bfdbfe" // azul claro al hover
                      : "white",
                    color: "#1f2937", // gris oscuro
                  }),
                }}
              />
            )}
          />
          {errors.lab && (
            <p className="text-red-500 text-sm">{errors.lab.message}</p>
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

        <div className="flex gap-3">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 active:scale-95 transition duration-200"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate("/computers")}
            className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ComputerForm;
