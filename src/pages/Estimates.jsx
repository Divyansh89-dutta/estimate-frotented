import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import Layout from "../components/Layout";
import estimateApi from "../api/estimateApi";
import EstimateForm from "../components/EstimateForm";
import EstimateTable from "../components/EstimateTable";
import Pagination from "../components/Pagination";
import { toast } from "react-toastify";


const Estimates = () => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingList, setLoadingList] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchEstimates = async (pageArg = page, searchArg = search) => {
    setLoadingList(true);
    try {
      const params = { page: pageArg, limit: 10 };
      if (searchArg) params.search = searchArg;
      const res = await estimateApi.list(params);
      setItems(res.data?.data || res.data?.estimates || []);
      setTotalPages(res.data?.totalPages || 1);
      setPage(pageArg);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchEstimates(1, "");
  }, []);

  // const handleSubmit = async (formData) => {
  //   setSaving(true);
  //   try {
  //     if (editing) {
  //       await estimateApi.update(editing._id, formData);
  //     } else {
  //       await estimateApi.create(formData);
  //     }
  //     setEditing(null);
  //     await fetchEstimates(page, search);
  //   } catch (e) {
  //     console.error(e);
  //   } finally {
  //     setSaving(false);
  //   }
  // };

  const handleSubmit = async (formData) => {
  setSaving(true);
  try {
    if (editing) {
      await estimateApi.update(editing._id, formData);
      toast.success("Estimate updated successfully");
    } else {
      await estimateApi.create(formData);
      toast.success("Estimate created successfully");
    }

    setEditing(null);
    await fetchEstimates(page, search);
  } catch (e) {
    console.error(e);
    toast.error(
      e?.response?.data?.message || "Failed to save estimate"
    );
  } finally {
    setSaving(false);
  }
};


  const handlePageChange = (p) => fetchEstimates(p, search);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEstimates(1, search);
  };

  return (
    <Layout>
      <div className="min-h-screen -m-4 p-4 sm:p-8
        bg-gradient-to-br from-indigo-50 via-white to-cyan-50
        dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Estimates
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage and create customer estimates
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/80
              backdrop-blur border border-slate-200 dark:border-slate-800
              rounded-full px-3 py-2 shadow-sm"
          >
            <Search className="h-4 w-4 text-slate-400" />
            <input
              placeholder="Search estimates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm text-slate-800 dark:text-slate-100 w-40 sm:w-64"
            />
            <button
              type="submit"
              className="px-4 py-1.5 text-xs rounded-full
                bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Search
            </button>
          </form>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 xl:grid-cols-[2.2fr_1.3fr] gap-6 items-start">
          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl p-5
              bg-white/80 dark:bg-slate-900/80 backdrop-blur
              border border-slate-200/60 dark:border-slate-800
              shadow-lg"
          >
            {loadingList ? (
              <div className="text-sm text-slate-500">Loading estimates...</div>
            ) : (
              <>
                <EstimateTable
                  data={items}
                  onEdit={setEditing}
                  onDeleted={() => fetchEstimates(page, search)}
                />
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onChange={handlePageChange}
                />
              </>
            )}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl p-5
              bg-white/80 dark:bg-slate-900/80 backdrop-blur
              border border-slate-200/60 dark:border-slate-800
              shadow-lg xl:sticky xl:top-24"
          >
            <h2 className="text-sm font-semibold mb-3 text-slate-900 dark:text-white">
              {editing ? "Edit estimate" : "New estimate"}
            </h2>

            <EstimateForm
              initialData={editing}
              onSubmit={handleSubmit}
              loading={saving}
            />

            {editing && (
              <button
                onClick={() => setEditing(null)}
                className="mt-2 text-xs text-slate-500 hover:underline"
              >
                Cancel edit
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Estimates;
