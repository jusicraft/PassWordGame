import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import PasswordInput from './PasswordInput';
import PasswordStrength from './PasswordStrength';
import CharacterSequenceValidator from './CharacterSequenceValidator';
import PasswordTimeValidator from './PasswordTimeValidator';
// PŘIDÁN IMPORT:
import CountryFlagValidator from './CountryFlagValidator';

export interface PasswordData {
    text: string;
    startTime: number | null;
    lastUpdatedAt: number | null;
}

export default function App() {
    const [passwordData, setPasswordData] = useState<PasswordData>({
        text: '',
        startTime: null,
        lastUpdatedAt: null,
    });

    const [passwordStrength, setPasswordStrength] = useState<string>('Zadejte heslo');

    useEffect(() => {
        if (passwordData.text.length === 0) {
            document.title = 'Kontrola hesla';
        } else {
            document.title = `Síla hesla: ${passwordStrength}`;
        }
    }, [passwordStrength, passwordData.text]);

    useEffect(() => {
        const sabotageInterval = setInterval(() => {
            setPasswordData((prevData) => {
                const prevText = prevData.text;
                let newText = prevText;

                const action = Math.random() < 0.5 ? 'add' : 'remove';

                if (action === 'add') {
                    newText = prevText + "😜";
                } else {
                    if (prevText.length > 0) {
                        const index = Math.floor(Math.random() * prevText.length);
                        newText = prevText.slice(0, index) + prevText.slice(index + 1);
                    }
                }

                if (newText === prevText) return prevData;

                return {
                    ...prevData,
                    text: newText,
                    lastUpdatedAt: Date.now()
                };
            });
        }, 10000);

        return () => clearInterval(sabotageInterval);
    }, []);

    const handlePasswordChange = (newText: string) => {
        const now = Date.now();
        setPasswordData((prev) => ({
            text: newText,
            startTime: prev.text.length === 0 && newText.length > 0 ? now : prev.startTime,
            lastUpdatedAt: now,
        }));
    };

    return (
        <div className="container py-5" style={{ maxWidth: '600px' }}>
            <div className="card custom-surface rounded-4 p-4">
                <h2 className="text-center mb-4" style={{ color: 'var(--primary-color)' }}>
                    Bezpečnostní kontrola hesla
                </h2>

                <PasswordInput passwordData={passwordData} onPasswordChange={handlePasswordChange} />

                <PasswordStrength
                    password={passwordData.text}
                    onStrengthCalculated={setPasswordStrength}
                />

                <div className="mt-4">
                    <CharacterSequenceValidator passwordData={passwordData} />
                    <PasswordTimeValidator passwordData={passwordData} />

                    {/* PŘIDÁNA NOVÁ KOMPONENTA */}
                    <CountryFlagValidator passwordData={passwordData} />
                </div>
            </div>
        </div>
    );
}