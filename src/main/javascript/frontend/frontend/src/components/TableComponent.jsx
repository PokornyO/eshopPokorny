import React from 'react';
import { useTable, useSortBy } from 'react-table';

// Základní opakovaně použitelná komponenta tabulky
const ReusableTable = ({ columns, data }) => {
    // Použijeme hook useTable k vytvoření základní tabulky
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns, // Definice sloupců
            data,    // Data, která budou zobrazena
        },
        useSortBy // Přidává možnost třídění
    );

    return (
        <table {...getTableProps()} style={styles.table}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                            style={styles.header}
                        >
                            {column.render('Header')}
                            {/* Zobrazí směr třídění, pokud je aktivní */}
                            {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row); // Připraví řádky k vykreslení
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => (
                            <td {...cell.getCellProps()} style={styles.cell}>
                                {cell.render('Cell')}
                            </td>
                        ))}
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
};
export default ReusableTable;
