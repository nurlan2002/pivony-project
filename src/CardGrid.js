import React, { useEffect, useState } from "react";
import "./CardGrid.css";
import SmallCard from "./SmallCard";
import { db } from "./firebase";

function CardGrid({ setInsight, userInsight }) {
    const [insights, setInsights] = useState([]);

    useEffect(() => {
        db.collection("insights")
            .orderBy("date", "desc")
            .onSnapshot((allDocs) => {
                const ins = allDocs.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    };
                });

                setInsights(ins);
            });
    }, []);

    return (
        <div className="grid">
            {insights.map((ins) => {
                return (
                    <SmallCard
                        key={ins.id}
                        insight={ins}
                        setInsight={setInsight}
                        mine={userInsight?.id === ins.id}
                    />
                );
            })}
        </div>
    );
}

export default CardGrid;
