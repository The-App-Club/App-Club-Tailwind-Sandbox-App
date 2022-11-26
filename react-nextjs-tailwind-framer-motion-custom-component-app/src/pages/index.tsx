import {motion} from 'framer-motion';
import Typography from '@mui/joy/Typography';
import {Box, Stack} from '@chakra-ui/react';

const container = {
  hidden: {opacity: 0},
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.33,
      duration: 0.7,
    },
  },
};

const item = {
  hidden: {opacity: 0, y: 60},
  show: {
    opacity: 1,
    y: 0,
  },
};

export default function Home() {
  return (
    <Box className="max-w-[30rem] mx-auto w-full overflow-hidden">
      <Stack
        as={motion.div}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Box
          as={motion.div}
          variants={item}
          className={'font-noto text-3xl font-bold'}
        >
          Something
        </Box>
        <Box
          as={motion.div}
          variants={item}
          className={'font-kosugi text-2xl font-bold'}
        >
          Anything
        </Box>
        <Box
          as={motion.div}
          variants={item}
          className={'font-inter text-xl font-bold'}
        >
          Everything
        </Box>
      </Stack>
      <Typography
        component={motion.p}
        initial={{
          x: 60,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        exit={{
          x: 60,
          opacity: 0,
        }}
        className="font-inter font-bold text-3xl"
      >
        Cowboy Bebop
      </Typography>
    </Box>
  );
}
