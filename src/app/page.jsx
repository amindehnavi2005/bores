import { TextCard } from '@/components/common/TextCard';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="text-center p-4 sm:p-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
            سامانه نوبت‌دهی آرایشگاه
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-secondary mb-8 max-w-2xl mx-auto">
            رزرو آسان و سریع نوبت خود را در آرایشگاه مورد نظرتان انجام دهید. با ما، تجربه‌ای متفاوت از مدیریت زمان داشته باشید.
          </p>
          <Link
            href="/register"
            className="bg-primary text-white px-6 py-3 rounded-full text-lg sm:text-xl hover:bg-opacity-80 transition"
          >
            ثبت‌نام کنید
          </Link>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-8">
            چرا ما را انتخاب کنید؟
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <TextCard title={"رزرو آسان"} subtitle={"با چند کلیک ساده، نوبت خود را در آرایشگاه دلخواهتان رزرو کنید."} startColor={"primary"} endColor={"secondary"} />
            <TextCard title={"مدیریت زمان"} subtitle={"نوبت‌های خود را به‌راحتی مدیریت کنید و زمان‌بندی دقیق داشته باشید."} startColor={"secondary"} endColor={"primary"} />
            <TextCard title={"پشتیبانی 24/7"} subtitle={"تیم پشتیبانی ما همیشه آماده پاسخگویی به شماست."} startColor={"primary"} endColor={"secondary"} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;