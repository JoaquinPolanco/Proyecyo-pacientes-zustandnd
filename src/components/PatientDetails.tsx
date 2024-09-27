import { toast } from 'react-toastify'
import { Patient } from "../types"
import PatientsDetailItem from "./PatientsDetailItem"
import { usePatientStore } from "../store"

type PatientDetailsProps = {
    patient: Patient
}

export default function PatientDetails({ patient }: PatientDetailsProps) {

const deletePatient = usePatientStore((state) => state.deletePatient)
const getPatientByID = usePatientStore((state) => state.getPatientByID)
const handleClick = () => {
    deletePatient(patient.id)
    toast.error('Paciente Eliminado Correctamente')
}

    return (
        <div className="mx-5 my-5 px-5 py-5 bg-white shadow-md rounded-xl ">
            <PatientsDetailItem
                label="ID"
                data={patient.id}
            />
            <PatientsDetailItem
                label="Nombre"
                data={patient.name}
            />
            <PatientsDetailItem
                label="Propietario"
                data={patient.caretaker}
            />
            <PatientsDetailItem
                label="Email"
                data={patient.email}
            />
            <PatientsDetailItem
                label="Fecha alta"
                data={patient.date.toString()}
            />
            <PatientsDetailItem
                label="Sintomas"
                data={patient.symptoms}
            />

            <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10 ">
                <button className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold 
                uppercase rounded-lg"
                onClick={() => getPatientByID(patient.id)}
                >
                    Editar
                </button>
                <button className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold 
                uppercase rounded-lg"
                onClick={handleClick}
                >
                    ELiminar
                </button>

            </div>

        </div>
    )
}
