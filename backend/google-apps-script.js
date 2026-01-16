/**
 * Google Apps Script - Registration Form Handler
 * 
 * Setup:
 * 1. Go to Google Sheet
 * 2. Extensions → Apps Script
 * 3. Replace all code with this
 * 4. Save
 * 5. Deploy → New Deployment → Web app
 * 6. Copy the deployment URL
 * 7. Add to .env.local: REACT_APP_API_URL=https://script.google.com/macros/s/{ID}/usercurrentapp
 */

function doPost(e) {
  try {
    // Get active sheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse request body
    const data = JSON.parse(e.postData.contents);
    
    // Get or create headers
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    if (headers.length === 0 || headers[0] === "") {
      // Create headers if not exist
      const headerRow = [
        "Timestamp",
        "Name",
        "Phone",
        "Age",
        "Social Link",
        "Course",
        "Current Level",
        "Specific Level",
        "Purposes",
        "Other Purpose",
        "Skills",
        "Goals",
        "Learning Formats",
        "Sessions/Week",
        "Previous Experience",
        "Source",
        "Other Source",
        "Additional Questions"
      ];
      sheet.appendRow(headerRow);
    }
    
    // Prepare row data
    const timestamp = new Date().toLocaleString("vi-VN");
    const row = [
      timestamp,
      data.name || "",
      data.phone || "",
      data.age || "",
      data.socialLink || "",
      data.course || "",
      data.currentLevel || "",
      data.specificLevel || "",
      Array.isArray(data.purposes) ? data.purposes.join(", ") : (data.purposes || ""),
      data.otherPurpose || "",
      Array.isArray(data.skills) ? data.skills.join(", ") : (data.skills || ""),
      data.goals || "",
      Array.isArray(data.learningFormats) ? data.learningFormats.join(", ") : (data.learningFormats || ""),
      data.sessionsPerWeek || "",
      data.previousExperience || "",
      data.source || "",
      data.otherSource || "",
      data.additionalQuestions || ""
    ];
    
    // Append row to sheet
    sheet.appendRow(row);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Registration saved successfully",
      data: {
        name: data.name,
        phone: data.phone,
        timestamp: timestamp
      }
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString(),
      message: "Failed to save registration"
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function (optional - run in Apps Script editor to test)
 */
function testDoPost() {
  const testData = {
    name: "Nguyễn Văn A",
    phone: "0912345678",
    age: "25",
    socialLink: "https://facebook.com/test",
    course: "HSK 1",
    currentLevel: "zero",
    specificLevel: "",
    purposes: ["travel", "work"],
    otherPurpose: "",
    skills: ["speaking"],
    goals: "Giao tiếp cơ bản",
    learningFormats: ["1on1", "online"],
    sessionsPerWeek: "3",
    previousExperience: "Chưa học bao giờ",
    source: "facebook",
    otherSource: "",
    additionalQuestions: "Có discount không?"
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}
