interface Props {
    search: string;
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>)=>void;
  }

const Search: React.FC<Props> = ({
    search,
    handleSearch
  }) => {
    return (
      <div className='col-md-10'>
         <label htmlFor="search" className='w-75'>
        <input id="search" type="text" className='form-control' onChange={handleSearch} placeholder='Search...'/>
      </label>
      </div>
    )
  }

export default Search;