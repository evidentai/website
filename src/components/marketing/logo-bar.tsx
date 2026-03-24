const companies = [
  "TechCorp",
  "CloudBase",
  "DataFlow",
  "SecureStack",
  "NexaPay",
  "CodeShip",
  "VaultHQ",
  "InfraOps",
];

export function LogoBar() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
          Trusted by fast-moving teams
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="flex animate-logo-scroll">
          {[...companies, ...companies].map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex shrink-0 items-center px-8 py-4 transition-opacity duration-300 opacity-40 hover:opacity-100"
            >
              <span className="whitespace-nowrap text-xl font-semibold tracking-tight">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
