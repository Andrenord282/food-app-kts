import cn from 'classnames';
import { CSSProperties, FC, memo, useCallback, useMemo, useState } from 'react';
import { BaseButton } from 'components';

import style from './SwitchButtonList.module.scss';

type SwitchButtonListProps = {
  className?: string;
  buttons: { name: string; text: string }[];
  switchButton: (name: string) => void;
};

const SwitchButtonList: FC<SwitchButtonListProps> = ({ className, buttons, switchButton }) => {
  const [selectButton, setSelectButton] = useState<number>(0);

  const cursorInlineStyle: CSSProperties = useMemo(
    () => ({
      width: `${100 / buttons.length}%`,
      transform: `translateX(${100 * selectButton}%)`,
    }),
    [selectButton, buttons.length],
  );

  const handleSelectButton = useCallback(
    (index: number) => {
      setSelectButton(index);
      switchButton(buttons[index].name);
    },
    [buttons, switchButton],
  );

  return (
    <div className={cn(className, style.box)}>
      <div className={style.cursor} style={cursorInlineStyle}></div>
      {buttons.map(({ name, text }, index) => {
        return (
          <BaseButton
            onClick={() => handleSelectButton(index)}
            size="s"
            key={name}
            className={cn(style.item, {
              [style['item--selected']]: selectButton === index,
            })}
          >
            {text}
          </BaseButton>
        );
      })}
    </div>
  );
};

export default memo(SwitchButtonList);
