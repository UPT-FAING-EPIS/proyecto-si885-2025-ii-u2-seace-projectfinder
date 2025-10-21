/**
 * Modelo de Usuario
 */
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4()
  },
  username: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  hashed_password: {
    type: DataTypes.STRING(128),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  full_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  role: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'guest',
    validate: {
      isIn: [['admin', 'guest']]
    }
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  last_login: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: false,
  hooks: {
    beforeCreate: async (user) => {
      if (user.hashed_password) {
        const salt = await bcrypt.genSalt(10);
        user.hashed_password = await bcrypt.hash(user.hashed_password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('hashed_password')) {
        const salt = await bcrypt.genSalt(10);
        user.hashed_password = await bcrypt.hash(user.hashed_password, salt);
      }
    }
  }
});

// Método para validar la contraseña
User.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.hashed_password);
};

// Método para crear un objeto JSON sin la contraseña
User.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  delete values.hashed_password;
  return values;
};

module.exports = User;