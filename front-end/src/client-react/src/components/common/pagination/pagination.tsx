import "./pagination.css";

export interface PaginationProps {
  itemsCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
}) => {
  const generatePages = (pCount: number, iCount: number) => {
    const pageCount = Math.ceil(iCount / pCount);
    const pages: number[] = [];
    for (let i = 0; i < pageCount; i++) {
      pages.push(i + 1);
    }
    return pages;
  };

  const pages = generatePages(pageSize, itemsCount);
  if (pages.length === 1) return null;
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => {
          return (
            <li
              className={"page-item"}
              id={currentPage === page ? "active-page" : undefined}
              key={page}
            >
              <button onClick={() => onPageChange(page)}>{page}</button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
