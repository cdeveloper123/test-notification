// src/components/NotificationComponent.tsx
import { useEffect, useState } from 'react';
import { firestore } from '../config/firebaseConfig';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebaseConfig';

const NotificationComponent: React.FC = () => {
  const [user] = useAuthState(auth);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const q = query(collection(firestore, 'notifications'), where('uid', '==', user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const notifData: any[] = [];
        querySnapshot.forEach((doc) => {
          notifData.push({ id: doc.id, ...doc.data() });
        });
        setNotifications(notifData);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const markAsRead = async (id: string) => {
    try {
      const notifRef = doc(firestore, 'notifications', id);
      await updateDoc(notifRef, { read: true });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      <ul className="space-y-2">
        {notifications.map((notif) => (
          <li
            key={notif.id}
            className={`p-4 border rounded-md ${notif.read ? 'bg-gray-200 line-through' : 'bg-blue-50'}`}
          >
            <span className={`block ${notif.read ? 'text-gray-500' : 'text-black'}`}>
              {notif.message}
            </span>
            {!notif.read && (
              <button
                onClick={() => markAsRead(notif.id)}
                className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
              >
                Mark as Read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;
