'use client'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import ExpandableTable from './expandableTable';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FaFileExcel, FaFilePdf, FaDownload } from 'react-icons/fa';

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
                'Authorization': `Bearer ${accessToken}`,
                },
            };
            const response = await axios.get<Lead[]>('https://innova-server.aitopstaff.com/api/leads/', config);
            setLeads(response.data);
            } catch (error) {
            console.error('Error fetching leads:', error);
            }
        }
        };
        fetchLeads();
    }, [session, status]);

    // Exportar datos a Excel
    const exportToExcel = () => {
        // Filtrar los datos para eliminar los campos no deseados
        const filteredLeads = leads.map(({ id, available, created, modified, bot_id, ...rest }) => rest);
        // Crear la hoja de cálculo con los datos filtrados
        const worksheet = XLSX.utils.json_to_sheet(filteredLeads);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');
        // Exportar el archivo Excel
        XLSX.writeFile(workbook, 'leads.xlsx');
    };

    // Exportar datos a PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        const tableColumn = [
        'Lead Reporter Name',
        'Client Full Name',
        'Company Name',
        'Potential Solution',
        'Client Email',
        ];
        const tableRows: any[] = [];
        leads.forEach((lead) => {
        const leadData = [
            lead.lead_reporter_name,
            lead.client_full_name,
            lead.company_name,
            lead.potential_solution,
            lead.client_email || 'N/A',
        ];
        tableRows.push(leadData);
        });
        // Utiliza autoTable para generar la tabla en PDF
        autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        });
        doc.save('leads.pdf');
    };

    return (
        <div className="container mx-auto p-4">
        <div className="relative mb-8">
            <div className="absolute top-0 right-0 flex space-x-2">
                <button
                onClick={exportToExcel}
                className="bg-blue-500 text-white px-4 py-2 mr-2 rounded flex items-center"
                >
                <FaDownload className="mr-2" /> <FaFileExcel className="mr-2" />
                </button>
                <button
                onClick={exportToPDF}
                className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
                >
                <FaDownload className="mr-2" /> <FaFilePdf className="mr-2" />
                </button>
            </div>
        </div>
        <p className="mb-4">Total Leads: {leads.length}</p>
        <ExpandableTable leads={leads} />
        </div>
    );
}
