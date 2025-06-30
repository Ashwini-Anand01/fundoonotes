import sequelize, { DataTypes } from '../config/database';
import bcrypt from 'bcrypt';
import { error } from 'winston';
const User = require('../models/user')(sequelize, DataTypes);

//get all users
export const getAllUsers = async () => {
  const data = await User.findAll();
  return data;
};

//create new user
export const newUser = async (body) => {
  const data = await User.create(body);
  return data;
};

//update single user
export const updateUser = async (id, body) => {
  await User.update(body, {
    where: { id: id }
  });
  return body;
};

//delete single user
export const deleteUser = async (id) => {
  await User.destroy({ where: { id: id } });
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findByPk(id);
  return data;
};

//create registration for users
export const registerUser = async(body) =>{
  const existingUser = await User.findOne({where : {email : body.email}});
  if(existingUser){
    throw new Error('Email is already registered');
  }
  const hashPassword = await bycrpyt.hash(body.password,10);
  const data = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: hashPassword
  });
  return data;
};

//login for register users
//finding forms email id
export const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};
  
//then checkimg password
export const comparePassword = async (password,hashPassword) => {
  return await bcrypt.compare(password,hashPassword);
};