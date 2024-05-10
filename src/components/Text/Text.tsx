import cn from 'classnames';
import { FC, PropsWithChildren, CSSProperties, ElementType, memo, useMemo } from 'react';
import style from './Text.module.scss';

type TagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
type TextWeight = '400' | '500' | '700' | '600';
type TextColor = 'default' | 'primary' | 'secondary' | 'accent';
type TextView = 'title-xl' | 'title-l' | 'p-l' | 'p-m' | 'p-xs' | 'p-xxs' | 'button-m' | 'button-l' | 'button-s';
type TextDecoration = 'default' | 'underline' | 'line-through';
type TextAlign = 'default' | 'center';

type TextProps = PropsWithChildren<{
  tag?: TagName;
  className?: string;
  weight?: TextWeight;
  color?: TextColor;
  view?: TextView;
  align?: TextAlign;
  decoration?: TextDecoration;
  maxLines?: number;
}>;

const tagMap: { [key in TagName]: TagName } = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  div: 'div',
  p: 'p',
  span: 'span',
};

const Text: FC<TextProps> = ({
  tag = 'p',
  className,
  weight = '400',
  color = 'default',
  view = 'p-m',
  align = 'default',
  decoration = 'default',
  maxLines,
  children,
}) => {
  const TagName = tagMap[tag] || (tagMap.p as ElementType);

  const inlineStyle = useMemo((): CSSProperties => {
    const style: CSSProperties = {};

    if (maxLines) {
      style.display = '-webkit-box';
      style.WebkitBoxOrient = 'vertical';
      style.WebkitLineClamp = maxLines;
      style.overflow = 'hidden';
    }

    return style;
  }, [maxLines]);

  return (
    <TagName
      className={cn(
        className,
        style.typography,
        style[`typography--${weight}`],
        style[`typography--color-${color}`],
        style[`typography--${view}`],
        style[`typography--align-${align}`],
        style[`typography--decoration-${decoration}`],
      )}
      style={inlineStyle}
    >
      {children}
    </TagName>
  );
};

export default memo(Text);
