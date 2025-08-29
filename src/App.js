import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import { HomeIcon, FolderIcon } from "@heroicons/react/24/outline";

function App() {
  return (
    <Router>
      <div className="flex">
      
<nav className="bg-white text-gray-800 w-80 p-6 flex flex-col shadow-md">
  <h1 className="text-xl font-bold mb-8">
    <span className="text-black">capitalmind</span>{" "}
    <span className="text-green-600">premium</span>
  </h1>
  <div className="flex flex-col gap-4">
    <Link to="/" className="flex items-center gap-2 hover:text-green-500">
      <HomeIcon className="h-5 w-5" />
      Home
    </Link>
    <Link to="/portfolio" className="flex items-center gap-2 hover:text-green-500">
      <FolderIcon className="h-5 w-5" />
      Portfolio
    </Link>
  </div>
</nav>

      <div className="p-5 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </div>
         </div>
    </Router>
  );
}

export default App;
