"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Set = () => {
    const params = useParams();
    const [set, setSet] = useState();

    console.log(params.id);
    const setId = params.id;

    console.log("Set", set);


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

        fetchSet();
    }, []);

    return (
        <>
            <h1>Set</h1> 
            <p>{set?.title}</p>
        </>
    )
}

export default Set;