import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { rootStore } from 'store';

export const useQueryParamsStoreInit = () => {
  const { search } = useLocation();
  useEffect(() => {
    rootStore.query.initSearch(search);
  });
};
