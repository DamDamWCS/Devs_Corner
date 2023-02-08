const Joi = require("../../node_modules/joi");
const models = require("../models");

const subjectSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
  userId: Joi.number().integer().required(),
  tags: Joi.array().min(1).items(Joi.number().integer()).required(),
});

const validateSubject = (req, res, next) => {
  const { title, text, userId, tags } = req.body;
  const { error } = subjectSchema.validate(
    { title, text, userId, tags },
    { abortEarly: false }
  );
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

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
    .getId(req.params.id)
    .then(([rows]) => {
      if (rows[0].id == null) {
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
  models.subject
    .insertSubject(req.body, req.payload.sub)
    .then(([result]) => {
      req.body.tags.map((tagId) =>
        models.subject.insertTag(result.insertId, tagId).catch((err) => {
          console.error(err);
          return res.sendStatus(500);
        })
      );
      return res.sendStatus(201);
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
  validateSubject,
  browse,
  read,
  edit,
  add,
  destroy,
};
