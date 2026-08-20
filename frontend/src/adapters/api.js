const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest(endpoint, options = {}) {

    const url = `${API_URL}${endpoint}`;

    const token =
        typeof window !== "undefined"
            ? localStorage.getItem("access_token")
            : null;

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const respuesta = await fetch(url, {
        ...options,
        headers,
    });

    if (!respuesta.ok) {

        const error = await respuesta.text();

        console.error(
            "Error backend:",
            error
        );

        const errorObj = new Error(
            `Error ${respuesta.status}: ${error}`
        );

        errorObj.status = respuesta.status;

        throw errorObj;
    }

    return await respuesta.json();
}