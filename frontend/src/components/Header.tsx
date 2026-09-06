"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Overview / Portal", href: "/" },
  { label: "Intelligence Workspace", href: "/dashboard" },
  { label: "Statutory Briefs & Reports", href: "/reports" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface-base/95 backdrop-blur-xl border-b border-border-crisp">
      <div className="h-16 w-full px-space-xl flex items-center justify-between gap-space-md">
        {/* Left: Logo + Brand */}
        <div className="flex items-center gap-space-base min-w-max">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-surface-base text-[18px]">
                terrain
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs">
                <Link
                  href="/"
                  className="font-headline-md text-headline-md font-bold tracking-tight text-text-primary hover:text-mining-gold-bright transition-colors"
                >
                  CMPDI GeoReport AI
                </Link>
                <span className="font-mono-citation text-mono-citation px-space-xs py-0.5 rounded bg-surface-container-high text-mining-gold-bright border border-border-crisp">
                  ID: #26023
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-text-muted">
                Ministry of Coal • Coal India Limited
              </span>
            </div>
          </div>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden xl:flex items-center gap-space-xs h-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "h-full flex items-center px-space-base transition-colors bg-surface-hover text-text-primary border-b-2 border-primary-container font-semibold"
                    : "h-full flex items-center px-space-base font-body-md text-body-md text-text-secondary hover:text-text-primary hover:bg-surface-card transition-colors"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Status + User */}
        <div className="flex items-center gap-space-md min-w-max">
          {/* Operational Subsidiary */}
          <div className="hidden lg:flex flex-col items-end px-space-sm py-0.5 rounded bg-surface-card border border-border-crisp">
            <span className="font-mono-label text-mono-label text-text-muted uppercase tracking-wider">
              Operational Subsidiary
            </span>
            <span className="font-body-sm text-body-sm font-semibold text-text-primary flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-mining-gold-bright" />
              BCCL Dhanbad
            </span>
          </div>

          {/* RAG Status */}
          <div className="hidden md:flex items-center gap-space-xs px-space-sm py-1 rounded bg-govtech-emerald-dim/40 border border-govtech-emerald/30">
            <span className="w-2 h-2 rounded-full bg-govtech-emerald animate-pulse" />
            <span className="font-mono-citation text-mono-citation text-govtech-emerald font-semibold">
              RAG: 99.4%
            </span>
          </div>

          {/* Notification Bell */}
          <div className="relative flex items-center justify-center">
            <button
              type="button"
              className="w-9 h-9 rounded bg-surface-card hover:bg-surface-hover border border-border-crisp flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors relative"
            >
              <span className="material-symbols-outlined text-[20px]">
                notifications
              </span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-state-warning rounded-full" />
            </button>
          </div>

          {/* User */}
          <div className="flex items-center gap-space-sm pl-space-xs">
            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="font-body-sm text-body-sm font-semibold text-text-primary leading-tight">
                Er. Dinesh Sharma
              </span>
              <span className="font-mono-citation text-mono-citation text-text-muted">
                Chief Surveyor
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
