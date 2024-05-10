import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const AppUserList = () => {
    const [users, setUsers] = useState([]);

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
