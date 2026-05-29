import {
  SquarePen,
  Trash2,
  SquarePlus,
  ScanQrCode,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

function ComputerCard({
  computer,
  setSelectedComputer,
  setQrModalOpen,
  setModalOpen,
  handleDownload,
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 space-y-4">
      <div className="flex gap-4">
        <p className="text-sm text-gray-500">Code:</p>
        <p className="font-semibold text-gray-800">
          {computer.code}
        </p>
      </div>

      <div className="flex gap-4">
        <p className="text-sm text-gray-500">Laboratory:</p>
        <p className="text-gray-700">
          {computer.lab?.name || "No laboratory"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Processor</p>
          <p className="text-gray-700">{computer.processor}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">RAM</p>
          <p className="text-gray-700">{computer.ram}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Storage</p>
          <p className="text-gray-700">{computer.storage}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Graphics</p>
          <p className="text-gray-700">{computer.graphics}</p>
        </div>
      </div>

      {/* QR */}
      <div className="flex gap-4 justify-between">
        <p className="text-sm text-gray-500 mb-2">QR:</p>

        <div className="flex gap-3 flex-wrap">
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
            className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
          >
            Download
          </button>
        </div>
      </div>

      {/* Maintenance */}
      <div className="flex gap-4 justify-between">
        <p className="text-sm text-gray-500 mb-2">Maintenance:</p>

        <div className="flex gap-3 flex-wrap">
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
            className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
          >
            History
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 items-center pt-2 border-t border-gray-300">
        <Link
          to={`/computerform/${computer._id}`}
          className="text-blue-600 hover:text-blue-800 transition"
        >
          <SquarePen className="w-5 h-5" />
        </Link>

        <button
          className="text-red-600 hover:text-red-800 transition"
          onClick={() => {
            setSelectedComputer(computer);
            setModalOpen(true);
          }}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default ComputerCard;