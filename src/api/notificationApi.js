import axiosClient from "./axiosClient";

const notificationApi = {
  list: () => axiosClient.get("/notifications"),
  markRead: (id) => axiosClient.patch(`/notifications/${id}/read`),
  remove: (id) => axiosClient.delete(`/notifications/${id}`),
};

export default notificationApi;
