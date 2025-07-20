import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchNotes } from '../../services/noteService'
import { useDebouncedCallback } from 'use-debounce'
import NoteForm from '../NoteForm/NoteForm'
import SearchBox from '../SearchBox/SearchBox'
import Pagination from '../Pagination/Pagination'
import NoteList from '../NoteList/NoteList'
import Modal from '../Modal/Modal'
import css from './App.module.css'


export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const updateSearchQuery = useDebouncedCallback(setQuery, 300);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", query, currentPage],
    queryFn: () => fetchNotes(query, currentPage),
    enabled: true,
  })

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onSearch={updateSearchQuery} />		
        {totalPages > 1 && <Pagination page={currentPage} total={totalPages} onChange={setCurrentPage} />}
        {<button className={css.button} onClick={() => setIsModalOpen(true)}>Create note +</button>}
        </header>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading notes 😢</p>}
        <NoteList notes={data?.notes ?? [] } />
        {isModalOpen && (
          <Modal onClose={() => {setIsModalOpen(false)}}>
            <NoteForm onCloseModal={() => {setIsModalOpen(false)}}/>
          </Modal>
        )}
    </div >
  )
}
