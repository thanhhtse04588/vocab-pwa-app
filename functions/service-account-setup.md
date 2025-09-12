# Service Account Setup for Google Cloud TTS

## Bước 1: Tạo Service Account

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Chọn project của bạn
3. Vào **IAM & Admin > Service Accounts**
4. Click **Create Service Account**
5. Điền thông tin:
   - **Service account name**: `vocab-tts-service`
   - **Description**: `Service account for Text-to-Speech in Vocabulary PWA`
6. Click **Create and Continue**

## Bước 2: Gán quyền

1. Trong phần **Grant this service account access to project**
2. Chọn role: **Cloud Text-to-Speech API User**
3. Click **Continue**

## Bước 3: Tạo và tải xuống key

1. Click **Done**
2. Tìm service account vừa tạo trong danh sách
3. Click vào service account
4. Vào tab **Keys**
5. Click **Add Key > Create new key**
6. Chọn **JSON** format
7. Tải xuống file và đổi tên thành `service-account-key.json`
8. Đặt file này vào thư mục `functions/`

## Bước 4: Cấu hình cho Production

### GitHub Actions
1. Vào GitHub repository > Settings > Secrets and variables > Actions
2. Thêm các secrets sau:
   - `GOOGLE_CLOUD_PROJECT_ID`: Project ID của bạn
   - `GOOGLE_CLOUD_PRIVATE_KEY_ID`: private_key_id từ JSON
   - `GOOGLE_CLOUD_PRIVATE_KEY`: private_key từ JSON (bao gồm cả `-----BEGIN PRIVATE KEY-----` và `-----END PRIVATE KEY-----`)
   - `GOOGLE_CLOUD_CLIENT_EMAIL`: client_email từ JSON
   - `GOOGLE_CLOUD_CLIENT_ID`: client_id từ JSON

### Firebase Functions
Firebase Functions sẽ tự động sử dụng service account khi deploy.

## Bước 5: Deploy Functions

```bash
cd functions
npm run build
firebase deploy --only functions
```

## Lưu ý bảo mật

- **KHÔNG** commit file `service-account-key.json` lên GitHub
- File này đã được thêm vào `.gitignore`
- Sử dụng environment variables cho production
- Rotate service account keys định kỳ
