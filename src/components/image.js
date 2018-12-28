import React from 'react';
import LazyLoad from 'react-lazyload';

type TProps = {
  src: string,
  width: number,
  height: number,
  alt: string,
  className?: string,
}

const Image = ({
  src,
  width,
  height,
  alt,
  className,
}: TProps) => (
  <LazyLoad height={200}>
    <picture>
      <source srcSet={`${src}?fm=webp&w=${width}&h=${height}&fit=fill`} type="image/webp" />
      <source srcSet={`${src}?fm=jpg&q=60&fl=progressive&w=${width}&h=${height}&fit=fill`} type="image/jpeg" />
      <img src={`${src}?fm=jpg&q=60&fl=progressive&w=${width}&h=${height}&fit=fill`} alt={alt} className={className} />
    </picture>
  </LazyLoad>
);

export default Image;

Image.defaultProps = {
  className: '',
};
