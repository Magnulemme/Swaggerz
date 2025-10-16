// types/video.types.ts
export interface VideoStat {
  iconType: 'package' | 'users' | 'star' | 'trending' | 'palette' | 'clock';
  iconColor: 'yellow' | 'red';
  value: string;
  label: string;
}

export interface VideoDataItem {
  id: number;
  src: string;
  title: string;
  badge: string;
  description: string;
  stats: VideoStat[];
  highlights: string[];
  hasNewArrivals: boolean;
}