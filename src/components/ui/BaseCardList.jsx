import { delay } from '@/delay';
import BaseCard from './BaseCard';

export default async function BaseCardList({ cards }) {
  await delay(2000)
  console.log("💥 cards in BaseCardList:", cards); 
  return (
    <>
      {cards.map((card, index) => (
        <BaseCard key={index} {...card}  />
      ))}
    </>
  );
}
