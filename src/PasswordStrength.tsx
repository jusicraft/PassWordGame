import { useEffect, useMemo } from 'react';

interface PasswordStrengthProps {
    password: string;
    onStrengthCalculated: (strength: string) => void;
}

const evaluatePassword = (pwd: string) => {
    const criteria = [
        { id: 1, label: 'Délka hesla (minimálně 8 znaků)', met: pwd.length >= 8 },
        { id: 2, label: 'Obsahuje alespoň jedno velké písmeno', met: /[A-Z]/.test(pwd) },
        { id: 3, label: 'Obsahuje alespoň jedno číslo', met: /[0-9]/.test(pwd) },
        { id: 4, label: 'Obsahuje alespoň jeden speciální znak', met: /[!@#$%^&*]/.test(pwd) }
    ];

    const calculatedScore = criteria.filter(c => c.met).length;

    let strength = 'Příliš krátké';
    let color = 'var(--muted-text)';

    if (pwd.length > 0) {
        if (calculatedScore <= 2) {
            strength = 'Slabé';
            color = 'var(--danger-color)';
        } else if (calculatedScore === 3) {
            strength = 'Střední';
            color = 'var(--warning-color)';
        } else if (calculatedScore === 4) {
            strength = 'Silné';
            color = 'var(--success-color)';
        }
    } else {
        strength = 'Zadejte heslo';
    }

    return { strength, color, calculatedScore, criteria };
};

export default function PasswordStrength({ password, onStrengthCalculated }: PasswordStrengthProps) {

    const result = useMemo(() => evaluatePassword(password), [password]);

    const { strength, color, calculatedScore, criteria } = result;

    useEffect(() => {
        onStrengthCalculated(strength);
    }, [strength, onStrengthCalculated]);

    const barWidth = password.length === 0 ? '0%' : `${(calculatedScore / 4) * 100}%`;

    return (
        <div className="mb-4">
            <div className="d-flex justify-content-between mb-2">
                <span className="fw-bold">Hodnocení síly:</span>
                <span className="fw-bold" style={{ color: color }}>{strength}</span>
            </div>

            <div className="progress mb-3" style={{ height: '10px', backgroundColor: 'var(--bg-color)' }}>
                <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    style={{ width: barWidth, backgroundColor: color, transition: 'width 0.4s ease' }}
                />
            </div>

            <ul className="list-unstyled mb-0">
                {criteria.map((criterion) => (
                    <li key={criterion.id} className="d-flex align-items-center mb-2">
                        <span
                            className="me-2 fw-bold"
                            style={{ color: criterion.met ? 'var(--success-color)' : 'var(--muted-text)' }}
                        >
                            {criterion.met ? '✓' : '○'}
                        </span>
                        <span
                            className={criterion.met ? 'text-decoration-line-through text-muted-custom' : ''}
                            style={{ transition: 'color 0.3s' }}
                        >
                            {criterion.label}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}