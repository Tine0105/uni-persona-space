# 📚 Documentation Index

Tất cả tài liệu về hệ thống đăng ký khóa học.

## 🚀 Getting Started

### 1️⃣ Start Here
**[`QUICK_START.md`](./QUICK_START.md)** (5 minutes)
- 3 cách setup
- Step-by-step guide
- Immediate results

### 2️⃣ Then Choose Your Path

#### Path A: Google Apps Script ⭐ (RECOMMENDED)
- ✅ Fastest setup
- ✅ Free
- ✅ No backend needed

**Next:** Follow [`QUICK_START.md`](./QUICK_START.md) - Cách 1

---

#### Path B: Node.js Backend
- ✅ More control
- ✅ Production-ready
- ⏱️ More setup time

**Next:** Follow [`GOOGLE_SHEETS_SETUP.md`](./GOOGLE_SHEETS_SETUP.md)

---

#### Path C: Zapier Integration
- ✅ No coding
- ✅ Many integrations
- 💰 Monthly cost

**Next:** Follow [`WEBHOOK_INTEGRATION.md`](./WEBHOOK_INTEGRATION.md)

---

## 📖 Full Documentation

### Overview & Architecture
- **[`README.md`](./README.md)** - Project overview & features
- **[`ARCHITECTURE.md`](./ARCHITECTURE.md)** - System design & flow diagrams
- **[`REGISTRATION_SYSTEM.md`](./REGISTRATION_SYSTEM.md)** - Complete system documentation

### Setup Guides
- **[`QUICK_START.md`](./QUICK_START.md)** - Quick setup (5 min)
- **[`GOOGLE_SHEETS_SETUP.md`](./GOOGLE_SHEETS_SETUP.md)** - Backend setup (15 min)
- **[`WEBHOOK_INTEGRATION.md`](./WEBHOOK_INTEGRATION.md)** - Alternative integrations
- **[`SETUP_SUMMARY.md`](./SETUP_SUMMARY.md)** - Setup overview

### Performance & Code
- **[`PERFORMANCE_OPTIMIZATION.md`](./PERFORMANCE_OPTIMIZATION.md)** - How we optimized
- **[`backend/README.md`](./backend/README.md)** - Backend API docs
- **[`backend/google-apps-script.js`](./backend/google-apps-script.js)** - Ready-to-use script

---

## 🎯 Common Scenarios

### "I want the fastest setup"
→ [`QUICK_START.md`](./QUICK_START.md) - Google Apps Script

### "I need production-ready backend"
→ [`GOOGLE_SHEETS_SETUP.md`](./GOOGLE_SHEETS_SETUP.md)

### "I don't want to code"
→ [`WEBHOOK_INTEGRATION.md`](./WEBHOOK_INTEGRATION.md) - Zapier

### "How does the system work?"
→ [`ARCHITECTURE.md`](./ARCHITECTURE.md)

### "Form is slow"
→ [`PERFORMANCE_OPTIMIZATION.md`](./PERFORMANCE_OPTIMIZATION.md)

### "API is giving errors"
→ [`backend/README.md`](./backend/README.md) - Troubleshooting

### "Where's the database?"
→ Google Sheets (automatic)

### "How to view registrations?"
1. Google Sheet directly (manual)
2. Admin dashboard (component provided)
3. Export CSV

---

## 📁 File Structure

```
Root Directory
├── 📄 README.md                      ← Start here (overview)
├── 📄 QUICK_START.md                 ← Choose this (5 min)
├── 📄 ARCHITECTURE.md                ← System design
├── 📄 GOOGLE_SHEETS_SETUP.md         ← Full backend guide
├── 📄 WEBHOOK_INTEGRATION.md         ← Alternative ways
├── 📄 SETUP_SUMMARY.md               ← Setup overview
├── 📄 REGISTRATION_SYSTEM.md         ← Full documentation
├── 📄 PERFORMANCE_OPTIMIZATION.md    ← How we optimized
│
├── 📁 backend/
│   ├── 📄 README.md                  ← API documentation
│   ├── 📄 server.js                  ← Express server
│   ├── 📄 google-apps-script.js      ← Copy-paste script
│   ├── 📄 package.json
│   ├── 📄 .env.example
│   └── 🔒 google-service-key.json   (not in repo)
│
└── 📁 src/
    └── 📁 components/
        ├── RegistrationModal.tsx     ← Form component
        └── RegistrationDashboard.tsx ← Admin view
```

---

## ⏱️ Time Estimates

| Setup | Time | Difficulty | Cost |
|------|------|-----------|------|
| Google Apps Script | 5 min | 🟢 Easy | Free |
| Node.js Backend | 15 min | 🟡 Medium | $5-10/mo |
| Zapier | 10 min | 🟢 Easy | $10-30/mo |

---

## ✅ Checklist by Setup Method

### Google Apps Script
- [ ] Create Google Sheet
- [ ] Open Apps Script
- [ ] Copy code from `backend/google-apps-script.js`
- [ ] Deploy as Web app
- [ ] Copy deployment URL
- [ ] Add to `.env.local`
- [ ] Run `npm run dev`
- [ ] Test form
- [ ] ✅ Done!

### Node.js Backend  
- [ ] Create Google Cloud project
- [ ] Enable Google Sheets API
- [ ] Create Service Account + JSON key
- [ ] Create Google Sheet
- [ ] Share Sheet with Service Account
- [ ] Setup `backend/.env`
- [ ] Setup `frontend/.env.local`
- [ ] Run backend: `cd backend && npm run dev`
- [ ] Run frontend: `npm run dev`
- [ ] Test form
- [ ] ✅ Done!

### Zapier
- [ ] Create Zapier account
- [ ] Create Zap with webhook trigger
- [ ] Setup Google Sheets action
- [ ] Copy webhook URL
- [ ] Add to `.env.local`
- [ ] Run `npm run dev`
- [ ] Test form
- [ ] ✅ Done!

---

## 🔍 Troubleshooting Guide

**Problem** | **Solution**
---------|----------
API URL not working | Check `.env.local` has correct URL
Data not in Sheet | Verify Service Account access
Form won't submit | Check browser console for errors
CORS error | Backend CORS enabled?
Permission denied | Share Sheet with service account

→ Full troubleshooting: [`QUICK_START.md`](./QUICK_START.md) (Lỗi Thường Gặp)

---

## 💡 Quick Tips

1. **Google Apps Script is fastest** - No backend needed
2. **Always use `.env` files** - Never hardcode URLs
3. **Test locally first** - Before deploying
4. **Export data regularly** - Backup your registrations
5. **Monitor Sheet size** - Google Sheets has limits

---

## 🎓 What You'll Learn

- Google Apps Script (if using method 1)
- Backend API development (if using method 2)
- Google Sheets API
- REST API basics
- Environment configuration
- Form validation & state management

---

## 🚀 Next Steps

1. **Pick a setup method** → See time estimate above
2. **Read the guide** → Follow step-by-step
3. **Test locally** → Make sure it works
4. **Deploy** → Share with users
5. **Monitor** → Check Google Sheet for data

---

## 📞 Need Help?

1. **Setup issues?** → [`QUICK_START.md`](./QUICK_START.md)
2. **Backend problems?** → [`backend/README.md`](./backend/README.md)
3. **Understand the system?** → [`ARCHITECTURE.md`](./ARCHITECTURE.md)
4. **Performance questions?** → [`PERFORMANCE_OPTIMIZATION.md`](./PERFORMANCE_OPTIMIZATION.md)

---

## 📊 Key Features

✅ **Automated Data Collection**
- Form submission → Auto-save to Google Sheet
- Timestamp added automatically
- All fields captured

✅ **Easy Admin Access**
- View all registrations in Google Sheet
- Search & filter capabilities
- Export to CSV
- Built-in sharing

✅ **Optimized Performance**
- 60-70% fewer re-renders
- Smooth form experience
- Fast submission

✅ **Flexible Deployment**
- Local development
- Cloud deployment
- Multiple integration options

---

## 🎉 Ready?

**→ Start with [`QUICK_START.md`](./QUICK_START.md)**

It's the fastest way to get up and running (5 minutes)!

---

**Happy coding!** 🚀

---

## 📝 Document Updates

- **Last Updated:** January 16, 2026
- **Version:** 1.0.0
- **Status:** Complete & Ready for Use

---

**Questions?** Everything is documented. Pick your scenario above and follow the guide!
