'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { joinRoom, getRoomInfo } from '@/services/roomService';
import { Button } from '@/component/ui/Button'; // ตรวจสอบ path นี้ให้ตรงกับโปรเจกต์ของคุณ

export default function JoinRoomPage() {
    const [roomCode, setRoomCode] = useState('');
    const [memberName, setMemberName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleJoinRoom = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!roomCode.trim()) {
            setError('กรุณาใส่รหัสห้อง');
            return;
        }

        if (!memberName.trim()) {
            setError('กรุณาใส่ชื่อของคุณ');
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            await joinRoom({ roomCode, memberName });
            const room = await getRoomInfo(roomCode);
            router.push(`/rooms/${roomCode}/lobbyjoin?memberName=${encodeURIComponent(memberName)}`);
        } catch (err: any) {
            setError(err.message || 'เกิดข้อผิดพลาดในการเข้าร่วมห้อง กรุณาลองใหม่อีกครั้ง');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center ">
            <div className="w-full max-w-md p-6 border-2 rounded-lg shadow-xl">
                <h1 className="text-2xl font-bold mb-6 text-center">เข้าร่วมห้อง</h1>
                <h2 className="text-center text-gray-500 mb-6">ใส่รหัสห้องเพื่อเข้าร่วม</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleJoinRoom}>
                    <div className="mb-4">
                        <label className="block text-gray-500 mb-2" htmlFor="roomCode">
                            รหัสห้อง
                        </label>
                        <input
                            id="roomCode"
                            type="text"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="ใส่รหัสห้อง"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-500 mb-2" htmlFor="memberName">
                            ชื่อของคุณ
                        </label>
                        <input
                            id="memberName"
                            type="text"
                            value={memberName}
                            onChange={(e) => setMemberName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="ใส่ชื่อของคุณ"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-3">
                        {/* ปุ่มเข้าร่วมห้อง */}
                        <div onClick={!isLoading ? handleJoinRoom : undefined} className="w-full">
                            <Button
                                className="w-full"
                                disabled={isLoading}
                                type="submit"
                            >
                                <div className="flex items-center justify-center text-lg">
                                    {isLoading ? 'กำลังเข้าร่วม...' : 'เข้าร่วมห้อง'}
                                </div>
                            </Button>
                        </div>

                        {/* ปุ่มกลับหน้าหลัก */}
                        <Button
                            type="button"
                            className="w-full"
                            onClick={() => router.push('/')}
                            disabled={isLoading}
                        >
                            <div className="flex items-center justify-center text-lg">
                                กลับไปหน้าหลัก
                            </div>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
