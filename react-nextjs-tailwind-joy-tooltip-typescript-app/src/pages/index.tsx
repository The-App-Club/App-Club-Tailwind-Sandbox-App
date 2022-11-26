import CustomCard from '@/components/CustomCard';
import {Box, HStack, Stack} from '@chakra-ui/react';
import Tooltip from '@mui/joy/Tooltip';

export default function Home() {
  return (
    <Box className="max-w-[30rem] mx-auto w-full overflow-hidden p-2">
      <Stack spacing={6}>
        <HStack spacing={12}>
          <Tooltip
            title="Hover me!"
            color="primary"
            placement="top"
            variant="soft"
          >
            <CustomCard>Tag Here</CustomCard>
          </Tooltip>
          <Tooltip
            title="Hover me!"
            color="danger"
            placement="right"
            variant="soft"
          >
            <CustomCard>Tag Here</CustomCard>
          </Tooltip>
        </HStack>
        <HStack spacing={12}>
          <Tooltip
            title="Hover me!"
            color="success"
            placement="bottom"
            variant="soft"
          >
            <CustomCard>Tag Here</CustomCard>
          </Tooltip>
          <Tooltip
            title="Hover me!"
            color="neutral"
            placement="right"
            variant="soft"
          >
            <CustomCard>Tag Here</CustomCard>
          </Tooltip>
        </HStack>
      </Stack>
    </Box>
  );
}
