import { useState, useMemo } from 'react';
import type {PasswordData} from './App';

interface CountryFlagValidatorProps {
    passwordData: PasswordData;
}

const countries = [
    "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "YE", "YT", "ZA", "ZM", "ZW"
];

export default function CountryFlagValidator({ passwordData }: CountryFlagValidatorProps) {
    const [selectedCountry] = useState(() => {
        return countries[Math.floor(Math.random() * countries.length)];
    });

    const validationResult = useMemo(() => {
        if (!passwordData.text) return { isValid: false };

        const isMet = passwordData.text.toUpperCase().includes(selectedCountry);
        return { isValid: isMet };
    }, [passwordData.text, selectedCountry]);

    if (!passwordData.text) return null;

    return (
        <div className={`card custom-surface mb-3 border-${validationResult.isValid ? 'success' : 'danger'}`}>
            <div className="card-body py-3 d-flex align-items-center">

                <div className="me-3">
                    <img
                        src={`https://flagsapi.com/${selectedCountry}/flat/64.png`}
                        alt={`Vlajka státu ${selectedCountry}`}
                        style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                    />
                </div>

                <div className="flex-grow-1">
                    <h6 className="card-title fw-bold mb-1">Geografická validace</h6>
                    {validationResult.isValid ? (
                        <p className="mb-0" style={{ color: 'var(--success-color)' }}>
                            ✓ Výborně! Heslo obsahuje kód <strong>{selectedCountry}</strong>.
                        </p>
                    ) : (
                        <p className="mb-0" style={{ color: 'var(--danger-color)' }}>
                            ✗ Heslo musí obsahovat kód tohoto státu: <strong>{selectedCountry}</strong>.
                        </p>
                    )}
                </div>

            </div>
        </div>
    );
}