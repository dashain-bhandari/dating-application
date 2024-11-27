import { axiosInstance } from "../http";

const config = { withCredentials: true };

export const postRegisterUser = (data) =>
  axiosInstance.post("/auth/register", data, config);

export const postLoginUser = (data) =>
  axiosInstance.post("/auth/login", data, config);

export const getAuthUser = () => axiosInstance.get("authentication", config);

export const getConversations = () =>
  axiosInstance.get("/conversations", config);

export const getConversationsById = (id) =>
  axiosInstance.get(`/conversations/${id}`, config);

export const getConversationMessages = (conversationId, page, limit) =>
  axiosInstance.get(
    `/message/${conversationId}?page=${page}&limit=${limit}`,
    config
  );

export const uploadPhotos = (data) =>
  axiosInstance.post("/photo/upload", data, {
    headers: { "Content-Type": "multipart/form-data" },
    ...config,
  });

export const getPhotos = () => axiosInstance.get("/photo", config);

export const deletePhoto = (id) => axiosInstance.delete(`/photo/${id}`, config);

export const createMessage = (id, data) =>
  axiosInstance.post(`/message/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
    ...config,
  });

export const postNewConversation = (data) =>
  axiosInstance.post("/conversations", data, config);

export const deleteMessage = ({ id, messageId }) =>
  axiosInstance.delete(`/message/${id}/messages/${messageId}`, config);

export const editMessage = ({ content, id, messageId }) =>
  axiosInstance.patch(
    `/conversations/${id}/messages/${messageId}`,
    { content },
    config
  );

// export const searchUsers = (query) => axiosInstance.get(`/users/search?query=${query}`, config);

export const fetchConnections = () => axiosInstance.get("/connection", config);

export const fetchConnectionRequest = () =>{console.log("hii")
 return axiosInstance.get("/connection-requests", config);
}

export const createConnectionRequest = (id) =>
  axiosInstance.post("/connection-requests", { userId: id }, config);

export const cancelConnectionRequest = (id) =>
  axiosInstance.delete(`/connection-requests/${id}/cancel`, config);

export const acceptConnectionRequest = (id) =>
  axiosInstance.patch(`/connection-requests/${id}/accept`, {}, config);

export const rejectConnectionRequest = (id) =>
  axiosInstance.patch(`/connection-requests/${id}/reject`, {}, config);

export const removeConnection = (id) =>
  axiosInstance.delete(`connection-requests/${id}/delete`, config);

export const checkConversationOrCreate = (recipientId) =>
  axiosInstance.get(`/exists/conversations/${recipientId}`, config);

export const updateStatusMessage = (data) =>
  axiosInstance.patch("/users/presence/status", data, config);

export const getSearchUser = ({ username, page, limit }) =>
  axiosInstance.get(
    `/recommendation/research/${username}?page=${page}&limit=${limit}`,
    config
  );

export const filterUser = (
  minAge,
  maxAge,
  minHeight,
  maxHeight,
  religion,
  caste,
  annualIncome,
  gender,
  sector
) =>
  axiosInstance.get(
    `/recommendation/filter?minAge=${minAge}&maxAge=${maxAge}&minHeight=${minHeight}&maxHeight=${maxHeight}&maritalStatus=${maritalStatus}&religion=${religion}&caste=${caste}&annualIncome=${annualIncome}&sector=${sector}&gender=${gender}`,
    config
  );

export const getUserProfileById = (id) =>
  axiosInstance.get(`/users/profile/${id}`, config);

export const getUserDetails = async (id) => {
  console.log("we are here");
  const res = await axiosInstance.get(`/recommendation/${id}`, config);
  console.log(res);
  return res;
};

export const getUserPhotos = (id) =>
  axiosInstance.get(`/users/${id}`, config);

export const getRecommendationUser = () =>
  axiosInstance.get("/recommendation/recommend/user", config);

export const getNotifications = (page, limit) =>
  axiosInstance.get(`/notifications?page=${page}&limit=${limit}`, config);

export const deleteNotif = (id) =>
  axiosInstance.delete(`/notifications/${id}`, config);

export const changePassword = (values) =>
  axiosInstance.put(`/users/password/change`, values, config);

export const deleteAccount = () =>
  axiosInstance.delete("/recommendation/delete", config);

export const resendEmail = (values) =>
  axiosInstance.put("/authentication/resend/email", values, config);

export const verifyEmail = (resetToken, userId) =>
  axiosInstance.get(
    `/authentication/email/verify/${resetToken}?userId=${userId}`
  );

export const forgotPassword = (values) =>
  axiosInstance.post("/users/password/forget", values);

export const resetPassword = (values, token) =>
  axiosInstance.post(`/users/password/reset/${token}`, values);

export const markNotificationAsRead = (notificationId) =>
  axiosInstance.put(`/notifications/${notificationId}`);

export const getUnreadNotificationCount = (id) =>
  axiosInstance.get(`/notifications/count/${id}`);

export const createConversation = (id, data) =>
  axiosInstance.post(`/conversations/`, data);
