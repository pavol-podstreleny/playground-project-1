export interface PageSizeSelectorProps {
  actualPageSize: number;
  pageOptions: number[];
  onPageSizeChange: (pageSize: number) => void;
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
  actualPageSize,
  onPageSizeChange,
  pageOptions,
}) => {
  return (
    <div>
      <select
        value={actualPageSize}
        onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
      >
        {pageOptions.map((page) => {
          return (
            <option value={page} key={page}>
              {page}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default PageSizeSelector;
