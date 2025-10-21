/**
 * Servicio de autenticación
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config');

class AuthService {
  /**
   * Verificar contraseña
   */
  async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
   * Generar hash de contraseña
   */
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  /**
   * Crear token JWT
   */
  createAccessToken(data, expiresIn = null) {
    const payload = { ...data };
    const options = {
      expiresIn: expiresIn || config.jwt.expiresIn
    };
    
    return jwt.sign(payload, config.jwt.secret, options);
  }

  /**
   * Verificar token JWT
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, config.jwt.secret);
    } catch (error) {
      return null;
    }
  }

  /**
   * Autenticar usuario
   */
  async authenticateUser(username, password) {
    try {
      const user = await User.findOne({ where: { username } });
      
      if (!user) {
        return null;
      }

      const isValidPassword = await this.verifyPassword(password, user.hashed_password);
      
      if (!isValidPassword) {
        return null;
      }

      return user;
    } catch (error) {
      console.error('Error authenticating user:', error);
      return null;
    }
  }

  /**
   * Registrar nuevo usuario
   */
  async registerUser(userData) {
    try {
      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({
        where: {
          $or: [
            { username: userData.username },
            { email: userData.email }
          ]
        }
      });

      if (existingUser) {
        if (existingUser.username === userData.username) {
          throw new Error('El nombre de usuario ya está registrado');
        } else {
          throw new Error('El email ya está registrado');
        }
      }

      // Crear usuario
      const hashedPassword = await this.hashPassword(userData.password);
      
      const user = await User.create({
        username: userData.username,
        email: userData.email,
        hashed_password: hashedPassword,
        full_name: userData.full_name || null,
        role: userData.role || 'guest',
        is_active: true
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtener usuario por ID
   */
  async getUserById(userId) {
    try {
      const user = await User.findByPk(userId);
      return user;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return null;
    }
  }

  /**
   * Actualizar usuario
   */
  async updateUser(userId, updateData) {
    try {
      const user = await User.findByPk(userId);
      
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      // Campos permitidos para actualizar
      const allowedFields = ['email', 'full_name'];
      const updateFields = {};

      for (const field of allowedFields) {
        if (updateData[field] !== undefined) {
          updateFields[field] = updateData[field];
        }
      }

      // Verificar si el email ya existe (si se está actualizando)
      if (updateFields.email) {
        const existingUser = await User.findOne({
          where: {
            email: updateFields.email,
            id: { $ne: userId }
          }
        });

        if (existingUser) {
          throw new Error('El email ya está en uso por otro usuario');
        }
      }

      updateFields.updated_at = new Date();

      await user.update(updateFields);
      await user.reload();

      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cambiar contraseña
   */
  async changePassword(userId, currentPassword, newPassword) {
    try {
      const user = await User.findByPk(userId);
      
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      // Verificar contraseña actual
      const isValidPassword = await this.verifyPassword(currentPassword, user.hashed_password);
      
      if (!isValidPassword) {
        throw new Error('Contraseña actual incorrecta');
      }

      // Actualizar contraseña
      const hashedPassword = await this.hashPassword(newPassword);
      await user.update({
        hashed_password: hashedPassword,
        updated_at: new Date()
      });

      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Verificar permisos
   */
  checkPermission(user, permission) {
    // Los administradores tienen todos los permisos
    if (user.role === 'admin') {
      return true;
    }

    // Permisos para invitados
    if (user.role === 'guest') {
      const basicPermissions = ['view_processes', 'use_chatbot'];
      return basicPermissions.includes(permission);
    }

    return false;
  }

  /**
   * Actualizar último login
   */
  async updateLastLogin(userId) {
    try {
      const user = await User.findByPk(userId);
      if (user) {
        await user.update({ last_login: new Date() });
      }
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  }
}

module.exports = new AuthService();