import { QueryClient } from '@tanstack/react-query';

/**
 * יצירת מופע של QueryClient עם הגדרות ברירת מחדל
 * TypeScript מזהה אוטומטית את הטיפוס של המשתנה בזכות ה-new QueryClient
 */
export const queryClientInstance: QueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // ביטול רענון הנתונים בכל פעם שהמשתמש חוזר ללשונית (Tab) של הדפדפן
            refetchOnWindowFocus: false,
            // מספר ניסיונות קריאה חוזרים במקרה של כישלון
            retry: 1,
            // הגדרה מומלצת: כמה זמן הנתונים נחשבים "טריים" לפני שהם נדרשים לרענון (למשל 5 דקות)
            staleTime: 1000 * 60 * 5, 
        },
    },
});