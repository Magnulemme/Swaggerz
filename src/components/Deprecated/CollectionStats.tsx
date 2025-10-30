import { motion } from 'framer-motion';

interface CollectionStatsProps {
  price: string;
  pieces: string;
  nftLabel: string;
  badgeColor: string;
  size?: 'default' | 'small';
}

export default function CollectionStats({
  price,
  pieces,
  nftLabel,
  badgeColor,
  size = 'default'
}: CollectionStatsProps) {
  const textSize = size === 'small' ? 'text-2xl' : 'text-3xl';

  return (
    <motion.div
      className="flex flex-wrap items-center gap-6"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.35 }}
    >
      <div>
        <p className="text-sm text-zinc-400 mb-1">A partire da</p>
        <p className={`${textSize} font-bold text-white`}>{price}</p>
      </div>
      <div className="w-px h-12 bg-zinc-700" />
      <div>
        <p className="text-sm text-zinc-400 mb-1">Pezzi</p>
        <p className={`${textSize} font-bold text-white`}>{pieces}</p>
      </div>
      <div className="w-px h-12 bg-zinc-700" />
      <div>
        <p className="text-sm text-zinc-400 mb-1">Limited Edition</p>
        <p className={`${textSize} font-bold text-${badgeColor}-400`}>{nftLabel}</p>
      </div>
    </motion.div>
  );
}
