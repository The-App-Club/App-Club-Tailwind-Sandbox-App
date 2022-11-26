import {Box, HStack, Stack} from '@chakra-ui/react';
import {Tooltip} from '@chakra-ui/react';
import CustomCard from '@/components/CustomCard';

export default function Home() {
  return (
    <Box className="max-w-[30rem] mx-auto w-full overflow-hidden p-2">
      <Stack spacing={6}>
        <HStack spacing={12}>
          <Tooltip label="Hover me" hasArrow bg="red.600">
            <CustomCard data-a={'aaa'} data-b={'bbb'}>
              Tag Here
            </CustomCard>
          </Tooltip>
          <Tooltip label="Hover me" hasArrow bg="green.600" placement="right">
            <CustomCard data-a={'aaa'} data-b={'bbb'}>
              Tag Here
            </CustomCard>
          </Tooltip>
        </HStack>
        <HStack spacing={12}>
          <Tooltip label="Hover me" hasArrow bg="blue.600">
            <CustomCard data-a={'aaa'} data-b={'bbb'}>
              Tag Here
            </CustomCard>
          </Tooltip>
          <Tooltip label="Hover me" hasArrow bg="orange.600">
            <CustomCard data-a={'aaa'} data-b={'bbb'}>
              Tag Here
            </CustomCard>
          </Tooltip>
        </HStack>
      </Stack>
    </Box>
  );
}
