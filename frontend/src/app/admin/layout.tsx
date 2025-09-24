import ProtectedRoute from "../../components/ProtectedRoute";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute role="admin">{children}</ProtectedRoute>;
}
