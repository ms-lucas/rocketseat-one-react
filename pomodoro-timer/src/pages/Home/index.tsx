import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalmIcon, PlayIcon } from '@phosphor-icons/react'
import { differenceInSeconds } from 'date-fns'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { CountDownSeparator, CountDownWrapper, FormWrapper, HomeWrapper, MinutesAmountInput, StartCountdownButton, StopCountdownButton, TaskInput } from './styles'

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

export function Home() {

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)


    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    useEffect(() => {
        let interval: number;

        if (activeCycle) {



            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)
                if (secondsDifference >= totalSeconds) {
                    setCycles((prev) => {
                        return prev.map(cycle => {
                            if (cycle.id === activeCycleId) {
                                return { ...cycle, finishedDate: new Date() }
                            }
                            return cycle
                        })
                    })
                    setAmountSecondsPassed(totalSeconds)

                    clearInterval(interval)

                    setActiveCycleId(null)
                } else {
                    setAmountSecondsPassed(secondsDifference)
                }
            }, 1000)
        }

        return () => { clearInterval(interval) }
    }, [activeCycle, totalSeconds, activeCycleId])

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

    const isSubmitButtonDisabled = !task

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60
    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds])

    return (
        <HomeWrapper>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormWrapper>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput id="task" list="task-suggestions" placeholder='De um nome para o seu projeto' disabled={!!activeCycle} {...register('task')} />
                    <datalist id="task-suggestions">
                        <option value="Projeto 1" />
                        <option value="Projeto 2" />
                        <option value="Projeto 3" />
                    </datalist>
                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput type="number" id="minutesAmount" step={1} min={1} max={60} placeholder='00' disabled={!!activeCycle} {...register('minutesAmount', { valueAsNumber: true })} />

                    <span>minutos.</span>
                </FormWrapper>

                <CountDownWrapper>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <CountDownSeparator>:</CountDownSeparator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountDownWrapper>

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