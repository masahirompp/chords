interface AuthorDTO {
  id: string;
  name: string;
  profile: string;
  email: string;
  icon: string;
  image: string;
  account: {
    id: string;
    image: string;
    show: boolean;
  }[];
  provider: string;
}

export = AuthorDTO
