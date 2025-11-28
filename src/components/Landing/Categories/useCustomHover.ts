import { useState, useEffect, RefObject } from "react";

interface UseCustomHoverProps {
  cardRef: RefObject<HTMLDivElement | null>;
  labelRef?: RefObject<HTMLDivElement | null>;
  isClickable: boolean;
  isActive: boolean;
  shouldRenderLabel?: boolean;
}

/**
 * Custom hook for hover detection using mouse coordinates
 * Handles both card and label hover detection for side cards
 * For main card: checks only card (to avoid conflicts with overlaid elements)
 */
export function useCustomHover({
  cardRef,
  labelRef,
  isClickable,
  isActive,
  shouldRenderLabel = false,
}: UseCustomHoverProps): boolean {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isClickable && !isActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Check if mouse is within card bounding box
      let isInsideCard = false;
      if (cardRef.current) {
        const cardRect = cardRef.current.getBoundingClientRect();
        isInsideCard =
          mouseX >= cardRect.left &&
          mouseX <= cardRect.right &&
          mouseY >= cardRect.top &&
          mouseY <= cardRect.bottom;
      }

      // Check if mouse is within label bounding box (only for side cards)
      let isInsideLabel = false;
      if (labelRef?.current && shouldRenderLabel && isClickable) {
        const labelRect = labelRef.current.getBoundingClientRect();
        isInsideLabel =
          mouseX >= labelRect.left &&
          mouseX <= labelRect.right &&
          mouseY >= labelRect.top &&
          mouseY <= labelRect.bottom;
      }

      // Set hovered if inside either card OR label
      setIsHovered(isInsideCard || isInsideLabel);
    };

    // Add listener to document to track mouse globally
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isClickable, isActive, shouldRenderLabel, cardRef, labelRef]);

  return isHovered;
}
