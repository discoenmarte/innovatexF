'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import ExpandableTable from './expandableTable'

// If you've exported the Lead interface from ExpandableTable.tsx, you can import it here
// import { Lead } from './ExpandableTable'

// Otherwise, define it here
interface Lead {
    id: string;
    available: boolean;
    created: string;
    modified: string;
    lead_reporter_name: string;
    lead_reporter_position: string;
    lead_reporter_phone_number: string;
    client_full_name: string;
    company_name: string;
    company_telephone: string | null;
    client_phone_number: string | null;
    client_email: string | null;
    potential_solution: string;
    client_position: string | null;
    client_feedback: string;
    industry: string | null;
    company_size: string | null;
    client_needs: string;
    budget: string | null;
    authority_level: string | null;
    urgency: string | null;
    decision_timeline: string | null;
    offered_price: string | null;
    sales_stage: string | null;
    interaction_dates: string | null;
    current_status: string | null;
    bot_id: string;
}

export default function Crm() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchLeads = async () => {
            if (session && status === 'authenticated') {
                const accessToken = session.user.tokens.access;
                try {
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`
                        }
                    }
                    const response = await axios.get<Lead[]>('https://innova-server.aitopstaff.com/api/leads/', config);
                    setLeads(response.data);
                } catch (error) {
                    console.error('Error fetching leads:', error);
                }
            }
        }
        fetchLeads();
    }, [session, status]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">CRM View</h1>
            <p className="mb-4">Total Leads: {leads.length}</p>
            <ExpandableTable leads={leads} />
        </div>
    )
}