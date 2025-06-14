import { differenceInSeconds } from "date-fns";
import { useContext, useEffect } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { CountDownSeparator, CountDownWrapper } from "./styles";

export function Countdown() {
    const { activeCycle, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed } = useContext(CyclesContext)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    useEffect(() => {
        let interval: number;

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)
                if (secondsDifference >= totalSeconds) {
                    markCurrentCycleAsFinished()
                    setSecondsPassed(totalSeconds)
                    clearInterval(interval)
                } else {
                    setSecondsPassed(secondsDifference)
                }
            }, 1000)
        }
    }, [activeCycle, markCurrentCycleAsFinished, totalSeconds, setSecondsPassed])

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
        <CountDownWrapper>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <CountDownSeparator>:</CountDownSeparator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountDownWrapper>
    )
}