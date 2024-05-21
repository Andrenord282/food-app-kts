import { FC, memo } from 'react';
import { Text } from 'components';
import { StepInstructionClient } from 'store/models/recipe';

import style from './Directions.module.scss';

type DirectionsProps = {
  stepList: StepInstructionClient[];
};

const Directions: FC<DirectionsProps> = ({ stepList }) => {
  return (
    <div className={style.section}>
      <Text weight="600" view="p-l" className={style.title}>
        Directions
      </Text>
      {stepList.map(({ number, step }) => {
        return (
          <div key={step} className={style.step}>
            <Text view="p-xs" weight="600">
              Step {number}
            </Text>
            <Text view="p-xxs">{step}</Text>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Directions);
