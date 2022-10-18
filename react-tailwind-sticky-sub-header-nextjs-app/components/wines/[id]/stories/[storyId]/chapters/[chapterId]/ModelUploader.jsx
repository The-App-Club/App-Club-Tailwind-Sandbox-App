import {useEffect, useState} from 'react';
import {FileUploader} from 'react-drag-drop-files';
import {useRecoilValue} from 'recoil';

import {scrollTriggerState} from '@/stores/scrollTriggerStore';

const fileTypes = ['JPG', 'PNG', 'GIF'];

const ModelUploader = () => {
  const [modelURL, setModalURL] = useState(null);
  const [file, setFile] = useState(null);
  const {chapterId} = useRecoilValue(scrollTriggerState);

  useEffect(() => {
    const handleLoad = (reader) => {
      const imageBlobData = reader.target.result;
      setModalURL(imageBlobData);
      console.log({
        imageBlobData,
        chapterId,
      });
    };
    const reader = new FileReader();
    reader.addEventListener('load', handleLoad);
    if (file) {
      console.log(file);
      reader.readAsDataURL(file);
    }
    return () => {
      reader.removeEventListener('load', handleLoad);
    };
  }, [file]); // eslint-disable-line

  const handleChange = (file) => {
    setFile(file);
  };

  return (
    <>
      {modelURL ? (
        <picture>
          <source
            srcSet={modelURL || `/assets/logo.png`}
            type={file.type || `image/png`}
          />
          <img
            src={modelURL || `/assets/logo.png`}
            alt={file.name || `logo`}
            width={320}
            height={320}
          />
        </picture>
      ) : (
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      )}
    </>
  );
};

export default ModelUploader;
