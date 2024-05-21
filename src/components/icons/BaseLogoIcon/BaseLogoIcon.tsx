import { FC, memo } from 'react';
import { IconProps } from '../Icon';

const BaseLogoIcon: FC<IconProps> = ({ width, height}) => {
  return (
    <>
      <g clipPath="url(#clip0_508_1449)">
        <path
          d="M17.8585 0.506165C27.5209 0.506165 35.352 8.33833 35.352 18C35.352 27.6628 27.5209 35.4938 17.8585 35.4938C8.19684 35.4938 0.364685 27.6628 0.364685 18C0.364685 8.33833 8.19684 0.506165 17.8585 0.506165Z"
          fill="white"
        />
        <path
          d="M17.7689 33.4343C26.4389 33.4343 33.4674 26.4058 33.4674 17.7358C33.4674 9.0657 26.4389 2.03723 17.7689 2.03723C9.09884 2.03723 2.07037 9.0657 2.07037 17.7358C2.07037 26.4058 9.09884 33.4343 17.7689 33.4343Z"
          fill="url(#paint0_linear_508_1449)"
        />
        <path
          d="M18.1897 30.3613C16.3901 28.1578 15.4422 27.0086 15.3479 26.915C14.9918 26.4884 14.3878 25.8966 13.5356 25.1388C13.9144 23.1008 14.4119 21.5143 15.0282 20.3767C15.2647 19.9739 16.2479 18.6473 17.9773 16.3969C18.9252 18.3629 20.2046 19.6895 21.8149 20.3767C22.1695 20.5189 23.6977 20.839 26.3974 21.3368C28.3882 21.7382 29.9876 22.4852 31.1947 23.5753C32.9004 25.114 34.3804 27.6728 35.6357 31.2494C30.5431 28.3831 26.9068 27.3769 24.7284 28.2294C23.7092 28.8457 22.8326 29.331 22.099 29.6863C20.9858 30.2544 19.6826 30.4798 18.1897 30.3613Z"
          fill="white"
        />
        <path
          d="M18.7585 12.5953C18.5451 13.9457 18.0839 15.0477 17.3729 15.8998C16.9697 16.3973 16.1881 17.0845 15.0275 17.9608C12.7055 19.6657 11.0243 21.8689 9.9821 24.5693C8.96366 27.1278 8.70302 29.722 9.2009 32.3518L8.45498 32.4216C7.88582 29.7699 8.12342 27.1516 9.16526 24.5697C10.2312 21.8218 12.0316 19.5232 14.566 17.6767C15.9639 16.6342 16.8761 15.2485 17.3023 13.5198C17.6339 12.0989 17.5979 10.5466 17.1954 8.86466C16.888 7.41962 16.3779 6.34178 15.6683 5.6315C14.9807 4.94462 14.2938 4.69622 13.6066 4.88558C11.9959 5.31182 11.3796 7.34942 11.7594 10.9969C12.1147 14.4555 12.7782 16.6349 13.7488 17.5345C12.7779 17.6062 11.9373 16.2796 11.2263 13.5551C10.539 10.8547 10.444 8.50934 10.9415 6.51998C11.155 5.5253 11.6169 4.77902 12.3271 4.2815C13.4169 3.52334 14.6844 3.61838 16.1298 4.56554C17.077 5.18186 17.7757 6.1409 18.225 7.44374C18.7704 8.86466 18.949 10.5822 18.7585 12.5953ZM11.8656 32.6041C10.5156 26.532 11.4275 22.149 14.602 19.4523C12.4463 24.1395 11.8779 28.5473 12.8963 32.6769L11.8656 32.6041Z"
          fill="white"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_508_1449"
          x1="15.0425"
          y1="2.27336"
          x2="20.4954"
          y2="33.1986"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B5460F" />
          <stop offset="1" stopColor="#B5460F" />
        </linearGradient>
        <clipPath id="clip0_508_1449">
          <rect width={width} height={height} fill="white" />
        </clipPath>
      </defs>
    </>
  );
};

export default memo(BaseLogoIcon);
