export const postComment = (data) => axios.post(`/api/comments`, data);
export const getComments = (id) => axios.get(`/api/comments/${id}`);
export const deleteComment = (id) => axios.delete(`/api/comments/${id}`);
