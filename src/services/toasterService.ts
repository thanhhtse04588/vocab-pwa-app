/**
 * Toaster service for centralized toast management
 * Provides a consistent interface for showing success, error, warning, and info toasts
 */

import { toaster } from 'evergreen-ui';

export interface ToastOptions {
  hasCloseButton?: boolean;
  description?: string;
}

class ToasterService {
  /**
   * Show a success toast
   */
  success(message: string, options?: ToastOptions): void {
    toaster.success(message, {
      hasCloseButton: options?.hasCloseButton ?? true,
      description: options?.description,
    });
  }

  /**
   * Show an error toast
   */
  error(message: string, options?: ToastOptions): void {
    toaster.danger(message, {
      hasCloseButton: options?.hasCloseButton ?? true,
      description: options?.description,
    });
  }

  /**
   * Show a warning toast
   */
  warning(message: string, options?: ToastOptions): void {
    toaster.warning(message, {
      hasCloseButton: options?.hasCloseButton ?? true,
      description: options?.description,
    });
  }

  /**
   * Show an info toast
   */
  info(message: string, options?: ToastOptions): void {
    toaster.notify(message, {
      hasCloseButton: options?.hasCloseButton ?? true,
      description: options?.description,
    });
  }

  /**
   * Close all toasts
   */
  closeAll(): void {
    toaster.closeAll();
  }
}

// Export a singleton instance
export const toasterService = new ToasterService();
