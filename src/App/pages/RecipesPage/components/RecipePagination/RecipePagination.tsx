import { FC, memo, useCallback, useMemo, useState } from 'react';
import Pagination from 'components/Pagination';
import { useRecipesContext } from 'context';

type RecipePagination = {
  className?: string;
};

const RecipePagination: FC<RecipePagination> = ({ className }) => {
  const { cursorList, handleUpdateCursor, handleRecipeListState } = useRecipesContext();
  const { number, totalResults } = cursorList;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = useMemo(() => Math.ceil(totalResults / number), [totalResults, number]);
  const isStartPage = useMemo(() => currentPage === 1, [currentPage]);
  const isEndPage = useMemo(() => currentPage === totalPages, [totalPages, currentPage]);

  const pageList = useMemo(() => {
    return Array.from({ length: totalPages }).reduce((result: number[], _, index) => {
      const number = index + 1;
      const siblingNumberCount = 2;
      const isStartOfEndPage = number === 1 || number === totalPages;
      const isLeftDots = number < currentPage - siblingNumberCount;
      const isRightDots = number > currentPage + siblingNumberCount;

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
  }, [currentPage, totalPages]);

  const handleChangePage = useCallback(
    (page: number) => {
      setCurrentPage(page);

      handleUpdateCursor({
        offset: page * number - number,
        number,
        totalResults,
      });
      handleRecipeListState('loading');
    },
    [number, totalResults, handleUpdateCursor, handleRecipeListState],
  );

  return (
    <Pagination
      className={className}
      isStartPage={isStartPage}
      isEndPage={isEndPage}
      pageList={pageList}
      currentPage={currentPage}
      handleChangePage={handleChangePage}
    />
  );
};

export default memo(RecipePagination);
