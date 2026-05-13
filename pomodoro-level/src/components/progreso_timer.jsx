function CircularProgress({ progress, timeLeft, mode, formatTime }) {
    const radius = 80;
    const stroke = 8;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    const color = mode === 'work' ? '#b44c33' : '#2a7d4f';

    return (
        <svg width={radius * 2} height={radius * 2}>
        <circle
            cx={radius} cy={radius}
            r={normalizedRadius}
            fill="none"
            stroke="#eee"
            strokeWidth={stroke}
        />
        <circle
            cx={radius} cy={radius}
            r={normalizedRadius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${radius} ${radius})`}
            style={{ transition: 'stroke-dashoffset 0.5s linear' }}
        />
        <text
            x={radius} y={radius - 8}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="22"
            fontWeight="600"
            fill={color}
            fontFamily="monospace"
        >
            {formatTime(timeLeft)}
        </text>
        <text
            x={radius} y={radius + 16}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fill="#999"
            fontFamily="sans-serif"
        >
            {mode === 'work' ? 'Trabajo' : 'Descanso'}
        </text>
        </svg>
    );
}

export default CircularProgress;