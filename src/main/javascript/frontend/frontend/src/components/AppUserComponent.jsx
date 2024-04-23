import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Pro HTTP požadavky
import moment from 'moment'; // Pro formátování dat
// CORS (Cross-Origin Resource Sharing) je bezpečnostní mechanismus,
// který omezuje komunikaci mezi různými doménami nebo porty.
// Tímto způsobem brání škodlivým útokům, jako je:
// - CSRF (Cross-Site Request Forgery): Útok, při kterém útočník provede akce jménem uživatele bez jeho vědomí.
// - XSS (Cross-Site Scripting): Útok, při kterém je škodlivý skript spuštěn na straně klienta (frontendu).
// - CORS také zabraňuje neautorizovanému přístupu k citlivým datům.
const AppUserList = () => {
    const [users, setUsers] = useState([]);

    // useEffect pro získání dat z REST API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/v1/app-user');
                setUsers(response.data);
            } catch (error) {
                console.error("Chyba při získávání dat:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Seznam Uživatelů</h1>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Uživatelské jméno</th>
                    <th>E-mail</th>
                    <th>Aktivní</th>
                    <th>Datum Vytvoření</th>
                    <th>Datum Aktualizace</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.active ? 'Ano' : 'Ne'}</td>
                        <td>{moment(user.creation_date).format('DD.MM.YYYY HH:mm')}</td>
                        <td>{moment(user.update_date).format('DD.MM.YYYY HH:mm')}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppUserList;
