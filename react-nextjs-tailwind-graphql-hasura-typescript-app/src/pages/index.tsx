import NiceFileUploader from '@/components/NiceFileUploader';
import {Box} from '@chakra-ui/react';

export default function Home() {
  return (
    <Box className="max-w-[30rem] mx-auto w-full overflow-hidden p-2">
      <NiceFileUploader />
    </Box>
  );
}
