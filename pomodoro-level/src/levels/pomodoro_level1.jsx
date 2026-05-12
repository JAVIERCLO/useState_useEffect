import { useState, useEffect, useRef } from 'react';

function Pomodoro() {
    const [timeLeft, setTimeLeft] = useState(1500);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
        intervalRef.current = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
    }
    if (timeLeft === 0) setIsRunning(false);
    return () => clearInterval(intervalRef.current);
    }, [isRunning, timeLeft]);

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    const toggleTimer = () => setIsRunning(prev => !prev);
    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(1500);
    };

    return (
        <div>
        <h2>{formatTime(timeLeft)}</h2>
        <button onClick={toggleTimer}>{isRunning ? 'Pausar' : 'Iniciar'}</button>
        <button onClick={resetTimer}>Reiniciar</button>
        </div>
    );
}

export default Pomodoro;