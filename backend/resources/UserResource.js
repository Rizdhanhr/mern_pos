const { formatDate } = require("../helpers/dateHelper.js");

class UserResource {
  constructor(data) {
    this.data = data;
  }

  toJSON() {
    return {
      id: this.data.id,
      name: this.data.name,
      email: this.data.email,
      role: this.data.role,
      created_at: formatDate(this.data.created_at),
      updated_at: formatDate(this.data.updated_at)
    };
  }

  static collection(data) {
    return data.map(dt => new UserResource(dt).toJSON());
  }
}

module.exports = UserResource;
