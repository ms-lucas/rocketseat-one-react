import { PlayIcon } from '@phosphor-icons/react'
import { CountDownSeparator, CountDownWrapper, FormWrapper, HomeWrapper, MinutesAmountInput, StartCountDownButton, TaskInput } from './styles'

export function Home() {
    return (
        <HomeWrapper>
            <form action="">
                <FormWrapper>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput id="task" list="task-suggestions" placeholder='De um nome para o seu projeto'/>
                    <datalist id="task-suggestions">
                        <option value="Projeto 1"/>
                        <option value="Projeto 2"/>
                        <option value="Projeto 3"/>
                    </datalist>
                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput type="number" id="minutesAmount" step={5} min={5} max={60} placeholder='00'/>

                    <span>minutos.</span>
                </FormWrapper>

                <CountDownWrapper>
                    <span>0</span>
                    <span>0</span>
                    <CountDownSeparator>:</CountDownSeparator>
                    <span>0</span>
                    <span>0</span>
                </CountDownWrapper>

                <StartCountDownButton type="submit" disabled>
                    <PlayIcon size={24} />
                    Começar
                </StartCountDownButton>
            </form>
        </HomeWrapper>
    )
}