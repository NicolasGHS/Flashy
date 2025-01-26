import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Flashcard() {
  return (
    <>
      <h1>Flashcards</h1>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Front of flashcard</CardTitle>
          <CardDescription>Body of the flashcard</CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}
