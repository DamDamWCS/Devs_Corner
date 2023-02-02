const AbstractManager = require("./AbstractManager");

class SubjectManager extends AbstractManager {
  constructor() {
    super({ table: "subject" });
  }

  // eslint-disable-next-line consistent-return
  findAllQuerry(tagsId) {
    if (!tagsId) {
      return this.database
        .query(`SELECT subject.id, subject.text, subject.title, subject.status_resolve, subject.created_at, GROUP_CONCAT(tag.name) as tags, concat(user.first_name, " ", user.last_name ) as Auteur
      FROM devs_corner.subject
      INNER JOIN devs_corner.subject_has_tag ON subject.id = subject_has_tag.subject_id
      INNER JOIN devs_corner.tag ON subject_has_tag.tag_id = tag.id
      INNER JOIN devs_corner.user ON devs_corner.subject.user_id = devs_corner.user.id
      GROUP BY subject.id
      `);
    }
    if (typeof tagsId === "string") {
      return this.database.query(
        `SELECT subject.id, subject.text, subject.title, subject.status_resolve, subject.created_at, GROUP_CONCAT(tag.name) as tags, concat(user.first_name, " ", user.last_name ) as Auteur
        FROM devs_corner.subject
        INNER JOIN devs_corner.subject_has_tag ON subject.id = subject_has_tag.subject_id
        INNER JOIN devs_corner.tag ON subject_has_tag.tag_id = tag.id
        INNER JOIN devs_corner.user ON devs_corner.subject.user_id = devs_corner.user.id
        WHERE subject_has_tag.tag_id IN (?)
        GROUP BY subject.id
        HAVING COUNT(DISTINCT subject_has_tag.tag_id) = 1`,
        tagsId
      );
    }
    if (Array.isArray(tagsId)) {
      const placeholders = tagsId.map(() => `?`).join(",");
      return this.database.query(
        `SELECT subject.id, subject.text, subject.title, subject.status_resolve, subject.created_at, GROUP_CONCAT(tag.name) as tags, concat(user.first_name, " ", user.last_name ) as Auteur
        FROM devs_corner.subject
        INNER JOIN devs_corner.subject_has_tag ON subject.id = subject_has_tag.subject_id
        INNER JOIN devs_corner.tag ON subject_has_tag.tag_id = tag.id
        INNER JOIN devs_corner.user ON devs_corner.subject.user_id = devs_corner.user.id
        WHERE subject_has_tag.tag_id IN (${placeholders})
        GROUP BY subject.id
        HAVING COUNT(DISTINCT subject_has_tag.tag_id) = ?`,
        [...tagsId, tagsId.length]
      );
    }
  }

  insert(item) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      item.title,
    ]);
  }

  update(item) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [item.title, item.id]
    );
  }
}

module.exports = SubjectManager;
