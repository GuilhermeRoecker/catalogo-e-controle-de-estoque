import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Categorias from "./pages/Categorias";
import Produtos from "./pages/Produtos";
import NotFound from "./pages/NotFound";


import ProtectedRoute from "./components/ProtectedRoute";
import Movimentacoes from "./pages/Movimentacoes";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* protegidas */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/produtos"
                    element={
                        <ProtectedRoute>
                            <Produtos />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/categorias"
                    element={
                        <ProtectedRoute>
                            <Categorias />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/movimentacoes"
                    element={
                        <ProtectedRoute>
                            <Movimentacoes />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={
                        <ProtectedRoute>
                            <NotFound />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    );
}