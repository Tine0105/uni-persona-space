# 🔗 Alternative: Webhook-Based Integration (No Backend Needed)

## 📌 Overview

Nếu không muốn setup backend riêng, bạn có thể sử dụng **Webhook Services** như:
- **Zapier** (Recommended)
- **Make** (formerly Integromat)
- **Google Apps Script** (Free, tích hợp sẵn)

---

## ✅ Option 1: Google Apps Script (Miễn Phí & Nhanh Nhất)

### Bước 1: Tạo Google Sheet

1. Vào [Google Sheets](https://sheets.google.com)
2. Tạo bảng tính mới: `Registration Submissions`
3. Thêm headers trong dòng đầu

### Bước 2: Tạo Google Apps Script

1. Vào **Extensions** → **Apps Script**
2. Copy code này:

```javascript
// Deploy as Web App: Deploy > New Deployment > Type: Web app

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Prepare row
    const timestamp = new Date().toLocaleString("vi-VN");
    const row = [
      timestamp,
      data.name,
      data.phone,
      data.age || "",
      data.socialLink || "",
      data.course || "",
      data.currentLevel || "",
      data.specificLevel || "",
      Array.isArray(data.purposes) ? data.purposes.join(", ") : data.purposes,
      data.otherPurpose || "",
      Array.isArray(data.skills) ? data.skills.join(", ") : data.skills,
      data.goals || "",
      Array.isArray(data.learningFormats) ? data.learningFormats.join(", ") : data.learningFormats,
      data.sessionsPerWeek || "",
      data.previousExperience || "",
      data.source || "",
      data.otherSource || "",
      data.additionalQuestions || ""
    ];
    
    // Append to sheet
    sheet.appendRow(row);
    
    // Return success
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Registration saved successfully"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Deploy** → **New Deployment**
4. Type: **Web app**
5. Execute as: Your email
6. Allow access to: Anyone
7. Click **Deploy**
8. **Copy the Web app URL** (Ví dụ: `https://script.google.com/macros/s/...`)

### Bước 3: Update Frontend

Edit `src/components/RegistrationModal.tsx`:

```typescript
// Update this line:
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/usercurrentapp";
const REGISTRATION_ENDPOINT = API_BASE_URL;
```

Or thêm vào `.env.local`:
```env
REACT_APP_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/usercurrentapp
```

### Bước 4: Update handleSubmit

Google Apps Script không cần field `email`. Response format hơi khác:

```typescript
const handleSubmit = useCallback(async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateStep(currentStep)) return;

  setIsSubmitting(true);

  try {
    const response = await fetch(REGISTRATION_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      setIsSuccess(true);
      toast.success("Đăng ký thành công! Chúng tôi sẽ liên hệ bạn sớm.");
      
      // Reset form...
    } else {
      throw new Error(result.error || "Unknown error");
    }
  } catch (error) {
    console.error("Form submission error:", error);
    toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
  } finally {
    setIsSubmitting(false);
  }
}, [formData, currentStep, validateStep, onClose]);
```

---

## 🔗 Option 2: Zapier Integration

### Bước 1: Thiết lập Webhook Zapier

1. Vào [Zapier](https://zapier.com)
2. Create new Zap
3. Trigger: **Webhooks by Zapier** → **Catch Raw Hook**
4. Copy webhook URL

### Bước 2: Create Google Sheets Action

1. Action App: **Google Sheets**
2. Action: **Create Spreadsheet Row**
3. Kết nối Google account
4. Chọn Spreadsheet và Sheet
5. Map fields từ webhook data

### Bước 3: Update Frontend

```typescript
const API_BASE_URL = process.env.REACT_APP_API_URL || "YOUR_ZAPIER_WEBHOOK_URL";
```

---

## 📊 So Sánh Các Cách

| Cách | Setup | Chi Phí | Độ Phức Tạp |
|-----|-------|---------|------------|
| **Backend Node.js** | Phải host riêng | $5-10/tháng | Trung bình |
| **Google Apps Script** | Miễn phí trong Google Sheet | Miễn phí | Dễ |
| **Zapier** | Connect qua UI | $10-30/tháng | Rất dễ |
| **Make** | Connect qua UI | $9-99/tháng | Rất dễ |

---

## ✨ Khuyến Nghị

- **Nhanh nhất**: Google Apps Script (5 phút)
- **Bảo mật nhất**: Backend Node.js
- **Linh hoạt nhất**: Zapier hoặc Make
- **Tiết kiệm**: Google Apps Script

---

## 🚀 Quick Start: Google Apps Script (Khuyến Nghị)

```bash
# 1. Tạo Google Sheet
# 2. Extensions → Apps Script
# 3. Copy code từ bên trên
# 4. Deploy → Web app
# 5. Copy URL
# 6. Thêm vào .env.local:
REACT_APP_API_URL=https://script.google.com/macros/s/YOUR_ID/usercurrentapp
# 7. npm run dev
# 8. Test!
```

Done! 🎉
