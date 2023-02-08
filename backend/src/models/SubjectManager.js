const AbstractManager = require("./AbstractManager");

class SubjectManager extends AbstractManager {
  constructor() {
    super({ table: "subject" });
  }

  getAll() {
    return this.database
      .query(`SELECT subject.id, subject.title, subject.text, subject.status_resolve, subject.created_at, JSON_ARRAYAGG(tag.name) as tags, concat(user.first_name, " ", user.last_name ) as Auteur
      FROM devs_corner.subject
      INNER JOIN devs_corner.subject_has_tag ON subject.id = subject_has_tag.subject_id
      INNER JOIN devs_corner.tag ON subject_has_tag.tag_id = tag.id
      INNER JOIN devs_corner.user ON devs_corner.subject.user_id = devs_corner.user.id
      GROUP BY subject.id
      `);
  }

  getAllOneQuery(tagId) {
    return this.database.query(
      `SELECT subject.id, subject.title, subject.text, subject.status_resolve, subject.created_at, JSON_ARRAYAGG(tag.name) as tags, concat(user.first_name, " ", user.last_name ) as Auteur
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
      `SELECT subject.id, subject.title, subject.text, subject.status_resolve, subject.created_at, JSON_ARRAYAGG(tag.name) as tags, concat(user.first_name, " ", user.last_name ) as Auteur
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
    return this.database.query(
      `SELECT subject.id, subject.title, subject.text, subject.status_resolve, subject.created_at, JSON_ARRAYAGG(tag.name) as tags, concat(user.first_name, " ", user.last_name ) as fullname
    FROM devs_corner.subject
    INNER JOIN devs_corner.subject_has_tag ON subject.id = subject_has_tag.subject_id
    INNER JOIN devs_corner.tag ON subject_has_tag.tag_id = tag.id
    INNER JOIN devs_corner.user ON devs_corner.subject.user_id = devs_corner.user.id where subject.id = ?`,
      [id]
    );
  }

  insertSubject(subject) {
    const { title, text, userId } = subject;

    return this.database.query(
      `insert into subject (title, text, status_resolve, user_id) values (?, ?, 0, ?);`,
      [title, text, userId]
    );
  }

  insertTag(subjectId, tagsId) {
    return this.database.query(
      `insert into subject_has_tag (subject_id, tag_id) values (?, ?);`,
      [subjectId, tagsId]
    );
  }

  updateSubject(subject) {
    return this.database.query(
      `update subject set title = ?, text = ? where id = ?`,
      [subject.title, subject.text, subject.id]
    );
  }

  deleteTags(subjectId) {
    return this.database.query(
      `delete from subject_has_tag where subject_id = ?`,
      [subjectId]
    );
  }
}

module.exports = SubjectManager;
