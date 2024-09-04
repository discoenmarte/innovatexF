'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'

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
                console.log(accessToken);
                try {
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`
                        }
                    }
                    const response = await axios.get('https://innova-server.aitopstaff.com/api/leads/', config);
                    console.log(response.data);
                    if (Array.isArray(response.data)) {
                        setLeads(response.data);
                        console.log(leads);
                    } else {
                        console.error('Expected an array but received:', response.data);
                    }
                } catch (error) {
                    console.error('Error fetching leads:', error);
                }
            }
        }
        fetchLeads();
    }, [session, status]);

    return (
        <div>
            <h1>CRM View</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Available</th>
                        <th>Created</th>
                        <th>Modified</th>
                        <th>Lead Reporter Name</th>
                        <th>Lead Reporter Position</th>
                        <th>Lead Reporter Phone Number</th>
                        <th>Client Full Name</th>
                        <th>Company Name</th>
                        <th>Company Telephone</th>
                        <th>Client Phone Number</th>
                        <th>Client Email</th>
                        <th>Potential Solution</th>
                        <th>Client Position</th>
                        <th>Client Feedback</th>
                        <th>Industry</th>
                        <th>Company Size</th>
                        <th>Client Needs</th>
                        <th>Budget</th>
                        <th>Authority Level</th>
                        <th>Urgency</th>
                        <th>Decision Timeline</th>
                        <th>Offered Price</th>
                        <th>Sales Stage</th>
                        <th>Interaction Dates</th>
                        <th>Current Status</th>
                        <th>Bot ID</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map((lead) => (
                        <tr key={lead.id}>
                            <td>{lead.id}</td>
                            <td>{lead.available ? 'Yes' : 'No'}</td>
                            <td>{lead.created}</td>
                            <td>{lead.modified}</td>
                            <td>{lead.lead_reporter_name}</td>
                            <td>{lead.lead_reporter_position}</td>
                            <td>{lead.lead_reporter_phone_number}</td>
                            <td>{lead.client_full_name}</td>
                            <td>{lead.company_name}</td>
                            <td>{lead.company_telephone || 'N/A'}</td>
                            <td>{lead.client_phone_number || 'N/A'}</td>
                            <td>{lead.client_email || 'N/A'}</td>
                            <td>{lead.potential_solution}</td>
                            <td>{lead.client_position || 'N/A'}</td>
                            <td>{lead.client_feedback}</td>
                            <td>{lead.industry || 'N/A'}</td>
                            <td>{lead.company_size || 'N/A'}</td>
                            <td>{lead.client_needs}</td>
                            <td>{lead.budget || 'N/A'}</td>
                            <td>{lead.authority_level || 'N/A'}</td>
                            <td>{lead.urgency || 'N/A'}</td>
                            <td>{lead.decision_timeline || 'N/A'}</td>
                            <td>{lead.offered_price || 'N/A'}</td>
                            <td>{lead.sales_stage || 'N/A'}</td>
                            <td>{lead.interaction_dates || 'N/A'}</td>
                            <td>{lead.current_status || 'N/A'}</td>
                            <td>{lead.bot_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
