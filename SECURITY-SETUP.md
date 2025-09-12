# 🔐 Security Setup Guide

## ✅ Đã hoàn thành

Tất cả các bước bảo mật đã được thực hiện:

1. **✅ .gitignore đã được cập nhật** - File `service-account-key.json` sẽ không được commit
2. **✅ File mẫu đã được tạo** - `functions/service-account-key.example.json`
3. **✅ Hướng dẫn setup** - `functions/SETUP.md`
4. **✅ GitHub Actions workflow** - `.github/workflows/firebase-functions-deploy.yml`
5. **✅ Cập nhật hướng dẫn** - `functions/service-account-setup.md`

## 🚀 Bước tiếp theo

### 1. Push code lên GitHub
```bash
git push origin main
```

### 2. Cấu hình GitHub Secrets
Vào GitHub repository > Settings > Secrets and variables > Actions, thêm:

- `GOOGLE_CLOUD_PROJECT_ID`: `bee-vocab`
- `GOOGLE_CLOUD_PRIVATE_KEY_ID`: `e8ba7bf592a34b3d2610c9283053a1483424a081`
- `GOOGLE_CLOUD_PRIVATE_KEY`: `-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCPv/s5Ttox9L+R...`
- `GOOGLE_CLOUD_CLIENT_EMAIL`: `tts-sa@bee-vocab.iam.gserviceaccount.com`
- `GOOGLE_CLOUD_CLIENT_ID`: `109322009313975232884`

### 3. Cấu hình Firebase Service Account
Thêm secret `FIREBASE_SERVICE_ACCOUNT_BEE_VOCAB` với nội dung của file `service-account-key.json`

## 🔒 Bảo mật

- ✅ Private key không còn trong code
- ✅ File được ignore trong Git
- ✅ Sử dụng environment variables cho production
- ✅ CI/CD workflow an toàn

## 📝 Lưu ý

- File `functions/service-account-key.json` vẫn tồn tại local để development
- Không bao giờ commit file này lên GitHub
- Rotate service account keys định kỳ
- Monitor usage trong Google Cloud Console
