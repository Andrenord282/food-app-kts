import { FC } from 'react';
import Text from 'components/Text';
import { StepInstruction } from 'services/spoonacularApi';

import style from './Directions.module.scss';

type DirectionsProps = {
  stepList: StepInstruction[];
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

export default Directions;
