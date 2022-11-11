import Home from "./components/Home";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import EditMemoForm from "./components/memos/edit/EditMemoForm";
function App() {
    const location = useLocation();
    const background = location.state && location.state.background;

    return (
        <div>
            <Routes location={background || location}>
                <Route path="/" element={<Home />}>
                    <Route
                        path=":categoryId/:memoIndex/edit"
                        element={<EditMemoForm />}
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
            {background && (
                <Routes>
                    <Route
                        path="memo/:categoryId/:memoIndex/edit"
                        element={<EditMemoForm />}
                    />
                </Routes>
            )}
        </div>
    );
}

export default App;
