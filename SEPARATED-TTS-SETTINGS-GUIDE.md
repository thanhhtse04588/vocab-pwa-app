# Hướng dẫn Test TTS Settings được tách riêng

## ✅ Đã hoàn thành:

### 1. Tách thành 3 components riêng biệt:

#### **TTSSettingsCard.tsx** (Main Component)
- Chọn TTS Provider (Web Speech API hoặc Google Cloud TTS)
- Hiển thị thông tin về provider được chọn
- Render component cài đặt tương ứng

#### **WebSpeechTTSSettings.tsx** (Web Speech API Settings)
- Cài đặt riêng cho Web Speech API
- Voice selection từ browser voices
- Rate: 0.5x - 2.0x
- Pitch: 0.5 - 2.0
- Volume: 0% - 100%
- Test với Web Speech API

#### **GoogleCloudTTSSettings.tsx** (Google Cloud TTS Settings)
- Cài đặt riêng cho Google Cloud TTS
- Voice selection từ WaveNet voices
- Rate: 0.25x - 4.0x (wider range)
- Pitch: -20.0 to +20.0 semitones (wider range)
- Volume: 0% - 100%
- Test với Google Cloud TTS
- Error handling cho Firebase connection

## 🧪 Cách test:

### Bước 1: Mở ứng dụng
- Ứng dụng đang chạy tại: http://localhost:5173
- Vào Settings → TTS Settings

### Bước 2: Test Web Speech API
1. **Chọn Provider**: "Web Speech API (Browser)"
2. **Kiểm tra UI**: Hiển thị WebSpeechTTSSettings component
3. **Test các cài đặt**:
   - Language: Chọn ngôn ngữ
   - Voice: Chọn từ browser voices
   - Rate: 0.5x - 2.0x
   - Pitch: 0.5 - 2.0
   - Volume: 0% - 100%
4. **Test voice**: Click "Test Web Speech Voice"

### Bước 3: Test Google Cloud TTS
1. **Chọn Provider**: "Google Cloud TTS (WaveNet) via Firebase"
2. **Kiểm tra UI**: Hiển thị GoogleCloudTTSSettings component
3. **Test các cài đặt**:
   - Language: Chọn ngôn ngữ
   - Voice: Chọn từ WaveNet voices
   - Rate: 0.25x - 4.0x (wider range)
   - Pitch: -20.0 to +20.0 semitones (wider range)
   - Volume: 0% - 100%
4. **Test voice**: Click "Test Google Cloud TTS"

### Bước 4: Test chuyển đổi Provider
1. **Chọn Web Speech API** → Xem WebSpeechTTSSettings
2. **Chọn Google Cloud TTS** → Xem GoogleCloudTTSSettings
3. **Chuyển đổi qua lại** → UI thay đổi tương ứng

## 🔍 Expected Behavior:

### Web Speech API Settings:
- ✅ Hiển thị "Web Speech API Settings" title
- ✅ Voice dropdown chỉ có browser voices
- ✅ Rate range: 0.5x - 2.0x
- ✅ Pitch range: 0.5 - 2.0
- ✅ Test button: "Test Web Speech Voice"
- ✅ Info alert: "Web Speech API"

### Google Cloud TTS Settings:
- ✅ Hiển thị "Google Cloud TTS Settings" title
- ✅ Voice dropdown chỉ có WaveNet voices
- ✅ Rate range: 0.25x - 4.0x với description
- ✅ Pitch range: -20.0 to +20.0 với description
- ✅ Test button: "Test Google Cloud TTS"
- ✅ Info alert: "Google Cloud TTS via Firebase"
- ✅ Error handling nếu Firebase không available

### Provider Switching:
- ✅ Khi chọn provider, UI thay đổi ngay lập tức
- ✅ Mỗi provider có cài đặt riêng biệt
- ✅ Settings được lưu riêng cho từng provider

## 🐛 Troubleshooting:

### Nếu Google Cloud TTS không hoạt động:
1. **Kiểm tra Firebase Functions**: Đảm bảo đã deploy
2. **Kiểm tra Service Account**: File `service-account-key.json` có trong `functions/`
3. **Kiểm tra Console**: Xem error messages
4. **Kiểm tra Network**: Đảm bảo có internet connection

### Nếu Web Speech API không hoạt động:
1. **Kiểm tra Browser Support**: Một số browser không support
2. **Kiểm tra Console**: Xem error messages
3. **Thử browser khác**: Chrome, Firefox, Safari

## 📊 Test Results:

| Test Case | Expected | Actual | Status |
|-----------|----------|--------|---------|
| Web Speech API UI | Shows WebSpeechTTSSettings | ? | ⏳ |
| Google Cloud TTS UI | Shows GoogleCloudTTSSettings | ? | ⏳ |
| Provider Switching | UI changes immediately | ? | ⏳ |
| Web Speech Test | Plays audio | ? | ⏳ |
| Google Cloud Test | Plays audio | ? | ⏳ |
| Error Handling | Shows error messages | ? | ⏳ |

## 🎯 Benefits của cấu trúc mới:

1. **Separation of Concerns**: Mỗi provider có component riêng
2. **Better UX**: Cài đặt phù hợp với từng provider
3. **Easier Maintenance**: Dễ maintain và update
4. **Better Error Handling**: Error handling riêng cho từng provider
5. **Cleaner Code**: Code dễ đọc và hiểu hơn
