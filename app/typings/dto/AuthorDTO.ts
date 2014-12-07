interface AuthorDTO {
  id: string;
  name: string;
  profile: string;
  email: string;
  icon: string;
  account: {
    id: string;
    image: string;
    show: boolean;
  }[];
  provider: string;
}

export = AuthorDTO
