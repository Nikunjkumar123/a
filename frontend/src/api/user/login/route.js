const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
  
        // Check if user is provided in request body
        if (!email || !password) {
            return res.status(400).send({ message: "Email and password are required" });
        }
  
        console.log(req.body);
        const user = await User.findOne({ email: email });
        console.log("Login user: ", user);
  
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
  
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Incorrect password" });
        }
  
        // Generate JWT Token
        const token = jwt.sign({
            userid: user._id,
            username: user.username,
            role: user.role,
            email: user.email,
        }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Added expiresIn for better security
  
        if (!token) {
            return res.status(500).json({ message: 'Error generating token' });
        }
  
        // Set token in cookies
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure cookie in production environment
            maxAge: 360000000, // 1 hour expiration
            sameSite: 'strict',
        });
  
        // Respond with user info (excluding password)
        res.send({ user: { ...user.toObject(), password: undefined }, token });
  
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).send({ message: "Internal server error" });
    }
  };