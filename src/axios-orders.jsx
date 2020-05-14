import Axios from 'axios';

const Instance = Axios.create({
  baseURL: 'https://burguer-builder-react-c9b06.firebaseio.com/'
});

export default Instance;