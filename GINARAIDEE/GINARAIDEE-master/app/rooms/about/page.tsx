'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';

export default function AboutPage() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            // เพิ่ม disable เมื่อใช้งานบนอุปกรณ์มือถือเพื่อลดปัญหา
            disable: window.innerWidth < 768
        });

        // เพิ่ม function เพื่อแก้ไขปัญหาความสูงของหน้าจอ
        const setDocumentHeight = () => {
            const doc = document.documentElement;
            doc.style.setProperty('--app-height', `${window.innerHeight}px`);
        };

        // เรียกใช้งานครั้งแรกและเมื่อมีการเปลี่ยนขนาดหน้าจอ
        setDocumentHeight();
        window.addEventListener('resize', setDocumentHeight);

        return () => {
            window.removeEventListener('resize', setDocumentHeight);
        };
    }, []);

    return (
        <div className="min-h-[var(--app-height)] flex flex-col">
            {/* Hero Section */}
            <section className="flex items-center justify-center text-center py-20 px-6  " data-aos="fade-down">
                <div>
                    <h1 className="text-5xl font-bold text-orange-500 mb-4">GINARAIDEE</h1>
                    <p className="text-lg text-orange-400 max-w-2xl mx-auto">
                        ที่ที่คุณจะไม่ต้องปวดหัวกับคำถามว่า "จะกินอะไรดี?" อีกต่อไป
                    </p>
                </div>
            </section>

            <section className="flex-grow py-16 px-6">
                <div className="max-w-4xl mx-auto space-y-16">
                    {/* Mission Card 1 */}
                    <div className="border-2 rounded-3xl shadow-xl p-10 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                        <h2 className="text-3xl font-semibold text-orange-500 mb-4">เป้าหมายของเรา</h2>
                        <p className="text-md text-orange-400 leading-7">
                            เรามุ่งเน้นการสร้างประสบการณ์ที่เรียบง่าย สนุกสนาน และทำให้ได้ใช้เวลาร่วมกันกับเพื่อนๆ
                            เพื่อช่วยให้คุณและเพื่อนๆ เลือกร้านอาหารได้อย่างเป็นธรรมที่สุด
                        </p>
                    </div>

                    {/* Mission Card 2 */}
                    <div className="border-2 rounded-3xl shadow-xl p-10 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                        <h2 className="text-3xl font-semibold text-orange-500 mb-4">ทำไมต้อง GINARAIDEE?</h2>
                        <ul className="list-disc pl-6 text-orange-400 space-y-3">
                            <li>ระบบสุ่มที่แฟร์และสะดวกสะบายในการใช้งาน</li>
                            <li>เลือกประเภทอาหารได้ตามใจ</li>
                            <li>เหมาะกับการชวนเพื่อน-ครอบครัวมาโหวตสนุกๆ</li>
                        </ul>
                    </div>

                    {/* Mission Card 3 */}
                    <div
                        className="border-2 rounded-3xl shadow-xl p-10 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                    >
                        <h2 className="text-3xl font-semibold text-orange-500 mb-4">เป้าหมายในอนาคต</h2>
                        <p className="text-md text-orange-400 leading-7">
                            เรากำลังวางแผนที่จะเพิ่มฟีเจอร์ใหม่ เช่น ระบบรีวิวร้านและการเชื่อมต่อกับแผนที่ร้านอาหารรอบตัวคุณ ทำให้เว็บไซด์มีความเสถียรขึ้น
                        </p>
                    </div>
                </div>
            </section>


            {/* 🖼 ทีมของเรา Section: Hover Card */}
            <section className="py-16" data-aos="fade-up">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-orange-400 mb-12 text-center">สมาชิกในกลุ่ม</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        {/* Card Example */}
                        {[
                            {
                                img: "/Bomb.jpg",
                                name: "Bomb",
                                description: "นักพัฒนาและแก้ไขบัค\n"
                            },
                            {
                                img: "/Plub.jpg",
                                name: "Plub",
                                description: "นักพัฒนาระบบหน้าบ้าน\nดูแลส่วน UX/UI"
                            },
                            {
                                img: "/Kao.jpg",
                                name: "Kao",
                                description: "นักออกแบบและปรับปรุงฐานข้อมูล\nดูแลประสิทธิภาพระบบ"
                            },
                        ].map((member, idx) => (
                            <div key={idx} className="card">
                                <Image
                                    src={member.img}
                                    alt={`ทีม ${member.name}`}
                                    fill
                                    className="object-cover"
                                />
                                <div className="card__content">
                                    <h3 className="card__title">{member.name}</h3>
                                    <p className="card__description whitespace-pre-line">
                                        {member.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Footer */}
            <footer className=" text-orange-500 text-center py-6 mt-auto" >
                <p className="text-sm">&copy; 2025 GINARAIDEE. เลือกร้านอาหารง่ายๆ กับเพื่อน</p>
            </footer>
        </div>
    );
}

//npm install aos (Animate On Screen Library)
