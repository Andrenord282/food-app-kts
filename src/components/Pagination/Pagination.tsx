import cn from 'classnames';
import { FC, memo } from 'react';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import * as style from './Pagination.module.scss';

type PaginationProps = {
  className?: string;
  currentPage: number;
  isStartPage: boolean;
  isEndPage: boolean;
  pageList: number[];
  onChange: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({ className, currentPage, isStartPage, isEndPage, pageList, onChange }) => {
  return (
    <div className={cn(className, style.pages)}>
      <button disabled={isStartPage} onClick={() => onChange(currentPage - 1)} className={style.page}>
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
            onClick={() => onChange(page)}
            className={cn(style.page, { [style['page--current']]: isCurrentPage })}
          >
            {page}
          </button>
        );
      })}

      <button disabled={isEndPage} onClick={() => onChange(currentPage + 1)} className={style.page}>
        <ArrowRightIcon width={32} height={32} />
      </button>
    </div>
  );
};

export default memo(Pagination);
