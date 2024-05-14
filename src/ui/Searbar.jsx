export function SearchBar() {
  return (
    <div className="flex w-72 flex-col gap-6">
      <input
        type="text"
        className="border-b border-[#626262] bg-transparent py-1 mb-2 placeholder:text-sm placeholder:text-[#626262]"
        placeholder="Search"
      />
    </div>
  );
}
