import React from 'react';

/**
 * Wraps `accent` inside `text` in the brand gradient, so a headline gets the
 * same treatment as the homepage H1. Falls back to plain text when the accent
 * is missing or not found, so a copy edit can never blank a heading.
 */
export function highlight(text: string, accent?: string): React.ReactNode {
  if (!accent) return text;

  const index = text.indexOf(accent);
  if (index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <span className="text-gradient">{accent}</span>
      {text.slice(index + accent.length)}
    </>
  );
}
