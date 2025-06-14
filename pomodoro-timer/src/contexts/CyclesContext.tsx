import { createContext, useState, type ReactNode } from "react";

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    setSecondsPassed: (seconds: number) => void
    markCurrentCycleAsFinished: () => void
    createNewCycle: (data: CreateCycleData) => void
    interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
    children: ReactNode
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)


    function createNewCycle({ task, minutesAmount }: CreateCycleData) {
        const newCycle: Cycle = {
            id: crypto.randomUUID(),
            task,
            minutesAmount,
            startDate: new Date()
        }

        setCycles((prev) => {
            return [...prev, newCycle]
        })

        setActiveCycleId(newCycle.id)
        setAmountSecondsPassed(0)

        //reset()
    }

    function interruptCurrentCycle() {
        setCycles((prev) => {
            return prev.map(cycle => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, interruptedDate: new Date() }
                }
                return cycle
            })
        })

        setActiveCycleId(null)
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {
        setCycles((prev) => {
            return prev.map(cycle => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, finishedDate: new Date() }
                }
                return cycle
            })
        })
    }

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                amountSecondsPassed,
                markCurrentCycleAsFinished,
                setSecondsPassed,
                createNewCycle,
                interruptCurrentCycle
            }}>
            {children}
        </CyclesContext.Provider>
    )
}
