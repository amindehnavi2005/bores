const AboutPage = () => {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">درباره ما</h1>
            <p className="mb-4">
                سامانه نوبت‌دهی آرایشگاه ما با هدف ارائه خدمات بهتر و راحتی بیشتر برای مشتریان، توسعه یافته است. ما باور داریم که رزرو نوبت باید سریع، ساده، و بدون دردسر باشد.
            </p>
            <img src="/about-image.jpg" alt="درباره ما" className="w-full h-auto mb-4" />
            <p className="mb-4">
                تیمme تیم ما از حرفه‌ای‌های باتجربه تشکیل شده است که همیشه آماده ارائه بهترین خدمات هستند.
            </p>
        </div>
    );
};

export default AboutPage;