/* fetch data */
async function fetchData(url = '', data={}, method='GET'){
  const baseURL = 'http://localhost:3000/api/winners';
  /* default options are marked with */
  const response = await fetch(url, {
    /* GET, POST, PUT, DELETE */
    method: method,
    /* no-cors, *cors, same-origin */
    mode: 'cors',
    /* *default, no-cache, reload, force-cache, only-if-cached */
    cache: 'no-cache',
    /* include, *same-origin, omit */
    credentials: 'same-origin',
    /* headers, we will use json */
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    /* manual, *follow, error */
    redirect: 'follow',
    /* no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url */
    referrerPolicy: 'no-referrer',
    /* stringify data (for Content-Type: application/json only) */
    body: JSON.stringify(data)
  });
  /* return the parsed json (object) */
  return response.json();
}
