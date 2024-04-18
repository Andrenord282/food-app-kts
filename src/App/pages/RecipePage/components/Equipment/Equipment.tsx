import classNames from 'classnames';
import { FC, useMemo } from 'react';
import Text from 'components/Text';
import EquipmentIcon from 'components/icons/EquipmentIcon';
import { StepInstruction } from 'services/spoonacularApi';
import style from './Equipment.module.scss';

type EquipmentProps = {
  className?: string;
  equipments: StepInstruction[];
};

const Equipment: FC<EquipmentProps> = ({ className, equipments }) => {
  const equipmentList = useMemo(() => {
    const uniqEquipments = new Set<string>([]);

    equipments.forEach(({ equipment }) => {
      equipment.forEach(({ name }) => {
        uniqEquipments.add(name);
      });
    });

    return [...uniqEquipments];
  }, [equipments]);

  return (
    <div className={classNames(className, style.list)}>
      <Text view="p-l" weight="600" className={style.title}>
        Equipment
      </Text>
      {equipmentList.map((name) => {
        return (
          <div key={name} className={style.item}>
            <EquipmentIcon width={24} height={24} color="accent" />
            <Text view="p-xs">{name}</Text>
          </div>
        );
      })}
    </div>
  );
};

export default Equipment;
