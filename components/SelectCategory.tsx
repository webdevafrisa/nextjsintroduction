import { categoryItems } from "./categoryItems";

export function SelectCategory() {
  return (
    <div className="flex items-center gap-x-4">
      <select name="category">
        <option value="none" selected disabled hidden>
          Select Category
        </option>
        {categoryItems.map((item) => (
          <option key={item.id} value={item.name}>
            {item.title}
          </option>
        ))}
      </select>
    </div>
  );
}
