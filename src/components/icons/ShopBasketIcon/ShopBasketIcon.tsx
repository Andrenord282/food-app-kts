import cn from 'classnames';
import { FC, memo } from 'react';
import { IconProps } from '../Icon';

const ShopBasketIcon: FC<IconProps> = ({ color, ...props }) => {
  return (
    <path
      d="M248.005 418.001c0 30.944-25.085 56.029-56.029 56.029s-56.029-25.085-56.029-56.029c0-20.645 11.166-38.683 27.789-48.402-.302-.801-24.252-98.416-71.848-292.845a7.641 7.641 0 0 0-6.725-5.796l-67.336-.032C7.982 70.925 0 62.944 0 53.098c0-9.518 7.458-17.293 16.849-17.801l67.616-.026c19.501 0 36.534 13.025 41.717 31.71l8.816 36.014 356.474.003c9.846 0 17.827 7.982 17.827 17.827 0 .709-.235 2.567-.705 5.575l-44.447 178.267c-2.119 8.499-10.011 14.039-18.454 13.48l-258.135.065 9.263 37.915a7.641 7.641 0 0 0 6.725 5.796l207.451.048c30.944 0 56.029 25.085 56.029 56.029 0 29.001-22.033 52.855-50.273 55.737a56.718 56.718 0 0 1-5.756.292c-30.944 0-56.029-25.085-56.029-56.029a55.897 55.897 0 0 1 3.825-20.389H244.179a55.886 55.886 0 0 1 3.826 20.39zm162.994-20.375c-11.252 0-20.374 9.122-20.374 20.374s9.122 20.374 20.374 20.374 20.374-9.122 20.374-20.374-9.122-20.374-20.374-20.374zm-219.024 0c-11.252 0-20.374 9.122-20.374 20.374s9.122 20.374 20.374 20.374 20.374-9.122 20.374-20.374c.001-11.252-9.121-20.374-20.374-20.374zM468.79 138.649H143.709l35.146 143.919 254.057-.01z"
      fill={cn({
        currentColor: !color,
        '#000000': color === 'primary',
        '#ffffff': color === 'secondary',
        '#b5460f': color === 'accent',
      })}
      {...props}
    ></path>
  );
};

export default memo(ShopBasketIcon);