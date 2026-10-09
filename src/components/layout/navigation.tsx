"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/data/site-copy";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const home = pathname === "/";

  useEffect(() => {
    if (!home) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    navigation.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [home]);

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link
          href="/"
          aria-label={`${profile.initials}. Portfolio Design & Engineering — Home`}
          className="brand"
        >
          <span className="monogram">
            {profile.initials}
            <span>.</span>
          </span>
          <span className="brand-caption">
            PORTFOLIO<span>DESIGN & ENGINEERING</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(({ id, label }) => (
            <Link
              key={id}
              href={`${home ? "" : "/"}#${id}`}
              className={cn("nav-link", home && active === id && "active")}
              aria-current={home && active === id ? "location" : undefined}
            >
              {label}
              {id === "contact" && <ArrowUpRight size={13} aria-hidden="true" />}
            </Link>
          ))}
        </nav>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button className="mobile-menu icon-button" aria-label="Open navigation">
              <Menu size={23} />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="menu-overlay" />
            <Dialog.Content className="menu-panel">
              <Dialog.Title className="eyebrow">EXPLORE THE PORTFOLIO</Dialog.Title>
              <Dialog.Description className="sr-only">
                Choose a section to visit.
              </Dialog.Description>
              <Dialog.Close asChild>
                <button className="menu-close icon-button" aria-label="Close navigation">
                  <X />
                </button>
              </Dialog.Close>
              <nav aria-label="Mobile navigation">
                {navigation.map(({ id, label }, index) => (
                  <Link key={id} href={`${home ? "" : "/"}#${id}`} onClick={() => setOpen(false)}>
                    <span className="mono">0{index + 1}</span>
                    {label}
                    <ArrowUpRight size={22} aria-hidden="true" />
                  </Link>
                ))}
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
