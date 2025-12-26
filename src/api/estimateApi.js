  import axiosClient, { API_BASE_URL } from "./axiosClient";

  const estimateApi = {
    // POST /api/estimate
    create: (data) => axiosClient.post("/estimate", data),

    // GET /api/estimate?page=&search=
    list: (params) => axiosClient.get("/estimate", { params }),
    getById: (id) => axiosClient.get(`/estimate/${id}`),

    // GET /api/estimate/:id
    getById: (id) => axiosClient.get(`/estimate/${id}`),

    // PUT /api/estimate/:id
    update: (id, data) => axiosClient.put(`/estimate/${id}`, data),

    // DELETE /api/estimate/:id
    remove: (id) => axiosClient.delete(`/estimate/${id}`),

    // PDF & WhatsApp helpers
    downloadPdfUrl: (id) => `${API_BASE_URL}/api/estimate/${id}/pdf`,
    // whatsappUrl: (id, phone) =>
    //   `${API_BASE_URL}/api/estimate/${id}/whatsapp?phone=${encodeURIComponent(
    //     phone
    //   )}`,
  };

  export default estimateApi;
