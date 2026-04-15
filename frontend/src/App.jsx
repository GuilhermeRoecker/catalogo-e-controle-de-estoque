import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

import ProtectedRoute from "./components/ProtectedRoute";

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
                            <div>Produtos (vai virar tela depois)</div>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/categorias"
                    element={
                        <ProtectedRoute>
                            <div>Categorias (vai virar tela depois)</div>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/movimentacoes"
                    element={
                        <ProtectedRoute>
                            <div>Movimentações (vai virar tela depois)</div>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}