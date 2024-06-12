import { FC, useEffect, useState } from "react";
import Card from "../Card/Card";
import { Text } from "../Text/Text";

const QUESTIONS = [
  "What is your most used emoji?",
  "What is your favorite item you’ve bought this year?",
  "What’s the weirdest food you’ve ever eaten?",
  "Do you have any hidden talents?",
  "The zombie apocalypse is coming, who are 3 people you want on your team?",
  "If you could instantly become an expert in something, what would it be?",
  "What’s something that improved your quality of life so much, you wish you had done it sooner?",
  "What age do you wish you could be permanently?",
  "If you could time travel, would you visit the future or the past?",
  "Have you ever completed anything on your “bucket list”?",
  "What current fact about your life would most impress your five year old self?",
  "Have you ever been told you look like someone famous, who was it?",
  "If you win the lottery, what would you buy first?",
  "What would your dream house be like?",
  "What’s the best piece of advice you’ve ever been given?",
  "If a movie was made of your life what genre would it be, who would play you?",
  "What’s your favorite holiday celebration?",
  "If you had to eat one meal everyday for the rest of your life what would it be?",
  "What’s one country you would love to visit and why?",
  "Who at Vinted would you like to switch jobs with for a day?",
  "What crazy activity would you like to try some day?",
  "If you could choose any two famous people to have dinner with, who would they be?",
  "60s, 70s, 80s, 90s, 00s: Which decade do you love the most and why?",
  "Do you have an inanimate object that you’ve named?",
  "What song or album could you listen to on repeat?",
  "What project you worked on at Vinted are you the most proud of?",
  "Describe the best teacher or mentor you have had so far.",
  "How would your best friend describe you?",
  "If you could magically become fluent in any language, what would it be?",
  "What did you learn from an earlier speed date conversation you had earlier today?",
  "What is your best Vinted purchase?",
  "What’s one thing you learned later in life that should be taught in school?",
  "What book, movie or series read/seen recently would you recommend and why?",
  "What was the worst job you ever had?",
  "Have you ever met a celebrity?",
  "What is your cellphone wallpaper?",
  "Would you rather be the funniest or smartest person in the room?",
  "If you could see one movie again for the first time, what would it be and why?",
  "What would the title of your autobiography be?",
  "What’s one thing many people hate but you love?",
  "What is your favorite midnight snack?",
  "Why did you apply for Vinted?",
  "What’s your favorite tradition or holiday?",
  "What languages do you know how to speak?",
  "If you could have any animal for a pet, what would it be?",
  "You have your own late night talk show, who do you invite as your first guest?",
  "If I visited your hometown, what local spots would you suggest I see?",
  "What is the best dish you can cook?",
  "If you had to delete all but 3 apps from your smartphone, which ones would you keep?",
  "If you could live anywhere in the world for a year, where would it be?",
  "What is one thing I would never guess about you?",
  "As a child, what did you want to be when you grew up?",
  "What movie do you think everyone should watch?",
  "What is your worst Vinted purchase?",
  "What is your go-to karaoke song?",
  "What would your superpower be and why?",
  "What’s an interesting fact about your hometown?",
  "Do you know a random fact?",
  "What school subject was your favorite?",
  "What’s a food that you didn’t like as a child but love as an adult?",
] as const;

const Questions: FC<{ refreshOn?: unknown }> = ({ refreshOn }) => {
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(() => {
    setQuestions([...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5));
  }, [refreshOn]);

  return (
    <>
      {questions.map((question) => (
        <Card key={question}>
          <Text>{question}</Text>
        </Card>
      ))}
    </>
  );
};

export default Questions;
