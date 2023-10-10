import styles from './Pagination.module.scss'

import React from 'react';
import ReactPaginate from 'react-paginate';

function Pagination({onChangePage}) {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={event => onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={0}
        />
    );
}

export default Pagination;