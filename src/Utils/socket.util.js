let onlineUsers = {};

export const addUser = (userId, socketId) => {
  onlineUsers[socketId] = userId;
};

export const removeUser = (socketId) => {
  delete onlineUsers[socketId];
};

export const getOnlineUsers = () => {
  return Object.values(onlineUsers);
};
