// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { User, Building2 } from "lucide-react";

// import Layout from "../components/Layout";
// import profileApi from "../api/profileApi";

// const Profile = () => {
//   const [company, setCompany] = useState({
//     name: "",
//     address: "",
//     gstin: "",
//     phone: "",
//     email: "",
//     logo: "",
//   });

//   const [loadingProfile, setLoadingProfile] = useState(false);
//   const [savingProfile, setSavingProfile] = useState(false);

//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const loadProfile = async () => {
//     setLoadingProfile(true);
//     setError("");
//     try {
//       const res = await profileApi.get();
//       const data = res.data;
//       setCompany({
//         name: data.name || "",
//         address: data.address || "",
//         gstin: data.gstin || "",
//         phone: data.phone || "",
//         email: data.email || "",
//         logo: data.logo || "",
//       });
//     } catch (e) {
//       console.error(e);
//       setError("Failed to load company profile");
//     } finally {
//       setLoadingProfile(false);
//     }
//   };

//   useEffect(() => {
//     loadProfile();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCompany((p) => ({ ...p, [name]: value }));
//   };

//   const submitProfile = async (e) => {
//     e.preventDefault();
//     setSavingProfile(true);
//     setMessage("");
//     setError("");
//     try {
//       const res = await profileApi.update(company);
//       setMessage(res.data?.message || "Company updated successfully");
//     } catch (e) {
//       console.error(e);
//       setError(e?.response?.data?.message || "Failed to update company");
//     } finally {
//       setSavingProfile(false);
//     }
//   };

//   return (
//     <Layout>
//       <div
//         className="min-h-screen -m-4 p-4 sm:p-8
//         bg-gradient-to-br from-indigo-50 via-white to-cyan-50
//         dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
//       >
//         <h1 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
//           Company Settings
//         </h1>

//         {(message || error) && (
//           <div className="mb-4 text-sm">
//             {message && (
//               <div className="text-emerald-600 dark:text-emerald-400">
//                 {message}
//               </div>
//             )}
//             {error && (
//               <div className="text-rose-600 dark:text-rose-400">
//                 {error}
//               </div>
//             )}
//           </div>
//         )}

//         {loadingProfile ? (
//           <div className="text-sm text-slate-500">Loading company...</div>
//         ) : (
//           <div className="max-w-2xl">
//             <motion.form
//               onSubmit={submitProfile}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="rounded-3xl p-5
//                 bg-white/80 dark:bg-slate-900/80 backdrop-blur
//                 border border-slate-200/60 dark:border-slate-800 shadow-lg space-y-4"
//             >
//               <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
//                 <Building2 className="h-4 w-4" />
//                 Company Info
//               </h2>

//               <div>
//                 <label className="block text-xs mb-1 text-slate-500">
//                   Company Name
//                 </label>
//                 <input
//                   name="name"
//                   value={company.name}
//                   onChange={handleChange}
//                   className="w-full rounded-full border px-4 py-2 text-sm
//                     bg-white dark:bg-slate-800
//                     border-slate-300 dark:border-slate-700
//                     focus:ring-2 focus:ring-indigo-500 outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs mb-1 text-slate-500">
//                   Address
//                 </label>
//                 <input
//                   name="address"
//                   value={company.address}
//                   onChange={handleChange}
//                   className="w-full rounded-full border px-4 py-2 text-sm
//                     bg-white dark:bg-slate-800
//                     border-slate-300 dark:border-slate-700
//                     focus:ring-2 focus:ring-indigo-500 outline-none"
//                 />
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-xs mb-1 text-slate-500">
//                     GSTIN
//                   </label>
//                   <input
//                     name="gstin"
//                     value={company.gstin}
//                     onChange={handleChange}
//                     className="w-full rounded-full border px-4 py-2 text-sm
//                       bg-white dark:bg-slate-800
//                       border-slate-300 dark:border-slate-700
//                       focus:ring-2 focus:ring-indigo-500 outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs mb-1 text-slate-500">
//                     Phone
//                   </label>
//                   <input
//                     name="phone"
//                     value={company.phone}
//                     onChange={handleChange}
//                     className="w-full rounded-full border px-4 py-2 text-sm
//                       bg-white dark:bg-slate-800
//                       border-slate-300 dark:border-slate-700
//                       focus:ring-2 focus:ring-indigo-500 outline-none"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs mb-1 text-slate-500">
//                   Email
//                 </label>
//                 <input
//                   name="email"
//                   type="email"
//                   value={company.email}
//                   onChange={handleChange}
//                   className="w-full rounded-full border px-4 py-2 text-sm
//                     bg-white dark:bg-slate-800
//                     border-slate-300 dark:border-slate-700
//                     focus:ring-2 focus:ring-indigo-500 outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs mb-1 text-slate-500">
//                   Logo URL
//                 </label>
//                 <input
//                   name="logo"
//                   value={company.logo}
//                   onChange={handleChange}
//                   placeholder="https://..."
//                   className="w-full rounded-full border px-4 py-2 text-sm
//                     bg-white dark:bg-slate-800
//                     border-slate-300 dark:border-slate-700
//                     focus:ring-2 focus:ring-indigo-500 outline-none"
//                 />
//               </div>

//               {company.logo && (
//                 <div className="flex items-center gap-3 pt-2">
//                   <img
//                     src={company.logo}
//                     alt="Logo"
//                     className="h-16 w-16 rounded-xl object-cover border bg-white"
//                   />
//                   <span className="text-xs text-slate-500">
//                     Logo preview
//                   </span>
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={savingProfile}
//                 className="w-full mt-2 py-2 rounded-full text-sm font-semibold text-white
//                   bg-indigo-600 hover:bg-indigo-700 shadow
//                   disabled:opacity-60"
//               >
//                 {savingProfile ? "Saving..." : "Save Company"}
//               </button>
//             </motion.form>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default Profile;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Upload } from "lucide-react";

import Layout from "../components/Layout";
import profileApi from "../api/profileApi";
import uploadApi from "../api/uploadApi";

const Profile = () => {
  const [company, setCompany] = useState({
    name: "",
    address: "",
    gstin: "",
    phone: "",
    email: "",
    logo: "",
  });

  const [preview, setPreview] = useState(""); // logo preview
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadProfile = async () => {
    setLoadingProfile(true);
    setError("");
    try {
      const res = await profileApi.get();
      const data = res.data;
      setCompany({
        name: data.name || "",
        address: data.address || "",
        gstin: data.gstin || "",
        phone: data.phone || "",
        email: data.email || "",
        logo: data.logo || "",
      });
      setPreview(data.logo || "");
    } catch (e) {
      console.error(e);
      setError("Failed to load company profile");
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany((p) => ({ ...p, [name]: value }));
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleLogoFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    try {
      setUploadingLogo(true);
      setMessage("");
      setError("");
      const base64 = await fileToBase64(file);
      const res = await uploadApi.companyLogo(base64);
      const url = res.data?.url;
      if (url) {
        setCompany((p) => ({ ...p, logo: url }));
        setMessage("Logo uploaded successfully");
      } else {
        setError("Failed to get logo URL from server");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to upload logo");
    } finally {
      setUploadingLogo(false);
    }
  };

  const submitProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setMessage("");
    setError("");
    try {
      const res = await profileApi.update(company);
      setMessage(res.data?.message || "Company updated successfully");
    } catch (e) {
      console.error(e);
      setError(e?.response?.data?.message || "Failed to update company");
    } finally {
      setSavingProfile(false);
    }
  };

  return (
    <Layout>
      <div
        className="min-h-screen -m-4 p-4 sm:p-8
        bg-gradient-to-br from-indigo-50 via-white to-cyan-50
        dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      >
        <h1 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
          Company Settings
        </h1>

        {(message || error) && (
          <div className="mb-4 text-sm">
            {message && (
              <div className="text-emerald-600 dark:text-emerald-400">
                {message}
              </div>
            )}
            {error && (
              <div className="text-rose-600 dark:text-rose-400">
                {error}
              </div>
            )}
          </div>
        )}

        {loadingProfile ? (
          <div className="text-sm text-slate-500">Loading company...</div>
        ) : (
          <div className="max-w-2xl">
            <motion.form
              onSubmit={submitProfile}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl p-5
                bg-white/80 dark:bg-slate-900/80 backdrop-blur
                border border-slate-200/60 dark:border-slate-800 shadow-lg space-y-4"
            >
              <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <Building2 className="h-4 w-4" />
                Company Info
              </h2>

              {/* Logo upload + preview */}
              <div className="flex items-center gap-4 mb-2">
                <div className="h-16 w-16 rounded-xl overflow-hidden border bg-white flex items-center justify-center">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Logo"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-[10px] text-slate-400">No logo</span>
                  )}
                </div>
                <div>
                  <label className="block text-xs mb-1 text-slate-500">
                    Company Logo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoFile}
                    className="text-xs"
                  />
                  {uploadingLogo && (
                    <div className="text-[10px] text-slate-500">
                      Uploading...
                    </div>
                  )}
                </div>
              </div>

              {/* Name, address, gstin, phone, email, logo URL */}
              <div>
                <label className="block text-xs mb-1 text-slate-500">
                  Company Name
                </label>
                <input
                  name="name"
                  value={company.name}
                  onChange={handleChange}
                  className="w-full rounded-full border px-4 py-2 text-sm
                    bg-white dark:bg-slate-800
                    border-slate-300 dark:border-slate-700
                    focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs mb-1 text-slate-500">
                  Address
                </label>
                <input
                  name="address"
                  value={company.address}
                  onChange={handleChange}
                  className="w-full rounded-full border px-4 py-2 text-sm
                    bg-white dark:bg-slate-800
                    border-slate-300 dark:border-slate-700
                    focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs mb-1 text-slate-500">
                    GSTIN
                  </label>
                  <input
                    name="gstin"
                    value={company.gstin}
                    onChange={handleChange}
                    className="w-full rounded-full border px-4 py-2 text-sm
                      bg-white dark:bg-slate-800
                      border-slate-300 dark:border-slate-700
                      focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1 text-slate-500">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={company.phone}
                    onChange={handleChange}
                    className="w-full rounded-full border px-4 py-2 text-sm
                      bg-white dark:bg-slate-800
                      border-slate-300 dark:border-slate-700
                      focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs mb-1 text-slate-500">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={company.email}
                  onChange={handleChange}
                  className="w-full rounded-full border px-4 py-2 text-sm
                    bg-white dark:bg-slate-800
                    border-slate-300 dark:border-slate-700
                    focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={savingProfile}
                className="w-full mt-2 py-2 rounded-full text-sm font-semibold text-white
                  bg-indigo-600 hover:bg-indigo-700 shadow
                  disabled:opacity-60"
              >
                {savingProfile ? "Saving..." : "Save Company"}
              </button>
            </motion.form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
