"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Set = () => {
    const params = useParams();
    const [set, setSet] = useState();
    const [cards, setCards] = useState([]);

    console.log(params.id);
    const setId = params.id;

    console.log("Set", set);
    console.log("cards", cards);


    useEffect(() => {
        const fetchSet = async () => {
            try {
                const response = await fetch(`/api/sets/${setId}`, {
                    method: "GET",
                });

                if (response.ok) {
                    const data = await response.json();

                    setSet(data.set[0]);
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
        }

        fetchSet();
        fetchFlashcards();
    }, []);

    return (
        <>
            <h1>Set</h1> 
            <p>{set?.title}</p>
        </>
    )
}

export default Set;