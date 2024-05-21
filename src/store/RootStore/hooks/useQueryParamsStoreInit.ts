import { useLocation } from 'react-router-dom';
import { rootStore } from 'store';

export const useQueryParamsStoreInit = () => {
  const { search } = useLocation();

  rootStore.query.initSearch(search);
};
