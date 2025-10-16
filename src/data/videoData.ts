// data/videoData.ts
import { VideoDataItem } from '@/types/video.types';

export const videoData: VideoDataItem[] = [
  {
    id: 1,
    src: "/videos/streetwear.mp4",
    title: "Streetwear",
    badge: "Collezione Urban",
    description: "Dove la cultura urbana incontra il design contemporaneo. Capi autentici e sneakers esclusive selezionati dai migliori brand streetwear internazionali.",
    stats: [
      { 
        iconType: 'package',
        iconColor: 'yellow',
        value: "350+", 
        label: "Prodotti" 
      },
      { 
        iconType: 'trending',
        iconColor: 'red',
        value: "24", 
        label: "Brand" 
      },
      { 
        iconType: 'star',
        iconColor: 'yellow',
        value: "4.8", 
        label: "Rating" 
      }
    ],
    highlights: [
      "Supreme",
      "Off-White", 
      "Stone Island",
      "Nike x Collabs",
      "Edizioni Limitate"
    ],
    hasNewArrivals: true
  },
  {
    id: 2,
    src: "/videos/art.mp4",
    title: "Arte",
    badge: "Gallery Exclusive",
    description: "Esplora l'intersezione tra moda e arte. Collaborazioni esclusive con artisti emergenti e affermati, opere digitali NFT e stampe d'autore in edizione limitata.",
    stats: [
      { 
        iconType: 'palette',
        iconColor: 'red',
        value: "45+", 
        label: "Artisti" 
      },
      { 
        iconType: 'users',
        iconColor: 'yellow',
        value: "2.5k", 
        label: "Collezionisti" 
      },
      { 
        iconType: 'star',
        iconColor: 'yellow',
        value: "120", 
        label: "Opere Uniche" 
      }
    ],
    highlights: [
      "NFT Verified",
      "Certificati Autenticità",
      "Print on Demand",
      "Gallery Pieces",
      "Artist Collabs"
    ],
    hasNewArrivals: false
  },
  {
    id: 3,
    src: "/videos/collezionabili.mp4",
    title: "Collezionabili",
    badge: "Limited Edition",
    description: "Pezzi rari e introvabili per veri collezionisti. Dalle sneakers deadstock ai memorabilia vintage, ogni articolo è verificato e certificato per autenticità.",
    stats: [
      { 
        iconType: 'clock',
        iconColor: 'yellow',
        value: "48h", 
        label: "Drop Time" 
      },
      { 
        iconType: 'package',
        iconColor: 'red',
        value: "85", 
        label: "Pezzi Rari" 
      },
      { 
        iconType: 'users',
        iconColor: 'yellow',
        value: "500+", 
        label: "Waiting List" 
      }
    ],
    highlights: [
      "Deadstock",
      "Vintage Archive",
      "Signed Items",
      "First Editions",
      "Grails Only"
    ],
    hasNewArrivals: true
  }
];