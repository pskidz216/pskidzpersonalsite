import { PSSeal } from "@/components/ui/PSSeal";

export function Footer() {
  return (
    <footer className="bg-bg-dark py-10 flex flex-col items-center gap-4">
      <PSSeal className="w-12 h-12 text-text-inverse/80" />
      <p className="text-text-inverse/40 text-sm font-body">
        &copy; {new Date().getFullYear()} Paul Skidmore
      </p>
    </footer>
  );
}
