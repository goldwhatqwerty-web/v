
import React from 'react';
import { Heart, Gift, Coffee, Music, Cat, Gamepad2, User } from 'lucide-react';
import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What was the first gift you got from this wizard?",
    answer: "strawberry keychain",
    placeholder: "Hint: Something red and small...",
    icon: 'gift'
  },
  {
    id: 2,
    text: "What was the gift you received from your wizard on your birthday?",
    answer: "gift hamper",
    placeholder: "Hint: A big box of joy...",
    icon: 'birthday'
  },
  {
    id: 3,
    text: "What was the chocolate you got in your period cramps from that wizard?",
    answer: "kinderjoy",
    placeholder: "Hint: Chocolate with a surprise...",
    icon: 'cramps'
  },
  {
    id: 4,
    text: "What did you blend with your wizard?",
    answer: "spotify",
    placeholder: "Hint: Our music combined...",
    icon: 'music'
  },
  {
    id: 5,
    text: "What is the common animal you both like?",
    answer: "cat",
    placeholder: "Hint: Meow...",
    icon: 'animal'
  },
  {
    id: 6,
    text: "What game do you both play?",
    answer: "mlbb",
    placeholder: "Hint: Mobile Legends...",
    icon: 'game'
  },
  {
    id: 7,
    text: "So Who Was your wizard?",
    answer: "spidey",
    placeholder: "Hint: Our friendly neighborhood...",
    icon: 'wizard'
  }
];

export const ICON_MAP: Record<string, React.ReactNode> = {
  gift: <Gift className="w-8 h-8 text-pink-500" />,
  birthday: <Heart className="w-8 h-8 text-red-500" />,
  cramps: <Coffee className="w-8 h-8 text-amber-500" />,
  music: <Music className="w-8 h-8 text-green-500" />,
  animal: <Cat className="w-8 h-8 text-orange-500" />,
  game: <Gamepad2 className="w-8 h-8 text-blue-500" />,
  wizard: <User className="w-8 h-8 text-purple-500" />,
};
