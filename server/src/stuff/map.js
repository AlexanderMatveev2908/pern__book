export const subcategories = {
  classics: ["greek & roman", "victorian", "modernist"],
  philosophy: ["ethics", "metaphysics", "existentialism"],
  psychology: ["cognitive", "developmental", "clinical"],
  history: ["ancient", "medieval", "20th century"],
  comics: ["superhero", "graphic novels", "anthology"],
  manga: ["shonen", "seinen", "shojo"],

  it: ["programming", "cybersecurity", "networking"],
  politics: ["theory", "elections", "geopolitics"],
  economics: ["microeconomics", "macroeconomics", "behavioral"],
  science: ["physics", "biology", "astronomy"],
  math: ["algebra", "statistics", "geometry"],
  languages: ["english", "spanish", "japanese"],

  crime: ["detective", "thriller", "true crime"],
  sport: ["football", "martial arts", "athletics"],
  children: ["picture books", "fairy tales", "early readers"],
  fantasy: ["high fantasy", "urban fantasy", "dark fantasy"],
  horror: ["gothic", "paranormal", "psychological"],
  biography: ["historical", "political", "artists"],

  cooking: ["baking", "vegetarian", "international cuisine"],
  travel: ["europe", "backpacking", "cultural guides"],
  romance: ["contemporary", "historical", "paranormal"],
};

const mainCat = ["economics", "horror"];

const newSub = [];

const choseRandom = () => Math.floor(Math.random() * 3);

for (const main of mainCat) {
  newSub.push(subcategories[main][choseRandom()]);
}

console.log(newSub);
