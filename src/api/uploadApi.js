import axiosClient from "./axiosClient";


const uploadApi = {
  companyLogo: (base64) =>
    axiosClient.post("/upload/company-logo", { logo: base64 }),
};

export default uploadApi;
