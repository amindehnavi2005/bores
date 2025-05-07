import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-primary text-white p-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                    <h2 className="text-lg font-bold mb-2">درباره ما</h2>
                    <p className="text-sm">سامانه نوبت‌دهی آرایشگاه ما با هدف ارائه خدمات بهتر و راحتی بیشتر برای مشتریان، توسعه یافته است.</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-2">تماس با ما</h2>
                    <p className="text-sm">شماره تلفن: 021-12345678</p>
                    <p className="text-sm">ایمیل: info@salon.com</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-2">لینک‌های سریع</h2>
                    <p className="text-sm"><Link href="/about" className="hover:underline">درباره ما</Link></p>
                    <p className="text-sm"><Link href="/contact" className="hover:underline">تماس با ما</Link></p>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-2">شبکه‌های اجتماعی</h2>
                    <p className="text-sm">اینستاگرام: @salon</p>
                    <p className="text-sm">تلگرام: @salon</p>
                </div>
            </div>
            <div className="text-center mt-6 text-sm">
                <p>© این وبسایت متعلق به <span className="text-accent">امین دهنوی</span> میباشد</p>
            </div>
        </footer>
    );
};

export default Footer;