import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import { DraftPatient, Patient } from './types'


type PätientState = {
    patients: Patient[]
    activeid: Patient['id']
    addPatient: (data: DraftPatient) => void
    deletePatient: (id: Patient['id']) => void
    getPatientByID: (id: Patient['id']) => void
    updatePatient: (data: DraftPatient) => void
}

const createPatient = (patient: DraftPatient): Patient => {
    return { ...patient, id: uuidv4() }
}

export const usePatientStore = create<PätientState>()(devtools(persist((set) => ({
    patients: [],
    activeid: '',
    addPatient: (data) => {
        const newPatient = createPatient(data)
        set((state) => ({
            patients: [...state.patients, newPatient]
        }))
    },
    deletePatient: (id) => {
        set((state) => ({
            patients: state.patients.filter(patient => patient.id !== id)

        }))
    },
    getPatientByID: (id) => {
        set(() => ({
            activeid: id
        }))
    },
    updatePatient: (data) => {
        set((state) => ({
            patients: state.patients.map(patient => patient.id === state.activeid ? { id: state.activeid, ...data }
                : patient),
            activeid: ''

        }))
    }

}), {
    name: 'patient-storage'
   
})
))