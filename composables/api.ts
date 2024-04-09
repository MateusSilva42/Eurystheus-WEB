export async function useApi(url: string, options?: any) {

    const token = 'futuro token de autenticacao =)';
    const baseUrl = `http://localhost:8000/api/${url}`;
    const body = options?.data ? JSON.stringify(options.data) : undefined;

    const headers = {
      'content-type': 'application/json',
      ...options?.headers,
      // Authorization: `Bearer ${token}` //TODO: implementar autenticação
    };

    return $fetch(baseUrl, { method: options?.method, headers, body }); 

}
