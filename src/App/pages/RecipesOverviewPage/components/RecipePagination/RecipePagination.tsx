import { observer } from 'mobx-react-lite';
import { FC, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from 'components';
import { useRecipesOverviewList } from 'context';

type RecipePagination = {
  scrollHeight?: number;
  className?: string;
};

const RecipePagination: FC<RecipePagination> = ({ scrollHeight = 0, className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, limit, total } = useRecipesOverviewList();
  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);
  const isStartPage = useMemo(() => page === 1, [page]);
  const isEndPage = useMemo(() => page === totalPages, [totalPages, page]);

  const pageList = useMemo(() => {
    return Array.from({ length: totalPages }).reduce((result: number[], _, index) => {
      const number = index + 1;
      const siblingNumberCount = 2;
      const isStartOfEndPage = number === 1 || number === totalPages;
      const isLeftDots = number < page - siblingNumberCount;
      const isRightDots = number > page + siblingNumberCount;

      switch (true) {
        case !isStartOfEndPage && isLeftDots && result.includes(-1):
          return result;
        case !isStartOfEndPage && isLeftDots:
          result.push(-1);
          return result;
        case !isStartOfEndPage && isRightDots && result.includes(-2):
          return result;
        case !isStartOfEndPage && isRightDots:
          result.push(-2);
          return result;
        default:
          result.push(number);
          return result;
      }
    }, []);
  }, [page, totalPages]);

  const handleChangePage = useCallback(
    (page: number) => {
      searchParams.set('page-overview', String(page));
      setSearchParams(searchParams);
      setTimeout(() => {
        window.scrollTo({ top: scrollHeight, behavior: 'smooth' });
      }, 0);
    },
    [scrollHeight, searchParams, setSearchParams],
  );

  return (
    <Pagination
      className={className}
      isStartPage={isStartPage}
      isEndPage={isEndPage}
      pageList={pageList}
      currentPage={page}
      onChange={handleChangePage}
    />
  );
};

export default observer(RecipePagination);
