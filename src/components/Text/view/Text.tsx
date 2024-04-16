import classNames from 'classnames';
import { FC, PropsWithChildren, CSSProperties, ElementType } from 'react';
import '../style/Text.scss';

type TagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
type TextWeight = '400' | '500' | '700';
type TextColor = 'primary' | 'secondary' | 'accent';
type TextView = 'title-xl' | 'title-l' | 'p-l' | 'p-m' | 'p-xs' | 'p-xxs' | 'button-m';

type TextProps = PropsWithChildren<{
    tag?: TagName;
    className?: string;
    weight?: TextWeight;
    color?: TextColor;
    view?: TextView;
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
    color = 'inherit',
    view = 'p-m',
    maxLines = undefined,
    children,
}) => {
    const TagName = tagMap[tag] || (tagMap.p as ElementType);

    const inlineStyle = (): CSSProperties => {
        const style: CSSProperties = {};

        if (maxLines) {
            style.display = '-webkit-box';
            style.WebkitBoxOrient = 'vertical';
            style.WebkitLineClamp = maxLines;
            style.overflow = 'hidden';
        }

        return style;
    };

    return (
        <TagName
            className={classNames(
                className,
                'typography',
                `typography--weight-${weight}`,
                `typography--color-${color}`,
                `typography--view-${view}`
            )}
            style={inlineStyle()}
        >
            {children}
        </TagName>
    );
};

export { Text };
