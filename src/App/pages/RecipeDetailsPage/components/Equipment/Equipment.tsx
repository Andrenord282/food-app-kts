import cn from 'classnames';
import { FC, memo } from 'react';
import { Text, EquipmentIcon } from 'components';
import style from './Equipment.module.scss';

type EquipmentProps = {
  className?: string;
  equipments: string[];
};

const Equipment: FC<EquipmentProps> = ({ className, equipments }) => {
  return (
    <div className={cn(className)}>
      <div className={style.head}>
        <Text view="p-l" weight="600" className={style.title}>
          Equipment
        </Text>
      </div>
      <div className={style.body}>
        {equipments.map((name) => {
          return (
            <div key={name} className={style.item}>
              <EquipmentIcon width={24} height={24} color="accent" />
              <Text view="p-xs">{name}</Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Equipment);
