'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import CryptoJS from 'crypto-js'

export default function Crm() {
    const [leads, setLeads] = useState([])

    useEffect(() => {
        const fetchLeads = async () => {
        try {
            const encryptedSessionData = sessionStorage.getItem('encryptedSessionData');
            console.log(encryptedSessionData)
            /*const sessionData = JSON.parse(encryptedSessionData.json() || '{}');

            const config = {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${encryptedSessionData.accessToken}`
                }
            }

            const response = await axios.get('https://innova-server.aitopstaff.com/api/leads/', config)
            setLeads(response.data)*/
        } catch (error) {
            console.error('Error fetching leads:', error)
        }
    }

    fetchLeads()
    }, [])

    return (
        <div>
            <h1>CRM View</h1>
            <table>
            <thead>
                <tr>
                <th>ID</th>
                <th>Available</th>
                <th>Lead Reporter Name</th>
                <th>Client Full Name</th>
                <th>Company Name</th>
                <th>Client Phone Number</th>
                <th>Client Email</th>
                <th>Potential Solution</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
            </table>
        </div>
        )
    }
