

export const formatFollowersCount=(followersCount)=> {
    if (followersCount < 1000) {
      return followersCount.toString(); // No conversion needed for less than 1K
    } else if (followersCount < 1000000) {
      // Convert to K format
      const countInK = (followersCount / 1000).toFixed(1);
      return `${countInK}K`;
    } else {
      // Convert to M format
      const countInM = (followersCount / 1000000).toFixed(1);
      return `${countInM}M`;
    }
  }