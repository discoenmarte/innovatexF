'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import CryptoJS from 'crypto-js'

const encryptionKey = CryptoJS.enc.Utf8.parse('1234567890123456');
const encryptionIv = CryptoJS.enc.Utf8.parse('1234567890123456');

function encryptSessionData(sessionData: any): string {
    const jsonData = JSON.stringify(sessionData);
    const encrypted = CryptoJS.AES.encrypt(jsonData, encryptionKey, {
        iv: encryptionIv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return encrypted.toString();
}

export default function Dashboard() {
    const router = useRouter();
    const { data: session, status } = useSession()
    //const [micPermissionGranted, setMicPermissionGranted] = useState(false);

    /*useEffect(() => {
        requestMicPermission();
    }, []);*/

    useEffect(() => {
        if (session && status === 'authenticated') {
            // Save encrypted session data to sessionStorage
            const encryptedData = encryptSessionData(session);
            sessionStorage.setItem('encryptedSessionData', encryptedData);
        }
    }, [session, status]);

    /*const requestMicPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop());
            setMicPermissionGranted(true);
        } catch (err) {
            console.error("Error requesting microphone permission:", err);
        }
    }*/

    const handleConnectClick = (buildName: string) => {
        const encryptedSessionData = sessionStorage.getItem('encryptedSessionData');
        if (encryptedSessionData) {
            const url = `https://bot.aitopstaff.com/${buildName}?data=${encodeURIComponent(encryptedSessionData)}`;
            window.location.href = url;
        } else {
            console.error("No session data found.");
        }
    }

    const handleRedirect = () => {
        router.push('/admin/crm');
    };

    return (
        <section className="flex flex-1 flex-col gap-4 md:p-4 lg:p-6 lg:gap-6" style={{ height: '100vh' }}>
            <article className="grid gap-4">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => handleConnectClick("innova")}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Connect with Iniria
                    </button>
                    <button
                        onClick={handleRedirect}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Connect with CRM
                    </button>
                    <button
                        onClick={() => handleConnectClick("icesi")}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Connect with Icesi
                    </button>
                </div>
            </article>

            <div className="flex justify-center items-center h-full">
                {/* Removed iframe */}
            </div>
        </section>
    )
}
