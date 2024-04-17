import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useAuth} from "@/contexts/auth.context.jsx";
import {toast} from "sonner";

export const Patients = () => {

    const [patients, setPatients] = useState([])
    const {logout} = useAuth();

    useEffect(() => {
        const fetchPatients = async () => {
            const response = await fetch('https://health.shrp.dev/items/people', {
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
            setPatients(data.data);
        }
        fetchPatients();
    }, []);

    return (
        <main className="container">
            <div className='my-12'>
                <h1 className="text-2xl font-bold  text-orange-500">Patients <span
                    className="">({patients?.length})</span></h1>
                <p className="text-gray-500">Here you can retrieve all the patients.</p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {patients?.map((patient) => (
                    <li key={patient.id}>
                    <Link to={`/patient/${patient.id}`} className="bg-muted p-4 rounded-lg shadow flex transition gap-4 hover:bg-muted-foreground">
                            <img className="size-8 object-cover rounded-sm" src={patient?.sex === 1 ? "https://www.toutelasignaletique.com/21032-thickbox_default/plaque-porte-picto-alu-decoupe-symbole-homme-5-couleurs-au-choix.jpg" : "https://www.toutelasignaletique.com/21028-large_default/plaque-porte-picto-alu-decoupe-symbole-femme-5-coloris-au-choix.jpg"} />
                            <div>
                                <h2 className="text-xl font-bold">{patient.firstname} {patient.lastname}</h2>
                                <p className="text-gray-500">{patient.height} cm</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}