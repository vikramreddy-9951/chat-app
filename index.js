const express = require("express");
const app = express();
const cors = require("cors");
const chatRoutes = require("./src/routes/chatRoutes");
const userRoutes = require("./src/routes/usersRoutes")
const config = require("./src/config");
const { sequelize } = require("./db-config/sql-connection");
const { verifyConnection } = require("./db-config/firebase-connection");


// Middleware
app.use(express.json({ limit: "10kb" }));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.urlencoded({ extended: true }));


// Request Logging Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    statusCode:200,
    success: true,
    message: "Chat service is running",
    data:[]
  });
});

// Routes
app.use("/chat", chatRoutes);
app.use("/user", userRoutes);

// Router Not Found
app.use((req, res) => {
  return res.status(404).json({
    statusCode:404,
    success: false,
    message: "Route not found",
    data:[]
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(500).json({
    statusCode:500,
    success: false,
    message: "Internal server error",
    data:[]
  });
});

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (error) {
    console.error("Failed to connect to the SQL database:", error.message);
    process.exit(1);
  }

  try {
    await verifyConnection();
  } catch (error) {
    console.error("Failed to connect to Firebase Firestore:", error.message);
    process.exit(1);
  }

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}

startServer();