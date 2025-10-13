import CardDashboard from "../Card/CardDashboar";

interface DashboardMetricsProps {
  countUsers: number;
  countComents: number;
  countBlogs: number;
  countProjects: number;
}

export default function DashboardMetrics({
  countUsers,
  countBlogs,
  countComents,
  countProjects,
}: DashboardMetricsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <CardDashboard
        title="Total Users"
        iconName="users" // Gunakan string
        count={countUsers}
        percentageChange="12.5%"
        isPositive={true}
        href="/dashboard/user"
        gradient="from-blue-500 to-cyan-600"
      />

      <CardDashboard
        title="Projects"
        iconName="folder" // Gunakan string
        count={countProjects}
        percentageChange="8.2%"
        isPositive={true}
        href="/dashboard/project"
        gradient="from-purple-500 to-pink-600"
      />

      <CardDashboard
        title="Educations"
        iconName="graduationCap" // Gunakan string
        count={0}
        percentageChange="100%"
        isPositive={false}
        href="/dashboard/education"
        gradient="from-green-500 to-emerald-600"
      />

      <CardDashboard
        title="Blog Posts"
        iconName="file" // Gunakan string
        count={countBlogs}
        percentageChange="15.3%"
        isPositive={true}
        href="/dashboard/blog"
        gradient="from-orange-500 to-red-600"
      />
      <CardDashboard
        title="Comments"
        iconName="Coment" // Gunakan string
        count={countComents}
        percentageChange="0%"
        isPositive={true}
        href="/dashboard/comment"
        gradient="from-orange-500 to-red-600"
      />
    </div>
  );
}
