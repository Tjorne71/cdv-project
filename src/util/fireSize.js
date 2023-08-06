const sizeRanges = [
  [0, 0.25],
  [0.25, 10],
  [10, 100],
  [100, 300],
  [300, 1000],
  [1000, 5000],
  [5000, Infinity],
];

const sizeRangesExpanded = [
  [0, 0.25],
  [0.26, 0.5],
  [0.5, 1],
  [1, 2],
  [2, 4],
  [4, 8],
  [8, 16],
  [16, 32],
  [32, 64],
  [64, 128],
  [128, 256],
  [256, 512],
  [512, 1024],
  [1024, 2048],
  [2048, 4096],
  [4096, 8192],
  [8192, 16384],
  [16384, 32768],
  [32768, 65536],
  [65536, 131072],
  [131072, 262144],
  [262144, 524288],
  [524288, 1048576],
  [1048576, Infinity],
];

export function fireSizeToValue(fireSize) {
  for (let index = 0; index < sizeRanges.length; index++) {
    const sizeRange = sizeRanges[index];
    if (sizeRange[0] <= fireSize && fireSize < sizeRange[1]) {
      return index + 2;
    }
  }
  return 1;
}

export function fireSizeToSentenceWithImages(fireSize) {
  const index = sizeRangesExpanded.findIndex(range => fireSize > range[0] && fireSize <= range[1]);
  const imagePath = "@/images/"

  switch (index) {
    case 0:
      return { sentence: "a basketball court", image: imagePath + "basketball.jpg" };
    case 1:
      return { sentence: "two basketball courts", image: imagePath + "basketball.jpg" };
    case 2:
      return { sentence: "a soccer field", image: imagePath + "soccer.jpeg" };
    case 3:
      return { sentence: "a football field", image: imagePath + "football.jpg" };
    case 4:
      return { sentence: "two football fields", image: imagePath + "football.jpg" };
    case 5:
      return { sentence: "a Walmart Supercenter", image: imagePath + "walmart.jpg" };
    case 6:
      return { sentence: "two 18 hole golf courses", image: imagePath + "golf.jpg" };
    case 7:
      return { sentence: "Ellis Island", image: imagePath + "ellisisland.jpg" };
    case 8:
      return { sentence: "The White House", image: imagePath + "whitehouse.jpeg" };
    case 9:
      return { sentence: "five 18 hole golf courses", image: imagePath + "golf.jpeg" };
    case 10:
      return { sentence: "Venice Beach", image: imagePath + "venice.jpeg" };
    case 11:
      return { sentence: "Disney World", image: imagePath + "disneyworld.jpg" };
    case 12:
      return { sentence: "Central Park", image: imagePath + "centralpark.jpeg" };
    case 13:
      return { sentence: "Tesla Gigafactory, Texas", image: imagePath + "tesla.jpeg" };
    case 14:
      return { sentence: "Two Tesla Gigafactories", image: imagePath + "tesla.jpeg" };
    case 15:
      return { sentence: "the hot springs in Arkansas", image: imagePath + "hotsprings.jpeg" };
    case 16:
      return { sentence: "The Bronx", image: imagePath + "thebronx.jpeg" };
    case 17:
      return { sentence: "Virgin Islands", image: imagePath + "virginislands.jpeg" };
    case 18:
      return { sentence: "Haleakala, Hawaii", image: imagePath + "haleakala.jpeg" };
    case 19:
      return { sentence: "Bryce Canyon, Utah", image: imagePath + "brycecanyon.jpeg" };
    case 20:
      return { sentence: "Great Sand Dunes, Colorado", image: imagePath + "greatsanddunes.jpg" };
    case 21:
      return { sentence: "New York City", image: imagePath + "newyorkcity.jpeg" };
    case 22:
      return { sentence: "Rocky Mountain, Colorado", image: imagePath + "rockymountains.jpeg" };
    case 23:
      return { sentence: "Rhodes Island", image: imagePath + "rhodesisland.jpeg" };
    case 24:
      return { sentence: "Grand Canyon", image: imagePath + "grandcanyon.jpeg" };
    default:
      return { sentence: "", image: "" };
  }
}

