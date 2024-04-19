import cn from 'classnames';
import { FC } from 'react';
import Text from 'components/Text';
import style from './Description.module.scss';

type DescriptionProps = {
  text: string;
  className?: string;
};

const Description: FC<DescriptionProps> = ({ className, text }) => {
  return (
    <div className={cn(className, style.section)}>
      <Text view="p-xs">{<span dangerouslySetInnerHTML={{ __html: text }} />}</Text>
    </div>
  );
};

export default Description;
