import { cn } from "@/lib/utils";
import type { MouseEvent as ReactMouseEvent } from "react";
import styles from "./LineSidebar.module.css";

export type LineSidebarItem = {
  id: string;
  label: string;
  href: string;
};

type LineSidebarProps = {
  items: readonly LineSidebarItem[];
  activeIndex: number | null;
  onItemClick: (
    event: ReactMouseEvent<HTMLAnchorElement>,
    index: number,
    item: LineSidebarItem,
  ) => void;
};

export default function LineSidebar({
  items,
  activeIndex,
  onItemClick,
}: LineSidebarProps) {
  return (
    <nav aria-label="文章目录" className={styles.navigation}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <li key={item.id}>
              <a
                href={item.href}
                data-label={item.label}
                aria-current={isActive ? "location" : undefined}
                className={cn(styles.link, isActive && styles.active)}
                onClick={(event) => onItemClick(event, index, item)}
              >
                <span className="sr-only">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
