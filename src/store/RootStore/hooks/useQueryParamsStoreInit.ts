import { useLocation } from 'react-router-dom';

import rootStore from '../instance';

export const useQueryParamsStoreInit = () => {
  const { search } = useLocation();
  // rootStore.query.setSearch(search);
};
