'use client';

// module
import React, { useState, useEffect } from 'react';

// component
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { BsDot } from 'react-icons/bs';

// css
import styles from './carousel.module.css';

type CarouselItem = {
  src: string;
  title?: string;
  text?: string;
};

interface CarouselProps {
  items: CarouselItem[];
  interval?: number; // Optional: auto-slide interval in ms
}

const Carousel: React.FC<CarouselProps> = ({ items, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= items.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval]);

  if (!items.length) return null;

  return (
    <div className={styles.carousel}>
        <AnimatePresence mode="wait">
        <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className={styles.carouselItem}
        >
            <Image
                src={items[currentIndex].src}
                alt="Illustration"
                className={styles.illustration}
                width={300}
                height={300}
                priority
            />
            <p className={styles.carouselText}>
                {items[currentIndex].text}
            </p>
        </motion.div>
        </AnimatePresence>
        <div className={styles.dots}>
            {items.map((_, index) => (
                <BsDot
                key={index}
                size={28}
                className={index === currentIndex ? styles.activeDot : styles.inactiveDot}
                />
            ))}
        </div>
    </div>
  );
};

export default Carousel;
