export const normalizeString = (str: string) => {
  return str.trim().replace(/\s+/g, " ");
};
export const processFrames = (
    refs: string[],
    frameSize: number,
    algorithm: "LRU" | "Optimal" | "FIFO"
  ) => {
    const frames: (string | null)[] = Array.from({ length: frameSize }, () => null);
    const recentUsage: string[] = [];
    let hits = 0;
    let faults = 0;
    const sequence: {
      frameState: (string | null)[];
      recentUsage: string[];
      isFault: boolean;
    }[] = [];
  
    refs.forEach((page, currentIdx) => {
      let isFault = true; // Default to fault
  
      if (algorithm === "LRU") {
        if (frames.includes(page)) {
          isFault = false; // If the page is found in frames, it's a hit
          hits++;
          const index = recentUsage.indexOf(page);
          if (index > -1) {
            recentUsage.splice(index, 1);
          }
          recentUsage.push(page);
        } else {
          faults++;
          if (frames.includes(null)) {
            frames[frames.indexOf(null)] = page;
          } else {
            const leastRecentlyUsed = recentUsage.shift();
            const indexToReplace = frames.indexOf(leastRecentlyUsed!);
            frames[indexToReplace] = page;
          }
          recentUsage.push(page);
        }
      } else if (algorithm === "Optimal") {
        const isHit = frames.includes(page);
        if (isHit) {
          isFault = false; // It's a hit, so set isFault to false
          hits++;
        } else {
          faults++;
          if (frames.includes(null)) {
            frames[frames.indexOf(null)] = page;
          } else {
            const futureUses = frames.map((frame) =>
              refs.slice(currentIdx + 1).indexOf(frame!)
            );
            const replacementIdx =
              futureUses.indexOf(-1) !== -1
                ? futureUses.indexOf(-1)
                : futureUses.indexOf(Math.max(...futureUses));
  
            frames[replacementIdx] = page;
          }
        } 
      } 
  
      sequence.push({
        frameState: [...frames],
        recentUsage: [...recentUsage],
        isFault,
      });
    });
  
    return { hits, faults, sequence };
  };
  