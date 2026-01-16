# 🎓 Uni Persona - Registration System Setup

## 📋 Mục Lục
1. [Tổng Quan](#tổng-quan)
2. [Cách Setup](#cách-setup)
3. [Tính Năng](#tính-năng)
4. [Troubleshooting](#troubleshooting)

---

## 🎯 Tổng Quan

Hệ thống đăng ký khóa học với **tự động lưu dữ liệu vào Google Sheets**.

### Quy Trình
```
User → Form → Backend API → Google Sheets → Admin Check
```

### Được Cải Thiện
✅ Performance tối ưu (60-70% re-render giảm)
✅ Tự động lưu dữ liệu
✅ Admin dashboard để xem đơn
✅ Export CSV
✅ Search & Filter

---

## 🚀 Cách Setup (Chọn 1 trong 3)

### ⭐ **CÁCH 1: Google Apps Script (KHUYẾN NGHỊ)**
**Thời gian:** 5-10 phút | **Chi phí:** Miễn phí | **Độ phức tạp:** ⭐ Dễ

```bash
# 1. Tạo Google Sheet
# (docs.google.com/spreadsheets)

# 2. Mở Apps Script
# Extensions → Apps Script

# 3. Copy-paste code từ file:
# backend/google-apps-script.js

# 4. Deploy → New Deployment → Web app

# 5. Copy URL → .env.local
REACT_APP_API_URL=https://script.google.com/macros/s/{ID}/usercurrentapp

# 6. Done!
npm run dev
```

**Chi tiết:** Xem [`GOOGLE_SHEETS_SETUP.md`](./GOOGLE_SHEETS_SETUP.md) - Step 5-7

---

### 💻 **CÁCH 2: Backend Node.js**
**Thời gian:** 15-20 phút | **Chi phí:** $5-10/tháng | **Độ phức tạp:** ⭐⭐ Trung bình

```bash
# 1. Tạo Google Cloud Project
# (console.cloud.google.com)

# 2. Enable Google Sheets API

# 3. Tạo Service Account → Download JSON key

# 4. Tạo Google Sheet + Share với Service Account

# 5. Setup Backend
cd backend
npm install
cp .env.example .env
# Edit .env với Sheet ID và key path

# 6. Setup Frontend
cd ..
cp .env.example .env.local
# REACT_APP_API_URL=http://localhost:5000

# 7. Run
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
npm run dev
```

**Chi tiết:** Xem [`GOOGLE_SHEETS_SETUP.md`](./GOOGLE_SHEETS_SETUP.md) (đầy đủ)

---

### 🔗 **CÁCH 3: Zapier/Make**
**Thời gian:** 10-15 phút | **Chi phí:** $10-30/tháng | **Độ phức tạp:** ⭐ Dễ

```bash
# 1. Zapier.com → Create Zap

# 2. Trigger: Webhooks by Zapier → Catch Raw Hook

# 3. Copy webhook URL

# 4. .env.local
REACT_APP_API_URL={ZAPIER_WEBHOOK_URL}

# 5. Done!
npm run dev
```

**Chi tiết:** Xem [`WEBHOOK_INTEGRATION.md`](./WEBHOOK_INTEGRATION.md)

---

## ✨ Tính Năng

### Form Đăng Ký
- ✅ 4 bước (Personal → Learning → Class → Questions)
- ✅ Validation bước-từng-bước
- ✅ Beautiful UI với animations
- ✅ Mobile responsive

### Auto-Save
- ✅ Tự động gửi dữ liệu khi submit
- ✅ Timestamp tự động
- ✅ Error handling

### Admin Dashboard
- ✅ Xem tất cả đơn đăng ký
- ✅ Search & Filter
- ✅ Export CSV
- ✅ Real-time stats

### Google Sheets
- ✅ Dữ liệu tổ chức rõ ràng
- ✅ Easy to share
- ✅ Built-in sorting/filtering

---

## 📱 Cách Sử Dụng

### Cho User
1. Truy cập website
2. Click "Đăng ký học"
3. Điền 4 bước form
4. Submit → ✅ Success message

### Cho Admin
**Option 1: Google Sheet**
- Mở Google Sheet
- Xem dữ liệu trực tiếp

**Option 2: Dashboard**
```typescript
// Thêm route mới
import RegistrationDashboard from "@/components/RegistrationDashboard";

<Route path="/admin/registrations" element={<RegistrationDashboard />} />
```

---

## 🛠️ File Structure

```
.
├── backend/
│   ├── server.js                    # Express API
│   ├── google-apps-script.js        # Apps Script code
│   ├── package.json
│   ├── .env.example
│   └── README.md
├── src/
│   ├── components/
│   │   ├── RegistrationModal.tsx     # Form (Updated)
│   │   └── RegistrationDashboard.tsx # Admin view
│   └── pages/
├── .env.example
├── .env.local                       # Tạo từ .env.example
├── SETUP_SUMMARY.md                 # Quick start
├── GOOGLE_SHEETS_SETUP.md           # Backend setup
├── WEBHOOK_INTEGRATION.md           # Alternative setups
└── README.md
```

---

## 🔧 Commands

### Frontend
```bash
npm run dev      # Development
npm run build    # Build production
npm run preview  # Preview build
npm run lint     # Check errors
```

### Backend
```bash
cd backend
npm run dev      # Development with watch
npm start        # Production
```

---

## 🚨 Troubleshooting

### Problem: "Form submit error"
**Solution:**
1. Check `.env.local` - `REACT_APP_API_URL` correct?
2. DevTools → Network tab → Check request
3. Backend logs - server running?

### Problem: "Data không hiện trong Google Sheet"
**Solution:**
1. Service Account shared vào Sheet?
2. Sheet ID đúng không?
3. Apps Script deployed?
4. Check server logs

### Problem: "Cannot find google-service-key.json"
**Solution:**
1. File phải trong `backend/` folder
2. Path trong `.env` đúng không?

### Problem: "CORS error"
**Solution:**
- Backend `cors()` đã enabled
- Check `REACT_APP_API_URL` không có typo

---

## 📊 Dữ Liệu Format

### Lưu trong Google Sheets
```
Timestamp | Name | Phone | Age | Social Link | Course | ... 
16/1/2026 | Nguyễn | 091... | 25  | facebook  | HSK 1  | ...
```

### API Response
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

---

## 🔐 Bảo Mật

✅ **Tốt:**
- Service account key không commit vào git
- Environment variables riêng biệt
- CORS configured

⚠️ **Cần chú ý:**
- Keep `.json` key an toàn
- Không share public
- Rate limiting for production

---

## 🎓 Technologies Used

- **Frontend:** React, TypeScript, Shadcn/ui, Framer Motion
- **Backend:** Node.js, Express, Google Sheets API
- **Database:** Google Sheets (Cloud Database)
- **Deployment:** Railway, Vercel, Google Apps Script

---

## 📞 Support

1. **Setup không work?** → [`SETUP_SUMMARY.md`](./SETUP_SUMMARY.md)
2. **Backend API?** → [`backend/README.md`](./backend/README.md)
3. **Alternative setups?** → [`WEBHOOK_INTEGRATION.md`](./WEBHOOK_INTEGRATION.md)
4. **Performance?** → [`PERFORMANCE_OPTIMIZATION.md`](./PERFORMANCE_OPTIMIZATION.md)

---

## ✅ Checklist

- [ ] Chọn cách setup
- [ ] Follow setup guide
- [ ] Test form locally
- [ ] Check dữ liệu trong Google Sheet
- [ ] Deploy frontend
- [ ] Deploy backend (nếu chọn cách 2)
- [ ] Test trên production
- [ ] Setup admin dashboard (optional)

---

## 🎉 Done!

Hệ thống đăng ký của bạn giờ đây **tự động lưu dữ liệu vào Google Sheets**!

**Tiếp theo:**
1. Pick setup method
2. Follow the guide
3. Test
4. Deploy

**Happy coding!** 🚀

---

## 📝 Notes

- Performance đã được optimize (xem [`PERFORMANCE_OPTIMIZATION.md`](./PERFORMANCE_OPTIMIZATION.md))
- Form có 4 bước, validation mỗi bước
- Responsive design cho mobile
- Dark mode support

---

## 📚 References

- [Google Sheets API Docs](https://developers.google.com/sheets/api)
- [Google Apps Script Docs](https://developers.google.com/apps-script)
- [Express.js Docs](https://expressjs.com)
- [React Docs](https://react.dev)

---

**Version:** 1.0.0 | **Last Updated:** January 16, 2026
