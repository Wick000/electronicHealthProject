import { Router, Request, Response } from 'express';
import { Patient } from '../models/Patient.js';  // Import the User model
import jwt from 'jsonwebtoken';  // Import the JSON Web Token library
import bcrypt from 'bcrypt';  // Import the bcrypt library for password hashing

// Login function to authenticate a patient
export const patientLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;  // Extract username and password from request body

  // Find the patient in the database by username
  const patient = await Patient.findOne({
    where: { email },
  });

  // If patient is not found, send an authentication failed response
  if (!patient) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Compare the provided password with the stored hashed password
  const patientPasswordIsValid = await bcrypt.compare(password, patient.password);
  // If password is invalid, send an authentication failed response
  if (!patientPasswordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Get the secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY || '';

  // Generate a JWT token for the authenticated user
  const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
  return res.json({ token });  // Send the token as a JSON response
};

export const patientSignUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const newPatient = await Patient.create({ email, password });

    console.log(newPatient);
    
      // Get the secret key from environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ username: newPatient.email }, secretKey, { expiresIn: '1h' });
    res.json({ token });  // Send the token as a JSON response
    // res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

// Create a new router instance for patient
const patientRouter = Router();

// POST /login - Login a patient
patientRouter.post('/patientLogin', patientLogin);  // Define the login route

// POST /users - Create a new patient
patientRouter.post('/patientSignup', patientSignUp);

export default patientRouter;  // Export the router instance
