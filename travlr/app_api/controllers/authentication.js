const jwt = require('jsonwebtoken');

const mockUser = {
  email: 'admin@travlr.com',
  password: 'password123',
  name: 'Travlr Admin'
};

const register = (req, res) => {
  res.status(200).json({
    message: 'Mock register endpoint working'
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (email !== mockUser.email || password !== mockUser.password) {
    return res.status(401).json({
      message: 'Invalid email or password'
    });
  }

  const token = jwt.sign(
    {
      email: mockUser.email,
      name: mockUser.name
    },
    process.env.JWT_SECRET || 'travlr_secret',
    {
      expiresIn: '1h'
    }
  );

  res.status(200).json({
    token,
    user: {
      email: mockUser.email,
      name: mockUser.name
    }
  });
};

module.exports = {
  register,
  login
};