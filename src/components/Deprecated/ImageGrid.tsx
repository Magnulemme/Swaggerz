import { motion } from 'framer-motion';
import Image from 'next/image';

interface ImageGridProps {
  images: string[];
  title: string;
  columns?: 2 | 4;
}

export default function ImageGrid({ images, title, columns = 2 }: ImageGridProps) {
  const gridCols = columns === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2';

  return (
    <motion.div
      className={`grid ${gridCols} gap-3 h-full`}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="relative rounded-2xl overflow-hidden group border border-zinc-800"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 + index * 0.05 }}
        >
          <Image
            src={image}
            alt={`${title} Product ${index + 1}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      ))}
    </motion.div>
  );
}
