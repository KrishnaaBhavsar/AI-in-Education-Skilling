import { useState } from "react";
import { X, Upload, Plus, FileText } from "lucide-react"; // Added FileText
import { createSubject } from "../../services/api";

export default function Modal({ isOpen, onClose, onSubjectAdded }) {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null); // New state for PDF
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    console.log("handleSubmit called with name:", name, "file:", file);
    if (!name.trim()) return alert("Please enter a subject name");
    if (!file) return alert("Please upload a PDF study material");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("pdf", file);

    console.log("Sending FormData:", formData);
    setLoading(true);
    try {
      const response = await createSubject(formData);
      console.log("Subject created successfully:", response);
      setName("");
      setFile(null);
      onSubjectAdded();
      onClose();
    } catch (err) {
      console.error("Error creating subject:", err);
      alert("Failed to upload. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-800/50">
          <h3 className="font-semibold text-lg">Add New Subject</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">
              Subject Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Operating Systems"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 px-4 focus:outline-none focus:border-brand-accent transition"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">
              Study Material (PDF)
            </label>
            <label className="border-2 border-dashed border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center group hover:border-brand-accent transition cursor-pointer">
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  console.log("Selected file:", selectedFile);
                  setFile(selectedFile);
                }}
              />
              {file ? (
                <div className="flex items-center gap-2 text-brand-accent">
                  <FileText size={24} />
                  <span className="text-sm font-medium truncate max-w-[200px]">
                    {file.name}
                  </span>
                </div>
              ) : (
                <>
                  <Upload
                    className="text-slate-500 group-hover:text-brand-accent mb-2"
                    size={32}
                  />
                  <p className="text-sm text-slate-400">Click to upload PDF</p>
                </>
              )}
            </label>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-brand-accent hover:bg-blue-600 disabled:bg-slate-700 text-white font-semibold py-3 rounded-xl transition mt-4 flex items-center justify-center gap-2"
          >
            {loading ? (
              "Uploading..."
            ) : (
              <>
                <Plus size={18} /> Create Subject
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
