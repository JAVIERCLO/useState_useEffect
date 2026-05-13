import { useState, useEffect, useRef } from 'react';

const WORK_TIME = 1500; // 25 min
const BREAK_TIME = 300; // 5 min

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function Pomodoro() {
    const [timeLeft, setTimeLeft] = useState(WORK_TIME);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('work');
    const [sessions, setSessions] = useState([]);
    const intervalRef = useRef(null);

  // intervalo del timer
    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
            setTimeLeft(prev => prev - 1);
            }, 1000);
        }
    return () => clearInterval(intervalRef.current);
    }, [isRunning, timeLeft]);

  // cambio entre work y break cuando llega a 0
    useEffect(() => {
        if (timeLeft === 0) {
            if (mode === 'work') {
                setSessions(prev => [...prev, {
                    id: Date.now(),
                    type: 'work',
                    duration: WORK_TIME,
                    completedAt: new Date()
                }]);
            }
        const nextMode = mode === 'work' ? 'break' : 'work';
        setMode(nextMode);
        setTimeLeft(nextMode === 'work' ? WORK_TIME : BREAK_TIME);
        setIsRunning(true);
        }
    }, [timeLeft]);

    const toggleTimer = () => setIsRunning(prev => !prev);
    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(WORK_TIME);
        setMode('work');
        setSessions([]);
    };

    return (
        <div>
        <h3>{mode === 'work' ? 'Trabajo' : 'Descanso'}</h3>
        <h2>{formatTime(timeLeft)}</h2>
        <button onClick={toggleTimer}>{isRunning ? 'Pausar' : 'Iniciar'}</button>
        <button onClick={resetTimer}>Reiniciar</button>

        <ul>
            {sessions.map((s, i) => (
            <li key={s.id}>
                Sesión #{i + 1} · {formatTime(s.duration)} · {s.completedAt.toLocaleTimeString()}
            </li>
            ))}
        </ul>
        </div>
    );
}

export default Pomodoro;