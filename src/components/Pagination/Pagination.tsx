import classNames from 'classnames';
import { FC } from 'react';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import style from './Pagination.module.scss';

type PaginationProps = {
  className?: string;
  currentPage: number;
  isStartPage: boolean;
  isEndPage: boolean;
  pageList: number[];
  handleChangePage: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({
  className,
  currentPage,
  isStartPage,
  isEndPage,
  pageList,
  handleChangePage,
}) => {
  return (
    <div className={classNames(className, style.pages)}>
      <button disabled={isStartPage} onClick={() => handleChangePage(currentPage - 1)} className={style.page}>
        <ArrowLeftIcon width={32} height={32} />
      </button>
      {pageList.map((page) => {
        const isCurrentPage = currentPage === page;
        const isDots = page < 0;
        if (isDots) {
          return (
            <div key={page} className={style.dots}>
              ...
            </div>
          );
        }
        return (
          <button
            key={page}
            disabled={isCurrentPage}
            onClick={() => handleChangePage(page)}
            className={classNames(style.page, { [style['page--current']]: isCurrentPage })}
          >
            {page}
          </button>
        );
      })}

      <button disabled={isEndPage} onClick={() => handleChangePage(currentPage + 1)} className={style.page}>
        <ArrowRightIcon width={32} height={32} />
      </button>
    </div>
  );
};

export default Pagination;
