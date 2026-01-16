import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { google } from "googleapis";
import { readFileSync } from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Google Sheets API Setup
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || "";
const SHEET_NAME = "Registrations";

// Initialize Google Sheets API
let sheetsClient;

async function initializeGoogleSheets() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "./google-service-key.json",
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    sheetsClient = google.sheets({ version: "v4", auth });
    console.log("✅ Google Sheets API initialized");
  } catch (error) {
    console.error("❌ Error initializing Google Sheets:", error);
  }
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Registration endpoint
app.post("/api/registrations", async (req, res) => {
  try {
    const formData = req.body;

    // Validate required fields
    if (!formData.name || !formData.phone || !formData.email) {
      return res.status(400).json({
        error: "Missing required fields: name, phone, email",
      });
    }

    // Prepare row data
    const timestamp = new Date().toLocaleString("vi-VN");
    const rowData = [
      [
        timestamp, // Timestamp
        formData.name,
        formData.phone,
        formData.age || "",
        formData.socialLink || "",
        formData.course || "",
        formData.currentLevel || "",
        formData.specificLevel || "",
        Array.isArray(formData.purposes)
          ? formData.purposes.join(", ")
          : formData.purposes,
        formData.otherPurpose || "",
        Array.isArray(formData.skills)
          ? formData.skills.join(", ")
          : formData.skills,
        formData.goals || "",
        Array.isArray(formData.learningFormats)
          ? formData.learningFormats.join(", ")
          : formData.learningFormats,
        formData.sessionsPerWeek || "",
        formData.previousExperience || "",
        formData.source || "",
        formData.otherSource || "",
        formData.additionalQuestions || "",
      ],
    ];

    // Append to Google Sheet
    const response = await sheetsClient.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:R`,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: rowData,
      },
    });

    console.log(`✅ Registration saved: ${formData.name}`);

    res.json({
      success: true,
      message: "Registration saved successfully",
      data: {
        name: formData.name,
        phone: formData.phone,
        timestamp,
      },
    });
  } catch (error) {
    console.error("❌ Error saving registration:", error);
    res.status(500).json({
      error: "Failed to save registration",
      details: error.message,
    });
  }
});

// Get all registrations (for admin dashboard)
app.get("/api/registrations", async (req, res) => {
  try {
    const response = await sheetsClient.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:R`,
    });

    const rows = response.data.values || [];
    const headers = rows[0] || [];
    const data = rows.slice(1).map((row) => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || "";
      });
      return obj;
    });

    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("❌ Error fetching registrations:", error);
    res.status(500).json({
      error: "Failed to fetch registrations",
      details: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  initializeGoogleSheets();
});
