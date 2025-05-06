import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'سامانه نوبت‌دهی آرایشگاه',
  description: 'سامانه آنلاین برای رزرو نوبت آرایشگاه',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-grow p-4">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}