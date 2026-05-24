function DetailMaintenance({maintenance, onClose}) {
    return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4 text-center">{maintenance.computer.code}</h2>
        <div className="flex gap-4">
            <p>Technician:</p>
            <p>{maintenance.technician?.name}</p>
        </div>
        <div className="flex gap-4">
            <p>Category:</p>
            <p>{maintenance.category}</p>
        </div>
        <div className="flex gap-4">
            <p>Nature:</p>
            <p>{maintenance.nature}</p>
        </div>
        <div className="flex gap-4">
            <p>Description:</p>
            <p>{maintenance.description}</p>
        </div>
        <div className="flex gap-4">
            <p>Findings</p>
            <p>{maintenance.findings}</p>
        </div>
        <div className="flex gap-4">
            <p>Status:</p>
            <p>{maintenance.status}</p>
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailMaintenance