import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export default function Flashcard() {
  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Front of flashcard</CardTitle>
          <CardDescription>Body of the flashcard</CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}
