import { FormWrapper, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { useFormContext } from "react-hook-form";

export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext)
    const { register } = useFormContext()

    return (
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
    )
}