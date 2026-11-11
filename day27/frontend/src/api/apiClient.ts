const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN;

if(!API_BASE_URL) throw new Error('VITE_API_BASE_URL is not configured.');

export async function APIClient(path: string, method: string, headers: Record<string, string>, body: Record<string, string>){
    const request = new Request(`${API_BASE_URL}${path}`, {
        method,
        headers: {
            ...headers,
            "authorization": `Bearer ${API_ADMIN_TOKEN}`
        },
        body: JSON.stringify(body)
    });
    const response = await fetch(request);
    if(!response.ok) throw new Error('API Client Error');
    return response.json();
}
