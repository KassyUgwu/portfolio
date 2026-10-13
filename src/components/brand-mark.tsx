import { cn } from "@/lib/utils";
import styles from "./brand-mark.module.css";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn(styles.mark, className)} aria-hidden="true">
      <svg className={styles.art} viewBox="0 0 32 32" role="presentation">
        <g className={styles.orbit}>
          <circle cx="16" cy="16" r="11.5" className={styles.orbitLine} />
          <circle cx="16" cy="4.5" r="2" className={styles.orbitDot} />
        </g>
        <path className={styles.letter} d="M12 9v14m9-14-9 7 9 7" />
      </svg>
    </span>
  );
}
