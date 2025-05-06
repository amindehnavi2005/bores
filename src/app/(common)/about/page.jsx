const AboutPage = () => {
    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-lavender">درباره ما</h1>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                    src="/assets/images/about-us.avif"
                    alt="درباره ما"
                    className="w-full md:w-1/2 h-auto rounded-lg shadow-md"
                />
                <div className="md:w-1/2">
                    <p className="mb-4 text-gray-700 text-sm sm:text-base">
                        سامانه نوبت‌دهی آرایشگاه ما با هدف ارائه خدمات بهتر و راحتی بیشتر برای مشتریان، توسعه یافته است. ما باور داریم که رزرو نوبت باید سریع، ساده، و بدون دردسر باشد.
                    </p>
                    <p className="mb-4 text-gray-700 text-sm sm:text-base">
                        تیم ما از حرفه‌ای‌های باتجربه تشکیل شده است که همیشه آماده ارائه بهترین خدمات هستند.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;