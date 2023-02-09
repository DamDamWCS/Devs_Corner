const Joi = require("../../node_modules/joi");
const models = require("../models");

const nameSchema = Joi.object({
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
});
const passwordSchema = Joi.object({
  password: Joi.string().pattern(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/
  ),
});
const newPasswordSchema = Joi.object({
  password: Joi.string().pattern(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/
  ),
});

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.user
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
  const user = req.body;
  user.id = req.params.id;

  models.user
    .updateInformation(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        console.error("EDIT - MISE A JOUR OK");
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error("MY ERROR IN EDIT", err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  // req.body.first_name = req.body.firstname;
  // delete req.body.firstname;
  // req.body.last_name = req.body.lastname;
  // delete req.body.lastname;
  const user = req.body;

  // TODO validations (length, format...)

  models.user
    .insert(user)
    .then(([result]) => {
      res.location(`/user/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Compte utilisateur déjà existant");
    });
};

const login = (req, res, next) => {
  const { body } = req;
  const errors = [];

  models.user
    .findByEmail(body.email)
    .then(([user]) => {
      if (user[0] != null) {
        [req.user] = user;
        if (req.user.state === 1) {
          next();
        } else {
          errors.push(
            "Votre compte a été désactivé, veuillez contacter l'administrateur"
          );
          res.status(401).send({ validationErrors: errors });
        }
      } else {
        errors.push("Vous n'avez pas de compte");
        res.status(401).send({ validationErrors: errors });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404); // echec lors de la suppression
      } else {
        res.sendStatus(204); // réussite lors de la suppression
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifySyntax = (req, res, next) => {
  const { firstname, lastname, email, password, newPassword } = req.body;
  const errors = [];
  if (
    Object.keys(req.body).length === 2 &&
    "email" in req.body &&
    "password" in req.body &&
    req.body.email !== null &&
    req.body.password !== null
  ) {
    const loginSchema = emailSchema.concat(passwordSchema);
    const { error } = loginSchema.validate(
      { email, password },
      { abortEarly: false }
    );
    if (error) {
      res.status(422).json({ validationErrors: error.details });
    } else {
      next();
    }
  } else if (
    Object.keys(req.body).length === 2 &&
    "password" in req.body &&
    "newPassword" in req.body
  ) {
    const dualPassword = passwordSchema.concat(newPasswordSchema);
    const { error } = dualPassword.validate(
      { password, newPassword },
      { abortEarly: false }
    );

    if (error) {
      res.status(422).json({ validationErrors: error.details });
    } else {
      next();
    }
  } else if (Object.keys(req.body).length === 3) {
    const userSchema = nameSchema.concat(emailSchema);
    const { error } = userSchema.validate(
      { firstname, lastname, email },
      { abortEarly: false }
    );

    if (error) {
      res.status(422).json({ validationErrors: error.details });
    } else {
      next();
    }
  } else if (Object.keys(req.body).length === 4) {
    const userSchema = nameSchema.concat(emailSchema);
    const registerSchema = userSchema.concat(passwordSchema);

    // faire un concat pour JOI
    const { error } = registerSchema.validate(
      { firstname, lastname, email, password },
      { abortEarly: false }
    );
    if (error) {
      res.status(422).json({ validationErrors: error.details });
    } else {
      next();
    }
  } else {
    errors.push("erreur dans le passage des données");
    res.status(401).send({ validationErrors: errors });
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  login,
  destroy,
  verifySyntax,
};
