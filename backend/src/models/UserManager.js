const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findByEmail(email) {
    return this.database.query(
      `select id, first_name, last_name, email, hashedPassword, role, state from ${this.table} where email = ?`,
      [email]
    );
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (first_name, last_name, email, hashedPassword) values (?,?,?,?)`,
      [user.first_name, user.last_name, user.email, user.hashedPassword]
    );
  }

  updateInformation(user) {
    console.error(user);
    return this.database.query(
      `update ${this.table} set first_name =?, last_name=?, email = ? where id = ?`,
      [user.firstname, user.lastname, user.email, user.id]
    );
  }

  updateState(user) {
    return this.database.query(
      `update ${this.table} set state = ? where id = ?`,
      [user.state, user.id]
    );
  }

  updatePassword(user, body) {
    console.error("UPDATE PASSWORD", body);
    return this.database.query(
      `update ${this.table} set hashedPassword = ? where id = ?`,
      [body.hashedPassword, user.id]
    );
  }
}

module.exports = UserManager;
