import { FC } from 'react';
import Text from 'components/Text';
import style from './NotFoundPage.module.scss';

const NotFoundPage: FC = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.section}>
        <Text tag="h2" view="title-l" weight="700">
          404 - Page Not Found
        </Text>
        <Text tag="p" view="p-l" weight="700">
          Sorry, the page you are looking for does not exist.
        </Text>
      </div>
    </div>
  );
};

export default NotFoundPage;
