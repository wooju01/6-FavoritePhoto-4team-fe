import { delay } from '@/delay';
import BaseCard from './BaseCard';

export default async function BaseCardList({ cards }) {
  await delay(500)
  return (
    <>
      {cards.map((card, index) => (
        <BaseCard key={index} {...card}  />
      ))}
    </>
  );
}
