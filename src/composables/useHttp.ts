import { ref } from 'vue';
import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export function useHttp<T>(url: string, config: AxiosRequestConfig = {}) {
    const data = ref<T | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const success = ref(false);

    const fetchData = async (overrideConfig: AxiosRequestConfig = {}) => {
        loading.value = true;
        error.value = null;
        success.value = false;

        try {
            const response: AxiosResponse<T> = await axios({ url, ...config, ...overrideConfig });
            data.value = response.data;
            success.value = true;
        } catch (err: any) {
            error.value = err.response?.data?.message || err.message || 'Ошибка запроса';
        } finally {
            loading.value = false;
        }
    };

    return { data, loading, error, success, fetchData };
}