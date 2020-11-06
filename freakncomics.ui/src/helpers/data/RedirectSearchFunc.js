import { useHistory } from 'react-router-dom';

function SearchRedirect() {
  const history = useHistory();
  const path = '/';
  history.push(path);
}

export default SearchRedirect;
