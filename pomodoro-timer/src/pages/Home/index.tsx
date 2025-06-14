import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalmIcon, PlayIcon } from '@phosphor-icons/react'
import { createContext, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import z from 'zod'
import { Countdown } from './components/Countdown'
import { NewCycleForm } from './components/NewCycleForm'
import { HomeWrapper, StartCountdownButton, StopCountdownButton } from './styles'

const newCycleFormValidationSchema = z.object({
    task: z.string().min(1, "Informe a tarefa"),
    minutesAmount: z.number().min(1).max(60)
})

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

interface CyclesContextType {
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    setSecondsPassed: (seconds: number) => void
    markCurrentCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })

    const { handleSubmit, watch, reset } = newCycleForm

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const task = watch('task')

    function handleCreateNewCycle({ task, minutesAmount }: NewCycleFormData) {
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

        reset()
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

    function handleInterruptCycle() {
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

    const isSubmitButtonDisabled = !task

    return (
        <HomeWrapper>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>

                <CyclesContext.Provider value={{ activeCycle, activeCycleId, amountSecondsPassed, markCurrentCycleAsFinished, setSecondsPassed }}>
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <Countdown />
                </CyclesContext.Provider>

                {activeCycle ?
                    <StopCountdownButton onClick={handleInterruptCycle} type="button">
                        <HandPalmIcon size={24} />
                        Interromper
                    </StopCountdownButton> :
                    <StartCountdownButton type="submit" disabled={isSubmitButtonDisabled}>
                        <PlayIcon size={24} />
                        Começar
                    </StartCountdownButton>
                }
            </form>
        </HomeWrapper>
    )
}