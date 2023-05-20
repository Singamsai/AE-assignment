import { Routes, Route } from "react-router-dom";
import "./App.css";
import Posts from "./pages/Posts";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Posts />}></Route>
        <Route path="/posts" element={<Posts />}></Route>
        <Route path="/posts/comments" element={<Posts />}></Route>
        <Route path="/posts/users" element={<Posts />}></Route>
      </Routes>
    </div>
  );
}

export default App;
