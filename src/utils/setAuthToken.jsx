import axios from 'axios' 

const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['x']
    }else{
        delete axios.defaults.headers.common['x-auth-token']
    }
}


module.exports = {
    setAuthToken
}