//ปุ่มใหม่
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createRoom } from '@/services/roomService';
import { Button } from '@/component/ui/Button';

export default function CreateRoomPage() {
    const router = useRouter();

    // รวม state ที่เกี่ยวข้องกับฟอร์มไว้ในที่เดียว
    const [formState, setFormState] = useState({
        ownerUser: '',
        maxUsers: 3,
        maxFoodSelectionsPerMember: 1,
    });

    const [uiState, setUiState] = useState({
        isLoading: false,
        error: '',
    });

    // Handler สำหรับอัปเดต input ฟอร์มทั้งหมด
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormState(prev => ({
            ...prev,
            [id]: id === 'ownerUser' ? value : parseInt(value) || 1
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { ownerUser, maxUsers, maxFoodSelectionsPerMember } = formState;

        if (!ownerUser.trim()) {
            setUiState(prev => ({ ...prev, error: 'กรุณาระบุชื่อผู้สร้างห้อง' }));
            return;
        }

        setUiState({ isLoading: true, error: '' });

        try {
            const newRoom = await createRoom({ ownerUser, maxUsers, maxFoodSelectionsPerMember });
            router.push(`/rooms/${newRoom.roomCode}/lobbyjoin?memberName=${encodeURIComponent(ownerUser)}`);
        } catch (err) {
            setUiState({
                isLoading: false,
                error: 'เกิดข้อผิดพลาดในการสร้างห้อง กรุณาลองใหม่อีกครั้ง'
            });
            console.error(err);
        }
    };

    const { ownerUser, maxUsers, maxFoodSelectionsPerMember } = formState;
    const { isLoading, error } = uiState;

    return (
        <div className="fixed inset-0 flex items-center justify-center ">
            <div className="w-full max-w-md p-6 border-2 rounded-lg shadow-xl">
                <h1 className="text-2xl font-bold mb-6 text-center">สร้างห้องใหม่</h1>

                {error && (
                    <div className=" border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-500 mb-2" htmlFor="ownerUser">
                            ชื่อของคุณ
                        </label>
                        <input
                            id="ownerUser"
                            type="text"
                            value={ownerUser}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="ชื่อหัวหน้าห้อง"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-500 mb-2" htmlFor="maxUsers">
                            จำนวนผู้เข้าร่วมสูงสุด
                        </label>
                        <input
                            id="maxUsers"
                            type="number"
                            value={maxUsers}
                            onChange={handleInputChange}
                            min="1"
                            max="10"
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-500 mb-2" htmlFor="maxFoodSelectionsPerMember">
                            จำนวนอาหารที่เลือกได้ต่อคน
                        </label>
                        <input
                            id="maxFoodSelectionsPerMember"
                            type="number"
                            value={maxFoodSelectionsPerMember}
                            onChange={handleInputChange}
                            min="1"
                            max="10"
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>

                    <Button
                        className="w-full"
                        disabled={isLoading}
                        type="submit"
                    >
                        {isLoading ? 'กำลังสร้างห้อง...' : 'สร้างห้อง'}
                    </Button>
                </form>
            </div>
        </div>
    );
}