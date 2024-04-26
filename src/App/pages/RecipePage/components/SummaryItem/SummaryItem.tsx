import { FC } from 'react';
import Text from 'components/Text';

type SummaryItemProps = {
  className?: string;
  title: string;
  text: string;
};

const SummaryItem: FC<SummaryItemProps> = ({ className, title, text }) => {
  return (
    <div className={className}>
      <Text view="p-xs">{title}</Text>
      <Text view="p-xs" weight="600" color="accent">
        {text}
      </Text>
    </div>
  );
};

export default SummaryItem;
