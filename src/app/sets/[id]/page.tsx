"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MoreOptionsIcon from "@/components/more-options-icon";
import { Button } from "@/components/ui/button";
import Flashcard from "@/components/ui/Flashcard";

const Set = () => {
    const params = useParams();
    const [set, setSet] = useState();
    const [cards, setCards] = useState([]);
    const [currIndex, setCurrIndex] = useState(0);

    console.log(params.id);
    const setId = params.id;

    console.log("Set", set);
    console.log("title", set.title);

    useEffect(() => {
        const fetchSet = async () => {
            try {
                const response = await fetch(`/api/sets/${setId}`, {
                    method: "GET",
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("data", data);

                    setSet(data.set);
                } else {
                    console.error("Failed to fetch set");
                }
            } catch (error) {
                console.error(error);
            }
        };

        const fetchFlashcards = async () => {
            try {
                const response = await fetch(`/api/flashcards?setId=${setId}`, {
                    method: "GET",
                });

                if (response.ok) {
                    const data = await response.json();

                    setCards(data.flashcards);
                } else {
                    console.error("Failed to fetch flashcards");
                }
            } catch (error) {
                console.error("Failed fetching flashcards");
            }
        };

        fetchSet();
        fetchFlashcards();
    }, []);

    const nextCard = () => {
        setCurrIndex((prevIndex) => (prevIndex + 1) % cards.length);
    };

    const prevCard = () => {
        setCurrIndex((prevIndex) => prevIndex === 0 ? cards.length - 1 : prevIndex - 1);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center w-full justify-around p-10">
                <p className="text-2xl">{set.title}</p>
                <MoreOptionsIcon />
            </div>

            {cards.length > 0 ? (
                <>
                    <Flashcard
                        term={cards[currIndex].question}
                        definition={cards[currIndex].answer}
                    />

                    <div className="flex justify-between w-full max-w-xs mt-4">
                        <Button onClick={prevCard} variant="outline">Previous</Button>
                        <Button onClick={nextCard} variant="outline">Next</Button>
                    </div>
                </>
            ) : (
                <p>No Flashcards yet!</p>
            )}

            {/* {cards.map((card) => (
                <Flashcard key={card._id} term={card.question} definition={card.answer} />
            ))} */}
        </div>
    );
};

export default Set;
