interface FilterProps {
    search: string;
    setSearch: (search: string) => void;
    status: string;
    setStatus: (status: string) => void;
    priority: string;
    setPriority: (priority: string) => void;
    isSortStatus: boolean;
    setSortStatus: (isSortStatus: boolean) => void;
}


export default function FilterInputs({search, setSearch, status, setStatus, priority, setPriority, isSortStatus, setSortStatus}: FilterProps) {
    function clearFilters() {
        setSearch('');
        setStatus('');
        setPriority('');
        setSortStatus(false);
    }
    return(
        <>
        <input type="search" name="search" id="search-input" onChange={(event) => setSearch(event.target.value)} placeholder='search' value={search}/>
        <label htmlFor="status-input">Status:</label>
        <select name="status" id="status-input" onChange={(event) => setStatus(event.target.value)} value={status}>
            <option value=""></option>
            <option value="in progress">In progress</option>
            <option value="todo">Todo</option>
            <option value="done">Done</option>
        </select>
        <label htmlFor="priority-input">Priority:</label>
        <select name="priority" id="priority-input" onChange={(event) => setPriority(event.target.value)} value={priority}>
            <option value=""></option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
        <label htmlFor="project-sort">Sort by status: </label>
        <input className="border-blue-300 rounded h-4 w-4" type="checkbox" name="projectSort" id="project-sort" onChange={() => setSortStatus(!isSortStatus)} checked={isSortStatus}/>
        <button onClick={clearFilters}>Clear Filters</button>
        </>
    )
}