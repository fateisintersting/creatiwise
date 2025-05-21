import { DashboardLayout } from "@/layouts/DashboardLayout";
import { ArticlesTable } from "@/components/articles-table";

const Index = () => {
  return (
    <DashboardLayout>
      <ArticlesTable />
    </DashboardLayout>
  );
};

export default Index;
