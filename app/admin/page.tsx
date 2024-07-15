'use client'

import { useEffect, useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import CryptoJS from 'crypto-js'

const encryptionKey = CryptoJS.enc.Utf8.parse('1234567890123456'); 
const encryptionIv = CryptoJS.enc.Utf8.parse('1234567890123456'); 

function encryptSessionData(sessionData: any): string {
    console.log("AQUI ESTA KA SESSUIB DATA", sessionData)
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
    const iframeRef = useRef(null);

    useEffect(() => {
        console.log("Session data:", session);
        console.log("Session status:", status);

        const storedSessionData = sessionStorage.getItem('encryptedSessionData');
        if (storedSessionData) {
            setIframeSrc(`https://bot-dev.aitopstaff.com/BusinessAssistant/3/?data=${encodeURIComponent(storedSessionData)}`);
        }

        requestMicPermission();
    }, [session])

    useEffect(() => {
        if (session) {
            const encryptedData = encryptSessionData(session);
            sessionStorage.setItem('encryptedSessionData', encryptedData);
            setIframeSrc(`https://bot-dev.aitopstaff.com/BusinessAssistant/3/?data=${encodeURIComponent(encryptedData)}`);
        }
    }, [session]);

    const requestMicPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop());
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
                {micPermissionGranted && iframeSrc && (
                    <iframe
                        ref={iframeRef}
                        src={iframeSrc}
                        width="80%"
                        height="600"
                        frameBorder="0"
                        allow="microphone"
                        title="Unity Game"
                        allowFullScreen
                        sandbox="allow-scripts allow-same-origin"
                    ></iframe>
                )}
            </div>
        </section>
    )
}
