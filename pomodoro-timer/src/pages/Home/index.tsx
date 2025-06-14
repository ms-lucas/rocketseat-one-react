import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalmIcon, PlayIcon } from '@phosphor-icons/react'
import { FormProvider, useForm } from 'react-hook-form'
import z from 'zod'
import { Countdown } from './components/Countdown'
import { NewCycleForm } from './components/NewCycleForm'
import { HomeWrapper, StartCountdownButton, StopCountdownButton } from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormValidationSchema = z.object({
    task: z.string().min(1, "Informe a tarefa"),
    minutesAmount: z.number().min(1).max(60)
})

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>

export function Home() {

    const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })

    const { handleSubmit, watch, reset } = newCycleForm

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset()
    }

    const task = watch('task')
    const isSubmitButtonDisabled = !task

    return (
        <HomeWrapper>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />
                {activeCycle ?
                    <StopCountdownButton onClick={interruptCurrentCycle} type="button">
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