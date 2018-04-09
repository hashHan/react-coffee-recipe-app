import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-order-app-han.firebaseio.com/coffeemachine/'
});

export default instance;