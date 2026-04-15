import { useEffect, useState } from "react";
import api from "../services/api";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        api.get("/auth/me")
            .then(() => setAuth(true))
            .catch(() => setAuth(false))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
         return <div>Carregando...</div>;
    }

    if (!auth) {
        return <Navigate to="/login" />;
    }

    return children;
}