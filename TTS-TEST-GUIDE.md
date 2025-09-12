# Hướng dẫn Test Cloud Text-to-Speech API

## ✅ Đã hoàn thành:
1. **Tạo Service Account**: `tts-sa@bee-vocab.iam.gserviceaccount.com`
2. **Gán quyền**: Editor role (có thể gọi TTS API)
3. **Tạo key JSON**: `functions/service-account-key.json`
4. **Deploy Firebase Functions**: 
   - `synthesizeSpeech` (us-central1)
   - `getAvailableVoices` (us-central1)

## 🧪 Cách test TTS:

### Bước 1: Mở ứng dụng
- Ứng dụng đang chạy tại: http://localhost:5173
- Đăng nhập với Google account

### Bước 2: Vào Settings
- Click vào Settings trong navigation
- Tìm section "TTS Settings" hoặc "Firebase TTS Test Component"

### Bước 3: Test TTS
1. **Chọn TTS Provider**: Chọn "Firebase TTS" thay vì "Web Speech API"
2. **Test Text**: Nhập text muốn test (ví dụ: "Hello, this is a test of Firebase TTS")
3. **Chọn Voice**: Chọn giọng nói từ danh sách WaveNet voices
4. **Click "Test Firebase TTS"**: Nghe kết quả

### Bước 4: Kiểm tra Console
- Mở Developer Tools (F12)
- Xem Console để kiểm tra logs
- Nếu có lỗi, sẽ hiển thị trong console

## 🔧 Troubleshooting:

### Nếu TTS không hoạt động:
1. **Kiểm tra Firebase Functions**:
   - Vào Firebase Console > Functions
   - Xem logs của functions `synthesizeSpeech` và `getAvailableVoices`

2. **Kiểm tra Service Account**:
   - Đảm bảo file `service-account-key.json` có trong `functions/`
   - Kiểm tra quyền của service account

3. **Kiểm tra API**:
   - Vào Google Cloud Console > APIs & Services
   - Đảm bảo "Cloud Text-to-Speech API" đã được enable

### Nếu có lỗi authentication:
- Kiểm tra Firebase project ID trong environment variables
- Đảm bảo service account có quyền truy cập project

## 📊 Expected Results:
- ✅ Có thể load danh sách voices từ Firebase function
- ✅ Có thể synthesize speech và phát audio
- ✅ Audio quality cao hơn Web Speech API
- ✅ Hỗ trợ nhiều ngôn ngữ và giọng nói

## 🎯 Next Steps:
1. Test với các ngôn ngữ khác nhau
2. Cấu hình TTS settings trong app
3. Tích hợp TTS vào study session
4. Deploy lên production
