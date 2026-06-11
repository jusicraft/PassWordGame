import { useMemo } from 'react';
import type {PasswordData} from './App';

export default function CharacterSequenceValidator({ passwordData }: { passwordData: PasswordData }) {
    const validationResult = useMemo(() => {
        const text = passwordData.text;

        let sequenceCount = 0;

        for (let i = 0; i <= text.length - 4; ) {
            const chunk = text.slice(i, i + 4);
            if (
                /[a-z]/.test(chunk) &&
                /[A-Z]/.test(chunk) &&
                /[0-9]/.test(chunk) &&
                /[!@#$%^&*]/.test(chunk)
            ) {
                sequenceCount++;
                i += 4;
            } else {
                i++;
            }
        }

        return { isValid: sequenceCount > 0, sequenceCount };
    }, [passwordData.text]);

    if (!passwordData.text) return null;

    return (
        <div className="card custom-surface mb-3">
            <div className="card-body py-3">
                <h6 className="card-title fw-bold mb-2">Hustota sekvence (4 typy znaků za sebou)</h6>
                <div className="d-flex justify-content-between align-items-center">
          <span style={{ color: validationResult.isValid ? 'var(--success-color)' : 'var(--danger-color)' }}>
            <strong>{validationResult.isValid ? '✓ Splněno' : '✗ Nesplněno'}</strong>
          </span>
                    <span className="badge" style={{ backgroundColor: 'var(--primary-color)' }}>
            Počet sekvencí: {validationResult.sequenceCount}
          </span>
                </div>
            </div>
        </div>
    );
}