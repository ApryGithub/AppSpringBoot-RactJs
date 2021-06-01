import http from "../endpoint-spring";

class UserDataService {

  getAll() {
    return http.get("/user");
  }
  getAllParams(params){
    return http.get("/user", { params });
  }

  get(id) {
    return http.get(`/user/${id}`);
  }

  findByUserName(userName){
    return http.get(`/user?userName=${userName}`);
  };

  create(data) {
    return http.post("/user", data);
  }

  update(id, data) {
    return http.put(`/user/${id}`, data);
  }

  delete(id) {
    return http.delete(`/user/${id}`);
  }

}

export default new UserDataService();
