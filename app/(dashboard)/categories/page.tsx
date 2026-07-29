import { getCategories } from "@/features/categories/category.actions";
import { CategoryList } from "@/features/categories/category-list";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="w-full">
      <CategoryList categories={categories} />
    </div>
  );
}
