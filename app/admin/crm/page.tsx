'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import CryptoJS from 'crypto-js'

export default function Crm() {
    const [leads, setLeads] = useState([])
    const { data: session, status } = useSession()

    useEffect(() => {
        const fetchLeads = async () => {
            if (session && status === 'authenticated') {
                // Accede al token de acceso dentro de session.tokens.access
                const accessToken = session.user.tokens.access;
                try {
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`
                        }
                    }
                    const response = await axios.get('https://innova-server.aitopstaff.com/api/leads/', config);
                    setLeads(response.data);
                } catch (error) {
                    console.error('Error fetching leads:', error);
                }
            }
        }
        fetchLeads();
    }, [session, status]); // Dependencias para volver a ejecutar el efecto cuando cambie session o status

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
            {leads.map((lead) => (
            <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.available ? 'Yes' : 'No'}</td>
                <td>{lead.lead_reporter_name}</td>
                <td>{lead.client_full_name}</td>
                <td>{lead.company_name}</td>
                <td>{lead.client_phone_number}</td>
                <td>{lead.client_email}</td>
                <td>{lead.potential_solution}</td>
                </tr>
            ))}
            </tbody>
            </table>
        </div>
        )
    }
