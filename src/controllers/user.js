const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  
exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (user === null) {
            res.status(401).json({message: 'Identifiant ou mot de passe incorect'});
        } else {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    res.status(401).json({message: 'Identifiant ou mot de passe incorect'});
                } else {
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '5h'}
                        )
                    });
                }
            })
            .catch(err => {
                res.status(500).json({ error });
            })
        }
    })
    .catch(err => {
        res.status(500).json({error})
    })
};


exports.userList = (req, res) => {
    User.find({}, { email: 1, _id: 0 }, function(error, result) {
        if (error) {
          console.log(error);
        } else {
          res.json(result);
        }
      });
}
