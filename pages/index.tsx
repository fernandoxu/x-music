import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import GradientLayout from '../components/gradientLayout';
import { useArtists, useMe } from '../lib/hooks';

const Home = () => {
  const { user } = useMe();
  const { artists } = useArtists();

  return (
    <GradientLayout
      roundImage
      color='purple'
      subtitle='profile'
      title={`${user?.firstName ?? ''} ${user?.lastName ?? ''}`}
      description='15 public playlists'
      image='https://avatars.githubusercontent.com/u/20871468?v=4'
    >
      <Box color='white' paddingX='40px'>
        <Box marginBottom='40px'>
          <Text fontSize='2xl' fontWeight='bold'>
            Top artist this month
          </Text>
          <Text fontSize='md'>only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box key={artist.id} paddingX='10px' width='20%'>
              <Box bg='gray.900' borderRadius='4px' padding='15px' width='100%'>
                <Image
                  src='https://placekitten.com/300/300'
                  borderRadius='100%'
                />
                <Box marginTop='20px'>
                  <Text fontSize='large'>{artist.name}</Text>
                  <Text fontSize='x-small'>Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const artists = await prisma.artist.findMany({});

//   return { props: { artists } };
// };

export default Home;
