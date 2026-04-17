export function Nav() {
  return (
    <nav className="w-full">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-6 md:px-10">
        <a href="/" className="font-serif text-2xl tracking-tight text-foreground">
          Pupsy<span className="text-accent">.</span>
        </a>

        <div className="hidden items-center gap-9 md:flex">
          <a href="#how" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            How it works
          </a>
          <a href="#meals" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Meals
          </a>
          <a href="#science" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Our science
          </a>
        </div>

        <a href="#plan" className="btn-pill-dark">
          Build your plan
        </a>
      </div>
    </nav>
  );
}
