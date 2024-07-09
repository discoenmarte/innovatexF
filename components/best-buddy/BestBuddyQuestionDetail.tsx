import { BestBuddyQuestions } from '@/lib/models/best-buddy/questions'
import { BrainCircuit, CalendarPlus, UserRound } from 'lucide-react'
import moment from 'moment'
import 'moment/locale/es'
import { Separator } from '../ui/separator'
moment.locale('es')

export default function BestBuddyQuestionDetail({
    data,
}: {
    data?: BestBuddyQuestions
}) {
    const getInsights = (text: string | undefined): Array<string> => {
        if (!text) return []
        const regex = /\d+\.\s(.*?)(?=\n\d+\.|$)/gs
        const points = []

        let match
        while ((match = regex.exec(text)) !== null) {
            points.push(match[1])
        }
        return points
    }

    return (
        <section className="grid gap-3">
            <article className="flex justify-between items-center">
                <small>ID: {data?.id}</small>
                <small
                    className="flex gap-2 text-gray-500 border 
						border-gray-200 p-1.5 rounded-full w-fit"
                >
                    <CalendarPlus size={16} />
                    {moment(data?.created).format('LLL')}
                </small>
            </article>
            <article className="grid gap-2">
                <h2 className="subtitle">Información del Estudiante</h2>
                <table>
                    <tbody className="text-sm">
                        <tr>
                            <td className="font-medium">Identificación:</td>
                            <td>{data?.customer_student_id}</td>
                        </tr>
                        <tr>
                            <td className="font-medium">Nombre:</td>
                            <td>{data?.student_name}</td>
                        </tr>
                        <tr>
                            <td className="font-medium">Correo:</td>
                            <td>{data?.student_email}</td>
                        </tr>
                        <tr>
                            <td className="font-medium">Programa:</td>
                            <td>{data?.program}</td>
                        </tr>
                        <tr>
                            <td className="font-medium">Sede:</td>
                            <td>{data?.headquarter}</td>
                        </tr>
                        <tr>
                            <td className="font-medium">Región:</td>
                            <td>{data?.region}</td>
                        </tr>
                    </tbody>
                </table>
            </article>
            <Separator />
            <article className="grid gap-4 py-2">
                <h2 className="subtitle">Insights</h2>
                <ul className="grid gap-4 list-decimal">
                    {getInsights(data?.insights).map((point, index) => (
                        <li
                            className="text-justify text-sm list-inside"
                            key={`${point.slice(-4)}-${index}`}
                        >
                            {point}
                        </li>
                    ))}
                </ul>
            </article>
            <Separator />
            <article className="grid gap-4 py-2">
                <h2 className="subtitle">Resumen</h2>
                <p className="text-justify text-sm">{data?.summary}</p>
            </article>
            <Separator />
            <article className="grid gap-4 py-2">
                <h2 className="subtitle">Recordarios</h2>
                <p>{data?.reminder}</p>
            </article>
            <Separator />
            <article className="grid gap-4 py-2">
                <h2 className="subtitle">Estado de ánimo</h2>
                <p>{data?.mood}</p>
            </article>
            <Separator />
            <article className="grid gap-4 py-2">
                <h2 className="subtitle">Interacción</h2>
                <div className="grid max-h-[30rem] overflow-y-auto pr-3">
                    <table>
                        <tbody>
                            {data?.questions?.map((question, index) => (
                                <tr
                                    key={`${
                                        question.Prompt?.slice(-4) ||
                                        question.Output?.slice(-4)
                                    }-${index}`}
                                    className="border p-1 rounded-lg mb-2 flex gap-2"
                                >
                                    {question.Prompt ? (
                                        <>
                                            <td className="font-medium">
                                                <UserRound size={24} />
                                            </td>
                                            <td className="relative left-2 text-sm">
                                                {question.Prompt}
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="font-medium">
                                                <BrainCircuit size={24} />
                                            </td>
                                            <td className="relative left-2 text-sm">
                                                {question.Output}
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </article>
        </section>
    )
}
