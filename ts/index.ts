const add = (a: number, b: number): number => {
  return a + b;
};

const joinStrings = (a: string, b: string): string => {
  return a + b;
};

const post: Post = {
  title: 'latest typescript news',
  daysOld: 10,
  published: true
};

interface Post {
  title: string;
  daysOld: number;
  published: boolean;
}
const printPost = (postToprint: Post) => {
  return `${postToprint.title} .....`;
};
const Component = (target: any) => {
  console.log(target);
  
};

@Component
class car {


}
