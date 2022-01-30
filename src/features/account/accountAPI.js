import dataJSON from '../../services/data/index.json'

export function simulatefetchAPI({userID = ''}) {
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve({ userAccount: dataJSON.filter((entry) => entry.user === userID).reverse() })
        },500)
    });
}