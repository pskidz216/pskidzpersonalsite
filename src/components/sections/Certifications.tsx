"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { SectionWithStickyTitle } from "@/components/ui/SectionWithStickyTitle";
import { certifications, type Certification } from "@/lib/data";

/* ─── Issuer Icons ─── */

function AnthropicIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.827 3.52h3.603L24 20.48h-3.603l-6.57-16.96zm-7.257 0H10.173L16.74 20.48H13.14L11.7 16.56H5.46L4.02 20.48H.42L6.57 3.52zM6.57 13.6h4.02L8.58 7.6 6.57 13.6z" />
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function GAIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#E8735A" />
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="sans-serif">GA</text>
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#1A3A5C" />
      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WellnessIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#E8735A" />
    </svg>
  );
}

function ChevronIcon({ className, open }: { className?: string; open: boolean }) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <path d="M6 9l6 6 6-6" />
    </motion.svg>
  );
}

function IssuerIcon({
  issuer,
  className,
}: {
  issuer: string;
  className?: string;
}) {
  switch (issuer) {
    case "Anthropic":
      return <AnthropicIcon className={className} />;
    case "Google":
      return <GoogleIcon className={className} />;
    case "General Assembly":
      return <GAIcon className={className} />;
    case "NSCA":
      return <ShieldIcon className={className} />;
    case "Poliquin Group":
    case "CHEK Institute":
      return <WellnessIcon className={className} />;
    default:
      return <GoogleIcon className={className} />;
  }
}

function getIssuerColor(issuer: string) {
  switch (issuer) {
    case "Anthropic":
      return "text-[#D4A574]";
    case "Google":
      return "text-[#4285F4]";
    case "General Assembly":
      return "text-accent-coral";
    case "NSCA":
      return "text-[#1A3A5C]";
    case "Poliquin Group":
    case "CHEK Institute":
      return "text-accent-coral";
    default:
      return "text-text-muted";
  }
}

function CertItem({ cert, index }: { cert: Certification; index: number }) {
  const color = getIssuerColor(cert.issuer);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.25, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-3 py-2.5"
    >
      <div className={`shrink-0 w-5 h-5 ${color}`}>
        <IssuerIcon issuer={cert.issuer} className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="font-body text-text-primary text-[13px] leading-snug">
          {cert.name}
        </p>
        <p className="font-body text-text-muted text-[11px] mt-0.5">
          {cert.issuer} &middot; {cert.date}
        </p>
      </div>
    </motion.div>
  );
}

function CertGroup({
  label,
  count,
  certs,
  defaultOpen = false,
}: {
  label: string;
  count: number;
  certs: Certification[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div variants={fadeUp} className="border border-timeline-line/40 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-bg-secondary/50 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <h3 className="font-heading font-bold text-text-primary text-sm md:text-[15px]">
            {label}
          </h3>
          <span className="font-body text-text-muted text-xs bg-bg-secondary/80 px-2 py-0.5 rounded-full">
            {count}
          </span>
        </div>
        <ChevronIcon className="w-4 h-4 text-text-muted" open={open} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 pt-1 border-t border-timeline-line/30">
              {certs.map((cert, i) => (
                <CertItem key={cert.name} cert={cert} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Certifications() {
  const aiCerts = certifications.filter((c) => c.issuer === "Anthropic");
  const marketingCerts = certifications.filter((c) => c.issuer === "Google");
  const bizDevCerts = certifications.filter((c) => c.issuer === "General Assembly");
  const healthCerts = certifications.filter(
    (c) => c.issuer !== "Anthropic" && c.issuer !== "Google" && c.issuer !== "General Assembly"
  );

  const groups = [
    { label: "AI & Engineering", certs: aiCerts, defaultOpen: false },
    { label: "Digital Marketing", certs: marketingCerts, defaultOpen: false },
    { label: "Business Development", certs: bizDevCerts, defaultOpen: false },
    { label: "Health", certs: healthCerts, defaultOpen: false },
  ];

  return (
    <section id="certifications" className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <SectionWithStickyTitle title="Certs">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
          >
            {groups.map((group) => (
              <CertGroup
                key={group.label}
                label={group.label}
                count={group.certs.length}
                certs={group.certs}
                defaultOpen={group.defaultOpen}
              />
            ))}
          </motion.div>
        </SectionWithStickyTitle>
      </div>
    </section>
  );
}
