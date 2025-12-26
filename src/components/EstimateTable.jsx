import { Link } from "react-router-dom";
import estimateApi from "../api/estimateApi";
import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";

const EstimateTable = ({ data, onEdit, onDeleted }) => {
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this estimate?")) return;
    try {
      await estimateApi.remove(id);
      toast.success("Estimate deleted successfully");
      onDeleted?.();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete estimate");
    }
  };

 const handleDownloadPdf = async (id) => {
  try {
    const res = await axiosClient.get(`/estimate/${id}/pdf`, {
      responseType: "blob",
    });

    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `estimate-${id}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);

    // ✅ SUCCESS TOAST (THIS WAS MISSING)
    toast.success("PDF downloaded successfully 📄");

  } catch (error) {
    console.error("PDF download failed:", error);

    // ❌ ERROR TOAST
    toast.error("Failed to download PDF");
  }
};

  if (!data?.length) {
    return (
      <div className="text-center py-10 text-slate-500 dark:text-slate-400">
        No estimates found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 dark:bg-slate-800">
          <tr>
            {["#", "Customer", "Items", "Total", "Date", "Actions"].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-semibold
                  text-slate-500 dark:text-slate-300 uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {data.map((e) => (
            <tr
              key={e._id}
              className="hover:bg-indigo-50/60 dark:hover:bg-slate-800/60 transition"
            >
              <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
                #{e.estimateNo}
              </td>

              <td className="px-4 py-3 text-slate-800 dark:text-slate-200">
                {e.customerName}
              </td>

              <td className="px-4 py-3 text-center text-slate-700 dark:text-slate-300">
                {e.items?.length || 0}
              </td>

              <td className="px-4 py-3 font-bold text-indigo-600 dark:text-indigo-400">
                ₹{Number(e.grandTotal || 0).toLocaleString("en-IN")}
              </td>

              <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                {e.createdAt
                  ? new Date(e.createdAt).toLocaleDateString("en-IN")
                  : ""}
              </td>

              <td className="px-4 py-3 space-x-1 whitespace-nowrap">
                {/* NEW: View detail */}
                <Link
                  to={`/estimates/${e._id}`}
                  className="px-3 py-1 text-xs rounded-full
                    bg-slate-100 text-slate-700 hover:bg-slate-200
                    dark:bg-slate-800 dark:text-slate-200"
                >
                  View
                </Link>

                <button
                  onClick={() => onEdit(e)}
                  className="px-3 py-1 text-xs rounded-full
                    bg-indigo-100 text-indigo-700 hover:bg-indigo-200
                    dark:bg-indigo-900/40 dark:text-indigo-300"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDownloadPdf(e._id)}
                  className="px-3 py-1 text-xs rounded-full
                    bg-emerald-100 text-emerald-700 hover:bg-emerald-200
                    dark:bg-emerald-900/40 dark:text-emerald-300"
                >
                  PDF
                </button>

                <button
                  onClick={() => handleDelete(e._id)}
                  className="px-3 py-1 text-xs rounded-full
                    bg-rose-100 text-rose-700 hover:bg-rose-200
                    dark:bg-rose-900/40 dark:text-rose-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EstimateTable;
