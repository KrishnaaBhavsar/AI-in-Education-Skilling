import { useState, useEffect } from "react";
import StatCards from "../components/dashboard/StatCards"
import SubjectGrid from "../components/dashboard/SubjectGrid";
import Modal from "../components/shared/Modal"
import { fetchSubjects, deleteSubject } from "../services/api";

// ... keep the rest of your export default function Dashboard() code below ...

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);

  const loadSubjects = async () => {
    try {
      const response = await fetchSubjects();
      setSubjects(response.data);
    } catch (err) {
      console.error("Failed to fetch subjects", err);
    }
  };

  const handleDeleteSubject = async (subjectId) => {
    if (window.confirm("Are you sure you want to delete this subject? This action cannot be undone.")) {
      try {
        await deleteSubject(subjectId);
        // Remove the subject from the local state
        setSubjects(subjects.filter(sub => sub._id !== subjectId));
      } catch (err) {
        console.error("Failed to delete subject", err);
        alert("Failed to delete subject. Please try again.");
      }
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Aniket!</h1>
          <p className="text-slate-400">
            Ready to master some new concepts today?
          </p>
        </div>
      </header>

      <StatCards />

      {/* Pass subjects down to the grid */}
      <SubjectGrid
        subjects={subjects}
        onAddClick={() => setIsModalOpen(true)}
        onDeleteSubject={handleDeleteSubject}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubjectAdded={loadSubjects}
      />
    </div>
  );
}
