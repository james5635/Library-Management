const API_BASE_URL = 'http://localhost:8080/api';
export const STORAGE_BASE_URL = 'http://localhost:8080';

const handleResponse = async (res: Response) => {
    if (!res.ok) {
        let errorMsg = `API error ${res.status}: ${res.statusText}`;
        try {
            const body = await res.text();
            if (body) errorMsg += ` - ${body}`;
        } catch (e) { }
        throw new Error(errorMsg);
    }
    // Check if body is empty
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return res.json();
    }
    return null;
};

export const api = {
    books: {
        getAll: (search?: string, category?: string) => {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (category) params.append('category', category);
            const query = params.toString() ? `?${params.toString()}` : '';
            return fetch(`${API_BASE_URL}/books${query}`).then(handleResponse);
        },
        getOne: (isbn: string) => fetch(`${API_BASE_URL}/books/${isbn}`).then(handleResponse),
        create: (book: any) => fetch(`${API_BASE_URL}/books`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        }).then(handleResponse),
        update: (isbn: string, book: any) => fetch(`${API_BASE_URL}/books/${isbn}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        }).then(handleResponse),
        delete: (isbn: string) => fetch(`${API_BASE_URL}/books/${isbn}`, { method: 'DELETE' }).then(handleResponse)
    },
    readers: {
        getAll: () => fetch(`${API_BASE_URL}/readers`).then(handleResponse),
        create: (reader: any) => fetch(`${API_BASE_URL}/readers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reader)
        }).then(handleResponse),
        delete: (id: number) => fetch(`${API_BASE_URL}/readers/${id}`, { method: 'DELETE' }).then(handleResponse)
    },
    loans: {
        getAll: () => fetch(`${API_BASE_URL}/loans`).then(handleResponse),
        create: (loan: any) => fetch(`${API_BASE_URL}/loans`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loan)
        }).then(handleResponse),
        returnBook: (id: number) => fetch(`${API_BASE_URL}/loans/${id}/return`, {
            method: 'PUT'
        }).then(handleResponse),
        checkActive: (email: string, isbn: string) => fetch(`${API_BASE_URL}/loans/check?email=${email}&isbn=${isbn}`).then(handleResponse)
    },
    bookmarks: {
        getAll: (email: string) => fetch(`${API_BASE_URL}/bookmarks/user/${email}`).then(handleResponse),
        toggle: (email: string, isbn: string) => fetch(`${API_BASE_URL}/bookmarks/toggle`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, isbn })
        }).then(handleResponse),
        check: (email: string, isbn: string) => fetch(`${API_BASE_URL}/bookmarks/check?email=${email}&isbn=${isbn}`).then(handleResponse)
    },
    notifications: {
        getAll: () => fetch(`${API_BASE_URL}/notifications`).then(handleResponse),
        getByUser: (email: string) => fetch(`${API_BASE_URL}/notifications/user/${email}`).then(handleResponse),
        markRead: (id: number) => fetch(`${API_BASE_URL}/notifications/${id}/read`, { method: 'PATCH' }).then(handleResponse),
        create: (notification: any) => fetch(`${API_BASE_URL}/notifications`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(notification)
        }).then(handleResponse)
    },
    assets: {
        getByBook: (isbn: string) => fetch(`${API_BASE_URL}/assets/book/${isbn}`).then(handleResponse),
        create: (asset: any) => fetch(`${API_BASE_URL}/assets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(asset)
        }).then(handleResponse)
    },
    auth: {
        login: (credentials: any) => fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        }).then(handleResponse)
    },
    files: {
        upload: (file: File) => {
            const formData = new FormData();
            formData.append('file', file);
            return fetch(`${API_BASE_URL}/upload`, {
                method: 'POST',
                body: formData
            }).then(handleResponse);
        }
    },
    fines: {
        getAll: () => fetch(`${API_BASE_URL}/fines`).then(handleResponse),
        pay: (id: number) => fetch(`${API_BASE_URL}/fines/${id}/pay`, {
            method: 'PATCH'
        }).then(handleResponse)
    },
    reports: {
        getStats: () => fetch(`${API_BASE_URL}/reports/stats`).then(handleResponse)
    }
};
