# ⚡ QUICK START - 5 Phút Setup

## ✨ Chọn 1 trong 3 cách

---

## 🌟 CÁCH 1: Google Apps Script (BEST - Miễn phí, Dễ nhất)

### Step 1: Tạo Google Sheet
```
docs.google.com → New spreadsheet
Name: "Registration Submissions"
```

### Step 2: Apps Script
1. Trong Google Sheet → **Extensions** → **Apps Script**
2. Xóa code hiện có
3. Copy từ file: `backend/google-apps-script.js`
4. **Save**
5. **Deploy** → **New Deployment**
   - Type: **Web app**
   - Execute as: **Your email**
   - Allow access: **Anyone**
   - **Deploy**
6. **Copy the URL** (như: `https://script.google.com/macros/s/AKfycbx...`)

### Step 3: Frontend Setup
```bash
# 1. Tạo .env.local
cp .env.example .env.local

# 2. Edit .env.local - thêm:
REACT_APP_API_URL=https://script.google.com/macros/s/AKfycbx.../usercurrentapp

# 3. Run
npm run dev
```

### Step 4: Test!
1. Mở browser: `http://localhost:5000`
2. Click "Đăng ký học"
3. Điền form
4. **Submit**
5. ✅ Kiểm tra Google Sheet - dữ liệu sẽ hiện!

---

## 💻 CÁCH 2: Backend Node.js (Professional)

### Step 1: Setup
```bash
# Terminal 1 - Backend
cd backend
npm install

# Copy env file
cp .env.example .env
```

### Step 2: Google Cloud Setup
1. [Google Cloud Console](https://console.cloud.google.com)
2. Create Project
3. Search: **Google Sheets API** → Enable
4. **Credentials** → **Create Credentials** → **Service Account**
5. Create key → **JSON**
6. Download & rename: `google-service-key.json`
7. Copy vào `backend/` folder

### Step 3: Edit backend/.env
```env
PORT=5000
GOOGLE_SPREADSHEET_ID=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
GOOGLE_SERVICE_ACCOUNT_KEY=./google-service-key.json
```

**Lấy Spreadsheet ID từ URL:**
```
docs.google.com/spreadsheets/d/{SHEET_ID}/edit
```

### Step 4: Share Sheet
1. Copy email từ JSON file: `client_email`
2. Mở Google Sheet → **Share**
3. Paste email → **Editor** → **Share**

### Step 5: Run
```bash
# Terminal 1
cd backend && npm run dev
# Should see: ✅ Google Sheets API initialized

# Terminal 2
npm run dev
```

---

## 🔗 CÁCH 3: Zapier (Easy, Expensive)

### Step 1: Zapier Setup
1. [Zapier.com](https://zapier.com) → Create Zap
2. **Trigger:** Webhooks → **Catch Raw Hook**
3. **Copy webhook URL**

### Step 2: Frontend
```bash
# .env.local
REACT_APP_API_URL=https://hooks.zapier.com/hooks/catch/...
```

### Step 3: Zapier Action
1. **Action:** Google Sheets → **Create Spreadsheet Row**
2. Connect Google account
3. Pick Spreadsheet & Sheet
4. Map fields from webhook

---

## 🧪 Test

```bash
npm run dev
# Open: http://localhost:3000
# Click "Đăng ký học"
# Fill form
# Submit
# ✅ Check Google Sheet
```

---

## ✅ Checklist

- [ ] Chọn cách setup
- [ ] Setup xong
- [ ] Backend chạy (nếu chọn cách 2)
- [ ] .env.local/env đúng
- [ ] Test form
- [ ] Dữ liệu xuất hiện trong Google Sheet

---

## 📊 Kết Quả

### Google Sheet
Sẽ thấy dữ liệu như thế này:

| Timestamp | Name | Phone | Age | Course | Level | ...
|-----------|------|-------|-----|--------|-------|---
| 16/1/26 | Nguyễn A | 0912... | 25 | HSK 1 | zero | ...

---

## 🚨 Lỗi Thường Gặp

### "REACT_APP_API_URL là gì?"
- Chứa URL của backend/webhook
- Nếu không set, dùng default: `http://localhost:5000`

### "Sheet ID ở đâu?"
- URL của Google Sheet:
  ```
  docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit
                                 ↑ THIS ↑
  ```

### "Permission denied"
- Kiểm tra Sheet được share chưa?
- Service account email có trong Share không?

### "CORS error"
- Kiểm tra backend CORS enabled
- Check REACT_APP_API_URL không có typo

---

## 📚 Hướng Dẫn Chi Tiết

- Google Apps Script: Xem [`GOOGLE_SHEETS_SETUP.md`](./GOOGLE_SHEETS_SETUP.md) (Step 5-7)
- Backend Node.js: Xem [`GOOGLE_SHEETS_SETUP.md`](./GOOGLE_SHEETS_SETUP.md)
- Alternative ways: Xem [`WEBHOOK_INTEGRATION.md`](./WEBHOOK_INTEGRATION.md)
- Performance: Xem [`PERFORMANCE_OPTIMIZATION.md`](./PERFORMANCE_OPTIMIZATION.md)

---

## 🎉 Done!

Form của bạn tự động save vào Google Sheet!

Bước tiếp theo: Deploy & chia sẻ website 🚀
