import React, { FC, useEffect, useState } from 'react';

interface TimerCountdownProps {
    seconds: number,
    render: (timeLeft: number) => React.ReactNode,
    onCountdownReached: () => void,
}

const TimerCountdown: FC<TimerCountdownProps> = (props) => {
    const [timeLeft, setTimeLeft] = useState<number>(props.seconds);

    useEffect(() => {
        var interval = setInterval(() => {
            setTimeLeft(currentTimeLeft => {
                if (currentTimeLeft == 0) {
                    clearInterval(interval);
                    return currentTimeLeft;
                }
                return currentTimeLeft - 1;
            });
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, [props.seconds]);

    useEffect(() => {
        if (timeLeft == 0) {
            props.onCountdownReached();
        }
    }, [timeLeft])

    return (
        <div className={"timer-countdown"}>
            { props.render(timeLeft) }
        </div>
    )
}

export default TimerCountdown;