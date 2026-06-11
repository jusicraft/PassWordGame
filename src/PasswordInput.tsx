import { useState } from 'react';
import type {PasswordData} from './App';

interface PasswordInputProps {
    passwordData: PasswordData;
    onPasswordChange: (text: string) => void;
}

export default function PasswordInput({ passwordData, onPasswordChange }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div className="mb-4">
            <label className="form-label fw-bold">Zadejte své heslo</label>
            <div className="input-group">
                <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control custom-input"
                    value={passwordData.text}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    placeholder="TajnéHeslo123!"
                />
                <button
                    className="btn btn-primary-custom"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? 'Skrýt' : 'Zobrazit'}
                </button>
            </div>
        </div>
    );
}