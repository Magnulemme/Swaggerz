import NFTGrid from "@/components/Gallery/NFTGrid";
import { getDb } from "@/db";
import { products } from "@/db/schema";
import { CardProps } from "@/components/Card";

// Funzione per creare tutti gli NFT mock per la galleria completa
function createAllNFTs(baseItems: any[]): CardProps[] {
  const categories = ["Trending", "Best Seller", "New Drop", "Exclusive", "Street Art"];
  let allNFTs: CardProps[] = [];

  // Creiamo più NFT combinando tutte le categorie
  categories.forEach(category => {
    const categoryNFTs = baseItems.map((item, index) => ({
      title: `${category} NFT #${index + 1}`,
      description: `Una collezione esclusiva di NFT ${category.toLowerCase()} con dettagli unici e arte straordinaria.`,
      imageSrc: index % 5 === 0 ? '/shoes/shoe-1.jpg' :
                 index % 5 === 1 ? '/shoes/shoe-2.webp' :
                 index % 5 === 2 ? '/trending-1.png' :
                 index % 5 === 3 ? '/trending-2.png' : '/trending-3.png',
      imageAlt: `${category} NFT ${index + 1}`,
      price: `${(Math.random() * 5 + 0.5).toFixed(2)} ETH`,
      originalPrice: Math.random() > 0.7 ? `${(Math.random() * 2 + 6).toFixed(2)} ETH` : undefined,
      href: `/nft/${item.id || index}-${category.toLowerCase()}`,
      badgeText: Math.random() > 0.8 ? "Hot" : undefined,
      isNew: Math.random() > 0.7,
    }));
    allNFTs = [...allNFTs, ...categoryNFTs];
  });

  // Mescoliamo l'array per varietà
  return allNFTs.sort(() => Math.random() - 0.5);
}

export default async function GalleryPage() {
  const db = getDb();
  const items = await db.select().from(products).orderBy(products.createdAt);

  // Creiamo tutti gli NFT per la galleria completa
  const allNFTs = createAllNFTs(items);

  return (
    <NFTGrid
      items={allNFTs}
      title="NFT Gallery"
      subtitle="Scopri la collezione più esclusiva di NFT street art e design contemporaneo. Ogni pezzo racconta una storia unica nel mondo digitale."
    />
  );
}