import type { UserSettings } from '@/types';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

class PWAService {
  private registration: ServiceWorkerRegistration | null = null;
  private deferredPrompt: BeforeInstallPromptEvent | null = null;

  constructor() {
    this.setupInstallPrompt();
    this.setupServiceWorker();
  }

  private setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      this.deferredPrompt = e as BeforeInstallPromptEvent;
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
    });
  }

  private setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        this.registration = registration;
      });
    }
  }

  async showInstallPrompt(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false;
    }

    try {
      // Show the install prompt
      this.deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await this.deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error showing install prompt:', error);
      return false;
    }
  }

  async requestNotificationPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      throw new Error('This browser does not support notifications');
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    if (Notification.permission === 'denied') {
      throw new Error('Notification permission has been denied');
    }

    const permission = await Notification.requestPermission();
    return permission;
  }

  async scheduleNotification(settings: UserSettings): Promise<void> {
    if (!settings.enableNotifications || !this.registration) {
      return;
    }

    try {
      const permission = await this.requestNotificationPermission();

      if (permission !== 'granted') {
        throw new Error('Notification permission not granted');
      }

      // Clear existing notifications
      await this.clearScheduledNotifications();

      // Parse notification time
      const [_hours, _minutes] = settings.notificationTime
        .split(':')
        .map(Number);

      // Schedule daily notification
      await this.registration.showNotification('BeeVocab - Study Time!', {
        body: 'Time to review your vocabulary words!',
        icon: '/pwa-192x192.png',
        badge: '/pwa-192x192.png',
        tag: 'vocab-study-reminder',
        requireInteraction: true,
        data: {
          url: '/learn',
        },
      });

      // Schedule recurring notification using setInterval as a fallback
      // Note: In a real app, you'd use a more sophisticated scheduling system
      this.scheduleRecurringNotification(settings);
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }

  private scheduleRecurringNotification(settings: UserSettings): void {
    const [hours, minutes] = settings.notificationTime.split(':').map(Number);
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(hours, minutes, 0, 0);

    // If the time has already passed today, schedule for tomorrow
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const timeUntilNotification = scheduledTime.getTime() - now.getTime();

    setTimeout(() => {
      this.showStudyReminder();
      // Schedule the next notification
      this.scheduleRecurringNotification(settings);
    }, timeUntilNotification);
  }

  private async showStudyReminder(): Promise<void> {
    if (!this.registration) return;

    try {
      await this.registration.showNotification('BeeVocab - Study Time!', {
        body: 'Time to review your vocabulary words!',
        icon: '/pwa-192x192.png',
        badge: '/pwa-192x192.png',
        tag: 'vocab-study-reminder',
        requireInteraction: true,
        data: {
          url: '/learn',
        },
      });
    } catch (error) {
      console.error('Error showing study reminder:', error);
    }
  }

  async clearScheduledNotifications(): Promise<void> {
    if (!this.registration) return;

    try {
      const notifications = await this.registration.getNotifications();
      notifications.forEach((notification) => {
        if (notification.tag === 'vocab-study-reminder') {
          notification.close();
        }
      });
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  }

  async showNotification(
    title: string,
    options?: NotificationOptions
  ): Promise<void> {
    if (!this.registration) {
      throw new Error('Service Worker not available');
    }

    try {
      await this.registration.showNotification(title, {
        icon: '/pwa-192x192.png',
        badge: '/pwa-192x192.png',
        ...options,
      });
    } catch (error) {
      console.error('Error showing notification:', error);
      throw error;
    }
  }

  async vibrate(pattern: number | number[]): Promise<void> {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (error) {
        console.error('Error vibrating:', error);
      }
    }
  }

  async playSound(url?: string): Promise<void> {
    try {
      // If no URL provided, skip playing sound to avoid file not found errors
      if (!url) {
        return;
      }

      const audio = new Audio(url);

      // Check if the audio can be loaded
      audio.addEventListener('error', () => {});

      await audio.play();
    } catch (error) {
      // Don't throw error, just log warning to avoid breaking the app
    }
  }

  isInstalled(): boolean {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone ===
        true
    );
  }

  canInstall(): boolean {
    return this.deferredPrompt !== null;
  }

  getInstallPrompt(): BeforeInstallPromptEvent | null {
    return this.deferredPrompt;
  }

  // Handle notification clicks
  setupNotificationClickHandler(): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'NOTIFICATION_CLICK') {
          const { action, url } = event.data;

          if (action === 'study' && url) {
            // Navigate to study page
            window.location.href = url;
          } else if (action === 'later') {
            // Schedule reminder for later (e.g., 1 hour)
            setTimeout(() => {
              this.showStudyReminder();
            }, 60 * 60 * 1000); // 1 hour
          }
        }
      });
    }
  }
}

export const pwaService = new PWAService();
