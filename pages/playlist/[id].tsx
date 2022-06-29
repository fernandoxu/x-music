import GradientLayout from '../../components/gradientLayout';
// import SongTable from '../../components/songsTable';
import { validateToken } from '../../lib/auth';
import prisma from '../../lib/prisma';
import { User } from '@prisma/client';
import { InferGetServerSidePropsType } from 'next';

const getBGColor = (id: number) => {
  const colors = [
    'red',
    'green',
    'blue',
    'orange',
    'purple',
    'gray',
    'teal',
    'yellow',
  ];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist = ({
  playlist,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const color = getBGColor(playlist.id);

  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist.name}
      subtitle='playlist'
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      {/* <SongTable songs={playlist.songs} /> */}
    </GradientLayout>
  );
};

export async function getServerSideProps({ query, req }) {
  let user: unknown;

  try {
    user = validateToken(req.cookies.X_ACCESS_TOKEN);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    };
  }

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: (user as User).id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: { playlist },
  };
}

export default Playlist;
