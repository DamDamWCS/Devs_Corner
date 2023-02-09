const models = require("../models");

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
  user.id = parseInt(req.params.id, 10);

  if (req.body.state) {
    models.user
      .updateInformation(user)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error("MY ERROR", err);
        res.sendStatus(500);
      });
  } else {
    models.user
      .updateInformation(user)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error("MY ERROR", err);
        res.sendStatus(500);
      });
  }
};

const add = (req, res) => {
  req.body.first_name = req.body.firstname;
  delete req.body.firstname;
  req.body.last_name = req.body.lastname;
  delete req.body.lastname;
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
  console.error(req);

  models.user
    .findByEmail(body.email)
    .then(([user]) => {
      if (user[0] != null) {
        [req.user] = user; // equivalent a req.user=user[0]
        // console.error("REQ USER", req.user);
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

const verifySyntaxRegister = (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  const errors = [];
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;

  if (firstname === null) {
    errors.push({ field: "firstname", message: "This field is required" });
  }
  if (firstname && firstname.length >= 15) {
    errors.push({
      field: "firstname",
      message: "La longueur doit etre inférieur a 15 caractères",
    });
  }
  if (lastname == null) {
    errors.push({ field: "lastname", message: "This field is required" });
  }
  if (lastname && lastname.length >= 15) {
    errors.push({
      field: "lastname",
      message: "La longueur doit etre inférieur a 15 caractères",
    });
  }

  if (!emailRegex.test(email)) {
    errors.push({ field: "email", message: "Invalid email" });
  }
  if (!passwordRegex.test(password)) {
    errors.push({
      field: "password",
      message:
        "Majuscule, minucule, caractère spécial, chiffre entre 8 et 15 caractères",
    });
  }
  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

const verifySyntaxUpdate = (req, res, next) => {
  const { firstname, lastname, email } = req.body;
  const errors = [];
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;
  if (firstname == null) {
    errors.push({ field: "firstname", message: "This field is required" });
  }
  if (lastname == null) {
    errors.push({ field: "lastname", message: "This field is required" });
  }
  if (!emailRegex.test(email)) {
    errors.push({ field: "email", message: "Invalid email" });
  }
  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  login,
  destroy,
  verifySyntaxRegister,
  verifySyntaxUpdate,
};
