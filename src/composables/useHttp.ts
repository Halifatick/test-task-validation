import { ref } from 'vue';

interface FetchOptions extends RequestInit {
    params?: Record<string, string | number>;
    body?: Record<string, any>;
}

export function useHttp<T>(url: string, options: FetchOptions = {}) {
    const data = ref<T | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const success = ref(false);

    const fetchData = async (overrideOptions: FetchOptions = {}) => {
        loading.value = true;
        error.value = null;
        success.value = false;

        try {
            let finalUrl = url;

            if (options.params) {
                const query = new URLSearchParams(options.params as Record<string, string>).toString();
                finalUrl += `?${query}`;
            }

            const requestOptions: FetchOptions = {
                ...options,
                ...overrideOptions,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                    ...overrideOptions.headers,
                },
                body: options.body ? JSON.stringify(options.body) : undefined,
            };

            const response = await fetch(finalUrl, requestOptions);

            if (!response.ok) {
                throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
            }

            data.value = await response.json();
            success.value = true;
        } catch (err: any) {
            error.value = err.message || 'Ошибка запроса';
        } finally {
            loading.value = false;
        }
    };

    return { data, loading, error, success, fetchData };
}