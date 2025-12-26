// src/pages/EstimateDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, ArrowLeft, Download, Share2 } from "lucide-react";

import Layout from "../components/Layout";
import estimateApi from "../api/estimateApi";
import axiosClient from "../api/axiosClient";

const EstimateDetail = () => {
  const { id } = useParams();
  const [estimate, setEstimate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await estimateApi.getById(id);
      setEstimate(res.data);
    } catch (e) {
      console.error(e);
      setError(e?.response?.data?.message || "Failed to load estimate");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const handleDownloadPdf = async () => {
    try {
      const res = await axiosClient.get(`/estimate/${id}/pdf`, {
        responseType: "blob",
      });
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `estimate-${estimate.estimateNo}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      toast.error("Failed to download PDF");
    }
  };

  const handleShareWhatsapp = async () => {
    try {
      const phone = prompt("Enter WhatsApp number with country code:");
      if (!phone) return;
      const res = await axiosClient.get(`/estimate/${id}/whatsapp`, {
        params: { phone },
      });
      window.open(res.data.whatsappLink, "_blank");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Layout>
      <div
        className="min-h-screen -m-4 p-4 sm:p-8
        bg-gradient-to-br from-indigo-50 via-white to-cyan-50
        dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link
              to="/estimates"
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-indigo-600" />
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Estimate Details
              </h1>
            </div>
          </div>

          {estimate && (
            <div className="flex gap-2">
              <button
                onClick={handleDownloadPdf}
                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full
                  bg-slate-900 text-white hover:bg-black"
              >
                <Download className="h-3 w-3" />
                PDF
              </button>
            </div>
          )}
        </div>

        {loading && (
          <div className="text-sm text-slate-500">Loading estimate...</div>
        )}

        {error && <div className="text-sm text-rose-600 mb-4">{error}</div>}

        {!loading && estimate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl p-5 bg-white/90 dark:bg-slate-900/90
              border border-slate-200/60 dark:border-slate-800 shadow-lg space-y-5"
          >
            {/* Header info */}
            <div className="flex flex-wrap justify-between gap-4 border-b pb-3">
              <div>
                <p className="text-xs text-slate-500">Estimate No</p>
                <p className="text-sm font-semibold">{estimate.estimateNo}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Customer</p>
                <p className="text-sm font-semibold">{estimate.customerName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Created</p>
                <p className="text-sm">
                  {new Date(estimate.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Items table */}
            <div>
              <p className="text-xs font-semibold text-slate-600 mb-2">Items</p>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="min-w-full text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium">Item</th>
                      <th className="px-3 py-2 text-left font-medium">HSN</th>
                      <th className="px-3 py-2 text-right font-medium">Qty</th>
                      <th className="px-3 py-2 text-left font-medium">Unit</th>
                      <th className="px-3 py-2 text-right font-medium">
                        Price
                      </th>
                      <th className="px-3 py-2 text-right font-medium">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {estimate.items.map((it, i) => (
                      <tr
                        key={i}
                        className="border-t border-slate-100 dark:border-slate-800"
                      >
                        <td className="px-3 py-2">{it.itemName}</td>
                        <td className="px-3 py-2">{it.hsn}</td>
                        <td className="px-3 py-2 text-right">{it.qty}</td>
                        <td className="px-3 py-2">{it.unit}</td>
                        <td className="px-3 py-2 text-right">
                          ₹{(it.price || 0).toFixed(2)}
                        </td>
                        <td className="px-3 py-2 text-right">
                          ₹{(it.total || 0).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals */}
            <div className="flex flex-col items-end gap-1 text-sm">
              <div className="flex gap-10">
                <span className="text-slate-500">Sub Total</span>
                <span className="font-semibold">
                  ₹{estimate.subTotal.toFixed(2)}
                </span>
              </div>
              {/* <div className="flex gap-10">
                <span className="text-slate-500">CGST (9%)</span>
                <span className="font-semibold">
                  ₹{estimate.cgst.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-10">
                <span className="text-slate-500">SGST (9%)</span>
                <span className="font-semibold">
                  ₹{estimate.sgst.toFixed(2)}
                </span>
              </div> */}
              <div className="flex gap-10 text-lg font-extrabold text-indigo-600 mt-2">
                <span>Grand Total</span>
                <span>₹{estimate.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default EstimateDetail;
