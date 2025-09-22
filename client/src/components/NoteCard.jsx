import styles from "../styles/notes.module.css";

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className={styles.noteCard}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className={styles.actions}>
        <button onClick={() => onEdit(note)}>Edit</button>
        <button onClick={() => onDelete(note._id)}>Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;
