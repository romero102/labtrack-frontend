import { Search, SquarePen } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";
import UserCard from "../components/UserCard";

function Users() {
  const { users, getUsers, deleteUser, restoreUser, loadingUsers } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [action, setAction] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  if (loadingUsers) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (users.length === 0)
    return (
      <div className="mb-6 flex justify-between">
        <h1>No Users</h1>
        <Link
          to="/computerform"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
        >
          Add user
        </Link>
      </div>
    );

  const handleConfirm = async () => {
    setModalOpen(false);

    const promise =
      action === "deactivate"
        ? deleteUser(selectedUser._id)
        : restoreUser(selectedUser._id);

    toast.promise(promise, {
      loading:
        action === "deactivate" ? "Deactivating user..." : "Activating user...",
      success: action === "deactivate" ? "User deactivated" : "User activated",
      error: "Something went wrong",
    });
  };

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
      </div>
      <div className="mb-6 flex flex-col-reverse gap-4 md:flex-row md:justify-between">
        <form className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Find a user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </form>
        <Link
          to="/userform"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition text-center"
        >
          Add user
        </Link>
      </div>

      {/* Tabla */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Labs</th>
              <th className="px-6 py-3">Is active</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  {user.labs.map((lab) => lab.name).join(", ")}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      user.isActive ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-4">
                    <Link
                      to={`/userform/${user._id}`}
                      className="text-blue-600 hover:text-blue-800 transition flex items-center"
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredUsers.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            setSelectedUser={setSelectedUser}
            setAction={setAction}
            setModalOpen={setModalOpen}
          />
        ))}
      </div>

      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
        message={`Are you sure you want to ${action} this user?`}
      />
    </div>
  );
}

export default Users;
