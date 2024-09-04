import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface Lead {
    id: string;
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
}

interface ExpandableTableProps {
    leads: Lead[];
}

const ExpandableTable: React.FC<ExpandableTableProps> = ({ leads }) => {
    const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});

    const toggleRow = (id: string) => {
        setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-gray-100">
                    <th className="p-2 border">Expand</th>
                    <th className="p-2 border">Lead Reporter Name</th>
                    <th className="p-2 border">Client Full Name</th>
                    <th className="p-2 border">Company Name</th>
                    <th className="p-2 border">Potential Solution</th>
                </tr>
            </thead>
            <tbody>
                {leads.map((lead) => (
                    <React.Fragment key={lead.id}>
                        <tr className="hover:bg-gray-50">
                            <td className="p-2 border">
                                <button onClick={() => toggleRow(lead.id)} className="focus:outline-none">
                                    {expandedRows[lead.id] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                </button>
                            </td>
                            <td className="p-2 border">{lead.lead_reporter_name}</td>
                            <td className="p-2 border">{lead.client_full_name}</td>
                            <td className="p-2 border">{lead.company_name}</td>
                            <td className="p-2 border">{lead.potential_solution}</td>
                        </tr>
                        {expandedRows[lead.id] && (
                            <tr>
                                <td colSpan={5} className="p-2 border bg-gray-50">
                                    <div className="grid grid-cols-2 gap-2">
                                        <p><strong>Lead Reporter Position:</strong> {lead.lead_reporter_position}</p>
                                        <p><strong>Lead Reporter Phone:</strong> {lead.lead_reporter_phone_number}</p>
                                        <p><strong>Client Phone:</strong> {lead.client_phone_number || 'N/A'}</p>
                                        <p><strong>Client Email:</strong> {lead.client_email || 'N/A'}</p>
                                        <p><strong>Client Position:</strong> {lead.client_position || 'N/A'}</p>
                                        <p><strong>Client Feedback:</strong> {lead.client_feedback}</p>
                                        <p><strong>Industry:</strong> {lead.industry || 'N/A'}</p>
                                        <p><strong>Company Size:</strong> {lead.company_size || 'N/A'}</p>
                                        <p><strong>Client Needs:</strong> {lead.client_needs}</p>
                                        <p><strong>Budget:</strong> {lead.budget || 'N/A'}</p>
                                        <p><strong>Authority Level:</strong> {lead.authority_level || 'N/A'}</p>
                                        <p><strong>Urgency:</strong> {lead.urgency || 'N/A'}</p>
                                        <p><strong>Decision Timeline:</strong> {lead.decision_timeline || 'N/A'}</p>
                                        <p><strong>Offered Price:</strong> {lead.offered_price || 'N/A'}</p>
                                        <p><strong>Sales Stage:</strong> {lead.sales_stage || 'N/A'}</p>
                                        <p><strong>Interaction Dates:</strong> {lead.interaction_dates || 'N/A'}</p>
                                        <p><strong>Current Status:</strong> {lead.current_status || 'N/A'}</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
};

export default ExpandableTable;