import { useState, FormEvent, ChangeEvent } from "react";
import PatientAuthService from '../utils/patientAuth';  // Import the Auth utility for managing authentication state
import { signUp } from "../api/authPatientAPI";  // Import the login function from the API
import { PatientLogin } from "../interfaces/PatientLogin";  // Import the interface for UserLogin


const PatientSignup = () => {
  // State to manage the login form data
  const [signUpData, setSignUpData] = useState<PatientLogin>({
    name: '',
    email: '',
    password: ''
  });

  // Handle changes in the input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value
    });
  };

  // Handle form submission for login
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Call the sign up API endpoint with signUpData
      const data = await signUp(signUpData);
      // If sign up is successful, call Auth.login to store the token in localStorage
      PatientAuthService.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);  // Log any errors that occur during sign up
    }
  };

  return (
    <div className='form-container'>
      <form className='form sign-up-form' onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        {/* Username input field */}
        <div className="form-group">
          <label>Email</label>
          <input 
            className="form-input"
            type='email'
            name='email'
            value={signUpData.email || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input 
            className="form-input"
            type='text'
            name='name'
            value={signUpData.name || ''}
            onChange={handleChange}
          />
        </div>
        {/* Password input field */}
        <div className="form-group">
          <label>Password</label>
          <input 
            className="form-input"
            type='password'
            name='password'
            value={signUpData.password || ''}
            onChange={handleChange}
          />
        </div>
        {/* Submit button for the sign up form */}
        <div className="form-group">
          <button className="btn btn-primary" type='submit'>Sign Up</button>
        </div>
      </form>

    </div>
  )
};

export default PatientSignup;
