import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="reading-column">
      <p className="editorial-meta mb-6 font-mono">404</p>
      <h1 className="editorial-heading">{t("title")}</h1>
      <p className="editorial-body mt-8">{t("description")}</p>
      <Link href="/" className="text-link mt-8 inline-block py-2">
        {t("home")} <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
