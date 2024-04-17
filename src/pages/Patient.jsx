import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {LineChart, ResponsiveContainer, Line, CartesianGrid, BarChart, XAxis, YAxis, Tooltip, Bar} from 'recharts';
import {useAuth} from "@/contexts/auth.context.jsx";
import {toast} from "sonner";
import {Button} from "@/components/ui/button.jsx";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Component() {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardDescription>This Week</CardDescription>
                <CardTitle className="text-4xl">$1,329</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">+25% from last week</div>
            </CardContent>
        </Card>
    )
}


export const Patient = () => {

    const {id} = useParams();

    const [patient, setPatient] = useState({});

    const {logout} = useAuth();

    useEffect(() => {
        const fetchPatient = async () => {
            const response = await fetch(`https://health.shrp.dev/items/people/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('user')}`
                }
            });
            if(!response.ok) {
                if(response.status === 401) {
                    toast.error('Your session has expired');
                    logout();
                }
                return;
            }
            const data = await response.json();
            setPatient(data.data);
        }
        fetchPatient();
    }, []);

    const psychoData = patient?.physiologicalData?.map((value, index) => ({ id: index.toString(), value }));
    const activityData = patient?.physicalActivities?.map((value, index) => ({ id: index.toString(), value }));

    return (
        <main className="container mt-12">
            <Link to="/patients" className="transition mt-4 hover:opacity-50">
                <Button variant="ghost">
                    Back to Patients
                </Button>
            </Link>
            <div className="flex flex-col gap-4 items-start md:flex-row md:items-center">
                <img className="size-24 object-cover my-8 rounded-xl"
                     src={patient?.sex === 1 ? "https://www.toutelasignaletique.com/21032-thickbox_default/plaque-porte-picto-alu-decoupe-symbole-homme-5-couleurs-au-choix.jpg" : "https://www.toutelasignaletique.com/21028-large_default/plaque-porte-picto-alu-decoupe-symbole-femme-5-coloris-au-choix.jpg"}/>
                <h1 className="text-4xl font-bold mb-4 text-orange-500">{patient?.firstname} {patient?.lastname}</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Personal Informations</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-500">Height</p>
                            <p className="text-xl font-bold">{patient?.height} cm</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Weight</p>
                            <p className="text-xl font-bold">{patient?.weightStart} kg</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Age</p>
                            <p className="text-xl font-bold">Born in {patient?.birthyear}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Activity profile</p>
                            <p className="text-xl font-bold">{patient?.activityProfile?.charAt(0).toUpperCase() + patient?.activityProfile?.slice(1)}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex flex-col gap-8 md:flex-row">
                <div className="mt-8 w-full">
                    <h2 className="text-xl font-bold mb-4">Psychologic Data</h2>
                    <ResponsiveContainer width="100%" height={500}>
                        <LineChart data={psychoData}>
                            <Line type="monotone" dataKey="value" stroke="#8884d8"/>
                            <XAxis dataKey="id"/>
                            <YAxis/>
                            <Tooltip/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-8 w-full">
                    <h2 className="text-xl font-bold mb-4">Physical Activities</h2>
                    <ResponsiveContainer width="100%" height={500}>
                        <LineChart data={activityData}>
                            <Line type="monotone" dataKey="value" stroke="#8884d8"/>
                            <XAxis dataKey="id"/>
                            <YAxis/>
                            <Tooltip/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </main>
    )
}