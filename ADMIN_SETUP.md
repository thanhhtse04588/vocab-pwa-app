# Admin System Setup Guide

Hệ thống admin cho BeeVocab được thiết kế dựa trên environment variables để dễ dàng cấu hình và bảo mật.

## 🚀 Cài đặt nhanh

### 1. Cấu hình Environment Variables

Tạo file `.env.local` trong thư mục gốc của project:

```bash
# Firebase Configuration (existing)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Admin Configuration (NEW)
VITE_ADMIN_EMAILS=admin@yourdomain.com,moderator@yourdomain.com
```

### 2. Khởi động ứng dụng

```bash
npm run dev
```

### 3. Đăng nhập với admin email

Sử dụng email đã cấu hình trong `VITE_ADMIN_EMAILS` để đăng nhập. Tab "Admin" sẽ xuất hiện trong navigation.

## 🔐 Cấu trúc quyền hạn

### User Roles

- **user**: Người dùng thông thường (mặc định)
- **moderator**: Có thể moderate content
- **admin**: Có tất cả quyền hạn quản lý

### Permission System

Mỗi role có các permissions cụ thể:

```typescript
// Admin
- vocabulary_sets: ['read', 'write', 'delete', 'publish', 'moderate']
- users: ['read', 'write', 'delete', 'moderate']
- analytics: ['read', 'write']
- system: ['read', 'write', 'delete', 'maintain']
- admin: ['read', 'write', 'delete', 'grant_roles']

// Moderator
- vocabulary_sets: ['read', 'moderate']
- users: ['read']
- analytics: ['read']

// User
- vocabulary_sets: ['read', 'write', 'delete', 'publish']
```

## 📱 Tính năng Admin

### 1. Admin Dashboard
- **Overview**: Thống kê tổng quan hệ thống
- **Vocabulary Sets**: Quản lý và moderate vocabulary sets
- **Users**: Quản lý người dùng (placeholder)
- **Analytics**: Xem thống kê chi tiết (placeholder)

### 2. Vocabulary Set Management
- Xem tất cả vocabulary sets
- Filter theo: public/private, ngôn ngữ, số từ
- Sort theo: tên, ngày tạo, số từ, lần học cuối
- Moderate content: approve, reject, feature

### 3. Permission Guards
- Tự động ẩn/hiện các tính năng dựa trên quyền hạn
- Route protection cho admin pages
- Component-level permission checks

## 🛠️ Cấu hình nâng cao

### Thêm Admin mới

```bash
# Thêm email vào VITE_ADMIN_EMAILS
VITE_ADMIN_EMAILS=admin1@domain.com,admin2@domain.com,newadmin@domain.com
```

### Validation Configuration

Hệ thống tự động validate cấu hình admin:

```typescript
import { validateAdminConfig, logAdminConfig } from '@/config/admin';

// Validate configuration
const validation = validateAdminConfig();
if (!validation.isValid) {
  console.error('Admin config errors:', validation.errors);
}

// Log configuration (development only)
logAdminConfig();
```

## 🔒 Bảo mật

### 1. Environment Variables
- Admin emails được lưu trong environment variables
- Không lưu trong code hoặc database
- Dễ dàng thay đổi mà không cần deploy lại

### 2. Permission Checks
- Mọi admin action đều được check permission
- Client-side và server-side validation
- Graceful fallback khi không có quyền

### 3. Access Control
- Admin pages chỉ hiển thị cho users có quyền
- Navigation tự động ẩn admin tab
- Error handling cho unauthorized access

## 🚨 Troubleshooting

### Admin tab không hiển thị
1. Kiểm tra email đăng nhập có trong `VITE_ADMIN_EMAILS` không
2. Kiểm tra format email trong environment variables
3. Restart development server sau khi thay đổi env vars

### Permission denied errors
1. Kiểm tra role của user trong console
2. Verify environment variables configuration
3. Check browser console cho error messages

### Environment variables không load
1. Đảm bảo file `.env.local` ở thư mục gốc
2. Restart development server
3. Kiểm tra tên biến có đúng prefix `VITE_` không

## 📝 Development Notes

### Thêm tính năng admin mới

1. **Tạo component** trong `src/components/admin/`
2. **Thêm permission** vào `getRolePermissions()` trong `adminUtils.ts`
3. **Update AdminDashboard** để hiển thị tab mới
4. **Test permission guards** với các role khác nhau

### Custom Permissions

```typescript
// Thêm permission mới
export const canManageReports = (userProfile: UserProfile | null): boolean => {
  return hasPermission(userProfile, 'reports', 'write');
};

// Sử dụng trong component
const { canManageReports } = usePermissions();
if (canManageReports()) {
  // Show reports management
}
```

## 🎯 Next Steps

1. **User Management**: Implement real user management system
2. **Analytics**: Connect to real analytics data
3. **Audit Logs**: Track admin actions
4. **Bulk Operations**: Mass approve/reject content
5. **Notifications**: Admin notification system

---

**Lưu ý**: Hệ thống admin này được thiết kế cho development và small-scale production. Đối với large-scale applications, nên consider sử dụng dedicated admin panel hoặc role-based access control system phức tạp hơn.
