import { Card } from "./card";
import { useState } from "react";

interface FlashcardProps {
    term: string;
    definition: string;
}



const Flashcard = ({term, definition}: FlashcardProps) => {
    const [flipped, setFlipped] = useState(false);

    const handleClick = () => {
        setFlipped(!flipped);
    }
    return (
        <Card className="w-3/4 h-48 flex items-center justify-center" onClick={handleClick}>
            {flipped ? definition : term}
        </Card>
    );
};

export default Flashcard;
