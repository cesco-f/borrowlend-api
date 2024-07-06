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
];
