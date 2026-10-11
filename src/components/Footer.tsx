import { profile } from "@/data/profile";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pb-8 sm:pb-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 sm:gap-5">
        <Separator className="bg-border/60" />
        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
          <span>
            © {year} {profile.name}
          </span>
          <span>
            На создание этого сайта с 0 до появления на домене ушло 5 часов
          </span>
        </div>
      </div>
    </footer>
  );
}
