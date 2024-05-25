import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const usersPath = path.resolve("models", "./users.json");

const listUsers = async () => {
  const data = await fs.readFile(usersPath, "utf8");
  return JSON.parse(data);
};

const getUserById = async (userId) => {
  const users = await listUsers();
  const result = users.find((user) => user.id === userId);
  return result || null;
};

const addUser = async ({ name, email }) => {
  const users = await listUsers();
  const newUser = {
    id: nanoid(),
    name,
    email,
  };
  users.push(newUser);
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
  console.log(newUser);
  return newUser;
};

const updateUser = async (id, { name, email }) => {
  const users = await listUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return null;
  }

  users[index] = { id, name, email };
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
  return users[index];
};

const removeUser = async (userId) => {
  const users = await listUsers();
  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) {
    return null;
  }

  const [result] = users.splice(index, 1);
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
  return result;
};

export default {
  listUsers,
  getUserById,
  addUser,
  updateUser,
  removeUser,
};
