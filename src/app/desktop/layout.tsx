export default function DesktopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="xp-shell">{children}</div>;
}
