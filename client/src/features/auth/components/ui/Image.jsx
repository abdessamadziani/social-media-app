import React from 'react';

 export const Image = ({ src, alt, height, width, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      height={height}
      width={width}
      className={className}
    />
  );
};




// export const Source = ({src,type}) => {

//   return (
  
//   );
// };



export const Video = ({ height, width, className,src,type}) => {
  return (
    <video
      height={height}
      width={width}
      className={className}
     controls
    >
      <source
          src={src}
          type={type}
        />
    </video>

    
  );
};

// export default Image