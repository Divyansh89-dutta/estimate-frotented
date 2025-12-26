import axiosClient from "./axiosClient";


const profileApi = {
  get: () => axiosClient.get("/profile"),
  update: (data) => axiosClient.put("/profile", data),
  changePassword: (data) => axiosClient.put("/profile/password", data),
};

export default profileApi;
