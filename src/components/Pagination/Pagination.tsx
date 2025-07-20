import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
    page: number;
    total: number;
    onChange: (nextPage: number) => void;
}

export default function Pagination({ page, total, onChange }: PaginationProps) {
    
    if (total <= 0) return null;

    return (
        <ReactPaginate
            pageCount={total}
            pageRangeDisplayed={4}
            // marginPagesDisplayed={2}
            // breakLabel="..."
            nextLabel="→"
            previousLabel="←"
            containerClassName={css.pagination}
            activeClassName={css.active}
            onPageChange={({ selected }) => onChange(selected + 1)}
            forcePage={page - 1}
            renderOnZeroPageCount={null}
    />
    )
}