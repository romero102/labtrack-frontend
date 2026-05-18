import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function LaboratoryForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const {createLab, getLab} = useAuth()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(()=>{
    if(params.id){
      getLab(params.id)
    }
  },[])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit((values) => {
          createLab(values);
          navigate("/laboratories")
        })}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
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
            <p className="text-red-500 text-sm">{errors.computerCount.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Register laboratory
        </button>
      </form>
    </div>
  );
}

export default LaboratoryForm;
