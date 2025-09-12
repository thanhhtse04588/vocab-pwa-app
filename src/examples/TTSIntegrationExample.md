# TTS Integration với Target Language và Speech Rate

## Tổng quan

Hệ thống TTS đã được tích hợp để sử dụng `targetLanguage` từ vocabulary set và `speech rate` từ settings để phát âm chính xác theo ngôn ngữ đích.

## Các thay đổi chính

### 1. Language Mapping Utility (`src/utils/languageMapping.ts`)

Tạo mapping từ language codes sang TTS language codes:

```typescript
// Ví dụ mapping
'en' -> 'en-US'
'vi' -> 'vi-VN' 
'ja' -> 'ja-JP'
'ko' -> 'ko-KR'
'zh' -> 'zh-CN'
'fr' -> 'fr-FR'
'de' -> 'de-DE'
'es' -> 'es-ES'
```

### 2. AudioButton Component (`src/components/AudioButton.tsx`)

- Thêm prop `targetLanguage` để nhận language code từ vocabulary set
- Tự động convert sang TTS language code
- Ưu tiên: `lang` prop > `targetLanguage` > `settings.ttsLanguage` > default

```typescript
// Sử dụng
<AudioButton 
  text="hello" 
  targetLanguage="vi"  // Vietnamese vocabulary set
  // Sẽ tự động convert thành 'vi-VN' cho TTS
/>
```

### 3. WordCard Component (`src/components/WordCard.tsx`)

- Thêm prop `vocabularySet` để lấy `targetLanguage`
- Truyền `targetLanguage` cho AudioButton

```typescript
// Sử dụng
<WordCard
  word={word}
  showAnswer={true}
  isCorrect={true}
  isMarkedAsTrue={false}
  vocabularySet={vocabularySet}  // Chứa targetLanguage
/>
```

### 4. StudySession Component (`src/components/StudySession.tsx`)

- Lấy vocabulary set từ store dựa trên `sessionSetId`
- Sử dụng `targetLanguage` cho auto-play audio
- Truyền vocabulary set cho WordCard

## Luồng hoạt động

1. **Tạo Vocabulary Set**: User chọn `sourceLanguage` và `targetLanguage`
2. **Bắt đầu Study Session**: System lưu `sessionSetId` và lấy vocabulary set
3. **Hiển thị Word**: WordCard nhận vocabulary set và extract `targetLanguage`
4. **Phát âm TTS**: AudioButton convert `targetLanguage` sang TTS language code
5. **Sử dụng Settings**: Speech rate, volume, pitch từ user settings

## Ví dụ thực tế

### Vocabulary Set: English -> Vietnamese
```typescript
const vocabularySet = {
  id: "set-1",
  name: "Basic English Words",
  sourceLanguage: "vi",    // Vietnamese (ngôn ngữ nguồn)
  targetLanguage: "en",    // English (ngôn ngữ đích)
  // ...
}
```

### TTS Configuration
```typescript
const settings = {
  ttsRate: 0.9,        // Speech rate từ settings
  ttsVolume: 0.8,      // Volume từ settings  
  ttsPitch: 1.1,       // Pitch từ settings
  ttsLanguage: "en-US", // Fallback language
  // ...
}
```

### Kết quả
- Word "hello" sẽ được phát âm bằng giọng English (en-US)
- Sử dụng speech rate 0.9, volume 0.8, pitch 1.1 từ settings
- Tooltip hiển thị "Play pronunciation in en language"

## Lợi ích

1. **Chính xác ngôn ngữ**: TTS sử dụng đúng ngôn ngữ đích của vocabulary set
2. **Tùy chỉnh cá nhân**: Speech rate, volume, pitch từ user settings
3. **Linh hoạt**: Hỗ trợ nhiều ngôn ngữ và fallback thông minh
4. **Trải nghiệm tốt**: Auto-play và manual play đều sử dụng cùng logic
5. **Dễ bảo trì**: Centralized language mapping và clear separation of concerns
