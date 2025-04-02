import { useState, useEffect, useCallback } from 'react';

interface UseTypingAnimationProps {
  baseText: string;
  sentences: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export const useTypingAnimation = ({
  baseText,
  sentences,
  typingSpeed = 20, // Reduced from 35ms to 20ms
  deletingSpeed = 7, // Reduced from 15ms to 7ms
  pauseDuration = 1000
}: UseTypingAnimationProps) => {
  const [displayText, setDisplayText] = useState(baseText);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const animateText = useCallback(() => {
    const currentSentence = sentences[currentSentenceIndex];
    const targetText = isDeleting ? baseText : `${baseText} ${currentSentence}`;

    if (isPaused) {
      setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return;
    }

    if (isDeleting) {
      if (displayText === baseText) {
        setIsDeleting(false);
        setCurrentSentenceIndex((prev) => (prev + 1) % sentences.length);
        return;
      }

      setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, deletingSpeed);
      return;
    }

    if (displayText === targetText) {
      setIsPaused(true);
      return;
    }

    setTimeout(() => {
      setDisplayText(targetText.slice(0, displayText.length + 1));
    }, typingSpeed);
  }, [
    baseText,
    sentences,
    currentSentenceIndex,
    displayText,
    isDeleting,
    isPaused,
    typingSpeed,
    deletingSpeed,
    pauseDuration
  ]);

  useEffect(() => {
    const timeoutId = setTimeout(animateText, 50);
    return () => clearTimeout(timeoutId);
  }, [animateText]);

  return displayText;
};