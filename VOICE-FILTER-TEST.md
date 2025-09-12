# Test Voice Filtering by TTS Provider

## ✅ Đã cập nhật:

### 1. TTSSettingsCard.tsx
- **Filter voices theo provider**: Khi chọn provider, chỉ hiển thị voices tương ứng
- **Reset voice khi đổi provider**: Tự động reset voice selection khi chuyển provider
- **Load voices theo provider**: Gọi `audioService.getAvailableVoices(provider)` với provider cụ thể

### 2. audioService.ts
- **Cập nhật getAvailableVoices()**: Nhận parameter `provider` để load voices cho provider cụ thể
- **Provider-specific voice loading**: 
  - `google-cloud`: Load từ Firebase TTS service
  - `web-speech`: Load từ browser SpeechSynthesis API

## 🧪 Cách test:

### Bước 1: Mở ứng dụng
- Ứng dụng đang chạy tại: http://localhost:5173
- Vào Settings → TTS Settings

### Bước 2: Test Web Speech API
1. **Chọn Provider**: "Web Speech API (Browser)"
2. **Chọn Language**: "English (US)"
3. **Kiểm tra Voice dropdown**: Chỉ hiển thị browser voices (không có Wavenet/Neural)
4. **Test voice**: Click "Test Voice"

### Bước 3: Test Google Cloud TTS
1. **Chọn Provider**: "Google Cloud TTS (WaveNet) via Firebase"
2. **Chọn Language**: "English (US)"
3. **Kiểm tra Voice dropdown**: Chỉ hiển thị WaveNet voices (có Wavenet/Neural trong tên)
4. **Test voice**: Click "Test Voice"

### Bước 4: Test Language Filtering
1. **Chọn Language khác**: Ví dụ "Spanish (Spain)"
2. **Kiểm tra Voice dropdown**: Chỉ hiển thị voices cho ngôn ngữ đó
3. **Đổi Provider**: Voice list sẽ thay đổi theo provider

## 🔍 Expected Behavior:

### Web Speech API:
- ✅ Chỉ hiển thị browser voices
- ✅ Không có voices có "Wavenet" hoặc "Neural" trong tên
- ✅ Voices có format: "Voice Name (Language Code)"

### Google Cloud TTS:
- ✅ Chỉ hiển thị WaveNet voices
- ✅ Tất cả voices có "Wavenet" trong tên
- ✅ Voices có format: "Language Gender (WaveNet)"
- ✅ Chất lượng audio cao hơn

### Language Filtering:
- ✅ Khi chọn language, chỉ hiển thị voices cho language đó
- ✅ Khi đổi language, voice selection được reset
- ✅ Khi đổi provider, voice selection được reset

## 🐛 Troubleshooting:

### Nếu không có voices:
1. **Web Speech API**: Kiểm tra browser support
2. **Google Cloud TTS**: Kiểm tra Firebase Functions logs
3. **Console errors**: Mở DevTools để xem lỗi

### Nếu voices không filter đúng:
1. **Kiểm tra provider selection**: Đảm bảo đã chọn đúng provider
2. **Refresh voices**: Click "Refresh Voices" button
3. **Check network**: Đảm bảo có kết nối internet cho Google Cloud TTS

## 📊 Test Results:

| Provider | Language | Expected Voices | Actual Voices | Status |
|----------|----------|-----------------|---------------|---------|
| Web Speech | en-US | Browser voices only | ? | ⏳ |
| Google Cloud | en-US | WaveNet voices only | ? | ⏳ |
| Web Speech | es-ES | Spanish browser voices | ? | ⏳ |
| Google Cloud | es-ES | Spanish WaveNet voices | ? | ⏳ |
