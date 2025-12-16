import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface WebSocketCallbacks {
    setMembers?: (members: string[]) => void;
    setReadyStatus?: (status: Record<string, boolean>) => void;
    setMemberFoodSelections?: (
        selections: Record<string, string[]> | ((prev: Record<string, string[]>) => Record<string, string[]>)
    ) => void;
    onRoomDeleted?: () => void;
    onRandomResult?: (food: string, restaurants: any[]) => void;
    onRandomStarted?: () => void;
}

export default function useWebSocket(
    roomCode: string,
    callbacks: WebSocketCallbacks = {}
) {
    const {
        setMembers,
        setReadyStatus,
        setMemberFoodSelections,
        onRoomDeleted,
        onRandomStarted,
        onRandomResult
    } = callbacks;
    const stompClientRef = useRef<Client | null>(null);

    useEffect(() => {
        if (!roomCode) return;

        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            reconnectDelay: 5000,
            onConnect: () => {
                // สมาชิกในห้อง
                client.subscribe(`/topic/members/${roomCode}`, (message) => {
                    const members = JSON.parse(message.body);
                    console.log("สมาชิกอัปเดต:", members);

                    // ✅ ส่งเข้า setMembers ตรงๆ โดยไม่ sort
                    setMembers?.([...members]); // ใช้ spread เพื่อให้ React รู้ว่า array เปลี่ยนจริง
                });

                // สถานะความพร้อมของสมาชิก
                client.subscribe(`/topic/ready-status/${roomCode}`, (message) => {
                    const readyStatus = JSON.parse(message.body);
                    console.log("สถานะพร้อม:", readyStatus);
                    setReadyStatus?.(readyStatus);
                });

                // ห้องถูกลบ
                client.subscribe(`/topic/room-deleted/${roomCode}`, () => {
                    alert("ห้องถูกลบแล้ว!");
                    onRoomDeleted?.();
                });

                // การเลือกอาหาร
                client.subscribe(`/topic/room/${roomCode}/food-selection`, (message) => {
                    const { member, selectedFoods } = JSON.parse(message.body);
                    console.log("การเลือกอาหาร:", member, selectedFoods);

                    // อัปเดตเฉพาะคนที่เลือก
                    setMemberFoodSelections?.((prev) => ({
                        ...prev,
                        [member]: selectedFoods,
                    }));
                });
                client.subscribe(`/topic/room/${roomCode}/random-started`, () => {
                    console.log("เริ่มการสุ่มแล้ว");
                    onRandomStarted?.();
                });
                // ผลการสุ่มอาหาร
                client.subscribe(`/topic/room/${roomCode}/random-result`, (message) => {
                    const { food, restaurants } = JSON.parse(message.body);
                    console.log("ผลการสุ่ม:", food, restaurants);

                    // ✅ แทนที่จะแสดงผลลัพธ์ทันที → ให้เริ่ม animation แทน
                    onRandomResult?.(food, restaurants);
                });
            },
        });

        stompClientRef.current = client;
        client.activate();

        return () => {
            stompClientRef.current?.deactivate();
        };
    }, [roomCode]);
}