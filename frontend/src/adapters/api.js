const API_URL =
    process.env.NEXT_PUBLIC_API_URL;


export async function apiRequest(
    endpoint,
    options = {},
    reintento = false
) {

    const url =
        `${API_URL}${endpoint}`;


    const token =
        typeof window !== "undefined"
            ? localStorage.getItem("access_token")
            : null;


    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };


    if (token) {

        headers.Authorization =
            `Bearer ${token}`;

    }

    const respuesta =
        await fetch(
            url,
            {
                ...options,
                headers,

                // IMPORTANTE:
                // permite enviar cookies
                credentials: "include",
            }
        );


    /*
     * =====================================================
     * ACCESS TOKEN EXPIRADO
     * =====================================================
     */

    if (
        respuesta.status === 401 &&
        !reintento &&
        endpoint !== "/auth/refresh"
    ) {

        console.log(
            "ACCESS TOKEN expirado."
        );

        console.log(
            "Intentando renovar sesión..."
        );


        try {

            /*
             * El refresh token está en una
             * cookie HttpOnly.
             *
             * JavaScript NO puede leerla.
             *
             * El navegador la envía automáticamente.
             */

            const refreshRespuesta =
                await fetch(
                    `${API_URL}/auth/refresh`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        credentials: "include",
                    }
                );


            /*
             * =================================================
             * REFRESH TOKEN INVÁLIDO / EXPIRADO
             * =================================================
             */

            if (!refreshRespuesta.ok) {

                const errorRefresh =
                    await refreshRespuesta.text();


                console.error(
                    "No se pudo renovar la sesión:",
                    errorRefresh
                );


                localStorage.removeItem(
                    "access_token"
                );


                const error =
                    new Error(
                        `Error ${refreshRespuesta.status}: ${errorRefresh}`
                    );

                error.status =
                    refreshRespuesta.status;


                throw error;

            }


            /*
             * =================================================
             * NUEVO ACCESS TOKEN
             * =================================================
             */

            const nuevosTokens =
                await refreshRespuesta.json();


            console.log(
                "Access token renovado correctamente."
            );


            localStorage.setItem(
                "access_token",
                nuevosTokens.access_token
            );


            /*
             * =================================================
             * REPETIR PETICIÓN ORIGINAL
             * =================================================
             */

            return await apiRequest(
                endpoint,
                options,
                true
            );


        } catch (error) {

            console.error(
                "Error renovando sesión:",
                error
            );


            throw error;

        }

    }


    /*
     * =====================================================
     * ERROR NORMAL
     * =====================================================
     */

    if (!respuesta.ok) {

        const error =
            await respuesta.text();


        console.error(
            "Error backend:",
            error
        );


        const errorObj =
            new Error(
                `Error ${respuesta.status}: ${error}`
            );


        errorObj.status =
            respuesta.status;


        throw errorObj;

    }


    return await respuesta.json();

}