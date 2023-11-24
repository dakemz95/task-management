import { ref } from 'vue'
import axios from 'axios'

function useFetch() {
    const method = ref('get')
    let apiKey = import.meta.env.VITE_API_KEY;
    let apiUrl = import.meta.env.VITE_API_URL;

    const getData = async (urlEndPoint = 'probe', payload = null) => {
        let request = {
            method: method.value,
            url: `${apiUrl}${urlEndPoint}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': apiKey,
            }
        }
        if (payload) request.data = payload
        let response = await axios(request)
        return response.data
    }

    const http = { 
        get : async (urlEndPoint) => {
            method.value = 'get'
            return await getData(urlEndPoint)
        },
        post : async (urlEndPoint, payload) => {
            method.value = 'post'
            return await getData(urlEndPoint, payload)
        }, 
        put : async (urlEndPoint, payload) => {
            method.value = 'put'
            return await getData(urlEndPoint, payload)
        }, 
        delete : async (urlEndPoint) => {
            method.value = 'delete'
            return await getData(urlEndPoint)
        }
    }

    return { http }
}

export default useFetch