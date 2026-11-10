const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if(!API_BASE_URL) throw new Error('VITE_API_BASE_URL is not configured.');

export async function login(email: string, password: string){
    const request = new Request(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            email, password
        })
    });
    const response = await fetch(request);
    if(!response.ok) throw new Error('API Client Error');
    return response.json()
}