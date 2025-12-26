import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Trash2, Bell } from "lucide-react";

import Layout from "../components/Layout";
import notificationApi from "../api/notificationApi";

const Notifications = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await notificationApi.list();
      setItems(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleMarkReadLocal = async (id) => {
  try {
    await notificationApi.markRead(id);
    setItems((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
    );
  } catch (e) {
    console.error(e);
  }
};
 const handleDeleteLocal = async (id) => {
  try {
    await notificationApi.remove(id);
    setItems((prev) => prev.filter((n) => n._id !== id));
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
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Bell className="h-6 w-6 text-indigo-600" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Notifications
          </h1>
        </div>

        {loading && (
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Loading notifications...
          </div>
        )}

        <div className="space-y-3">
          {!loading && items.length === 0 && (
            <div className="text-sm text-slate-500 dark:text-slate-400">
              You’re all caught up 🎉
            </div>
          )}

          {items.map((n, idx) => (
            <motion.div
              key={n._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className={`flex items-start justify-between gap-4 p-4 rounded-2xl
                border backdrop-blur shadow-sm
                ${
                  !n.isRead
                    ? "bg-indigo-50/80 border-indigo-200 dark:bg-indigo-900/30 dark:border-indigo-700"
                    : "bg-white/80 border-slate-200 dark:bg-slate-900/80 dark:border-slate-800"
                }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                    {n.message}
                  </p>
                  {!n.isRead && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full
                      bg-indigo-600 text-white">
                      New
                    </span>
                  )}
                </div>
                {n.createdAt && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                {!n.isRead && (
                  <button
                    onClick={() => handleMarkReadLocal(n._id)}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full
                      bg-emerald-100 text-emerald-700 hover:bg-emerald-200
                      dark:bg-emerald-900/40 dark:text-emerald-300"
                  >
                    <Check className="h-3 w-3" />
                    Read
                  </button>
                )}
                <button
                  onClick={() => handleDeleteLocal(n._id)}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full
                    bg-rose-100 text-rose-700 hover:bg-rose-200
                    dark:bg-rose-900/40 dark:text-rose-300"
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
