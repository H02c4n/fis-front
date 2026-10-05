import { ButtonLink } from "./Button";

export function ContactCta() {
  return (
    <div className="container-content">
      <div className="flex flex-col items-start gap-6 rounded-2xl bg-navy px-8 py-12 text-white sm:flex-row sm:items-center sm:justify-between sm:px-12">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Har du frågor?</h2>
          <p className="mt-2 max-w-md text-white/70">
            Kontakta oss så hjälper vi dig att hitta rätt lösning för din flyttstädning.
          </p>
        </div>
        <ButtonLink href="/kontakt" variant="primary">Kontakta oss</ButtonLink>
      </div>
    </div>
  );
}
