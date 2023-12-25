const express = require("express");
const Urlmodel = require("../model/url-shortner-schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");
const e = require("express");

module.exports.registration = async (req, res) => {
  try {
    const { email, password, orignalURL } = req.body;
    const express = require("express");
    const Urlmodel = require("../model/url-shortner-schema");
    const bcrypt = require("bcrypt");
    const jwt = require("jsonwebtoken");
    const shortid = require("shortid");
    const e = require("express"); // Note: It seems like this import is not used.
    
    // Registration Controller
    module.exports.registration = async (req, res) => {
      try {
        // Destructure request body
        const { email, password, orignalURL } = req.body;
    
        // Check if the email is already registered
        const existingUser = await Urlmodel.findOne({ email });
    
        if (existingUser) {
          // Email already registered
          return res.status(400).json({
            success: false,
            message: "Email is already registered",
          });
        } else if (!orignalURL) {
          // No URL provided for shortening
          return res.status(400).json({
            message: "Please provide a URL to be Shortened",
          });
        } else {
          // Generate a short URL using shortid
          const shortURL = shortid();
    
          // Create a new user in the database
          const newUser = await Urlmodel.create({
            email: email,
            password: password,
            shortURL: shortURL,
            orignalURL: orignalURL,
          });
    
          // Generate a token for the new user
          const token = await newUser.generateToken();
    
          // Calculate expiration date (90 days from now)
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 90);
    
          // Send success response with token and login message
          return res
            .status(200)
            .cookie("token", token, {
              expires: expirationDate,
              httpOnly: true,
            })
            .json({
              success: true,
              data: newUser.email,
              message: `Login now -> http://localhost:4000/login`,
              token,
            });
        }
      } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
    
    // Login Controller
    module.exports.login = async (req, res) => {
      try {
        // Destructure request body
        const { email, password } = req.body;
    
        // Check if the user exists in the database
        const existUser = await Urlmodel.findOne({ email });
    
        if (!existUser) {
          // User not found
          return res.status(400).json({
            success: false,
            message: "Email not registered -> http://localhost:4000/registration",
          });
        } else {
          // Check if the provided password is valid
          const validPassword = await existUser.matchPassword(password);
    
          if (!validPassword) {
            // Invalid password
            return res.status(401).json({
              success: false,
              message: "Invalid details",
            });
          } else {
            // Generate a token for the existing user
            const token = await existUser.generateToken();
    
            // Calculate expiration date (90 days from now)
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 90);
    
            // Send success response with token and login message
            return res
              .status(200)
              .cookie("token", token, {
                expires: expirationDate,
                httpOnly: true,
              })
              .json({
                success: true,
                message:
                  "Login successfully, check your short URL -> http://localhost:4000/" +
                  existUser.shortURL,
                shortURL: existUser.shortURL,
                orignalURL: existUser.orignalURL,
                token,
              });
          }
        }
      } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
    
    // Check URL Controller
    module.exports.checkURL = async (req, res) => {
      try {
        // Get short URL from request parameters
        const shortURL = req.params.shortURL;
    
        // Find the corresponding entry in the database
        const entry = await Urlmodel.findOne({ shortURL });
    
        if (!shortURL) {
          // Short URL not provided
          return res.status(400).json({
            success: false,
            message: "URL not found",
          });
        }
    
        if (entry) {
          // Redirect to the original URL
          return res.status(200).redirect(`${entry.orignalURL}`);
        } else {
          // Short URL not found
          return res.status(404).json({
            success: false,
            message: 'Short URL not found',
          });
        }
      } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
    
    // Check if the email is already registered
    const existingUser = await Urlmodel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
    } else if (!orignalURL) {
      return res.status(400).json({
        message: "Please provide a URL to be Shortened",
      });
    } else {
      const shortURL = shortid();
      // Create a new user
      const newUser = await Urlmodel.create({
        email: email,
        password: password,
        shortURL: shortURL,
        orignalURL: orignalURL,
      });
      const token = await newUser.generateToken();

      // Calculate expiration date (90 days from now)
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 90);

      return res
        .status(200)
        .cookie("token", token, {
          expires: expirationDate,
          httpOnly: true,
        })
        .json({
          success: true,
          data: newUser.email,
          message: `Login now -> http://localhost:4000/login`,
          token,
        });


    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// controller.js// controller.js
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await Urlmodel.findOne({ email });

    if (!existUser) {
      return res.status(400).json({
        success: false,
        message: "Email not registered -> http://localhost:4000/registration",
      });
    } else {
      const validPassword = await existUser.matchPassword(password);

      if (!validPassword) {
        return res.status(401).json({
          success: false,
          message: "Invalid details",
        });
      } else {
        const token = await existUser.generateToken();

        // Calculate expiration date (90 days from now)
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 90);

        return res
          .status(200)
          .cookie("token", token, {
            expires: expirationDate,
            httpOnly: true,
          })
          .json({
            success: true,
            message:
              "Login successfully, check your short URL -> http://localhost:4000/" +
              existUser.shortURL,
            shortURL: existUser.shortURL,
            orignalURL: existUser.orignalURL,
            token,
          });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.checkURL = async (req, res) => {
    try {
      const shortURL = req.params.shortURL;
      const entry = await Urlmodel.findOne({ shortURL });
      
      if(!shortURL){
        return res.status(400).json({
            success:false,
            message:"URL not found"
        })
      }

      if (entry) {
        return res.status(200).redirect(`${entry.orignalURL}`)
      } else {
        return res.status(404).json({
          success: false,
          message: 'Short URL not found',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


