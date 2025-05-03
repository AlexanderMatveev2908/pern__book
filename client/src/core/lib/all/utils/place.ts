const l = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quidem dignissimos, voluptatum vero consequuntur aperiam ratione iure sunt aut porro dolor deleniti. Exercitationem maiores, dolores commodi veniam vitae voluptatem quod!`;

export const doLorem = (n: number = 1) => {
  return l.repeat(n);
};
