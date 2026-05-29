import { SquarePen } from "lucide-react";
import { Link } from "react-router-dom";

function UserCard({
  user,
  setSelectedUser,
  setAction,
  setModalOpen,
}) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 space-y-3">
      <div className="flex gap-4">
        <p className="text-sm text-gray-500">Name:</p>
        <p className="font-semibold text-gray-800">{user.name}</p>
      </div>

      <div className="flex gap-4">
        <p className="text-sm text-gray-500">Email:</p>
        <p className="text-gray-700 break-all">{user.email}</p>
      </div>

      <div className="flex gap-4">
        <p className="text-sm text-gray-500">Role:</p>
        <p className="text-gray-700 capitalize">{user.role}</p>
      </div>

      <div className="flex gap-4">
        <p className="text-sm text-gray-500">Laboratories:</p>
        <p className="text-gray-700">
          {user.labs?.length > 0
            ? user.labs.map((lab) => lab.name).join(", ")
            : "No laboratories"}
        </p>
      </div>

      <div className="flex gap-4">
        <p className="text-sm text-gray-500 mb-1">Status:</p>

        <span
          className={`px-2 py-1 rounded text-white text-sm ${
            user.isActive ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {user.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="flex items-center justify-end gap-4 pt-2 border-t border-gray-300">
        <Link
          to={`/userform/${user._id}`}
          className="text-blue-600 hover:text-blue-800 transition"
        >
          <SquarePen className="w-5 h-5" />
        </Link>

        {user.isActive ? (
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
            onClick={() => {
              setSelectedUser(user);
              setAction("deactivate");
              setModalOpen(true);
            }}
          >
            Deactivate
          </button>
        ) : (
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition"
            onClick={() => {
              setSelectedUser(user);
              setAction("activate");
              setModalOpen(true);
            }}
          >
            Activate
          </button>
        )}
      </div>
    </div>
  );
}

export default UserCard;