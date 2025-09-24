import ProtectedRoute from "../../components/ProtectedRoute";

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute role="partner">{children}</ProtectedRoute>;
}
