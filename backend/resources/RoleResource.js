const { formatDate } = require("../helpers/dateHelper.js");

class RoleResource {
  constructor(data) {
    this.data = data;
  }

  toJSON() {
    return {
      id: this.data.id,
      name: this.data.name,
      description: this.data.description,
      is_superadmin: this.data.is_superadmin ? true : false,
      created_at: formatDate(this.data.created_at),
      updated_at: formatDate(this.data.updated_at)
    };
  }

  static collection(data) {
    return data.map(dt => new RoleResource(dt).toJSON());
  }
}

module.exports = RoleResource;
