export async function useApi(url: string, options?: any) {

    const token = 'futuro token de autenticacao =)';
    const baseUrl = `http://localhost:8000/api/${url}`;

    const headers = {
      ...options?.headers,
      Authorization: `Bearer ${token}`
    };

    // return $fetch(url, { ...options, headers });
    return $fetch(baseUrl, { ...options}); //TODO adicionar cabeçalho quando criar autenticação

}
