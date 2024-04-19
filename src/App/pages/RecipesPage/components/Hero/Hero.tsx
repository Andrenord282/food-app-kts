import cn from 'classnames';
import { FC } from 'react';
import style from './Hero.module.scss';

type HeroProps = {
  className?: string;
};

const Hero: FC<HeroProps> = ({ className }) => {
  return <div className={cn(className, style.section)} />;
};

export default Hero;
