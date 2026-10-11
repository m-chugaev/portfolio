import { profile } from "@/data/profile";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pb-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4">
        <Separator className="bg-border/60" />
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>
            © {year} {profile.name}
          </span>
          <span>{profile.roles}</span>
        </div>
      </div>
    </footer>
  );
}
