'use client'

import { RegionCombox } from '@/components/dashboard/RegionCombox'
import GetStudentsConnections from '@/components/dashboard/GetStudentsConnectedNum'
import { Button } from '@/components/ui/button'
import { DatePickerWithRange } from '@/components/ui/date-picker-range'
import { DashboardFilters } from '@/types/dashboard'
import { Filter, UsersRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { ProgramCombox } from '@/components/dashboard/ProgramCombox'
import HeadquarterCombox from '@/components/dashboard/HeadquarterCombox'
import { StudentsDataConnections } from '@/types/metrics'
import GetStudentsConnectedPer from '@/components/dashboard/GetStudentsConnectedPer'
import { useSession } from 'next-auth/react'
import { number } from '@/lib/utils/formatter'
import NormalDistributionGamification from '@/components/dashboard/NormalDistributionGamification'
import MentorQuestionsTable from '@/components/mentor/MentorQuestionsTable'
import BestBuddyQuestionTable from '@/components/best-buddy/BestBuddyQuestionsTable'
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
    const [program, setProgram] = useState<string | undefined>()
    const [region, setRegion] = useState<string | undefined>()
    const [headquarter, setHeadquarter] = useState<string | undefined>()
    const [date, setDate] = useState<DateRange | undefined>()
    const [filterValues, setfilterValues] = useState<DashboardFilters>()
    const [mentorStudentsConnected, setMentorStudentsConnected] =
        useState<StudentsDataConnections>()
    const [bestBuddyStudentsConnected, setBestBuddyStudentsConnected] =
        useState<StudentsDataConnections>()

    const { data: session } = useSession()

    useEffect(() => {
        fieldsValidation()
    }, [region, date, program, headquarter])

    const fieldsValidation = () =>
        !region && !date && !program && setfilterValues(undefined)

    /**
     * Sets the region and date state variables.
     *
     * @return {void} This function does not return anything.
     */
    const setRegionAndDate = () => {
        if (!region && !date) {
            setfilterValues(undefined)
        } else {
            setfilterValues({ region, program, headquarter, date })
        }
    }

    const encryptedSessionData = session ? encryptSessionData(session) : '';
    const iframeSrc = `https://bot-dev.aitopstaff.com/BusinessAssistant/3/?data=${encodeURIComponent(encryptedSessionData)}`;

    console.log('Iframe Source:', iframeSrc); // Debugging line

    return (
        <section className="flex flex-1 flex-col gap-4  md:p-4 lg:p-6 lg:gap-6 " style={{height: '100vh'}}>
            <article className="grid gap-4">
                <div className="flex items-center justify-between">
                    <div className="grid">
                        <h1 className="title">Tablero</h1>
                    </div>
                </div>

                <p>Rengi</p>

                {/* <div className="grid md:grid-flow-col gap-3 md:justify-end items-center">
                    <ProgramCombox setProgram={setProgram} />
                    <RegionCombox setRegion={setRegion} />
                    <HeadquarterCombox setHeadquarter={setHeadquarter} />
                    <DatePickerWithRange setDate={setDate} />
                    <Button
                        disabled={!region && !date}
                        className="flex gap-2"
                        size="sm"
                        onClick={() => setRegionAndDate()}
                    >
                        <Filter size={16} />
                        Filtrar
                    </Button>
                </div> */}
            </article>
            {/* <NormalDistributionGamification filterValues={filterValues} />
            <GetStudentsConnections
                filterValues={filterValues}
                setMentorStudentsConnected={setMentorStudentsConnected}
                setBestBuddyStudentsConnected={setBestBuddyStudentsConnected}
            />
            <GetStudentsConnectedPer
                mentorConnections={mentorStudentsConnected?.connections}
                bestBuddyConnections={bestBuddyStudentsConnected?.connections}
                filterValues={filterValues}
            />
            <MentorQuestionsTable filterValues={filterValues} />
            <BestBuddyQuestionTable filterValues={filterValues} /> */}

            <div className="flex justify-center items-center h-full">
                {encryptedSessionData && (
                    <iframe src={iframeSrc} width="80%" height="600" frameBorder="0"></iframe>
                )}
            </div>
        </section>
    )
}