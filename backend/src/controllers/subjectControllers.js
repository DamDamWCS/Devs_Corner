const Joi = require("../../node_modules/joi");
const models = require("../models");

const subjectSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
  tags: Joi.array().min(1).items(Joi.number().integer()).required(),
});

const subjectStatusSchema = Joi.object({
  statusResolve: Joi.number().integer().required().valid(0, 1),
});

const validateSubject = (req, res, next) => {
  if (!req.body.status_resolve) {
    const { title, text, tags } = req.body;
    const { error } = subjectSchema.validate(
      { title, text, tags },
      { abortEarly: false }
    );
    if (error) {
      res.status(422).json({ validationErrors: error.details });
    } else {
      next();
    }
  } else {
    const statusResolve = req.body.status_resolve;
    const { error } = subjectStatusSchema.validate(
      { statusResolve },
      { abortEarly: false }
    );
    if (error) {
      res.status(422).json({ validationErrors: error.details });
    } else {
      next();
    }
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
  subject.id = parseInt(req.params.id, 10);
  if (req.body.status_resolve) {
    models.subject
      .updateStatus(subject.id, req.body.status_resolve)
      .then(() => {
        res.sendStatus(204);
      });
  } else {
    models.subject
      .updateSubject(subject)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          models.subject.deleteTags(subject.id).then(() => {
            req.body.tags.map((tagId) =>
              models.subject.insertTag(subject.id, tagId).catch((err) => {
                console.error(err);
                return res.sendStatus(500);
              })
            );
          });
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};

const add = (req, res) => {
  models.subject
    .insertSubject(req.body)
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
