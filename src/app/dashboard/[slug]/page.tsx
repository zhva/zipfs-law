import React, { useEffect, useState } from 'react';

interface Lyrics {
  tag: string;
  lyrics: string;
}

interface SlugParams extends Record<string, string | undefined> {
    slug: string;
}

export const DashboardGenre = () => {
  const [lyricsData, setLyricsData] = useState<Lyrics[]>([]);
  const [plotData, setPlotData] = useState<any[]>([]);

  return (
    <div>
      <h1>Genre</h1>
    </div>
  );
};

