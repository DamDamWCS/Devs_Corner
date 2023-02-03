const models = require("../models");

const browse = (req, res) => {
  if (!req.query.tag) {
    models.subject
      .getAll()
      .then(([rows]) => {
        res.json(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  } else if (typeof req.query.tag === "string") {
    models.subject
      .getAllOneQuery(req.query.tag)
      .then(([rows]) => {
        res.json(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  } else {
    models.subject
      .getAllQuery(req.query.tag)
      .then(([rows]) => {
        res.json(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};

const read = (req, res) => {
  models.subject
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const subject = req.body;

  // TODO validations (length, format...)

  subject.id = parseInt(req.params.id, 10);

  models.subject
    .update(subject)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const subject = req.body;

  // TODO validations (length, format...)

  models.subject
    .insert(subject)
    .then(([result]) => {
      res.location(`/items/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.subjects
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
