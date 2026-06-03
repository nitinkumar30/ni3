"use client";

import { useState, useEffect } from "react";

interface TypingAnimationProps {
  words: string[];
  className?: string;
}

export function TypingAnimation({ words, className = "" }: TypingAnimationProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting && charIndex < currentWord.length) {
          setCharIndex((prev) => prev + 1);
        } else if (isDeleting && charIndex > 0) {
          setCharIndex((prev) => prev - 1);
        } else if (!isDeleting && charIndex === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words]);

  return (
    <span className={className}>
      {words[wordIndex].substring(0, charIndex)}
      <span className="animate-pulse text-[#00E5FF]">|</span>
    </span>
  );
}
