
export const ICON_URL = 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=150&h=150&auto=format&fit=crop';

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.warn("This browser does not support notifications.");
    return false;
  }

  if (Notification.permission === 'granted') return true;
  
  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

export const sendNotification = (title: string, body: string, tag?: string) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: ICON_URL,
      tag: tag || 'aneela-makeover',
      badge: ICON_URL,
    });
  }
};

export const scheduleReminder = (title: string, body: string, delayMs: number) => {
  setTimeout(() => {
    sendNotification(title, body);
  }, delayMs);
};
