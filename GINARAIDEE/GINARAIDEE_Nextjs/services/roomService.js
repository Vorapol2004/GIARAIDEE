const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function createRoom(roomData) {
    try {
        const response = await fetch(`${API_BASE_URL}/rooms/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(roomData),
        });

        if (!response.ok) {
            const errorText = await response.text(); // ดึงข้อความ error จาก backend
            throw new Error(`Failed to create room: ${errorText}`);
        }

        return await response.json(); // แปลง response เป็น JSON และ return
    } catch (error) {
        console.error('Error in createRoom:', error); // log ช่วย debug
        throw error; // ส่ง error กลับไปให้ component ไปจัดการต่อ
    }
}


export async function joinRoom({ roomCode, memberName }) {
    try {
        const response = await fetch(`${API_BASE_URL}/rooms/join/${roomCode}?memberName=${encodeURIComponent(memberName)}`, {
            method: 'POST',
        });

        //Announce
        if (!response.ok) {
            const errorData = await response.json().catch(() => null); // ป้องกัน parse error
            const message = errorData?.message || `Failed with status: ${response.status}`;
            throw new Error(message); // ✅ แสดงเฉพาะข้อความสำคัญ เช่น "Room is full!"
        }


        return response.json();
    } catch (error) {
        console.error('Error joining room:', error);
        throw error;
    }
}

export async function selectFood(roomCode, member, foodType) {
    try {
        const response = await fetch(`${API_BASE_URL}/rooms/selectFood/${roomCode}?member=${encodeURIComponent(member)}&foodType=${encodeURIComponent(foodType)}`, {
            method: 'POST',
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const errorMessage = errorData?.error || `Failed with status: ${response.status}`;
            throw new Error(`Failed to select food: ${errorMessage}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in selectFood:', error);
        throw error;
    }
}

export async function randomizeFood(roomCode, ownerUser) {
    try {
        const response = await fetch(`${API_BASE_URL}/rooms/randomFood/${roomCode}?ownerUser=${encodeURIComponent(ownerUser)}`, {
            method: 'POST',
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to randomize food: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in randomizeFood:', error);
        throw error;
    }
}

export async function leaveRoom(roomCode, memberName) {
    try {
        const response = await fetch(`${API_BASE_URL}/rooms/leave/${roomCode}?memberName=${encodeURIComponent(memberName)}`, {
            method: 'POST',
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to leave room: ${errorText}`);
        }

        return await response.text();
    } catch (error) {
        console.error('Error in leaveRoom:', error);
        throw error;
    }
}

export async function getRoomInfo(roomCode) {
    try {
        const response = await fetch(`${API_BASE_URL}/rooms/${roomCode}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to get room info: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in getRoomInfo:', error);
        throw error;
    }
}

export async function kickMember(roomCode, ownerUser, memberName) {
    try {
        const response = await fetch(`${API_BASE_URL}/rooms/kick/${roomCode}?ownerUser=${encodeURIComponent(ownerUser)}&memberName=${encodeURIComponent(memberName)}`, {
            method: 'POST',
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to kick member: ${errorText}`);
        }

        return await response.text();
    } catch (error) {
        console.error('Error in kickMember:', error);
        throw error;
    }
}

export async function setMemberReady(roomCode, memberName, ready) {
    try {
        const response = await fetch(`${API_BASE_URL}/rooms/ready/${roomCode}?memberName=${encodeURIComponent(memberName)}&ready=${ready}`, {
            method: 'POST',
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to set ready status: ${errorText}`);
        }

        return await response.text(); // หรือ .json() ถ้า backend เปลี่ยน
    } catch (error) {
        console.error('Error in setMemberReady:', error);
        throw error;
    }
}
