
import { useState, useEffect } from "react";
import { request } from "../api/api";
import NoteCard from "../components/NoteCard";
import styles from "../styles/notes.module.css";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editing, setEditing] = useState(null);
  const [deleting, isdeleting] = useState(null);

  const [loading, setLoading] = useState(false); 

  const fetchNotes = async () => {
    const data = await request("/notes");
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await request(`/notes/${editing._id}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
        setEditing(null);
      } else {
        await request("/notes", {
          method: "POST",
          body: JSON.stringify(form),
        });
      }
      setForm({ title: "", content: "" });
      fetchNotes();
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setLoading(false); 
    }
  };

  const handleEdit = (note) => {
    setForm({ title: note.title, content: note.content });
    setEditing(note);
  };

  const handleDelete = async (id) => {
    isdeleting(true)
    setLoading(true); 
    try {
      await request(`/notes/${id}`, { method: "DELETE" });
      fetchNotes();
    } catch (err) {
      alert("Delete failed!");
    } finally {
      setLoading(false);
          isdeleting(false)

    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.noteForm}>
        <h2>{editing ? "Edit Note" : "Add Note"}</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          disabled={loading}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? "#9ca3af" : "#10b981",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {/* {loading ? (editing ? "Updating..." : "Adding...") : editing ? "Update" : "Add"} */}
  {deleting
    ? "Deleting..."
    : loading
    ? editing
      ? "Updating..."
      : "Adding..."
    : editing
    ? "Update"
    : "Add"}
           </button> 
      </form>

      <div className={styles.notesGrid}>
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Notes;
