import React from 'react';


const VismeContactForm = () => {
    useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://static-bundles.visme.co/forms/vismeforms-embed.js';
      script.async = true;
      document.body.appendChild(script);
  
      return () => {
        // Clean up: remove the script when component unmounts
        document.body.removeChild(script);
      };
    }, []);
}
export default VismeContactForm;
