'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import CryptoJS from 'crypto-js' // Assumes @types/crypto-js installed

const encryptionKey = CryptoJS.enc.Utf8.parse('1234567890123456'); // Your encryption key
const encryptionIv = CryptoJS.enc.Utf8.parse('1234567890123456'); // Your IV

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
    const { data: session, status } = useSession()
    const [micPermissionGranted, setMicPermissionGranted] = useState(false);
    const [iframeSrc, setIframeSrc] = useState('');

    useEffect(() => {
        console.log("Session data:", session);
        console.log("Session status:", status);

        // Retrieve encrypted session data from sessionStorage
        const storedSessionData = sessionStorage.getItem('encryptedSessionData');
        if (storedSessionData) {
            setIframeSrc(`https://bot-dev.aitopstaff.com/BusinessAssistant/3/?data=${encodeURIComponent(storedSessionData)}`);
        }

        // Request microphone permission
        requestMicPermission();
    }, [session])

    useEffect(() => {
        // Update sessionStorage with new encrypted session data when session changes
        if (session) {
            const encryptedData = encryptSessionData(session);
            sessionStorage.setItem('encryptedSessionData', encryptedData);
            setIframeSrc(`https://bot-dev.aitopstaff.com/BusinessAssistant/3/?data=${encodeURIComponent(encryptedData)}`);
        }
    }, [session]);

    const requestMicPermission = async () => {
        try {
            // Request microphone permission
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately after granting permission
            console.log("Microphone permission granted");
            setMicPermissionGranted(true);
        } catch (err) {
            console.error("Error requesting microphone permission:", err);
        }
    }

    return (
        <section className="flex flex-1 flex-col gap-4 md:p-4 lg:p-6 lg:gap-6" style={{ height: '100vh' }}>
            <article className="grid gap-4">
                <div className="flex items-center justify-between">
                    <div className="grid">
                        <h1 className="title">Iniria</h1>
                    </div>
                </div>
            </article>

            <div className="flex justify-center items-center h-full">
                {/* Render iframe only when mic permission is granted and iframe source is set */}
                {micPermissionGranted && iframeSrc && (
                    <iframe
                        src={iframeSrc}
                        width="80%"
                        height="600"
                        frameBorder="0"
                        allow="microphone fullscreen"
                        title="Unity Game"
                        allowFullScreen
                    ></iframe>
                )}
            </div>
        </section>
    )
}
