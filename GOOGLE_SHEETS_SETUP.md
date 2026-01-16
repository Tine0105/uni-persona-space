# 📋 Hướng Dẫn Thiết Lập Google Sheets Integration

## 🎯 Mục Tiêu
Khi người dùng submit form đăng ký, dữ liệu sẽ **tự động được lưu vào Google Sheets** để bạn có thể dễ dàng quản lý và kiểm tra.

## 📊 Kiến Trúc Hệ Thống

```
Frontend (React)
    ↓
    ↓ POST /api/registrations
    ↓
Backend (Node.js/Express)
    ↓
    ↓ Append Rows
    ↓
Google Sheets API
    ↓
    ↓
Google Sheets (Excel)
```

---

## 🚀 Step-by-Step Setup

### Step 1: Tạo Google Cloud Project

1. Truy cập [Google Cloud Console](https://console.cloud.google.com)
2. Click **"Select a Project"** → **"New Project"**
3. Tên project: `uni-persona-registration` (hoặc tên khác)
4. Click **Create**

### Step 2: Enable Google Sheets API

1. Tìm **Google Sheets API** trong search bar
2. Click vào nó
3. Click **ENABLE**

### Step 3: Tạo Service Account

1. Vào **Credentials** (trên menu bên trái)
2. Click **"+ Create Credentials"** → **"Service Account"**
3. Điền thông tin:
   - Service account name: `registration-app`
   - Click **Create and Continue**
4. Skip optional steps, click **Done**

### Step 4: Tạo và Download JSON Key

1. Click vào Service Account vừa tạo
2. Vào tab **Keys**
3. Click **"Add Key"** → **"Create new key"**
4. Chọn **JSON**
5. Click **Create** → File `.json` sẽ download
6. **Rename** file thành `google-service-key.json`

### Step 5: Tạo Google Sheet

1. Vào [Google Sheets](https://sheets.google.com)
2. Click **Tạo bảng tính mới**
3. Tên: `Registration Submissions` (hoặc tên khác)
4. **Sao chép ID của Sheet** từ URL:
   ```
   docs.google.com/spreadsheets/d/{SHEET_ID}/edit
   ```

### Step 6: Chia Sẻ Google Sheet Với Service Account

1. Mở file JSON vừa download
2. Tìm email này: `service-account-email@project-id.iam.gserviceaccount.com`
3. Quay lại Google Sheet → Click **Share**
4. Paste email vào → **Editor** → **Share**

### Step 7: Thêm Headers Vào Sheet

Thêm dòng header đầu tiên vào Google Sheet:

| Timestamp | Name | Phone | Age | Social Link | Course | Current Level | Specific Level | Purposes | Other Purpose | Skills | Goals | Learning Formats | Sessions/Week | Previous Experience | Source | Other Source | Additional Questions |
|-----------|------|-------|-----|-------------|--------|----------------|----------------|----------|----------------|--------|-------|------------------|-----------------|----------------------|--------|--------------|----------------------|

### Step 8: Setup Backend

```bash
# 1. Navigate to backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Copy .env.example to .env
cp .env.example .env

# 4. Edit .env file
nano .env
```

**Nội dung .env:**
```env
PORT=5000
GOOGLE_SPREADSHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_KEY=./google-service-key.json
```

**Paste Sheet ID vào:**
```env
GOOGLE_SPREADSHEET_ID=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
```

5. **Copy file `google-service-key.json`** vào folder `backend/`

### Step 9: Setup Frontend

```bash
# 1. Navigate to project root
cd ..

# 2. Copy .env.example to .env.local
cp .env.example .env.local

# 3. Edit .env.local
nano .env.local
```

**Nội dung .env.local** (cho development):
```env
REACT_APP_API_URL=http://localhost:5000
```

**Production URL** (nếu deploy):
```env
REACT_APP_API_URL=https://your-api-domain.com
```

### Step 10: Test Setup

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```

Bạn sẽ thấy:
```
🚀 Server running on http://localhost:5000
✅ Google Sheets API initialized
```

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```

**Test:**
1. Mở website
2. Click "Đăng ký học"
3. Điền form
4. Submit
5. ✅ Kiểm tra Google Sheet - dữ liệu sẽ xuất hiện!

---

## 🔍 Kiểm Tra Lỗi

### Lỗi: "Cannot find module 'google-service-key.json'"
**Giải pháp:** Kiểm tra file `google-service-key.json` có trong folder `backend/` không

### Lỗi: "Sheets API not enabled"
**Giải pháp:** Vào Google Cloud Console → Enable Google Sheets API

### Lỗi: "Permission denied"
**Giải pháp:** Kiểm tra Google Sheet được share với Service Account email chưa

### Lỗi: "CORS error" (frontend)
**Giải pháp:** Trong `backend/server.js`, cors đã được enable mặc định

---

## 📊 Xem Dữ Liệu

Mỗi khi ai đó submit form, một dòng mới sẽ được thêm vào Google Sheet:

| Timestamp | Name | Phone | ... |
|-----------|------|-------|-----|
| 16/1/2026 10:30:45 | Nguyễn Văn A | 0912345678 | ... |
| 16/1/2026 11:15:20 | Trần Thị B | 0987654321 | ... |

---

## 🎨 Tính Năng Thêm

### API Endpoints Có Sẵn

#### GET `/health`
Kiểm tra server có chạy không
```bash
curl http://localhost:5000/health
```

#### GET `/api/registrations`
Lấy tất cả đơn đăng ký (dùng cho admin dashboard)
```bash
curl http://localhost:5000/api/registrations
```

---

## 🚀 Deployment

### Deploy Backend (Recommended: Railway, Render, hoặc Heroku)

**Railway.app (Dễ nhất):**
1. Push code lên GitHub
2. Vào [Railway](https://railway.app)
3. Connect GitHub repo
4. Add plugin: PostgreSQL (nếu cần)
5. Add environment variables từ `.env`
6. Deploy!

### Deploy Frontend (Recommended: Vercel)

1. Push code lên GitHub
2. Vào [Vercel](https://vercel.com)
3. Import project
4. Add environment variables:
   ```
   REACT_APP_API_URL=https://your-api-domain.railway.app
   ```
5. Deploy!

---

## 🔐 Bảo Mật

✅ **Tốt:**
- Service account key được bảo mật (không commit vào git)
- API URL có thể được cấu hình
- CORS được enable chỉ khi cần thiết

⚠️ **Cân nhắc:**
- Giữ file `.json` an toàn
- Không share service account key công khai
- Thêm rate limiting nếu cần

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra logs trong terminal (Backend)
2. Mở DevTools → Console (Frontend)
3. Kiểm tra `.env` files đã đúng không
4. Kiểm tra Google Sheet permissions

---

## ✨ Bạn đã sẵn sàng!

Form đăng ký của bạn giờ đây tự động lưu dữ liệu vào Google Sheets! 🎉
