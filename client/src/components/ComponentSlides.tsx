import { ReactNode, ReactPropTypes } from 'react';

interface ComponentSlidesProps {
  components: JSX.Element[];
  size: 'full' | 'half';
}

export default function ComponentSlides({
  components,
  size,
}: ComponentSlidesProps) {
  return (
    <div className="w-full overflow-hidden">
      {components.map((component) => (
        <div className={`${size === 'full' ? 'w-11/12' : 'w-5/12'} rounded`}>
          {component}
        </div>
      ))}
    </div>
  );
}
