"use client";

import React, { useState } from "react";
import Pagination from "../../..//Pagination";

export default function UsersTable({ users, onEdit, onDelete }) {
    // Пагинация
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const totalPages = Math.ceil(users.length / rowsPerPage);

    const currentUsers = users.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <div>
            <table className="users-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Телефон</th>
                    <th>Email</th>
                    <th>Роль</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {currentUsers.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.phoneNumber || "—"}</td>
                        <td>{user.email}</td>
                        <td>{user.role || "—"}</td>
                        <td>
                            <button className="action-btn edit" onClick={() => onEdit(user)}>
                                Редактировать
                            </button>
                            <button
                                className="action-btn delete"
                                onClick={() => onDelete(user.id)}
                            >
                                Удалить
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(value) => {
                    setRowsPerPage(value);
                    setCurrentPage(1); // сброс на первую страницу при изменении количества строк
                }}
            />

            <style jsx>{`
        .users-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
          font-size: 0.9rem;
        }
        .users-table th,
        .users-table td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid #e0e0e0;
        }
        .users-table th {
          background: #f7f7f7;
          font-weight: 600;
        }
        .users-table tr:hover {
          background: #f1f1f1;
        }
        .action-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          margin-right: 0.5rem;
          border-radius: 4px;
          transition: background 0.3s ease;
        }
        .action-btn.edit {
          color: #0070f3;
        }
        .action-btn.edit:hover {
          background: #e0f0ff;
        }
        .action-btn.delete {
          color: #ff3b30;
        }
        .action-btn.delete:hover {
          background: #ffecec;
        }
      `}</style>
        </div>
    );
}