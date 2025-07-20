import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Note } from '../../types/note'
import { deleteNote } from '../../services/noteService'
import css from './NoteList.module.css'

interface NoteListProps {
    notes: Note[];
}

export default function NoteList({notes}: NoteListProps) {
    const queryClient = useQueryClient();

    const deleteNoteMutation = useMutation({
        mutationFn: (noteId: number) => deleteNote(noteId),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["notes"] })
        }
    });

    const handleDelete = (noteId: number) => {
        deleteNoteMutation.mutate(noteId);
    }

    return (
        <ul className={css.list}>
            {notes.map((note) => (
                <li key={note.id } className={css.listItem}>
                <h2 className={css.title}>{note.title}</h2>
                <p className={css.content}>{note.content}</p>
                <div className={css.footer}>
                    <span className={css.tag}>{note.tag}</span>
                        <button type="button" onClick={() => handleDelete(note.id)} className={css.button}>Delete</button>
                </div>
            </li>
            ))}
        </ul>
    )
}