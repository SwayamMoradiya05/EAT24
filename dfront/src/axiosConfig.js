import axios from 'axios';

// Set the base URL for all axios requests
axios.defaults.baseURL = 'http://127.0.0.1:8000';

// You can also set other defaults like headers
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;
