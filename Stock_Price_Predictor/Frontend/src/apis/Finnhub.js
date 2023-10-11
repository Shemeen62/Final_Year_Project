import axios from 'axios';

const TOKEN = "cjb25hhr01qji1gu13hgcjb25hhr01qji1gu13i0"

export default axios.create({
    baseURL : "https://finnhub.io/api/v1",
    params :{
        token : TOKEN
    }
});
