import { FC, memo } from 'react';
import { Text } from 'components';
import { StepInstructionModel } from 'store/models/recipes/modelsClient';

import style from './Directions.module.scss';

type DirectionsProps = {
  stepList: StepInstructionModel[];
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
