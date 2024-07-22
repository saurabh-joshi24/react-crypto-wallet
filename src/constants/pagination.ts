interface PaginationType {
    currentPage: number,
    totalPages: number,
    pageLimit: number,
    itemsPerPage: number,
    indexOfLastItem: number,
    indexOfFirstItem: number
}


const INITIAL_PAGINATION_DATA = {
    currentPage: 1,
    pageLimit: 5,
    itemsPerPage: 5,
    indexOfLastItem: 5,
    indexOfFirstItem: 0
  }

export { INITIAL_PAGINATION_DATA , PaginationType}