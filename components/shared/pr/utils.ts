export const normalizeString = (str: string) => {
  return str.trim().replace(/\s+/g, " ");
};

export const processFrames = (
  refs: string[],
  frameSize: number,
  algorithm: "LRU" | "Optimal" | "FIFO" | "LFU"
) => {
  const frames: (string | null)[] = Array.from({ length: frameSize }, () => null);
  const recentUsage: string[] = []; // Used for LRU
  const frequencyMap: Record<string, number> = {}; // Used for LFU
  let pointer = 0; // Used for FIFO
  let hits = 0;
  let faults = 0;

  const sequence: {
    frameState: (string | null)[];
    recentUsage: string[]; // For LRU and debugging
    frequencyMap?: Record<string, number>; // For LFU and debugging
    isFault: boolean;
  }[] = [];

  refs.forEach((page, currentIdx) => {
    let isFault = true; // Default to fault

    if (algorithm === "LRU") {
      if (frames.includes(page)) {
        isFault = false; // It's a hit
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
        isFault = false; // It's a hit
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
    } else if (algorithm === "FIFO") {
      const isHit = frames.includes(page);
      if (isHit) {
        isFault = false; // It's a hit
        hits++;
      } else {
        faults++;
        frames[pointer] = page;
        pointer = (pointer + 1) % frameSize; // Move pointer to next frame
      }
    } else if (algorithm === "LFU") {
      const isHit = frames.includes(page);
      if (isHit) {
        isFault = false; // It's a hit
        hits++;
        frequencyMap[page] = (frequencyMap[page] || 0) + 1; // Increment frequency
      } else {
        faults++;
        if (frames.includes(null)) {
          // Fill empty frame if available
          const emptyIndex = frames.indexOf(null);
          frames[emptyIndex] = page;
          frequencyMap[page] = 1; // Initialize frequency
        } else {
          // Find the least frequently used page
          const leastFrequentPage = Object.entries(frequencyMap)
            .filter(([key]) => frames.includes(key)) // Filter to only pages in frames
            .reduce((a, b) => (a[1] <= b[1] ? a : b))[0]; // Get the least frequent

          // Replace the least frequently used page
          const indexToReplace = frames.indexOf(leastFrequentPage);
          delete frequencyMap[leastFrequentPage]; // Remove old page from frequency map
          frames[indexToReplace] = page;
          frequencyMap[page] = 1; // Initialize frequency
        }
      }
    }

    // Update sequence for debugging or visualization
    sequence.push({
      frameState: [...frames],
      recentUsage: [...recentUsage], // For LRU and debugging
      frequencyMap: algorithm === "LFU" ? { ...frequencyMap } : undefined, // For LFU
      isFault,
    });
  });

  return { hits, faults, sequence };
};
