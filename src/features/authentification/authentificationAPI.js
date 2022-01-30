import * as Status from './authentificationStatus'

export function fetchAPI({url = 'http://localhost', method = "POST" , data = {}}) {
    return new Promise((resolve, reject) => {

        const myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/json')
            myHeaders.append('Cookie', 'cxssh_status=off')
            myHeaders.append('Authorization', data.token )

        const json = JSON.stringify(data)

        const requestOptions = {
            method: method,
            headers: myHeaders,
            body: json,
            redirect: 'follow',
        }

        fetch(url, requestOptions)
            .then((response) => {
                
                if(response.ok)
                {
                    return response.json()
                }
                else
                {
                    switch(response.status)
                    {
                        case 500: throw new Error(Status.ERROR_500);

                        case 404: throw new Error(Status.ERROR_404);

                        case 400: throw new Error(Status.ERROR_400);

                        default: throw new Error(Status.ERROR_500);
                    }
                }  
            })
            .then((response) => {
                setTimeout(function(){
                    resolve({ token: response.body.token, profile: response.body })
                },500)
            })
        .catch((error) => {
            reject(error)
        })
    });
}