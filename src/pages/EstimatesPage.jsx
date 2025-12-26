// src/pages/EstimatesPage.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import estimateApi from "../api/estimateApi";
import EstimateTable from "../components/EstimateTable";
import EstimateForm from "../components/EstimateForm";
import { toast } from "react-toastify";

const EstimatesPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isCreateRoute = location.pathname === "/estimates/new";

  const load = async (p = 1) => {
    setLoading(true);
    try {
      const res = await estimateApi.list({ page: p, limit: 10 });
      const payload = res.data;
      setData(payload.data || []);
      setTotalPages(payload.totalPages || 1);
      setPage(payload.page || p);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(page);
  }, [page]);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editing) {
        await estimateApi.update(editing._id, formData);
        toast.success("Estimate updated successfully");
      } else {
        await estimateApi.create(formData);
        toast.success("Estimate created successfully");
      }

      setEditing(null);
      if (isCreateRoute) navigate("/estimates");
      load(page);
    } catch (e) {
      console.error(e);
      toast.error("Failed to save estimate");
    }
  };

  return (
    <Layout>
      <div
        className="min-h-screen -m-4 p-4 sm:p-8
        bg-gradient-to-br from-slate-50 via-white to-slate-100
        dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Estimates
          </h1>
        </div>

        {(editing || isCreateRoute) && (
          <div className="mb-6 max-w-3xl">
            <EstimateForm
              initialData={editing || null}
              loading={false}
              onSubmit={handleCreateOrUpdate}
            />
          </div>
        )}

        <EstimateTable
          data={data}
          onEdit={(e) => {
            setEditing(e);
            if (!isCreateRoute) navigate("/estimates/new");
          }}
          onDeleted={() => load(page)}
        />
      </div>
    </Layout>
  );
};

export default EstimatesPage;
