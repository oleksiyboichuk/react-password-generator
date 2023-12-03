import React, { useEffect, useState } from 'react';
import './PasswordGenerator.css';
import copyIcon from '../assets/copy-icon.svg';
import Modal from './modal/Modal';

const lowercaseList = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbersList = '0123456789';
const symbolsList = "!@#$%^&*()?";

function PasswordGenerator() {

    const [password, setPassword] = useState('');
    const [lowerCase, setLowerCase] = useState(true);
    const [upperCase, setUpperCase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [symbols, setSymbols] = useState(true);
    const [passwordLength, setPasswordLength] = useState(8);
    const [selectedChoices, setSelectedChoices] = useState(['lowercase', 'uppercase', 'numbers', 'symbols']);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        generatePassword();
    }, [passwordLength]);

    const handleCheckbox = (type) => {
        let tempChoices = selectedChoices;
        if (tempChoices.includes(type)) {
            const index = tempChoices.indexOf(type);
            tempChoices.splice(index, 1);
        }
        else {
            tempChoices.push(type);
        }
        console.log(tempChoices);
        setSelectedChoices(tempChoices);
    }

    const generatePassword = () => {

        let characterList = '';

        if (lowerCase) {
            characterList += lowercaseList;
        }
        if (upperCase) {
            characterList += uppercaseList;
        }
        if (numbers) {
            characterList += numbersList;
        }
        if (symbols) {
            characterList += symbolsList;
        }

        let tempPassword = '';
        const characterListLength = characterList.length;

        for (let i = 0; i < passwordLength; i++) {
            const characterIndex = Math.round(Math.random() * characterListLength);
            tempPassword += characterList.charAt(characterIndex);
        }

        setPassword(tempPassword);
    }

    const copyPassword = async () => {
        const copiedText = await navigator.clipboard.readText();
        if (password.length && copiedText !== password) {
            navigator.clipboard.writeText(password);
        }
        // Показати модальне вікно при копіюванні паролю
        setIsModalVisible(true);
        // Почекати 2 секунди та сховати модальне вікно
        setTimeout(() => {
            setIsModalVisible(false);
        }, 1000);
    }

    return (
        <>
            <div className='container'>
                <h2 className='title'>Генератор Паролю</h2>
                <div className="password-wrapper">
                    <div className="password-area">
                        <div className="password">
                            <input type="text" value={password} disabled placeholder='Click on the Generate Password' />
                            {/* <img src='https://cdn1.iconfinder.com/data/icons/modern-universal/32/icon-49-512.png' alt="copyicon" className='copyIcon' onClick={copyPassword} /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="copyIcon bi bi-copy" viewBox="0 0 16 16" onClick={copyPassword}>
                                <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="setting">
                    <h3>Налаштуйте свій пароль</h3>
                    <div className="customize">
                        <div className="checkboxes">
                            <div className="left">
                                <div className="checkbox-field">
                                    <input type="checkbox" name="lower" id="lower" checked={lowerCase} disabled={selectedChoices.length === 1 && selectedChoices.includes("lowercase")} onChange={() => { setLowerCase(!lowerCase); handleCheckbox('lowercase'); }} />
                                    <label htmlFor="lower">Додати нижній регістр (a-z)</label>
                                </div>
                                <div className="checkbox-field">
                                    <input type="checkbox" name="upper" id="upper" checked={upperCase} disabled={selectedChoices.length === 1 && selectedChoices.includes('uppercase')} onChange={() => { setUpperCase(!upperCase); handleCheckbox('uppercase'); }} />
                                    <label htmlFor="upper">Додати верхній регістр (A-Z)</label>
                                </div>
                            </div>
                            <div className="right">
                                <div className="checkbox-field">
                                    <input type="checkbox" name="numbers" id="numbers" checked={numbers} disabled={selectedChoices.length === 1 && selectedChoices.includes('numbers')} onChange={() => { setNumbers(!numbers); handleCheckbox('numbers'); }} />
                                    <label htmlFor="numbers">Додати цифри (0-9)</label>
                                </div>
                                <div className="checkbox-field">
                                    <input type="checkbox" name="symbols" id="symbols" checked={symbols} disabled={selectedChoices.length === 1 && selectedChoices.includes('symbols')} onChange={() => { setSymbols(!symbols); handleCheckbox('symbols'); }} />
                                    <label htmlFor="symbols">Додати спеціальні символи (&-#)</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="password-length">
                    <h3>Довжина паролю</h3>
                    <div className="slider">
                        <p className="rangeValue">{passwordLength}</p>
                        <div className="range">
                            <input type="range" min={8} max={40} defaultValue={passwordLength} onChange={(event) => setPasswordLength(event.currentTarget.value)} />
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <button type='button' onClick={generatePassword}>Генерувати</button>
                </div>
            </div>
            {isModalVisible && <Modal text="Скопійовано!" />}
        </>
    )
}

export default PasswordGenerator;