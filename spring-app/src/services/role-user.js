import http from "../endpoint-spring";

class RoleUserDataService {
  getAll() {
    return http.get("/role");
  }

  get(id) {
    return http.get(`/role/${id}`);
  }

  create(data) {
    return http.post("/role", data);
  }

  update(id, data) {
    return http.put(`/role/${id}`, data);
  }

  delete(id) {
    return http.delete(`/role/${id}`);
  }

}

export default new RoleUserDataService();
