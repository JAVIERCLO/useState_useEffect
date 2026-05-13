import { useState, useEffect, useRef } from 'react';
import CircularProgress from '../components/progreso_timer';

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function Pomodoro() {
    const [workMins, setWorkMins] = useState(25);
    const [breakMins, setBreakMins] = useState(5);
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('work');
    const [sessions, setSessions] = useState([]);
    const intervalRef = useRef(null);

    const totalTime = mode === 'work' ? workMins * 60 : breakMins * 60;
    const progress = ((totalTime - timeLeft) / totalTime) * 100;
    const workSessions = sessions.filter(s => s.type === 'work');
    const totalWorkTime = workSessions.reduce((acc, s) => acc + s.duration, 0);

    // intervalo del timer
    useEffect(() => {
        if (isRunning && timeLeft > 0) {
        intervalRef.current = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning, timeLeft]);

    // cambio de modo al llegar a 0 + sonido
    useEffect(() => {
        if (timeLeft === 0) {
        try { new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg').play(); } catch (e) {}

        if (mode === 'work') {
            setSessions(prev => [...prev, {
            id: Date.now(),
            type: 'work',
            duration: workMins * 60,
            completedAt: new Date()
            }]);
        }
        const nextMode = mode === 'work' ? 'break' : 'work';
        setMode(nextMode);
        setTimeLeft(nextMode === 'work' ? workMins * 60 : breakMins * 60);
        setIsRunning(true);
        }
    }, [timeLeft]);

    // sincronizar timeLeft cuando cambia la configuración
    useEffect(() => {
        if (!isRunning) {
        setTimeLeft(mode === 'work' ? workMins * 60 : breakMins * 60);
        }
    }, [workMins, breakMins]);

    const toggleTimer = () => setIsRunning(prev => !prev);
    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(workMins * 60);
        setMode('work');
        setSessions([]);
    };
    const savePartial = () => {
        const elapsed = totalTime - timeLeft;
        if (elapsed > 0) {
        setSessions(prev => [...prev, {
            id: Date.now(),
            type: 'work (parcial)',
            duration: elapsed,
            completedAt: new Date()
        }]);
        }
    };

    return (
        <div>
        <div>
            <label>
            Trabajo (min):
            <input
                type="number" min="1" max="60" value={workMins}
                disabled={isRunning}
                onChange={e => setWorkMins(Math.max(1, Math.min(60, +e.target.value || 1)))}
            />
            </label>
            <label>
            Descanso (min):
            <input
                type="number" min="1" max="60" value={breakMins}
                disabled={isRunning}
                onChange={e => setBreakMins(Math.max(1, Math.min(60, +e.target.value || 1)))}
            />
            </label>
        </div>

        <h3>{mode === 'work' ? 'Trabajo' : 'Descanso'}</h3>
        <CircularProgress
            progress={progress}
            timeLeft={timeLeft}
            mode={mode}
            formatTime={formatTime}
        />

        <button onClick={toggleTimer}>{isRunning ? 'Pausar' : 'Iniciar'}</button>
        <button onClick={resetTimer}>Reiniciar</button>
        {mode === 'work' && (
            <button onClick={savePartial}>Guardar parcial</button>
        )}

        <p>Sesiones de trabajo: {workSessions.length}</p>
        <p>Tiempo acumulado: {formatTime(totalWorkTime)}</p>

        <ul>
            {sessions.map((s, i) => (
            <li key={s.id}>
                #{i + 1} · {s.type} · {formatTime(s.duration)} · {s.completedAt.toLocaleTimeString()}
            </li>
            ))}
        </ul>
        </div>
    );
    }

export default Pomodoro;