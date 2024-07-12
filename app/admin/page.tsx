'use client'

import { useEffect } from 'react'
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

    useEffect(() => {
        console.log("Session data:", session);
        console.log("Session status:", status);
        requestCameraAndMicPermissions()
    }, [session])

    const requestCameraAndMicPermissions = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            console.log("Camera and microphone permissions granted");
        } catch (err) {
            console.error("Error requesting camera and microphone permissions:", err);
        }
    }

    const encryptedSessionData = session ? encryptSessionData(session) : '';
    const iframeSrc = `https://bot-dev.aitopstaff.com/BusinessAssistant/3/?data=${encodeURIComponent(encryptedSessionData)}`;

    return (
        <section className="flex flex-1 flex-col gap-4 md:p-4 lg:p-6 lg:gap-6" style={{height: '100vh'}}>
            <article className="grid gap-4">
                <div className="flex items-center justify-between">
                    <div className="grid">
                        <h1 className="title">Tablero</h1>
                    </div>
                </div>
            </article>

            <div className="flex justify-center items-center h-full">
                {encryptedSessionData && (
                    <iframe 
                        src={iframeSrc} 
                        width="80%" 
                        height="600" 
                        frameBorder="0" 
                        allow="fullscreen" 
                        allowFullScreen
                    ></iframe>
                )}
            </div>
        </section>
    )
}
