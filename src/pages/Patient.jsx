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

export const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${label} : ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

export const CustomFeelingTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${label} : ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};


export const Patient = () => {

    const {id} = useParams();

    const [patient, setPatient] = useState({});
    const [psychicData, setPsychicData] = useState([])

    const {logout} = useAuth();

    useEffect(() => {
        const fetchPsychoData = async () => {
            const response = await fetch('https://health.shrp.dev/items/psychicData/', {
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
            const filteredData = data.data.filter((value) => value.people_id === id);
            setPsychicData(filteredData);
        }
        fetchPsychoData();
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

    const psychoDatum = patient?.physiologicalData?.map((value, index) => ({ id: index.toString(), value }));
    const activityDatum = patient?.physicalActivities?.map((value, index) => ({ id: index.toString(), value }));
    const psychicDatum = psychicData?.map((value, index) => ({ id: value.date, value: value.feeling }));

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
                        <LineChart data={psychoDatum}>
                            <Line type="monotone" dataKey="value" stroke="#8884d8"/>
                            <XAxis dataKey="id"/>
                            <YAxis/>
                            <Tooltip content={<CustomTooltip/>} cursor={{fill: "transparent"}}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-8 w-full">
                    <h2 className="text-xl font-bold mb-4">Physical Activities</h2>
                    <ResponsiveContainer width="100%" height={500}>
                        <LineChart data={activityDatum}>
                            <Line type="monotone" dataKey="value" stroke="#8884d8"/>
                            <XAxis dataKey="id"/>
                            <YAxis/>
                            <Tooltip content={<CustomTooltip/>} cursor={{fill: "transparent"}}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>

            </div>
            {psychicDatum.length > 0 ?
                <div className="mt-8 w-full">
                    <h2 className="text-xl font-bold mb-4">Feelings</h2>
                    <ResponsiveContainer width="100%" height={500}>
                        <LineChart data={psychicDatum}>
                            <Line type="monotone" dataKey="value" stroke="#8884d8"/>
                            <XAxis dataKey="id"/>
                            <Tooltip content={<CustomFeelingTooltip/>} cursor={{fill: "transparent"}}/>
                            <CartesianGrid strokeDasharray="3 3"/>
                        </LineChart>
                    </ResponsiveContainer>
                </div> : <div className="mt-8 w-full">
                    <h2 className="text-xl font-bold mb-4">Feeling</h2>
                    <p className="text-gray-500">No data available</p>
                </div>
            }
        </main>
    )
}