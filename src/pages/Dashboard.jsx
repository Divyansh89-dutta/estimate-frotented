// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   FileText,
//   Calendar,
//   IndianRupee,
//   Bell,
//   PlusCircle,
//   List,
// } from "lucide-react";

// import Layout from "../components/Layout";
// import useAuth from "../hooks/useAuth";
// import estimateApi from "../api/estimateApi";
// import notificationApi from "../api/notificationApi";

// const fadeUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (i = 1) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.08 },
//   }),
// };

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [stats, setStats] = useState({
//     totalEstimates: 0,
//     todayEstimates: 0,
//     grandTotalSum: 0,
//     unreadNotifications: 0,
//   });
//   const [recentNotifications, setRecentNotifications] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const load = async () => {
//     setLoading(true);
//     try {
//       const [estRes, notifRes] = await Promise.all([
//         estimateApi.list({ page: 1, limit: 100 }),
//         notificationApi.list(),
//       ]);

//       const estimates = estRes.data?.data || estRes.data?.estimates || [];
//       const notifications = notifRes.data || [];

//       const todayStr = new Date().toDateString();
//       const todayEstimates = estimates.filter(
//         (e) => e.createdAt && new Date(e.createdAt).toDateString() === todayStr
//       ).length;

//       const grandTotalSum = estimates.reduce(
//         (sum, e) => sum + (e.grandTotal || 0),
//         0
//       );

//       const unreadNotifications = notifications.filter((n) => !n.isRead).length;

//       setStats({
//         totalEstimates: estimates.length,
//         todayEstimates,
//         grandTotalSum,
//         unreadNotifications,
//       });

//       const sortedNotifs = [...notifications].sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//       );
//       setRecentNotifications(sortedNotifs.slice(0, 5));
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const cards = [
//     {
//       label: "Total Estimates",
//       value: stats.totalEstimates,
//       icon: FileText,
//       color: "text-blue-500",
//     },
//     {
//       label: "Today’s Estimates",
//       value: stats.todayEstimates,
//       icon: Calendar,
//       color: "text-emerald-500",
//     },
//     {
//       label: "Total Value",
//       value: `₹${stats.grandTotalSum.toLocaleString("en-IN")}`,
//       icon: IndianRupee,
//       color: "text-violet-500",
//     },
//     {
//       label: "Unread Alerts",
//       value: stats.unreadNotifications,
//       icon: Bell,
//       color: "text-rose-500",
//     },
//   ];

//   return (
//     <Layout>
//       {/* 🌈 Background */}
//       <div className="min-h-screen -m-4 p-4 sm:p-6
//         bg-gradient-to-br from-slate-50 via-white to-slate-100
//         dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
//               Dashboard
//             </h1>
//             <p className="text-sm text-slate-500 dark:text-slate-400">
//               Welcome back, {user?.name || user?.email}
//             </p>
//           </div>
//           {loading && (
//             <span className="text-xs text-slate-400 animate-pulse">
//               Refreshing...
//             </span>
//           )}
//         </div>

//         {/* KPI Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           {cards.map((c, i) => {
//             const Icon = c.icon;
//             return (
//               <motion.div
//                 key={c.label}
//                 custom={i}
//                 initial="hidden"
//                 animate="visible"
//                 variants={fadeUp}
//                 className="rounded-2xl p-4 border border-slate-200/60 dark:border-slate-800
//                   bg-white/70 dark:bg-slate-900/70 backdrop-blur
//                   shadow-sm hover:shadow-lg transition"
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-xs text-slate-500 dark:text-slate-400">
//                       {c.label}
//                     </p>
//                     <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
//                       {c.value}
//                     </p>
//                   </div>
//                   <Icon className={`h-8 w-8 ${c.color}`} />
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//           {/* Notifications */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="lg:col-span-2 rounded-2xl p-4 border border-slate-200/60 dark:border-slate-800
//               bg-white/70 dark:bg-slate-900/70 backdrop-blur"
//           >
//             <div className="flex justify-between items-center mb-3">
//               <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
//                 Recent Notifications
//               </h2>
//               <Link to="/notifications" className="text-xs text-blue-600 hover:underline">
//                 View all
//               </Link>
//             </div>

//             <div className="space-y-2">
//               {recentNotifications.length === 0 && (
//                 <div className="text-xs text-slate-500">No notifications.</div>
//               )}
//               {recentNotifications.map((n) => (
//                 <Link
//                   key={n._id}
//                   to={`/notifications/${n._id}`}
//                   className="block rounded-lg p-3 border border-slate-200/60 dark:border-slate-800
//                     hover:bg-slate-100/60 dark:hover:bg-slate-800 transition text-xs"
//                 >
//                   <div className="flex justify-between gap-2">
//                     <div>
//                       <p className="text-slate-800 dark:text-slate-100">
//                         {n.message.length > 80
//                           ? n.message.slice(0, 80) + "..."
//                           : n.message}
//                       </p>
//                       <p className="text-[10px] text-slate-400 mt-1">
//                         {n.createdAt &&
//                           new Date(n.createdAt).toLocaleString("en-IN")}
//                       </p>
//                     </div>
//                     {!n.isRead && (
//                       <span className="text-[10px] h-fit px-2 py-0.5 rounded-full
//                         bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
//                         New
//                       </span>
//                     )}
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </motion.div>

//           {/* Quick Actions */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="rounded-2xl p-4 border border-slate-200/60 dark:border-slate-800
//               bg-white/70 dark:bg-slate-900/70 backdrop-blur"
//           >
//             <h2 className="text-sm font-semibold mb-3 text-slate-900 dark:text-white">
//               Quick Actions
//             </h2>
//             <div className="space-y-2 text-sm">
//               <Link to="/create" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
//                 <PlusCircle className="h-4 w-4 text-blue-500" />
//                 Create new estimate
//               </Link>
//               <Link to="/estimates" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
//                 <List className="h-4 w-4 text-emerald-500" />
//                 View all estimates
//               </Link>
//               <Link to="/notifications" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
//                 <Bell className="h-4 w-4 text-rose-500" />
//                 View notifications
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Dashboard;
// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Calendar,
  IndianRupee,
  Bell,
  PlusCircle,
  List,
} from "lucide-react";

import Layout from "../components/Layout";
import useAuth from "../hooks/useAuth";
import estimateApi from "../api/estimateApi";
import notificationApi from "../api/notificationApi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08 },
  }),
};

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalEstimates: 0,
    todayEstimates: 0,
    grandTotalSum: 0,
    unreadNotifications: 0,
  });
  const [recentNotifications, setRecentNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [estRes, notifRes] = await Promise.all([
        estimateApi.list({ page: 1, limit: 100 }),
        notificationApi.list(),
      ]);

      const estimates = estRes.data?.data || estRes.data?.estimates || [];
      const notifications = notifRes.data || [];

      const todayStr = new Date().toDateString();
      const todayEstimates = estimates.filter(
        (e) => e.createdAt && new Date(e.createdAt).toDateString() === todayStr
      ).length;

      const grandTotalSum = estimates.reduce(
        (sum, e) => sum + (e.grandTotal || 0),
        0
      );

      const unreadNotifications = notifications.filter((n) => !n.isRead).length;

      setStats({
        totalEstimates: estimates.length,
        todayEstimates,
        grandTotalSum,
        unreadNotifications,
      });

      const sortedNotifs = [...notifications].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRecentNotifications(sortedNotifs.slice(0, 5));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const cards = [
    {
      label: "Total Estimates",
      value: stats.totalEstimates,
      icon: FileText,
      color: "text-blue-500",
    },
    {
      label: "Today’s Estimates",
      value: stats.todayEstimates,
      icon: Calendar,
      color: "text-emerald-500",
    },
    {
      label: "Total Value",
      value: `₹${stats.grandTotalSum.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "text-violet-500",
    },
    {
      label: "Unread Alerts",
      value: stats.unreadNotifications,
      icon: Bell,
      color: "text-rose-500",
    },
  ];

  return (
    <Layout>
      <div
        className="min-h-screen -m-4 p-4 sm:p-6
        bg-gradient-to-br from-slate-50 via-white to-slate-100
        dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Welcome back, {user?.name || user?.email}
            </p>
          </div>
          {loading && (
            <span className="text-xs text-slate-400 animate-pulse">
              Refreshing...
            </span>
          )}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.label}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="rounded-2xl p-4 border border-slate-200/60 dark:border-slate-800
                  bg-white/70 dark:bg-slate-900/70 backdrop-blur
                  shadow-sm hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {c.label}
                    </p>
                    <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                      {c.value}
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${c.color}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 rounded-2xl p-4 border border-slate-200/60 dark:border-slate-800
              bg-white/70 dark:bg-slate-900/70 backdrop-blur"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Recent Notifications
              </h2>
              <Link
                to="/notifications"
                className="text-xs text-blue-600 hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="space-y-2">
              {recentNotifications.length === 0 && (
                <div className="text-xs text-slate-500">No notifications.</div>
              )}
              {recentNotifications.map((n) => (
                <div
                  key={n._id}
                  className="block rounded-lg p-3 border border-slate-200/60 dark:border-slate-800
                    hover:bg-slate-100/60 dark:hover:bg-slate-800 transition text-xs"
                >
                  <div className="flex justify-between gap-2">
                    <div>
                      <p className="text-slate-800 dark:text-slate-100">
                        {n.message.length > 80
                          ? n.message.slice(0, 80) + "..."
                          : n.message}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1">
                        {n.createdAt &&
                          new Date(n.createdAt).toLocaleString("en-IN")}
                      </p>
                    </div>
                    {!n.isRead && (
                      <span
                        className="text-[10px] h-fit px-2 py-0.5 rounded-full
                        bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      >
                        New
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-4 border border-slate-200/60 dark:border-slate-800
              bg-white/70 dark:bg-slate-900/70 backdrop-blur"
          >
            <h2 className="text-sm font-semibold mb-3 text-slate-900 dark:text-white">
              Quick Actions
            </h2>
            <div className="space-y-2 text-sm">
              <Link
                to="/estimates/new"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <PlusCircle className="h-4 w-4 text-blue-500" />
                Create new estimate
              </Link>
              <Link
                to="/estimates"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <List className="h-4 w-4 text-emerald-500" />
                View all estimates
              </Link>
              <Link
                to="/notifications"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Bell className="h-4 w-4 text-rose-500" />
                View notifications
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
