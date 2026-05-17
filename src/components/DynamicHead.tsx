import { useEffect } from "react";
import { useSettings } from "@/hooks/useSettings";

/** Updates <link rel="icon"> + document.title prefix to NGO branding when settings load. */
export function DynamicHead() {
  const { settings } = useSettings();
  const { ngo_name, favicon_url, logo_url } = settings.branding;

  useEffect(() => {
    if (typeof document === "undefined") return;
    const href = favicon_url || logo_url;
    if (!href) return;
    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = href;
  }, [favicon_url, logo_url, ngo_name]);

  return null;
}
