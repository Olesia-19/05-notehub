import axios from "axios";
import { Note, NewNoteData } from "../types/note";
const myToken = import.meta.env.VITE_NOTEHUB_TOKEN;


axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export interface GetNotesResponse {
    notes: Note[];
    totalPages: number;
}

export const fetchNotes = async (query: string, page: number): Promise<GetNotesResponse> => {
    const params: {
        page: number;
        perPage: number;
        search?: string;
    } = {
        page,
        perPage: 12,
    };
    
    if (query.trim() !== "") {
    params.search = query;
    }

    const response = await axios.get<GetNotesResponse>('/notes', {
        params,
        headers: {
            Authorization : `Bearer ${myToken}`,
        }
    });    
    return response.data;   
}

export const createNote = async (newNoteData: NewNoteData): Promise<Note> => {
    const response = await axios.post<Note>('/notes', newNoteData, {
        headers: {
            Authorization: `Bearer ${myToken}`,
        }
        });
    return response.data;
}

export const deleteNote = async (noteId: number) => {
    const response = await axios.delete<Note>(`/notes/${noteId}`, {
        headers: {
            Authorization: `Bearer ${myToken}`,
        }
        });
    return response.data;
}
