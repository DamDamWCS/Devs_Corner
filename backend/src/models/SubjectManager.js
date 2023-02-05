const AbstractManager = require("./AbstractManager");

class SubjectManager extends AbstractManager {
  constructor() {
    super({ table: "subject" });
  }

  getAll() {
    return this.database
      .query(`SELECT subject.id, subject.text, subject.title, subject.status_resolve, subject.created_at, JSON_ARRAYAGG(tag.name) as tags, concat(user.first_name, " ", user.last_name ) as Auteur
      FROM devs_corner.subject
      INNER JOIN devs_corner.subject_has_tag ON subject.id = subject_has_tag.subject_id
      INNER JOIN devs_corner.tag ON subject_has_tag.tag_id = tag.id
      INNER JOIN devs_corner.user ON devs_corner.subject.user_id = devs_corner.user.id
      GROUP BY subject.id
      `);
  }

  getAllOneQuery(tagId) {
    return this.database.query(
      `SELECT subject.id, subject.text, subject.title, subject.status_resolve, subject.created_at, JSON_ARRAYAGG(tag.name) as tags, concat(user.first_name, " ", user.last_name ) as Auteur
        FROM devs_corner.subject
        INNER JOIN devs_corner.subject_has_tag ON subject.id = subject_has_tag.subject_id
        INNER JOIN devs_corner.tag ON subject_has_tag.tag_id = tag.id
        INNER JOIN devs_corner.user ON devs_corner.subject.user_id = devs_corner.user.id
        WHERE subject_has_tag.tag_id IN (?)
        GROUP BY subject.id`,
      tagId
    );
  }

  getAllQuery(tagId) {
    const placeholders = tagId.map(() => `?`).join(",");
    return this.database.query(
      `SELECT subject.id, subject.text, subject.title, subject.status_resolve, subject.created_at, JSON_ARRAYAGG(tag.name) as tags, concat(user.first_name, " ", user.last_name ) as Auteur
        FROM devs_corner.subject
        INNER JOIN devs_corner.subject_has_tag ON subject.id = subject_has_tag.subject_id
        INNER JOIN devs_corner.tag ON subject_has_tag.tag_id = tag.id
        INNER JOIN devs_corner.user ON devs_corner.subject.user_id = devs_corner.user.id
        WHERE subject_has_tag.tag_id IN (${placeholders})
        GROUP BY subject.id`,
      tagId
    );
  }

  getId(id) {
    return this.database.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
  }
}

module.exports = SubjectManager;
