export function formatNumber(number) {
    // Convert the number to a string
    const numStr = number.toString();
  
    // Split the number string into groups of three digits from the right
    const groups = [];
    let currentGroup = "";
    for (let i = numStr.length - 1; i >= 0; i--) {
      currentGroup = numStr[i] + currentGroup;
      if (currentGroup.length === 3 || i === 0) {
        groups.unshift(currentGroup);
        currentGroup = "";
      }
    }
  
    // Join the groups with periods and return the formatted string
    return groups.join(".");
  }