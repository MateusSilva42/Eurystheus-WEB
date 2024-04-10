export async function useApi(url: string, options?: any) {
    const stringToken = localStorage.getItem('token');

function getCookie(name:string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    const lastPart = parts.pop();
    if (lastPart) {
      return lastPart.split(';').shift();
    }
  }
}
    
    const csrfToken = getCookie('csrf');

    const token = JSON.parse(stringToken? stringToken : 'null');
    const baseUrl = `http://localhost:8000/api/${url}`;
    const body = options?.data ? JSON.stringify(options.data) : undefined;

    // body = {
    //   ...options?.data,
    //   _csrf: csrfToken,
    // }

    const headers = {
      'content-type': 'application/json',
      ...options?.headers,
      Authorization: `Bearer ${token}`,
      'x-csrf-Token': csrfToken,
    };

    // console.log('body enviado', body);
    
    console.log('Headers enviados', headers);
    

    return $fetch(baseUrl, { method: options?.method, headers, body }); 

}
