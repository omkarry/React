interface Props {
    sortedBy: string;
    handleSort: (sortBy: string) => void;
  }

const Sort: React.FC<Props> = ({
    sortedBy,
    handleSort
  }) => {
    return (
      <div className="sort-container my-3">
        <label htmlFor="sort-select" className="me-2">
          Sort by:
        </label>
        <select
          id="sort-select"
          value={sortedBy}
          onChange={(e) => handleSort(e.target.value)}
          className="form-select"
        >
          <option value="nameAsc">Name [A-Z]</option>
          <option value="nameDesc">Name [Z-A]</option>
          <option value="priceAsc">Price (Lower to Higher)</option>
          <option value="priceDesc">Price (Higher to Lower)</option>
        </select>
      </div>
    )
  }

export default Sort;