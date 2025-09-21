/**
 * Admin configuration and environment variables
 */

// Get admin emails from environment variables
export const getAdminEmails = (): string[] => {
  const adminEmails = import.meta.env.VITE_ADMIN_EMAILS;
  if (!adminEmails) {
    console.warn(
      'VITE_ADMIN_EMAILS not configured. No admin users will be available.'
    );
    return [];
  }

  return adminEmails
    .split(',')
    .map((email: string) => email.trim().toLowerCase())
    .filter((email: string) => email.length > 0);
};

// Check if admin configuration is valid
export const validateAdminConfig = (): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  const adminEmails = getAdminEmails();

  if (adminEmails.length === 0) {
    errors.push('No admin emails configured. Set VITE_ADMIN_EMAILS');
  }

  // Check for duplicate emails
  const uniqueEmails = new Set(adminEmails);
  if (adminEmails.length !== uniqueEmails.size) {
    errors.push('Duplicate admin emails found in configuration');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  adminEmails.forEach((email) => {
    if (!emailRegex.test(email)) {
      errors.push(`Invalid email format: ${email}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Log admin configuration (for debugging)
export const logAdminConfig = (): void => {
  if (import.meta.env.DEV) {
    console.log('🔐 Admin Configuration:');
    console.log('Admin emails:', getAdminEmails());

    const validation = validateAdminConfig();
    if (!validation.isValid) {
      console.warn('⚠️ Admin configuration issues:', validation.errors);
    } else {
      console.log('✅ Admin configuration is valid');
    }
  }
};
