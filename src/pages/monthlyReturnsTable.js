import { useState } from "react";

export default function MonthlyReturnsTable({ monthlyReturns }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Pagination logic
  const totalPages = Math.ceil(monthlyReturns.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = monthlyReturns.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="p-4">
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b">Month</th>
              <th className="px-4 py-2 border-b">Return (%)</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2 border-b">{item.month}</td>
                <td className="px-4 py-2 border-b">{item.return}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
