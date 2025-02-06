import { Card } from "./card";

interface FlashcardProps {
    term: string;
    definition: string;
}

const Flashcard = ({term, definition}: FlashcardProps) => {
    return (
        <Card className="w-3/4 h-48 flex items-center justify-center">{term}</Card>
    );
};

export default Flashcard;
