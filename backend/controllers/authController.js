const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/userModel')


async function sendResetEmail(email, randomString) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });
    
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Password Reset Link',
    text: `Click on the following link to reset your password: https://reset-page.netlify.app/forgot/${randomString}`
  };

  await transporter.sendMail(mailOptions);
}
async function register(req,res){
  const { email, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match!');
  }

  // Check if username already exists
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).send('Email already exists!');
  }

  try {
    // Create a new user
    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).send('User registered successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}


async function login(req,res){
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('user not found ! register');
    }

    // Compare the entered password with the hashed password
    const isMatch = await User.findOne({ password });
    if (!isMatch) {
      return res.status(400).send('Incorrect password!');
    }

    res.status(200).send('Login successful!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

async function requestresetpassword(req,res){
    const { email } = req.body;

    var user = await User.findOne({ email });
  
    if (!user) {
      return res.status(404).send('User not found');
    }
  
    var randomString = crypto.randomBytes(20).toString('hex');
  
    // Store the random string in DB for later verification
    user.randomString = randomString;
    await user.save();
  
    // Send email with the random string
    await sendResetEmail(email, randomString);
  
    res.status(200).send('Password reset link has been sent to your email');
}

async function resetPassword(req,res){
    
    var { randomString } = req.params;

    var user = await User.findOne({ randomString });
  
    if (!user) {
      return res.status(400).send('Invalid or expired link');
    }

    var { randomString } = req.params;
    var  { newPassword } = req.body;
  
    var user = await User.findOne({ randomString });
  
    if (!user) {
      return res.status(400).send('Invalid or expired link');
    }
  
    // Update the password and clear the random string
    user.password = newPassword;
    user.randomString = undefined; // Clear the random string
    await user.save();
  
    res.status(200).send('Password has been successfully reset');
}

module.exports={
    requestresetpassword,
    resetPassword,register,login
}