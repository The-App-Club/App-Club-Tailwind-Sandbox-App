import Button from '@mui/joy/Button';
import {Box} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {FileUploader} from 'react-drag-drop-files';
import useFileUpload from '@/hooks/useFileUpload';

const fileTypes = ['JPG', 'PNG', 'GIF'];

const NiceFileUploader = () => {
  const {createBrand} = useFileUpload();

  const [modelURL, setModalURL] = useState<
    string | ArrayBuffer | null | undefined
  >(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const handleLoad = (reader: ProgressEvent<FileReader>) => {
      const imageBlobData = reader.target?.result;
      setModalURL(imageBlobData);
    };
    const reader = new FileReader();
    reader.addEventListener('load', handleLoad);
    if (file) {
      reader.readAsDataURL(file);
    }
    return () => {
      reader.removeEventListener('load', handleLoad);
    };
  }, [file]);

  const handleChange = async (file: File) => {
    setFile(file);

    try {
      await createBrand(file.name, file);
    } catch (error) {
      // CombinedError: [Network] No Content
      // at makeErrorResult (ddbb86ae.mjs?0bc5:232:1)
      // at eval (ddbb86ae.mjs?0bc5:410:1)
      console.log(error);
    }
  };

  const handleReUpload = (e: React.MouseEvent) => {
    setModalURL(null);
  };

  return (
    <Box>
      {modelURL ? (
        <Box>
          <picture>
            <source
              srcSet={modelURL.toString() || `/assets/logo.png`}
              type={file?.type || `image/png`}
            />
            <img
              src={modelURL.toString() || `/assets/logo.png`}
              alt={file?.name || `logo`}
              width={320}
              height={320}
            />
          </picture>
          <Button onClick={handleReUpload}>Upload</Button>
        </Box>
      ) : (
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      )}
    </Box>
  );
};

export default NiceFileUploader;
