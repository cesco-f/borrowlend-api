interface User {
  email: string;
  password: string;
  location?: string;
  photoUrl?: string;
  name: string;
  lastName: string;
}

export const users: User[] = [
  {
    email: 'francesco@borrow-lend.com',
    password: 'test',
    name: 'francesco',
    lastName: 'fagnani',
    location: 'barcelona',
    photoUrl:
      'https://scontent-mad2-1.cdninstagram.com/v/t51.2885-19/409014899_889340076148977_6946878171127575402_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-mad2-1.cdninstagram.com&_nc_cat=109&_nc_ohc=kF3_iSclIw8Q7kNvgHwO6xL&edm=AEhyXUkBAAAA&ccb=7-5&oh=00_AYCf513yqVdekaCFjMJK_fc1fj9Lz3cIHFTaK7OqqLgXSQ&oe=668E0AFD&_nc_sid=8f1549',
  },
  {
    email: 'giorgio@borrow-lend.com',
    password: 'test',
    name: 'giorgio',
    lastName: 'giacomuzzo',
    location: 'creazzo',
    photoUrl:
      'https://scontent-mad1-1.cdninstagram.com/v/t51.2885-19/320327354_691460122518607_5806684026349555464_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-mad1-1.cdninstagram.com&_nc_cat=107&_nc_ohc=fheRv6n25OwQ7kNvgHJGS91&edm=AEhyXUkBAAAA&ccb=7-5&oh=00_AYD8s8CRa_sbU8QZlnC8fcRkp2MvN1Jib8tW5xLp09wGeQ&oe=668F2E5E&_nc_sid=8f1549',
  },
];
