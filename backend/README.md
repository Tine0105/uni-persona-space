# Registration API Backend

## Setup Instructions

### 1. Create Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google Sheets API
4. Create a Service Account:
   - Go to "Credentials"
   - Click "Create Credentials" → Service Account
   - Fill in the details
   - Go to "Keys" tab → Add Key → JSON
   - Download the JSON file

### 2. Create Google Sheet

1. Create a new Google Sheet
2. Share it with the Service Account email
3. Get the Sheet ID from the URL: `docs.google.com/spreadsheets/d/{SHEET_ID}`
4. Create headers in first row:
   ```
   Timestamp | Name | Phone | Age | Social Link | Course | Current Level | Specific Level | Purposes | Other Purpose | Skills | Goals | Learning Formats | Sessions/Week | Previous Experience | Source | Other Source | Additional Questions
   ```

### 3. Setup Environment

Create `.env` file in backend folder:

```env
PORT=5000
GOOGLE_SPREADSHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_KEY=./google-service-key.json
```

### 4. Install Dependencies

```bash
cd backend
npm install
```

### 5. Add Service Account Key

Place your Google service account JSON file as `google-service-key.json` in backend folder

### 6. Run Server

```bash
# Development
npm run dev

# Production
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### POST /api/registrations
Submit a new registration

**Request Body:**
```json
{
  "name": "Nguyễn Văn A",
  "phone": "0912345678",
  "age": "25",
  "socialLink": "https://facebook.com/...",
  "course": "HSK 1",
  "currentLevel": "zero",
  "specificLevel": "",
  "purposes": ["travel", "work"],
  "otherPurpose": "",
  "skills": ["speaking"],
  "goals": "...",
  "learningFormats": ["1on1", "online"],
  "sessionsPerWeek": "3",
  "previousExperience": "...",
  "source": "facebook",
  "otherSource": "",
  "additionalQuestions": "..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration saved successfully",
  "data": {
    "name": "Nguyễn Văn A",
    "phone": "0912345678",
    "timestamp": "16/1/2026 10:30:45"
  }
}
```

### GET /api/registrations
Get all registrations (for admin)

**Response:**
```json
{
  "success": true,
  "count": 42,
  "data": [
    {
      "Timestamp": "16/1/2026 10:30:45",
      "Name": "Nguyễn Văn A",
      "Phone": "0912345678",
      ...
    }
  ]
}
```

### GET /health
Health check

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```
