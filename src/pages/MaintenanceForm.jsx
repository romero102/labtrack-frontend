import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";

function MaintenanceForm() {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const {
    createMaintenance,
    getMaintenance,
    updateMaintenance,
    user,
    getComputer,
    errors: apiErrors,
  } = useAuth();

  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const [loadingMaintenance, setLoadingMaintenance] = useState(true);

  const categoryOptions = [
    { value: "physical", label: "Physical" },
    { value: "logical", label: "Logical" },
  ];
  const natureOptions = [
    { value: "preventive", label: "Preventive" },
    { value: "corrective", label: "Corrective" },
  ];

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In progress" },
    { value: "completed", label: "Completed" },
  ];

  useEffect(() => {
    async function loadData() {
      try {
        if (params.id) {
          // edición
          const maintenance = await getMaintenance(params.id);
          setValue("computer", maintenance.computer._id);
          setValue("computerCode", maintenance.computer.code);
          setValue("technician", maintenance.technician._id);
          setValue("technicianName", maintenance.technician.name);
          setValue("category", maintenance.category);
          setValue("nature", maintenance.nature);
          setValue("description", maintenance.description);
          setValue("findings", maintenance.findings);
          setValue("status", maintenance.status);
        } else {
          // creación
          const query = new URLSearchParams(location.search);
          const computerId = query.get("computerId");

          if (computerId) {
            const computer = await getComputer(computerId);
            setValue("computer", computer._id);
            setValue("computerCode", computer.code);
          }

          if (user) {
            setValue("technician", user._id);
            setValue("technicianName", user.name);
          }
        }
      } finally {
        setLoadingMaintenance(false);
      }
    }
    loadData();
  }, [params.id, location.search, user]);

  if (loadingMaintenance && params.id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold text-gray-700 animate-pulse">
          Loading Maintenance...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(async (values) => {
          if (params.id) {
            await updateMaintenance(params.id, values);
            toast.success("Maintenance edited successfully");
          } else {
            await createMaintenance(values);
            toast.success("Maintenance created successfully");
          }

          const redirectRoute =
            user.role === "admin" ? "/maintenance" : "/mymaintenance";

          navigate(redirectRoute);
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
          <label className="text-sm font-medium text-gray-700">Computer</label>
          <input
            type="hidden"
            {...register("computer", {
              required: "The computer is required",
            })}
          />
          <input
            type="text"
            {...register("computerCode", {
              required: "The computer is required",
            })}
            disabled
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
            type="hidden"
            {...register("technician")}
            className="px-4 py-2 border rounded-lg bg-gray-100 text-gray-700"
          />
          <input
            type="text"
            {...register("technicianName", {
              required: "The technician is required",
            })}
            disabled
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
          <Controller
            name="category"
            control={control} // viene de useForm()
            rules={{ required: "The category is required" }}
            render={({ field }) => (
              <Select
                options={categoryOptions}
                placeholder="Select a category..."
                className="text-sm"
                value={categoryOptions.find(
                  (option) => option.value === field.value,
                )}
                onChange={(selected) => field.onChange(selected.value)}
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
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Nature</label>
          <Controller
            name="nature"
            control={control} // viene de useForm()
            rules={{ required: "The nature is required" }}
            render={({ field }) => (
              <Select
                options={natureOptions}
                placeholder="Select a nature..."
                className="text-sm"
                value={natureOptions.find(
                  (option) => option.value === field.value,
                )}
                onChange={(selected) => field.onChange(selected.value)}
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
          <Controller
            name="status"
            control={control} // viene de useForm()
            rules={{ required: "The status is required" }}
            render={({ field }) => (
              <Select
                options={statusOptions}
                placeholder="Select a status..."
                className="text-sm"
                value={statusOptions.find(
                  (option) => option.value === field.value,
                )}
                onChange={(selected) => field.onChange(selected.value)}
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
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
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
            onClick={() =>
              navigate(user.role === "admin" ? "/computers" : "/mylaboratories")
            }
            className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default MaintenanceForm;
