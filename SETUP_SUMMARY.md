# 🎉 Google Sheets Auto-Save Setup Complete!

Hệ thống của bạn giờ đây **tự động lưu dữ liệu đăng ký vào Google Sheets**!

---

## 🚀 3 Cách Để Setup

### ⭐ Cách 1: Google Apps Script (KHUYẾN NGHỊ - Nhanh nhất, Miễn phí)

**Thời gian:** ~5 phút | **Chi phí:** Miễn phí | **Độ phức tạp:** Dễ

**Bước:**
1. Tạo Google Sheet: `Registration Submissions`
2. **Extensions** → **Apps Script**
3. Xóa code mặc định
4. Paste code từ file: `backend/google-apps-script.js`
5. **Save**
6. **Deploy** → **New Deployment** → **Web app** → **Deploy**
7. Copy URL (ví dụ: `https://script.google.com/macros/s/...`)
8. Thêm vào `.env.local`:
   ```env
   REACT_APP_API_URL=https://script.google.com/macros/s/YOUR_ID/usercurrentapp
   ```
9. Chạy: `npm run dev`
10. ✅ Test form - Dữ liệu sẽ hiện trong Google Sheet!

---

### 💻 Cách 2: Backend Node.js (Bảo mật cao, Dễ quản lý)

**Thời gian:** ~15 phút | **Chi phí:** $5-10/tháng | **Độ phức tạp:** Trung bình

**Bước:**
1. Xem chi tiết: [`GOOGLE_SHEETS_SETUP.md`](./GOOGLE_SHEETS_SETUP.md)
2. Tóm tắt:
   - Tạo Google Cloud Project
   - Enable Google Sheets API
   - Tạo Service Account + JSON key
   - Setup backend (Node.js/Express)
   - Connect với Google Sheet

---

### 🔗 Cách 3: Zapier/Make (Rất dễ, Không cần code)

**Thời gian:** ~10 phút | **Chi phí:** $10-30/tháng | **Độ phức tạp:** Rất dễ

**Bước:**
1. Xem chi tiết: [`WEBHOOK_INTEGRATION.md`](./WEBHOOK_INTEGRATION.md)
2. Tóm tắt:
   - Zapier webhook trigger
   - Google Sheets action
   - Map fields
   - Done!

---

## 📊 Kết Quả

### Trước
```
User submit form → Dữ liệu biến mất 😢
```

### Sau
```
User submit form → Backend API → Google Sheets → Bạn check được! 🎉
```

---

## ✨ Tính Năng Mới

✅ **Tự động lưu dữ liệu** vào Google Sheets
✅ **Timestamp** tự động
✅ **Dễ kiểm tra** - dữ liệu ở trong Google Sheets
✅ **Export CSV** - download dữ liệu bất cứ lúc nào
✅ **Search & Filter** - tìm kiếm người dùng

---

## 📱 Cách Xem Dữ Liệu

### Option 1: Google Sheet
1. Mở Google Sheet
2. Xem dữ liệu trực tiếp
3. Sort, filter, format như bình thường

### Option 2: Admin Dashboard
Tôi đã tạo một dashboard để xem dữ liệu:
```typescript
// Import component
import RegistrationDashboard from "@/components/RegistrationDashboard";

// Sử dụng
<RegistrationDashboard />
```

Features:
- Xem tất cả registrations
- Search by name, phone, etc.
- Filter by columns
- Export to CSV
- Refresh data

---

## 🛠️ Hệ Thống Files

```
uni-persona-space/
├── backend/
│   ├── server.js                 (Node.js API server)
│   ├── package.json
│   ├── .env.example
│   ├── google-service-key.json   (Bảo mật - không commit!)
│   └── README.md
├── src/
│   ├── components/
│   │   ├── RegistrationModal.tsx (Updated - gửi đến API)
│   │   └── RegistrationDashboard.tsx (Mới - view dữ liệu)
│   └── ...
├── .env.local                    (Biến môi trường)
├── GOOGLE_SHEETS_SETUP.md        (Hướng dẫn chi tiết)
├── WEBHOOK_INTEGRATION.md        (Cách khác không cần backend)
└── README.md
```

---

## 🎯 Quy Trình Hoàn Chỉnh

```
1. User truy cập website
   ↓
2. Click "Đăng ký học"
   ↓
3. Điền form (4 bước)
   ↓
4. Click "Gửi đăng ký"
   ↓
5. Frontend gửi POST request đến API
   ↓
6. API nhận dữ liệu
   ↓
7. API gửi append request đến Google Sheets
   ↓
8. Google Sheet cập nhật dữ liệu mới
   ↓
9. User thấy "Đăng ký thành công!"
   ↓
10. Bạn thấy dữ liệu trong Google Sheet! 🎉
```

---

## 📞 Troubleshooting

### "Form submit không work"
- Kiểm tra: `REACT_APP_API_URL` trong `.env.local` có đúng không?
- DevTools → Network tab → Xem request
- Check backend logs

### "Data không hiện trong Google Sheet"
- Kiểm tra: Service Account được share vào Sheet không?
- Kiểm tra: Google Apps Script deployed chưa?
- Kiểm tra: Sheet ID có đúng không?

### "API error"
- Kiểm tra: Backend có chạy không? (`npm run dev` in terminal)
- Kiểm tra: CORS enabled?
- Kiểm tra: Environment variables đúng?

---

## 🚀 Next Steps

1. **Chọn cách setup** (Recommend: Google Apps Script)
2. **Follow hướng dẫn chi tiết** (GOOGLE_SHEETS_SETUP.md)
3. **Test form**
4. **Check Google Sheet**
5. **Deploy lên production**

---

## 🎓 Kiến Thức Thêm

- **Google Sheets API**: Ghi dữ liệu vào Google Sheet
- **Google Apps Script**: Run code trong Google Sheets
- **REST API**: Frontend ↔ Backend communication
- **CORS**: Cross-Origin Resource Sharing
- **Environment Variables**: Cấu hình an toàn

---

## ✅ Bạn đã sẵn sàng!

Form đăng ký của bạn giờ đây **tự động lưu dữ liệu vào Google Sheets**!

**Tiếp theo:** Xem [`GOOGLE_SHEETS_SETUP.md`](./GOOGLE_SHEETS_SETUP.md) để setup chi tiết.

Happy coding! 🚀

---

**Questions?** Check:
- [`GOOGLE_SHEETS_SETUP.md`](./GOOGLE_SHEETS_SETUP.md) - Backend API setup
- [`WEBHOOK_INTEGRATION.md`](./WEBHOOK_INTEGRATION.md) - Alternative ways
- [`backend/README.md`](./backend/README.md) - API documentation
