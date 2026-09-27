"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { AppLocale } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("locale-switcher");
  const [isPending, startTransition] = useTransition();

  const nextLocale: AppLocale = locale === "en-US" ? "zh-CN" : "en-US";

  function handleLocaleChange() {
    const suffix = `${window.location.search}${window.location.hash}`;

    startTransition(() => {
      router.replace(`${pathname}${suffix}`, {
        locale: nextLocale,
      });
    });
  }
  return (
    <Button
      className={cn("min-h-11 min-w-11", className)}
      type="button"
      variant="ghost"
      size="sm"
      disabled={isPending}
      aria-busy={isPending}
      aria-label={t("label")}
      title={t("label")}
      onClick={handleLocaleChange}
    >
      <span lang={nextLocale}>{t("shortLabel")}</span>
    </Button>
  );
}
