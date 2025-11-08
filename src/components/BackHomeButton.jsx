import { Link } from "react-router-dom";

export default function BackHomeButton() {
  return (
    <div className="mt-8">
      <Link
        to="/"
        className="inline-block bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-all"
      >
        ⬅️ Back to Home
      </Link>
    </div>
  );
}
