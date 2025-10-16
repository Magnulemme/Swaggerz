export interface NFTCollection {
  id: string;
  name: string;
  dropName: string;
  creator: string;
  image: string;
  floorPrice: string;
  href: string;
}

export const latestNFTs: NFTCollection[] = [
  {
    id: '1',
    name: 'Cyber Runner #1234',
    dropName: 'Cyber Sneakers',
    creator: 'DigitalArtist',
    image: 'https://images.unsplash.com/photo-1620799140188-3b2a7c2e0e12?w=500&q=80',
    floorPrice: '2.5 ETH',
    href: '/nft/1'
  },
  {
    id: '2',
    name: 'Urban Legend #5678',
    dropName: 'Urban Collection',
    creator: 'StreetVision',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80',
    floorPrice: '1.8 ETH',
    href: '/nft/2'
  },
  {
    id: '3',
    name: 'Dream State #9012',
    dropName: 'Digital Dreams',
    creator: 'SurrealMaster',
    image: 'https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=500&q=80',
    floorPrice: '3.2 ETH',
    href: '/nft/3'
  },
  {
    id: '4',
    name: 'Neon Glow #3456',
    dropName: 'Neon Nights',
    creator: 'LightArtist',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&q=80',
    floorPrice: '2.1 ETH',
    href: '/nft/4'
  },
  {
    id: '5',
    name: 'Retro Vibes #7890',
    dropName: 'Retro Wave',
    creator: 'VaporArt',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&q=80',
    floorPrice: '1.5 ETH',
    href: '/nft/5'
  },
  {
    id: '6',
    name: 'Cosmic Entity #2345',
    dropName: 'Cosmic Vault',
    creator: 'SpaceCreator',
    image: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=500&q=80',
    floorPrice: '4.0 ETH',
    href: '/nft/6'
  },
  {
    id: '7',
    name: 'Digital Soul #6789',
    dropName: 'Cyber Sneakers',
    creator: 'DigitalArtist',
    image: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=500&q=80',
    floorPrice: '2.8 ETH',
    href: '/nft/7'
  },
  {
    id: '8',
    name: 'Street King #0123',
    dropName: 'Urban Collection',
    creator: 'StreetVision',
    image: 'https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=500&q=80',
    floorPrice: '1.9 ETH',
    href: '/nft/8'
  }
];

export const trendingNFTs: NFTCollection[] = [
  {
    id: '9',
    name: 'Quantum Fade #4567',
    dropName: 'Digital Dreams',
    creator: 'SurrealMaster',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&q=80',
    floorPrice: '3.5 ETH',
    href: '/nft/9'
  },
  {
    id: '10',
    name: 'Void Walker #8901',
    dropName: 'Neon Nights',
    creator: 'LightArtist',
    image: 'https://images.unsplash.com/photo-1644361566696-3d442b5b482a?w=500&q=80',
    floorPrice: '2.3 ETH',
    href: '/nft/10'
  },
  {
    id: '11',
    name: 'Synth Wave #2468',
    dropName: 'Retro Wave',
    creator: 'VaporArt',
    image: 'https://images.unsplash.com/photo-1645184699061-1a20ab0d5f01?w=500&q=80',
    floorPrice: '1.7 ETH',
    href: '/nft/11'
  },
  {
    id: '12',
    name: 'Galaxy Mind #1357',
    dropName: 'Cosmic Vault',
    creator: 'SpaceCreator',
    image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=500&q=80',
    floorPrice: '4.2 ETH',
    href: '/nft/12'
  },
  {
    id: '13',
    name: 'Pixel Dreams #9753',
    dropName: 'Cyber Sneakers',
    creator: 'DigitalArtist',
    image: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=500&q=80',
    floorPrice: '2.6 ETH',
    href: '/nft/13'
  },
  {
    id: '14',
    name: 'Metro Phantom #3698',
    dropName: 'Urban Collection',
    creator: 'StreetVision',
    image: 'https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?w=500&q=80',
    floorPrice: '2.0 ETH',
    href: '/nft/14'
  },
  {
    id: '15',
    name: 'Astral Drift #7412',
    dropName: 'Digital Dreams',
    creator: 'SurrealMaster',
    image: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=500&q=80',
    floorPrice: '3.8 ETH',
    href: '/nft/15'
  },
  {
    id: '16',
    name: 'Chrome Pulse #5896',
    dropName: 'Neon Nights',
    creator: 'LightArtist',
    image: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=500&q=80',
    floorPrice: '2.4 ETH',
    href: '/nft/16'
  }
];

export const exclusiveNFTs: NFTCollection[] = [
  {
    id: '17',
    name: 'Prism Soul #0001',
    dropName: 'Exclusive Drop',
    creator: 'EliteCreator',
    image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=500&q=80',
    floorPrice: '5.5 ETH',
    href: '/nft/17'
  },
  {
    id: '18',
    name: 'Holo Dreams #0002',
    dropName: 'Exclusive Drop',
    creator: 'EliteCreator',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&q=80',
    floorPrice: '6.2 ETH',
    href: '/nft/18'
  },
  {
    id: '19',
    name: 'Cyber Elite #0003',
    dropName: 'Premium Collection',
    creator: 'MasterArt',
    image: 'https://images.unsplash.com/photo-1644361566696-3d442b5b482a?w=500&q=80',
    floorPrice: '7.0 ETH',
    href: '/nft/19'
  },
  {
    id: '20',
    name: 'Neon Royale #0004',
    dropName: 'Premium Collection',
    creator: 'MasterArt',
    image: 'https://images.unsplash.com/photo-1645184699061-1a20ab0d5f01?w=500&q=80',
    floorPrice: '5.8 ETH',
    href: '/nft/20'
  },
  {
    id: '21',
    name: 'Meta King #0005',
    dropName: 'Exclusive Drop',
    creator: 'EliteCreator',
    image: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=500&q=80',
    floorPrice: '6.5 ETH',
    href: '/nft/21'
  },
  {
    id: '22',
    name: 'Quantum Lord #0006',
    dropName: 'Premium Collection',
    creator: 'MasterArt',
    image: 'https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?w=500&q=80',
    floorPrice: '7.5 ETH',
    href: '/nft/22'
  },
  {
    id: '23',
    name: 'Ultra Vibe #0007',
    dropName: 'Exclusive Drop',
    creator: 'EliteCreator',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80',
    floorPrice: '5.2 ETH',
    href: '/nft/23'
  },
  {
    id: '24',
    name: 'Apex Phantom #0008',
    dropName: 'Premium Collection',
    creator: 'MasterArt',
    image: 'https://images.unsplash.com/photo-1620799140188-3b2a7c2e0e12?w=500&q=80',
    floorPrice: '6.8 ETH',
    href: '/nft/24'
  }
];
