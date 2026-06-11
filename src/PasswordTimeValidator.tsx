import { useMemo } from 'react';
import type {PasswordData} from './App';

export default function PasswordTimeValidator({ passwordData }: { passwordData: PasswordData }) {
    const timeValidation = useMemo(() => {
        if (!passwordData.startTime || !passwordData.lastUpdatedAt) {
            return { isValid: false, timeElapsed: 0 };
        }

        const timeElapsedSeconds = (passwordData.lastUpdatedAt - passwordData.startTime) / 1000;
        const isValid = timeElapsedSeconds >= 5;

        return { isValid, timeElapsed: timeElapsedSeconds };
    }, [passwordData.startTime, passwordData.lastUpdatedAt]);

    if (!passwordData.text) return null;

    return (
        <div className={`card custom-surface border-${timeValidation.isValid ? 'success' : 'danger'}`}>
            <div className="card-body py-3">
                <h6 className="card-title fw-bold mb-2">Anti-Bot kontrola</h6>
                {timeValidation.isValid ? (
                    <p className="mb-0" style={{ color: 'var(--success-color)' }}>
                        ✓ Přirozené psaní ({timeValidation.timeElapsed.toFixed(1)} s)
                    </p>
                ) : (
                    <div>
                        <p className="mb-1 fw-bold" style={{ color: 'var(--danger-color)' }}>
                            ⚠ Zadáno příliš rychle ({timeValidation.timeElapsed.toFixed(1)} s)
                        </p>
                        <small className="text-muted-custom">
                            Minimální čas je 5 sekund. Zkopírovali jste text nebo používáte script?
                        </small>
                    </div>
                )}
            </div>
        </div>
    );
}