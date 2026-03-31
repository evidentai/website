import { Logo } from "@/components/shared/logo";

export default function StandaloneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="fixed top-0 z-50 flex h-16 w-full items-center px-6">
        <Logo />
      </header>
      <main className="min-h-screen pt-16">{children}</main>
    </>
  );
}
