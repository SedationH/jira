function SearchPanel({ param, setParam, users }) {
  return (
    <div>
      <input
        type="text"
        value={param.name}
        onChange={(evt) => {
          setParam({
            ...param,
            name: evt.target.value,
          });
        }}
      />
      <select name="pets" id="pet-select">
        <option value="">负责人</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchPanel;
