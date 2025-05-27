import { delay } from '@/delay';
import BaseCard from './BaseCard';

export default async function BaseCardList({ cards }) {
  await delay(2000)
  return (
    <>
      {cards.map((card, index) => (
        <BaseCard key={index} {...card}  />
      ))}
    </>
  );
}
