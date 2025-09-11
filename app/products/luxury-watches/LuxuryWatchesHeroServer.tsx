import prisma from '@/lib/prisma';
import LuxuryWatchesHero from './LuxuryWatchesHero';

export default async function LuxuryWatchesHeroServer() {
  const record = await prisma.pageHero.findUnique({
    where: { slug: 'products/luxury-watches' },
  });

  const backgroundImage = record?.backgroundImage ?? '/images/showroom2.jpg';

  return <LuxuryWatchesHero backgroundImage={backgroundImage} />;
}


