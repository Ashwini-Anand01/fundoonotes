import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import { error } from 'winston';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserService.getAllUsers();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getUser = async (req, res, next) => {
  try {
    const data = await UserService.getUser(req.params.id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUser = async (req, res, next) => {
  try {
    const data = await UserService.newUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateUser = async (req, res, next) => {
  try {
    const data = await UserService.updateUser(req.params.id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'User updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteUser = async (req, res, next) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};


/**
 * Controller to create a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const register =async(req,res,next) =>{
  try{
    const data = await UserService.registerUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code : HttpStatus.CREATED,
      data : data,
      message : 'User registered successfully'
    });
  }
  catch{
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code : HttpStatus.INTERNAL_SERVER_ERROR,
      data : '',
      message : error.message
    });
  }
};

/**
 * Controller to login a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const loginUser = async(req,res,next) =>{
  try {
    const { email, password } = req.body;
    const user = await UserService.findUserByEmail(email);
    if(!user){
     res.status(HttpStatus.OK).json({
      code:HttpStatus.OK,
      data:token,
      message:'user not found'
     });
  }
  const isMatch = await UserService.comparePassword(password, user.password);
   if (!isMatch){
    res.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      message:'invalid password'
    });
  }
  return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      message: 'Login successful'
    });
    } catch (error) {
    next(error);
  }
};