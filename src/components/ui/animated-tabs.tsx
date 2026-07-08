"use client";

// Adapted from a 21st.dev-style "animated-tabs" reference: a pill-shaped tab
// bar where an inner primary-colored layer is clipped to exactly the active
// tab's bounds and animates (clip-path transition) between tabs, instead of
// sliding a separate absolutely-positioned indicator div.
// Made controllable (value/onChange) so a parent can drive which tab is
// active — e.g. filtering a list by category — instead of only supporting
// isolated internal state like the original demo.
import * as React from "react";
import { useEffect, useRef, useState } from "react";

export interface AnimatedTabsProps {
  tabs: { label: string; value?: string }[];
  value?: string;
  onValueChange?: (value: string) => void;
}

export function AnimatedTabs({ tabs, value, onValueChange }: AnimatedTabsProps) {
  const [internalTab, setInternalTab] = useState(tabs[0]?.value ?? tabs[0]?.label);
  const activeTab = value ?? internalTab;
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  function selectTab(tabValue: string) {
    setInternalTab(tabValue);
    onValueChange?.(tabValue);
  }

  useEffect(() => {
    const container = containerRef.current;

    if (container && activeTab) {
      const activeTabElement = activeTabRef.current;

      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement;

        const clipLeft = offsetLeft + 16;
        const clipRight = offsetLeft + offsetWidth + 16;

        container.style.clipPath = `inset(0 ${Number(
          100 - (clipRight / container.offsetWidth) * 100
        ).toFixed()}% 0 ${Number(
          (clipLeft / container.offsetWidth) * 100
        ).toFixed()}% round 17px)`;
      }
    }
  }, [activeTab]);

  return (
    <div className="relative mx-auto flex w-fit flex-col items-center rounded-full border border-primary/10 bg-secondary/50 px-4 py-2">
      <div
        ref={containerRef}
        className="absolute z-10 w-full overflow-hidden [clip-path:inset(0px_75%_0px_0%_round_17px)] [transition:clip-path_0.25s_ease]"
      >
        <div className="relative flex w-full justify-center bg-primary">
          {tabs.map((tab) => (
            <button
              key={tab.value ?? tab.label}
              onClick={() => selectTab(tab.value ?? tab.label)}
              className="flex h-8 items-center rounded-full p-3 text-sm font-medium text-primary-foreground"
              tabIndex={-1}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex w-full justify-center">
        {tabs.map((tab) => {
          const tabValue = tab.value ?? tab.label;
          const isActive = activeTab === tabValue;

          return (
            <button
              key={tabValue}
              ref={isActive ? activeTabRef : null}
              onClick={() => selectTab(tabValue)}
              className="flex h-8 cursor-pointer items-center rounded-full p-3 text-sm font-medium text-muted-foreground"
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
