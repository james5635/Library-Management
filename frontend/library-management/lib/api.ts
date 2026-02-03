const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
    books: {
        getAll: () => fetch(`${API_BASE_URL}/books`).then(res => res.json()),
        getOne: (isbn: string) => fetch(`${API_BASE_URL}/books/${isbn}`).then(res => res.json()),
        create: (book: any) => fetch(`${API_BASE_URL}/books`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        }).then(res => res.json()),
        update: (isbn: string, book: any) => fetch(`${API_BASE_URL}/books/${isbn}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        }).then(res => res.json()),
        delete: (isbn: string) => fetch(`${API_BASE_URL}/books/${isbn}`, { method: 'DELETE' })
    },
    readers: {
        getAll: () => fetch(`${API_BASE_URL}/readers`).then(res => res.json()),
        create: (reader: any) => fetch(`${API_BASE_URL}/readers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reader)
        }).then(res => res.json()),
        delete: (id: number) => fetch(`${API_BASE_URL}/readers/${id}`, { method: 'DELETE' })
    },
    loans: {
        getAll: () => fetch(`${API_BASE_URL}/loans`).then(res => res.json()),
        create: (loan: any) => fetch(`${API_BASE_URL}/loans`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loan)
        }).then(res => res.json()),
        return: (id: number) => fetch(`${API_BASE_URL}/loans/${id}/return`, { method: 'PUT' }).then(res => res.json())
    },
    auth: {
        login: (credentials: any) => fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        }).then(res => res.json())
    }
};
