import { useState, useMemo } from "react";
import type { DogProfile } from "@/types/dog-profile";

type Props = {
  profile: DogProfile;
  update: (patch: Partial<DogProfile>) => void;
  next: () => void;
};

const popularBreeds = [
  "Labrador Retriever", "Golden Retriever", "German Shepherd", "Beagle",
  "Pug", "Rottweiler", "Doberman", "Boxer", "Shih Tzu", "Siberian Husky",
  "Cocker Spaniel", "Dachshund", "Great Dane", "Dalmatian", "Pomeranian",
  "Indian Spitz", "Indian Pariah Dog", "Rajapalayam", "Mudhol Hound", "Chippiparai",
  "Kanni", "Kombai", "Bakharwal Dog", "Jonangi", "Rampur Greyhound",
  "French Bulldog", "English Bulldog", "Lhasa Apso", "Saint Bernard", "Maltese",
];

export function StepBreed({ profile, update, next }: Props) {
  const [search, setSearch] = useState(profile.breed);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!search.trim()) return popularBreeds;
    const q = search.toLowerCase();
    return popularBreeds.filter((b) => b.toLowerCase().includes(q));
  }, [search]);

  const select = (breed: string) => {
    setSearch(breed);
    update({ breed });
    setOpen(false);
    next();
  };

  return (
    <div className="flex flex-col">
      <h2 className="headline-xl text-[clamp(1.8rem,4vw,2.8rem)] text-foreground">
        What breed is {profile.name || "your dog"}?
      </h2>
      <p className="mt-3 text-sm text-muted-foreground">
        This helps us calculate the right nutrition profile.
      </p>

      {/* Search input */}
      <div className="relative mt-8">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search breed…"
          autoFocus
          className="w-full rounded-xl border border-[var(--color-input)] bg-background px-5 py-4 text-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
        />

        {/* Dropdown */}
        {open && (
          <div className="absolute left-0 top-full z-30 mt-1 max-h-[260px] w-full overflow-y-auto rounded-xl border border-[var(--color-border)] bg-background shadow-lg">
            {filtered.length > 0 ? (
              filtered.map((breed) => (
                <button
                  key={breed}
                  type="button"
                  onClick={() => select(breed)}
                  className="w-full px-5 py-3 text-left text-sm text-foreground transition-colors hover:bg-muted"
                >
                  {breed}
                </button>
              ))
            ) : (
              <button
                type="button"
                onClick={() => select(search.trim() || "Mixed / Other")}
                className="w-full px-5 py-3 text-left text-sm text-foreground hover:bg-muted"
              >
                Use &ldquo;{search.trim() || "Mixed / Other"}&rdquo;
              </button>
            )}
            {filtered.length > 0 && (
              <button
                type="button"
                onClick={() => select("Mixed / Other")}
                className="w-full border-t border-[var(--color-border)] px-5 py-3 text-left text-sm text-accent hover:bg-muted"
              >
                Mixed / Other
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
