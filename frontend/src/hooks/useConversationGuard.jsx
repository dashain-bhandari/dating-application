import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function useConversationGuard() {
    const {id} = useParams();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const controller = new AbortController();

    useEffect(() => {
        console.log('fetching Conversation');
        setLoading(true);
        getConversationById(id)
        .catch((err) => {
            console.log(err);
            setError(err);
        })
        .finally(() => setLoading(false));

        return () => {
            controller.abort();
        };
    }, [id]);

    return { loading, error };
}