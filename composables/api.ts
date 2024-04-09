export async function useApi(url: string, options?: any) {
    const stringToken = localStorage.getItem('token');
    // const stringCsrf = sessionStorage.getItem('csrf');

function getCookie(name:string) {
  const value = `; ${document.cookie}`;
  console.log('Cookies', document.cookie);
  
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const lastPart = parts.pop();
    if (lastPart) {
      return lastPart.split(';').shift();
    }
  }
}
    
    const csrfToken = getCookie('csrf');
    console.log('CSRF do cookie', csrfToken);
    

    const token = JSON.parse(stringToken? stringToken : 'null');
    // const csrf = JSON.parse(stringCsrf? stringCsrf : 'null');
    const baseUrl = `http://localhost:8000/api/${url}`;
    const body = options?.data ? JSON.stringify(options.data) : undefined;

    // console.log('CSRF ENVIADO', csrf);

    const headers = {
      'content-type': 'application/json',
      ...options?.headers,
      Authorization: `Bearer ${token}`,
      'X-CSRF-Token': csrfToken,
    };

    console.log('Headers enviados', headers);
    

    return $fetch(baseUrl, { method: options?.method, headers, body }); 

}
