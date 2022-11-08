import * as api from "./api.js";

const endpoints = {
  dashboard: "/data/posts?sortBy=_createdOn%20desc", // ex. albums, games, songs
  create: "/data/posts",
  getById: "/data/posts/",
  deleteById: "/data/posts/",
  update: "/data/posts/",
  donate: '/data/donations'
};

export async function getDashboard() {
  return api.get(endpoints.dashboard);
}
export async function getMyPosts(userId) {
  return api.get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function create(data) {
  return api.post(endpoints.create, data);
}

export async function getById(id) {
  return api.get(endpoints.getById + id);
}

export async function deleteById(id) {
  api.del(endpoints.deleteById + id);
}

export async function update(id, data) {
  api.put(endpoints.update + id, data);
}

export async function donate(data){
  api.post(endpoints.donate, data );
}
export async function getPostDonations(postId){
  return api.get(`/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`);
}

export async function getUserDonations(postId, userId){
  return api.get(`/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
