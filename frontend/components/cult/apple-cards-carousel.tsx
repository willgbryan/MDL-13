"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "@/app/hooks/use-outside-click";

interface CarouselProps {
    items: JSX.Element[];
  }
  
  type Card = {
    src: string;
    title: string;
    category: string;
    content: React.ReactNode;
  };
  
  export const CarouselContext = createContext<{
    onCardClose: (index: number) => void;
    currentIndex: number;
  }>({
    onCardClose: () => {},
    currentIndex: 0,
  });
  
  export const Carousel = ({ items }: CarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handleCardClose = (index: number) => {
      setCurrentIndex(index);
    };
  
    return (
      <CarouselContext.Provider
        value={{ onCardClose: handleCardClose, currentIndex }}
      >
        <div className="relative w-full">
          <div
            className={cn(
              "grid gap-4 p-4",
              "grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8",
              "max-w-7xl mx-auto"
            )}
          >
            {items.map((item, index) => (
              <motion.div
                key={"card" + index}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.1 * index,
                    ease: "easeOut",
                  },
                }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </CarouselContext.Provider>
    );
  };

  export const Card = ({
    card,
    index,
    layout = false,
  }: {
    card: Card;
    index: number;
    layout?: boolean;
  }) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { onCardClose, currentIndex } = useContext(CarouselContext);
  
    useEffect(() => {
      function onKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape") {
          handleClose();
        }
      }
  
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
  
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, [open]);
  
    useOutsideClick(containerRef, () => handleClose());
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      onCardClose(index);
    };
  
    return (
      <>
        {open && (
          <div className="fixed inset-0 h-screen z-50 overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
            />
            <motion.div
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-fit z-[60] my-10 p-4 md:p-10 rounded-md font-sans relative"
            >
              <button
                className="sticky top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-white rounded-full flex items-center justify-center"
                onClick={handleClose}
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="text-base font-medium text-black dark:text-white"
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="text-2xl md:text-5xl font-semibold text-neutral-700 mt-4 dark:text-white"
              >
                {card.title}
              </motion.p>
              <div className="py-10">{card.content}</div>
            </motion.div>
          </div>
        )}
        <motion.button
          layoutId={layout ? `card-${card.title}` : undefined}
          onClick={handleOpen}
          className="rounded-md bg-gray-100 dark:bg-neutral-900 h-80 w-full overflow-hidden flex flex-col items-start justify-start relative z-10"
        >
          <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
          <div className="relative z-40 p-4">
            <motion.p
              layoutId={layout ? `category-${card.category}` : undefined}
              className="text-white text-sm md:text-base font-medium font-sans text-left"
            >
              {card.category}
            </motion.p>
            <motion.p
              layoutId={layout ? `title-${card.title}` : undefined}
              className="text-white text-xl md:text-2xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
            >
              {card.title}
            </motion.p>
          </div>
          <BlurImage
            src={card.src}
            alt={card.title}
            fill
            className="object-cover absolute z-10 inset-0"
          />
        </motion.button>
      </>
    );
  };

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
