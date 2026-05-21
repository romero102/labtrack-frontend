function ComputerQr({ computer, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4 text-center">{computer.code}</h2>
        <img
          src={computer.qrImage}
          alt={`QR for ${computer.code}`}
          className="mx-auto w-48 h-48 object-contain"
        />
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

export default ComputerQr;
