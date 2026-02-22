import { useNavigate } from "react-router-dom";
import { Book, Clock, ArrowRight, Trash2 } from "lucide-react";

export default function SubjectGrid({ subjects, onAddClick, onDeleteSubject }) {
  const navigate = useNavigate();

  const handleCardClick = (subject) => {
    // This sends the user to the Study Lab and passes the subject data along with them!
    navigate("/lab", { state: { subject } });
  };

  const handleDeleteClick = (e, subjectId) => {
    e.stopPropagation(); // Prevent card click when delete button is clicked
    if (onDeleteSubject) {
      onDeleteSubject(subjectId);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Subjects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((sub) => (
          <div
            key={sub._id}
            onClick={() => handleCardClick(sub)}
            className="bg-slate-800/50 border border-slate-700 p-5 rounded-xl hover:border-brand-accent transition cursor-pointer group flex flex-col h-full relative"
          >
            {/* Delete Button */}
            <button
              onClick={(e) => handleDeleteClick(e, sub._id)}
              className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              title="Delete subject"
            >
              <Trash2 size={16} />
            </button>

            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2 group-hover:text-brand-accent transition-colors pr-8">
                {sub.name}
              </h3>

              <div className="flex items-center gap-4 text-sm text-slate-400 mt-4">
                <div className="flex items-center gap-1.5">
                  <Book size={16} />
                  <span>{sub.pdfPath ? "PDF Uploaded" : "No PDF"}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm text-slate-500 group-hover:text-brand-accent transition-colors">
              <span>Enter Study Lab</span>
              <ArrowRight
                size={16}
                className="transform group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>
        ))}

        {/* Add New Subject Card */}
        <div
          onClick={onAddClick}
          className="border-2 border-dashed border-slate-700 p-5 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:text-slate-300 hover:border-slate-500 transition cursor-pointer min-h-[160px]"
        >
          <span className="text-3xl mb-1">+</span>
          <span className="text-sm font-medium">Add New Subject</span>
        </div>
      </div>
    </div>
  );
}
