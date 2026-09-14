import axiosClient from './axiosClient';

export const uploadApi = {
  uploadExcel: async (file) => {
    const formData = new FormData();
    formData.append('file', file); // 'file' must match upload.single('file') in your Express backend

    // Note: Axios automatically sets 'Content-Type': 'multipart/form-data' 
    // when it detects a FormData object, so you don't need to set it manually.
    return axiosClient.post('/upload', formData);
  },
};