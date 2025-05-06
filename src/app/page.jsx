import Link from 'next/link';

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-r from-lavender to-mint flex items-center justify-center">
        <div className="text-center p-4 sm:p-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            سامانه نوبت‌دهی آرایشگاه
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
            رزرو آسان و سریع نوبت خود را در آرایشگاه مورد نظرتان انجام دهید. با ما، تجربه‌ای متفاوت از مدیریت زمان داشته باشید.
          </p>
          <Link
            href="/register"
            className="bg-white text-lavender px-6 py-3 rounded-full text-lg sm:text-xl hover:bg-opacity-80 transition"
          >
            ثبت‌نام کنید
          </Link>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-12 bg-periwinkle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-lavender mb-8">
            چرا ما را انتخاب کنید؟
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-mauve mb-4">رزرو آسان</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                با چند کلیک ساده، نوبت خود را در آرایشگاه دلخواهتان رزرو کنید.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-mauve mb-4">مدیریت زمان</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                نوبت‌های خود را به‌راحتی مدیریت کنید و زمان‌بندی دقیق داشته باشید.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-mauve mb-4">پشتیبانی 24/7</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                تیم پشتیبانی ما همیشه آماده پاسخگویی به شماست.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;