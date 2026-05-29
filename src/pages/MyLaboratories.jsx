import { Link, useNavigate } from "react-router-dom";
import { Info, ScanQrCode, SquarePlus, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import ConfirmModal from "../components/ConfirmModal";
import ComputerQr from "../components/ComputerQr";
import MyLaboratoryCard from "../components/MyLaboratoryCard";
import ComputerCard from "../components/ComputerCard";

function MyLaboratories() {
  const {
    labs,
    getMyLabs,
    user,
    computers,
    getComputerByLab,
    loadingComputers,
    loadingLabs,
  } = useAuth();

  const [openLabId, setOpenLabId] = useState(null);
  const [selectedComputer, setSelectedComputer] = useState(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getMyLabs();
  }, []);

  if (loadingLabs) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (labs.length === 0) {
    return (
      <div className="mb-6 flex justify-between">
        <h1>
          You don't have a lab assigned to you; ask the administrator to assign
          you one.
        </h1>
      </div>
    );
  }

  // computadoras del laboratorio seleccionado
  const filteredComputers = [...(computers || [])]
    .filter((computer) =>
      computer.code.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (!user) return <h1>Loading...</h1>;

  const handleDownload = async (url, filename) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const selectedLab = labs.find((lab) => lab._id === openLabId);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My laboratories</h1>
      </div>

      {/* TABLA LABORATORIOS */}
      <div className="hidden md:block">
        <table className="w-full text-left mb-10">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Number of computers</th>
              <th className="px-6 py-3 text-center">Computers</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {labs.map((lab) => (
              <tr
                key={lab._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{lab.name}</td>
                <td className="px-6 py-4">{lab.location}</td>
                <td className="px-6 py-4">{lab.computerCount}</td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={async () => {
                      // cerrar si ya está abierto
                      if (openLabId === lab._id) {
                        setOpenLabId(null);
                        return;
                      }

                      // abrir nuevo laboratorio
                      setOpenLabId(lab._id);

                      // cargar computadoras
                      await getComputerByLab(lab._id);
                    }}
                    className="text-blue-600 hover:text-blue-800 transition flex items-center"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden space-y-4 mb-10">
        {labs.map((lab) => (
          <MyLaboratoryCard
            key={lab._id}
            lab={lab}
            openLabId={openLabId}
            setOpenLabId={setOpenLabId}
            getComputerByLab={getComputerByLab}
          />
        ))}
      </div>

      {/* TABLA COMPUTADORAS */}

      {openLabId && (
        <div>
          {loadingComputers ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredComputers.length === 0 ? (
            <h1>This laboratory has no computers.</h1>
          ) : (
            <div>
              <div className="mb-6 flex flex-col sm:flex-row sm:justify-between gap-4">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Computers - {selectedLab?.name}
                </h2>
                <div>
                  <form className="relative w-full md:max-w-md">
                    <input
                      type="text"
                      placeholder="Find a computer..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                  </form>
                </div>
              </div>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                    <tr>
                      <th className="px-6 py-3">Code</th>
                      <th className="px-6 py-3">Processor</th>
                      <th className="px-6 py-3">RAM</th>
                      <th className="px-6 py-3">Storage</th>
                      <th className="px-6 py-3">Graphics</th>
                      <th className="px-6 py-3">Qr</th>
                      <th className="px-6 py-3">Maintenance</th>
                    </tr>
                  </thead>

                  <tbody className="text-gray-700">
                    {filteredComputers.map((computer) => (
                      <tr
                        key={computer._id}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4">{computer.code}</td>
                        <td className="px-6 py-4">{computer.processor}</td>
                        <td className="px-6 py-4">{computer.ram}</td>
                        <td className="px-6 py-4">{computer.storage}</td>
                        <td className="px-6 py-4">{computer.graphics}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-4">
                            <button
                              className="text-green-600 hover:text-green-800 transition"
                              onClick={() => {
                                setSelectedComputer(computer);
                                setQrModalOpen(true);
                              }}
                            >
                              <ScanQrCode />
                            </button>
                            <button
                              onClick={() =>
                                handleDownload(
                                  computer.qrImage,
                                  `qr_${computer.code}.png`,
                                )
                              }
                              className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm mr-2"
                            >
                              Download
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-4">
                            <Link
                              to={`/maintenanceform?computerId=${computer._id}`}
                              className="text-blue-600 hover:text-blue-800 transition flex items-center"
                            >
                              <SquarePlus className="w-5 h-5" />
                            </Link>
                            <button
                              onClick={() => {
                                navigate(`/maintenance/${computer._id}`);
                              }}
                              className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm mr-2"
                            >
                              History
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="md:hidden space-y-4">
                {filteredComputers.map((computer) => (
                  <ComputerCard
                    key={computer._id}
                    computer={computer}
                    setSelectedComputer={setSelectedComputer}
                    setQrModalOpen={setQrModalOpen}
                    handleDownload={handleDownload}
                    navigate={navigate}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {qrModalOpen && selectedComputer && (
        <ComputerQr
          computer={selectedComputer}
          onClose={() => {
            setQrModalOpen(false);
            setSelectedComputer(null);
          }}
        />
      )}
    </div>
  );
}

export default MyLaboratories;
